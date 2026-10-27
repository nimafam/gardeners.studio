"use client";

import {
    useEffect,
    useMemo,
    useRef,
} from "react";

import { gsap } from "gsap";

import { useMotionTrigger } from "@/hooks/useMotionTrigger";

import type {
    MotionTrigger,
} from "@/types/motion";

interface SplitTextProps {
    children: string;

    className?: string;

    stagger?: number;

    duration?: number;

    delay?: number;

    trigger?: MotionTrigger;

    sceneId?: string;

    active?: boolean;

    once?: boolean;
}

export function SplitText({
    children,
    className,
    stagger = 0.045,
    duration = 0.8,
    delay = 0,
    trigger = "mount",
    sceneId,
    active = false,
    once = true,
}: SplitTextProps) {
    const elementRef =
        useRef<HTMLHeadingElement | null>(null);

    const words = useMemo(
        () =>
            children
                .trim()
                .split(/\s+/),
        [children],
    );

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

    useEffect(() => {
        const element =
            elementRef.current;

        if (!element) {
            return;
        }

        const wordElements =
            element.querySelectorAll(
                "[data-split-word]",
            );

        gsap.set(wordElements, {
            yPercent: 110,
            autoAlpha: 0,
        });

        if (!shouldAnimate) {
            return;
        }

        const context =
            gsap.context(() => {
                gsap.to(
                    wordElements,
                    {
                        yPercent: 0,
                        autoAlpha: 1,
                        duration,
                        delay,
                        stagger,
                        ease: "power4.out",
                    },
                );
            }, element);

        return () => {
            context.revert();
        };
    }, [
        shouldAnimate,
        stagger,
        duration,
        delay,
    ]);

    return (
        <h1
            ref={elementRef}
            className={className}
            aria-label={children}
        >
            {words.map(
                (word, index) => (
                    <span
                        key={`${word}-${index}`}
                        className="inline-block overflow-hidden align-top"
                        aria-hidden="true"
                    >
                        <span
                            data-split-word
                            className="inline-block"
                        >
                            {word}
                        </span>

                        {index <
                            words.length - 1 && (
                                <span>
                                    &nbsp;
                                </span>
                            )}
                    </span>
                ),
            )}
        </h1>
    );
}