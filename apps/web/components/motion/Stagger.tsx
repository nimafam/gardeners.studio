"use client";

import {
    Children,
    useEffect,
    useRef,
    type ReactNode,
} from "react";

import { gsap } from "gsap";

import { useMotionTrigger } from "@/hooks/useMotionTrigger";

import type {
    MotionTrigger,
} from "@/types/motion";

interface StaggerProps {
    children: ReactNode;

    className?: string;

    stagger?: number;

    duration?: number;

    delay?: number;

    distance?: number;

    trigger?: MotionTrigger;

    sceneId?: string;

    active?: boolean;

    once?: boolean;
}

export function Stagger({
    children,
    className,
    stagger = 0.1,
    duration = 0.7,
    delay = 0,
    distance = 24,
    trigger = "mount",
    sceneId,
    active = false,
    once = true,
}: StaggerProps) {
    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const shouldAnimate =
        useMotionTrigger(
            containerRef,
            {
                trigger,
                sceneId,
                active,
                once,
            },
        );

    useEffect(() => {
        const container =
            containerRef.current;

        if (!container) {
            return;
        }

        const items =
            Array.from(
                container.children,
            );

        gsap.set(items, {
            autoAlpha: 0,
            y: distance,
        });

        if (!shouldAnimate) {
            return;
        }

        const context =
            gsap.context(() => {
                gsap.to(items, {
                    autoAlpha: 1,
                    y: 0,
                    duration,
                    delay,
                    stagger,
                    ease: "power3.out",
                });
            }, container);

        return () => {
            context.revert();
        };
    }, [
        shouldAnimate,
        stagger,
        duration,
        delay,
        distance,
    ]);

    return (
        <div
            ref={containerRef}
            className={className}
        >
            {Children.toArray(children)}
        </div>
    );
}