"use client";

import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import { useExperience } from "@/hooks/useExperience";

import type { ScrollDirection } from "@/types/experience";

function clamp(value: number, minimum: number, maximum: number) {
    return Math.min(Math.max(value, minimum), maximum);
}

export function ScrollManager() {
    const { setScroll } = useExperience();

    const lastScrollY = useRef(0);
    const frameId = useRef<number | null>(null);

    const updateScroll = useCallback(() => {
        const y = Math.max(window.scrollY, 0);

        const maximumScroll = Math.max(
            document.documentElement.scrollHeight -
            window.innerHeight,
            0,
        );

        const progress =
            maximumScroll > 0
                ? clamp(y / maximumScroll, 0, 1)
                : 0;

        const direction: ScrollDirection =
            y < lastScrollY.current ? "up" : "down";

        lastScrollY.current = y;

        setScroll(y, progress, direction);
    }, [setScroll]);

    const requestUpdate = useCallback(() => {
        if (frameId.current !== null) {
            return;
        }

        frameId.current =
            window.requestAnimationFrame(
                () => {
                    try {
                        updateScroll();
                    } finally {
                        frameId.current =
                            null;
                    }
                },
            );
    }, [updateScroll]);

    useEffect(() => {
        lastScrollY.current = Math.max(window.scrollY, 0);
        updateScroll();

        window.addEventListener("scroll", requestUpdate, {
            passive: true,
        });

        window.addEventListener("resize", requestUpdate);

        return () => {
            window.removeEventListener(
                "scroll",
                requestUpdate,
            );

            window.removeEventListener(
                "resize",
                requestUpdate,
            );

            if (frameId.current !== null) {
                window.cancelAnimationFrame(frameId.current);

                frameId.current = null;
            }
        };
    }, [requestUpdate, updateScroll]);

    return null;
}