"use client";

import {
    useMemo,
    type CSSProperties,
    type ReactNode,
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

type WorldAnchorAlign =
    | "center"
    | "left"
    | "right";

export interface WorldAnchorOffset {
    x?: number;
    y?: number;
}

interface WorldAnchorProps {
    position: Position3D;

    children: ReactNode;

    className?: string;

    align?: WorldAnchorAlign;

    hideWhenBehindCamera?: boolean;

    /*
     * Screen-space presentation offset.
     *
     * IMPORTANT:
     * این Offset روی Spatial Position
     * تأثیری ندارد.
     *
     * Node و Content همچنان یک World
     * reference مشترک دارند.
     */
    offset?: WorldAnchorOffset;

    /*
     * Optional depth scaling.
     */
    depthScale?: boolean;

    referenceDistance?: number;

    minScale?: number;

    maxScale?: number;
}

function clamp(
    value: number,
    min: number,
    max: number,
) {
    return Math.min(
        Math.max(
            value,
            min,
        ),
        max,
    );
}

export function WorldAnchor({
    position,
    children,
    className,

    align = "center",

    hideWhenBehindCamera = true,

    offset,

    depthScale = false,

    referenceDistance = 6,

    minScale = 0.65,
    maxScale = 1.35,
}: WorldAnchorProps) {
    const {
        camera,
    } = useSpatialProjection();

    /*
     * ========================================================
     * SCREEN OFFSET
     * ========================================================
     */

    const offsetX =
        offset?.x ?? 0;

    const offsetY =
        offset?.y ?? 0;

    /*
     * ========================================================
     * WORLD → SCREEN PROJECTION
     * ========================================================
     */

    const projection =
        useMemo(() => {
            if (
                !camera.ready ||
                camera.projectionMatrix.length !==
                16 ||
                camera.matrixWorldInverse.length !==
                16 ||
                camera.viewport.width <=
                0 ||
                camera.viewport.height <=
                0
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
             * World → View
             */

            const viewPosition =
                worldPosition
                    .clone()
                    .applyMatrix4(
                        viewMatrix,
                    );

            /*
             * Three.js:
             *
             * Front of camera =
             * negative Z.
             */

            const behindCamera =
                viewPosition.z >=
                0;

            /*
             * World
             *   ↓
             * View
             *   ↓
             * Projection / NDC
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

            /*
             * NDC → Screen Pixels
             */

            const screenX =
                (
                    projected.x *
                    0.5 +
                    0.5
                ) *
                camera.viewport.width;

            const screenY =
                (
                    -projected.y *
                    0.5 +
                    0.5
                ) *
                camera.viewport.height;

            /*
             * Camera distance.
             */

            const dx =
                position[0] -
                camera.position.x;

            const dy =
                position[1] -
                camera.position.y;

            const dz =
                position[2] -
                camera.position.z;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy +
                    dz * dz,
                );

            /*
             * Optional depth scale.
             */

            const scale =
                depthScale
                    ? clamp(
                        referenceDistance /
                        Math.max(
                            distance,
                            0.001,
                        ),

                        minScale,
                        maxScale,
                    )
                    : 1;

            return {
                x: screenX,
                y: screenY,

                depth:
                    projected.z,

                distance,

                scale,

                behindCamera,
            };
        }, [
            position,
            camera,

            depthScale,
            referenceDistance,
            minScale,
            maxScale,
        ]);

    /*
     * Camera projection
     * هنوز آماده نشده.
     */

    if (!projection) {
        return null;
    }

    /*
     * Node پشت Camera است.
     */

    if (
        hideWhenBehindCamera &&
        projection.behindCamera
    ) {
        return null;
    }

    const isCompactViewport =
        camera.viewport.width < 768;

    const safeScreenX =
        isCompactViewport && align === "left"
            ? Math.max(projection.x, 24)
            : isCompactViewport && align === "right"
                ? Math.min(projection.x, camera.viewport.width - 24)
                : projection.x;

    /*
     * ========================================================
     * ALIGNMENT
     * ========================================================
     */

    let alignmentTransform =
        "translate(-50%, -50%)";

    if (align === "left") {
        alignmentTransform =
            "translate(0, -50%)";
    }

    if (align === "right") {
        alignmentTransform =
            "translate(-100%, -50%)";
    }

    /*
     * ========================================================
     * STYLE
     * ========================================================
     */

    const style:
        CSSProperties = {
        position: "fixed",

        left: 0,
        top: 0,

        /*
         * IMPORTANT:
         *
         * 1. Spatial projection
         * 2. Screen-space offset
         * 3. Alignment
         * 4. Depth scale
         */

        transform: `
            translate3d(
                ${safeScreenX}px,
                ${projection.y}px,
                0
            )

            translate3d(
                ${offsetX}px,
                ${offsetY}px,
                0
            )

            ${alignmentTransform}

            scale(
                ${projection.scale}
            )
        `,

        transformOrigin:
            align === "left"
                ? "left center"
                : align ===
                    "right"
                    ? "right center"
                    : "center center",

        willChange:
            "transform",

        pointerEvents:
            "none",
    };

    return (
        <div
            className={
                className
            }
            style={style}
            data-world-anchor
            data-depth={
                projection.depth
            }
            data-distance={
                projection.distance
            }
            data-scale={
                projection.scale
            }
            data-offset-x={
                offsetX
            }
            data-offset-y={
                offsetY
            }
        >
            {children}
        </div>
    );
}
