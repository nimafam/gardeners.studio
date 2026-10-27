"use client";

import {
    useMemo,
    type CSSProperties,
} from "react";

import {
    Matrix4,
    Vector3,
} from "three";

import {
    useSpatialProjection,
} from "@/hooks";

import type {
    Position3D,
} from "@/types/graph";

interface RadialTakeoverProps {
    position: Position3D;

    progress: number;

    background: string;

    overscan?: number;

    initialSize?: number;

    className?: string;
}

function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function easeInOutCubic(
    value: number,
) {
    const t =
        clamp01(value);

    if (t < 0.5) {
        return (
            4 *
            t *
            t *
            t
        );
    }

    return (
        1 -
        Math.pow(
            -2 * t + 2,
            3,
        ) /
        2
    );
}

export function RadialTakeover({
    position,
    progress,

    background,

    overscan = 1.15,

    initialSize = 24,

    className,
}: RadialTakeoverProps) {
    const {
        camera,
    } = useSpatialProjection();

    const projection =
        useMemo(() => {
            if (
                !camera.ready ||
                camera.projectionMatrix.length !==
                16 ||
                camera.matrixWorldInverse.length !==
                16 ||
                camera.viewport.width <= 0 ||
                camera.viewport.height <= 0
            ) {
                return null;
            }

            const projectionMatrix =
                new Matrix4().fromArray(
                    camera.projectionMatrix,
                );

            const viewMatrix =
                new Matrix4().fromArray(
                    camera.matrixWorldInverse,
                );

            const worldPosition =
                new Vector3(
                    position[0],
                    position[1],
                    position[2],
                );

            /*
             * Check whether point is
             * behind Camera.
             */
            const viewPosition =
                worldPosition
                    .clone()
                    .applyMatrix4(
                        viewMatrix,
                    );

            if (
                viewPosition.z >= 0
            ) {
                return null;
            }

            /*
             * World → Screen projection.
             */
            const projected =
                worldPosition
                    .clone()
                    .applyMatrix4(
                        viewMatrix,
                    )
                    .applyMatrix4(
                        projectionMatrix,
                    );

            const x =
                (projected.x * 0.5 +
                    0.5) *
                camera.viewport.width;

            const y =
                (-projected.y * 0.5 +
                    0.5) *
                camera.viewport.height;

            return {
                x,
                y,
            };
        }, [
            camera,
            position,
        ]);

    if (!projection) {
        return null;
    }

    const easedProgress =
        easeInOutCubic(
            progress,
        );

    /*
     * مهم:
     *
     * Radius را فقط بر اساس width یا
     * height محاسبه نمی‌کنیم.
     *
     * Circle باید از محل Node بتواند
     * دورترین گوشه Viewport را هم بپوشاند.
     */

    const distanceTopLeft =
        Math.hypot(
            projection.x,
            projection.y,
        );

    const distanceTopRight =
        Math.hypot(
            camera.viewport.width -
            projection.x,
            projection.y,
        );

    const distanceBottomLeft =
        Math.hypot(
            projection.x,
            camera.viewport.height -
            projection.y,
        );

    const distanceBottomRight =
        Math.hypot(
            camera.viewport.width -
            projection.x,
            camera.viewport.height -
            projection.y,
        );

    const requiredRadius =
        Math.max(
            distanceTopLeft,
            distanceTopRight,
            distanceBottomLeft,
            distanceBottomRight,
        ) *
        overscan;

    const initialRadius =
        initialSize / 2;

    const radius =
        initialRadius +
        (
            requiredRadius -
            initialRadius
        ) *
        easedProgress;

    const diameter =
        radius * 2;

    const style: CSSProperties = {
        position: "fixed",

        left:
            projection.x,

        top:
            projection.y,

        width:
            diameter,

        height:
            diameter,

        borderRadius:
            "9999px",

        background,

        transform:
            "translate(-50%, -50%)",

        transformOrigin:
            "center",

        pointerEvents:
            "none",

        willChange:
            "width, height",

        /*
         * در progress صفر می‌خواهیم
         * Circle همچنان برای تست دیده شود.
         */
        opacity:
            1,
    };

    return (
        <div
            className={className}
            style={style}
            data-radial-takeover
            data-progress={
                easedProgress
            }
        />
    );
}