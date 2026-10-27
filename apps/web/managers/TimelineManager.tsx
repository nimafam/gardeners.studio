"use client";

import {
    useEffect,
    useRef,
} from "react";

import { useExperience } from "@/hooks";

import type {
    TimelineDirection,
    TimelineState,
} from "@/types/experience";

const VELOCITY_EPSILON = 0.001;

export function TimelineManager() {
    const {
        state: { scroll },
        setTimeline,
    } = useExperience();

    const previousY = useRef(scroll.y);
    const previousTime = useRef<number | null>(null);

    useEffect(() => {
        const currentTime = performance.now();
        const lastTime = previousTime.current;

        const elapsed =
            lastTime === null
                ? 0
                : Math.max(currentTime - lastTime, 1);

        const distance = scroll.y - previousY.current;

        const velocity =
            elapsed > 0
                ? distance / elapsed
                : 0;

        let direction: TimelineDirection = "idle";

        if (velocity > VELOCITY_EPSILON) {
            direction = "forward";
        }

        if (velocity < -VELOCITY_EPSILON) {
            direction = "backward";
        }

        const timeline: TimelineState = {
            progress: scroll.progress,
            direction,
            velocity,
            time: currentTime,
        };

        previousY.current = scroll.y;
        previousTime.current = currentTime;

        setTimeline(timeline);
    }, [
        scroll.y,
        scroll.progress,
        setTimeline,
    ]);

    return null;
}