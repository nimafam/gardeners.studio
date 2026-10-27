"use client";

import {
    createElement,
    useEffect,
    useRef,
    type ElementType,
    type ReactNode,
} from "react";

import {
    gsap,
} from "gsap";

import {
    useMotionTrigger,
} from "@/hooks/useMotionTrigger";

import type {
    MotionTrigger,
} from "@/types/motion";

type RevealDirection =
    | "up"
    | "down"
    | "left"
    | "right"
    | "none";

interface RevealProps {
    /*
     * IMPORTANT:
     *
     * children باید ReactNode باشد.
     * نه never، نه tuple و نه array اجباری.
     */
    children: ReactNode;

    as?: ElementType;

    direction?: RevealDirection;

    distance?: number;

    duration?: number;

    delay?: number;

    className?: string;

    trigger?: MotionTrigger;

    sceneId?: string;

    /*
     * External trigger state.
     *
     * فقط وقتی trigger="manual"
     * باشد استفاده می‌شود.
     */
    active?: boolean;

    once?: boolean;
}

export function Reveal({
    children,

    as: Component = "div",

    direction = "up",

    distance = 32,

    duration = 0.8,

    delay = 0,

    className,

    trigger = "mount",

    sceneId,

    active = false,

    once = true,
}: RevealProps) {
    const elementRef =
        useRef<HTMLElement | null>(
            null,
        );

    /*
     * ========================================================
     * TRIGGER
     * ========================================================
     */

    const shouldAnimate =
        useMotionTrigger(
            elementRef,
            {
                trigger,
                sceneId,
                active,
                once,
            },
        );

    /*
     * ========================================================
     * MOTION
     * ========================================================
     */

    useEffect(() => {
        const element =
            elementRef.current;

        if (!element) {
            return;
        }

        const offset = {
            up: {
                x: 0,
                y: distance,
            },

            down: {
                x: 0,
                y: -distance,
            },

            left: {
                x: distance,
                y: 0,
            },

            right: {
                x: -distance,
                y: 0,
            },

            none: {
                x: 0,
                y: 0,
            },
        }[direction];

        /*
         * Initial state.
         */

        gsap.set(
            element,
            {
                autoAlpha: 0,

                x:
                    offset.x,

                y:
                    offset.y,
            },
        );

        /*
         * Wait for trigger.
         */

        if (
            !shouldAnimate
        ) {
            return;
        }

        /*
         * Animate.
         */

        const context =
            gsap.context(
                () => {
                    gsap.to(
                        element,
                        {
                            autoAlpha:
                                1,

                            x: 0,

                            y: 0,

                            duration,

                            delay,

                            ease:
                                "power3.out",
                        },
                    );
                },
                element,
            );

        return () => {
            context.revert();
        };
    }, [
        shouldAnimate,
        direction,
        distance,
        duration,
        delay,
    ]);

    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return createElement(
        Component,
        // The polymorphic element receives the ref; it is not read during render.
        // eslint-disable-next-line react-hooks/refs
        {
            ref: elementRef,
            className,
        },
        children,
    );
}
