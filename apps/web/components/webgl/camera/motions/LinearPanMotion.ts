import {
    Vector3,
} from "three";

import type {
    LinearPanMotionDefinition,
} from "./CameraMotionDefinition";

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

export function resolveLinearPanMotion(
    definition: LinearPanMotionDefinition,
    progress: number,
) {
    const t =
        smoothstep(progress);

    const startPosition =
        new Vector3(
            ...definition.startPosition,
        );

    const endPosition =
        new Vector3(
            ...definition.endPosition,
        );

    const startTarget =
        new Vector3(
            ...definition.startTarget,
        );

    const endTarget =
        new Vector3(
            ...definition.endTarget,
        );

    return {
        position:
            startPosition.lerp(
                endPosition,
                t,
            ),

        target:
            startTarget.lerp(
                endTarget,
                t,
            ),
    };
}