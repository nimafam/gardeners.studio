"use client";

import { useMemo } from "react";

import { useExperience } from "@/hooks/useExperience";

import type {
    SceneTransitionOptions,
    SceneTransitionState,
} from "@/types/transition";

function clamp01(value: number) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function remapProgress(
    value: number,
    start: number,
    end: number,
) {
    if (start === end) {
        return 0;
    }

    return clamp01(
        (value - start) /
        (end - start),
    );
}

function smoothProgress(
    progress: number,
) {
    const t = clamp01(progress);

    return (
        t *
        t *
        (3 - 2 * t)
    );
}

export function useSceneTransition({
    fromSceneId,
    startProgress = 0.32,
    endProgress = 0.94,
}: SceneTransitionOptions): SceneTransitionState {
    const { state } = useExperience();

    const fromScene = useMemo(
        () =>
            state.scenes.find(
                (scene) =>
                    scene.id ===
                    fromSceneId,
            ),
        [
            state.scenes,
            fromSceneId,
        ],
    );

    const progress =
        remapProgress(
            fromScene?.progress ?? 0,
            startProgress,
            endProgress,
        );

    const easedProgress =
        smoothProgress(progress);

    return {
        progress,

        easedProgress,

        active:
            progress > 0 &&
            progress < 1,

        completed:
            progress >= 1,
    };
}
