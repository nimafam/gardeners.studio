"use client";

import {
    useGraphRuntime,
    useExperience,
    useSceneChoreography,
} from "@/hooks";

import {
    servicesChoreography,
} from "@/components/experience/choreography/ServicesChoreography";

import {
    sceneTakeoverMap,
} from "./SceneTakeoverMap";

import {
    RadialTakeover,
} from "./RadialTakeover";

function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function smoothstep(
    value: number,
) {
    const t =
        clamp01(value);

    return (
        t *
        t *
        (3 - 2 * t)
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
) {
    if (end <= start) {
        return 0;
    }

    return clamp01(
        (value - start) /
        (end - start),
    );
}

export function ServicesTakeover() {
    const { state } = useExperience();
    const {
        nodes,
    } = useGraphRuntime();

    const choreography =
        useSceneChoreography(
            servicesChoreography,
        );

    const definition =
        sceneTakeoverMap.services;

    const servicesNode =
        nodes.services;

    if (
        !servicesNode ||
        !definition ||
        !definition.enabled
    ) {
        return null;
    }

    /*
     * ========================================================
     * TAKEOVER PROGRESS
     * ========================================================
     *
     * Timing ownership:
     *
     * SceneTakeoverMap
     *
     * This component contains no
     * takeover timing constants.
     */

    let takeoverProgress = 0;

    const entryTakeoverProgress =
        smoothstep(
            rangeProgress(
                state.servicesEntryTransition.progress,
                0.3,
                0.68,
            ),
        );

    const phaseOrder = [
        "entry",
        "settle",
        "traverse",
        "exit",
    ] as const;

    const currentPhaseIndex =
        phaseOrder.indexOf(
            choreography.phase,
        );

    const takeoverPhaseIndex =
        phaseOrder.indexOf(
            definition.phase,
        );

    /*
     * Before takeover phase.
     */
    if (
        currentPhaseIndex <
        takeoverPhaseIndex
    ) {
        takeoverProgress = entryTakeoverProgress;
    }

    /*
     * Active takeover phase.
     */
    if (
        choreography.phase ===
        definition.phase
    ) {
        takeoverProgress =
            Math.max(
                entryTakeoverProgress,
                smoothstep(
                    rangeProgress(
                        choreography.phaseProgress,
                        definition.startProgress,
                        definition.endProgress,
                    ),
                ),
            );
    }

    /*
     * After takeover phase.
     *
     * Keep the surface fully expanded.
     */
    if (
        currentPhaseIndex >
        takeoverPhaseIndex
    ) {
        takeoverProgress =
            1 -
            smoothstep(
                rangeProgress(
                    state.sceneJourneyTransition.progress,
                    0.06,
                    0.38,
                ),
            );
    }

    if (
        takeoverProgress <= 0
    ) {
        return null;
    }

    return (
        <RadialTakeover
            position={
                servicesNode.position
            }

            progress={
                takeoverProgress
            }

            background={
                definition.background
            }

            overscan={
                definition.overscan ??
                1.15
            }

            initialSize={24}

            className="
                z-[5]
            "
        />
    );
}
