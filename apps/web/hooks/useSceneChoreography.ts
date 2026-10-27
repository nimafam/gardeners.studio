"use client";

import {
    useMemo,
} from "react";

import {
    useExperience,
} from "@/hooks/useExperience";

import type {
    SceneChoreographyDefinition,
    SceneChoreographyPhase,
    SceneChoreographyRange,
    SceneChoreographyState,
} from "@/types/choreography";

function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function getRangeProgress(
    progress: number,
    range: SceneChoreographyRange,
) {
    const length =
        range.end - range.start;

    if (length <= 0) {
        return 0;
    }

    return clamp01(
        (progress - range.start) /
        length,
    );
}

function resolvePhase(
    progress: number,
    definition: SceneChoreographyDefinition,
): SceneChoreographyPhase {
    if (
        progress <
        definition.entry.end
    ) {
        return "entry";
    }

    if (
        progress <
        definition.settle.end
    ) {
        return "settle";
    }

    if (
        progress <
        definition.traverse.end
    ) {
        return "traverse";
    }

    return "exit";
}

export function useSceneChoreography(
    definition: SceneChoreographyDefinition,
): SceneChoreographyState {
    const {
        state,
    } = useExperience();

    /*
     * SceneRegistration خودش progress
     * هر Scene را در Experience Engine دارد.
     */
    const scene =
        state.scenes.find(
            (item) =>
                item.id ===
                definition.sceneId,
        );

    const progress =
        clamp01(
            scene?.progress ?? 0,
        );

    return useMemo(() => {
        const phase =
            resolvePhase(
                progress,
                definition,
            );

        const range =
            definition[phase];

        return {
            sceneId:
                definition.sceneId,

            progress,

            phase,

            phaseProgress:
                getRangeProgress(
                    progress,
                    range,
                ),
        };
    }, [
        definition,
        progress,
    ]);
}