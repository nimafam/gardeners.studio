"use client";

import {
    useMemo,
} from "react";

import {
    Matrix4,
    Vector3,
} from "three";

import {
    useSpatialProjection,
} from "./useSpatialProjection";

import type {
    Position3D,
} from "@/types/graph";

export interface ProjectedPosition {
    x: number;
    y: number;

    depth: number;

    visible: boolean;
    ready: boolean;
}

export function useProjectedPosition(
    position: Position3D,
): ProjectedPosition {
    const {
        camera,
    } = useSpatialProjection();

    return useMemo(() => {
        /*
         * Camera snapshot هنوز آماده نیست.
         */

        if (
            !camera.ready ||
            camera.projectionMatrix.length !== 16 ||
            camera.matrixWorldInverse.length !== 16 ||
            camera.viewport.width <= 0 ||
            camera.viewport.height <= 0
        ) {
            return {
                x: 0,
                y: 0,
                depth: 0,
                visible: false,
                ready: false,
            };
        }

        /*
         * Matrix snapshots را دوباره
         * به Three Matrix4 تبدیل می‌کنیم.
         */

        const projectionMatrix =
            new Matrix4().fromArray(
                camera.projectionMatrix,
            );

        const matrixWorldInverse =
            new Matrix4().fromArray(
                camera.matrixWorldInverse,
            );

        /*
         * World position.
         */

        const projected =
            new Vector3(
                position[0],
                position[1],
                position[2],
            );

        /*
         * World
         *   ↓
         * Camera / View Space
         *   ↓
         * Clip / NDC Space
         */

        projected.applyMatrix4(
            matrixWorldInverse,
        );

        projected.applyMatrix4(
            projectionMatrix,
        );

        /*
         * NDC:
         *
         * x = -1 ... +1
         * y = -1 ... +1
         *
         * تبدیل به Pixel coordinate.
         */

        const x =
            (
                projected.x *
                0.5 +
                0.5
            ) *
            camera.viewport.width;

        const y =
            (
                -projected.y *
                0.5 +
                0.5
            ) *
            camera.viewport.height;

        /*
         * z در NDC تقریباً باید
         * بین -1 و +1 باشد.
         */

        const visible =
            projected.z >= -1 &&
            projected.z <= 1;

        return {
            x,
            y,

            depth:
                projected.z,

            visible,

            ready: true,
        };
    }, [
        camera,
        position,
    ]);
}