"use client";

import { useEffect, useRef } from "react";

import { servicesChoreography } from "@/components/experience/choreography/ServicesChoreography";
import { useExperience, useSceneChoreography } from "@/hooks";

const DURATION = 2200;

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

export function ServicesToWorkJourney() {
    const { state, setSceneJourneyTransition } = useExperience();
    const choreography = useSceneChoreography(servicesChoreography);

    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const startProgressRef = useRef(0);
    const targetProgressRef = useRef(1);
    const exitLatchRef = useRef<"forward" | "backward" | null>(null);

    useEffect(() => {
        const inExit =
            state.activeSceneId === "services" &&
            choreography.phase === "exit";

        const returningBeforeExit =
            state.sceneJourneyTransition.progress > 0 &&
            (state.activeSceneId === "hero" ||
                state.activeSceneId === "about" ||
                (state.activeSceneId === "services" && !inExit));

        if (!inExit && !returningBeforeExit) {
            exitLatchRef.current = null;
            return;
        }

        const direction =
            returningBeforeExit ||
            (state.scroll.direction === "up" &&
            state.sceneJourneyTransition.progress > 0)
                ? "backward"
                : "forward";

        if (
            exitLatchRef.current === direction ||
            state.sceneJourneyTransition.status === "running"
        ) {
            return;
        }

        exitLatchRef.current = direction;
        startTimeRef.current = null;
        startProgressRef.current = state.sceneJourneyTransition.progress;
        targetProgressRef.current = direction === "forward" ? 1 : 0;

        setSceneJourneyTransition({
            id: "services-to-work",
            direction,
            progress: startProgressRef.current,
            status: "running",
        });

        const tick = (time: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }

            const elapsed = time - startTimeRef.current;
            const timeProgress = clamp01(elapsed / DURATION);
            const eased =
                timeProgress < 0.5
                    ? 4 * timeProgress ** 3
                    : 1 - Math.pow(-2 * timeProgress + 2, 3) / 2;
            const nextProgress =
                startProgressRef.current +
                (targetProgressRef.current - startProgressRef.current) * eased;

            setSceneJourneyTransition({
                id: "services-to-work",
                direction,
                progress: nextProgress,
                status:
                    timeProgress >= 1
                        ? direction === "forward"
                            ? "complete"
                            : "idle"
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
        setSceneJourneyTransition,
        state.activeSceneId,
        state.sceneJourneyTransition.progress,
        state.sceneJourneyTransition.status,
        state.scroll.direction,
    ]);

    useEffect(() => () => {
        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
        }
    }, []);

    return null;
}
