"use client";

/* eslint-disable react-hooks/set-state-in-effect -- trigger state intentionally synchronizes with scene and viewport lifecycle */

import {
    useEffect,
    useRef,
    useState,
    type RefObject,
} from "react";

import {
    useExperience,
} from "@/hooks/useExperience";

import type {
    MotionTriggerOptions,
} from "@/types/motion";

export function useMotionTrigger(
    elementRef:
        RefObject<HTMLElement | null>,

    {
        trigger = "mount",
        sceneId,
        active = false,
        once = true,
        threshold = 0.2,
        rootMargin = "0px",
    }: MotionTriggerOptions = {},
) {
    const {
        state,
    } = useExperience();

    const [
        triggered,
        setTriggered,
    ] = useState(false);

    const hasTriggered =
        useRef(false);

    useEffect(() => {
        /*
         * ====================================================
         * ONCE GUARD
         * ====================================================
         */

        if (
            once &&
            hasTriggered.current
        ) {
            return;
        }

        /*
         * ====================================================
         * MOUNT
         * ====================================================
         */

        if (
            trigger === "mount"
        ) {
            hasTriggered.current =
                true;

            setTriggered(true);

            return;
        }

        /*
         * ====================================================
         * SCENE
         * ====================================================
         */

        if (
            trigger === "scene"
        ) {
            const isActive =
                Boolean(sceneId) &&
                state.activeSceneId ===
                sceneId;

            if (isActive) {
                hasTriggered.current =
                    true;

                setTriggered(true);
            } else if (!once) {
                setTriggered(false);
            }

            return;
        }

        /*
         * ====================================================
         * MANUAL
         * ====================================================
         *
         * Choreography یا هر سیستم خارجی
         * می‌تواند زمان اجرای Motion را تعیین کند.
         *
         * Motion System چیزی درباره Scene Phase
         * یا Services نمی‌داند.
         */

        if (
            trigger === "manual"
        ) {
            if (active) {
                hasTriggered.current =
                    true;

                setTriggered(true);
            } else if (!once) {
                setTriggered(false);
            }

            return;
        }

        /*
         * ====================================================
         * VIEWPORT
         * ====================================================
         */

        const element =
            elementRef.current;

        if (
            trigger !==
            "viewport" ||
            !element
        ) {
            return;
        }

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (!entry) {
                        return;
                    }

                    if (
                        entry
                            .isIntersecting
                    ) {
                        hasTriggered
                            .current =
                            true;

                        setTriggered(
                            true,
                        );

                        if (once) {
                            observer
                                .disconnect();
                        }

                        return;
                    }

                    if (!once) {
                        setTriggered(
                            false,
                        );
                    }
                },
                {
                    threshold,
                    rootMargin,
                },
            );

        observer.observe(
            element,
        );

        return () => {
            observer.disconnect();
        };
    }, [
        elementRef,
        trigger,
        sceneId,
        active,
        once,
        threshold,
        rootMargin,
        state.activeSceneId,
    ]);

    return triggered;
}
