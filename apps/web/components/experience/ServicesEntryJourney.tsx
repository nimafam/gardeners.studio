"use client";

import { useEffect, useRef } from "react";

import { servicesChoreography } from "@/components/experience/choreography/ServicesChoreography";
import { useExperience, useSceneChoreography } from "@/hooks";

const DURATION = 2700;

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

export function ServicesEntryJourney() {
    const { state, setServicesEntryTransition } = useExperience();
    const choreography = useSceneChoreography(servicesChoreography);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const startProgressRef = useRef(0);
    const targetProgressRef = useRef(1);
    const latchRef = useRef<"forward" | "backward" | null>(null);

    useEffect(() => {
        const ownsEntry =
            (state.activeSceneId === "services" &&
                (choreography.phase === "entry" ||
                    choreography.phase === "settle")) ||
            ((state.activeSceneId === "about" ||
                state.activeSceneId === "hero") &&
                state.servicesEntryTransition.progress > 0);

        if (!ownsEntry) {
            latchRef.current = null;
            return;
        }

        const direction =
            state.activeSceneId === "about" ||
            state.activeSceneId === "hero" ||
            (state.scroll.direction === "up" &&
            state.servicesEntryTransition.progress > 0)
                ? "backward"
                : "forward";

        if (
            latchRef.current === direction ||
            state.servicesEntryTransition.status === "running"
        ) {
            return;
        }

        latchRef.current = direction;
        startTimeRef.current = null;
        startProgressRef.current = state.servicesEntryTransition.progress;
        targetProgressRef.current = direction === "forward" ? 1 : 0;

        setServicesEntryTransition({
            direction,
            progress: startProgressRef.current,
            status: "running",
        });

        const tick = (time: number) => {
            if (startTimeRef.current === null) startTimeRef.current = time;

            const timeProgress = clamp01(
                (time - startTimeRef.current) / DURATION,
            );
            const eased =
                timeProgress < 0.5
                    ? 4 * timeProgress ** 3
                    : 1 - Math.pow(-2 * timeProgress + 2, 3) / 2;
            const nextProgress =
                startProgressRef.current +
                (targetProgressRef.current - startProgressRef.current) * eased;

            setServicesEntryTransition({
                direction,
                progress: nextProgress,
                status:
                    timeProgress >= 1
                        ? direction === "forward" ? "complete" : "idle"
                        : "running",
            });

            if (timeProgress < 1) {
                frameRef.current = window.requestAnimationFrame(tick);
            } else {
                frameRef.current = null;
                startTimeRef.current = null;
            }
        };

        frameRef.current = window.requestAnimationFrame(tick);
    }, [
        choreography.phase,
        setServicesEntryTransition,
        state.activeSceneId,
        state.scroll.direction,
        state.servicesEntryTransition.progress,
        state.servicesEntryTransition.status,
    ]);

    useEffect(() => () => {
        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
        }
    }, []);

    return null;
}
