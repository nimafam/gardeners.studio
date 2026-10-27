import {
    CatmullRomCurve3,
    Vector3,
} from "three";

import type {
    CameraPathDefinition,
} from "@/types/camera";

export function createCameraCurve(
    definition: CameraPathDefinition,
) {
    const points =
        definition.points.map(
            (point) =>
                new Vector3(
                    point[0],
                    point[1],
                    point[2],
                ),
        );

    return new CatmullRomCurve3(
        points,
        false,
        "catmullrom",
        0.5,
    );
}

export function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

export function remapProgress(
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

/*
 * Smoothstep
 *
 * باعث می‌شود Camera در ابتدا و
 * انتهای Transition نرم‌تر accelerate /
 * decelerate شود.
 */

export function smoothProgress(
    progress: number,
) {
    const t =
        clamp01(progress);

    return (
        t *
        t *
        (3 - 2 * t)
    );
}