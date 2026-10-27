import {
    transitionRhythmConfig,
} from "./TransitionRhythmConfig";

import type {
    ServiceTransitionId,
} from "@/types/service-transition";

export interface TransitionRhythm {
    raw: number;

    departureHold: number;

    motion: number;

    arrival: number;

    arrivalHold: number;
}

function clamp01(
    value: number,
): number {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
): number {
    if (end <= start) {
        return 0;
    }

    return clamp01(
        (value - start) /
        (end - start),
    );
}

function smootherstep(
    value: number,
): number {
    const t =
        clamp01(value);

    return (
        t *
        t *
        t *
        (
            t *
            (
                t * 6 - 15
            ) +
            10
        )
    );
}

export function resolveTransitionRhythm(
    transitionId:
        ServiceTransitionId,

    progress: number,
): TransitionRhythm {
    const p =
        clamp01(progress);

    const profile =
        transitionRhythmConfig[
        transitionId
        ];

    return {
        raw: p,

        departureHold:
            smootherstep(
                rangeProgress(
                    p,
                    0,
                    profile
                        .departureHoldEnd,
                ),
            ),

        motion:
            smootherstep(
                rangeProgress(
                    p,
                    profile.motionStart,
                    profile.motionEnd,
                ),
            ),

        arrival:
            smootherstep(
                rangeProgress(
                    p,
                    profile.arrivalStart,
                    profile.arrivalEnd,
                ),
            ),

        arrivalHold:
            smootherstep(
                rangeProgress(
                    p,
                    profile.arrivalEnd,
                    1,
                ),
            ),
    };
}