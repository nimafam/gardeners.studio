"use client";

import {
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import {
    MathUtils,
    Vector3,
    type Mesh,
} from "three";

import type {
    GraphNodeState,
    Position3D,
} from "@/types/graph";

export interface GraphNodeProps {
    position: Position3D;

    size?: number;

    state?: GraphNodeState;

    color?: string;

    /*
     * موقعیت واقعی Mesh در World Space.
     *
     * این position شامل تمام transformهای
     * parent group نیز هست:
     *
     * - rotation
     * - translation
     * - scale
     */
    onWorldPositionChange?: (
        position: Position3D,
    ) => void;
}

export function GraphNode({
    position,
    size = 0.08,
    state = "idle",
    color = "#BB987D",
    onWorldPositionChange,
}: GraphNodeProps) {
    const meshRef =
        useRef<Mesh | null>(
            null,
        );

    const worldPositionRef =
        useRef(
            new Vector3(),
        );

    useFrame(
        (
            {
                clock,
            },
            delta,
        ) => {
            const mesh =
                meshRef.current;

            if (!mesh) {
                return;
            }

            /*
             * =================================================
             * LOCAL POSITION
             * =================================================
             *
             * SceneGraph مالک Local Position است.
             */

            mesh.position.set(
                position[0],
                position[1],
                position[2],
            );

            /*
             * =================================================
             * VISUAL STATE
             * =================================================
             */

            let targetScale =
                1;

            switch (state) {
                case "active":
                    targetScale =
                        1.35;
                    break;

                case "focus":
                    targetScale =
                        1.65 +
                        Math.sin(
                            clock
                                .elapsedTime *
                            3,
                        ) *
                        0.08;
                    break;

                case "idle":
                default:
                    targetScale =
                        1;
                    break;
            }

            const nextScale =
                MathUtils.damp(
                    mesh.scale.x,
                    targetScale,
                    6,
                    delta,
                );

            mesh.scale.setScalar(
                nextScale,
            );

            /*
             * =================================================
             * ACTUAL WORLD POSITION
             * =================================================
             *
             * این مهم‌ترین بخش است.
             *
             * Three.js خودش تمام Parent Transformها
             * را لحاظ می‌کند.
             */

            if (
                onWorldPositionChange
            ) {
                mesh.getWorldPosition(
                    worldPositionRef.current,
                );

                onWorldPositionChange(
                    [
                        worldPositionRef
                            .current.x,

                        worldPositionRef
                            .current.y,

                        worldPositionRef
                            .current.z,
                    ],
                );
            }
        },
    );

    const opacity =
        state === "idle"
            ? 0.55
            : 1;

    return (
        <mesh
            ref={meshRef}
        >
            <sphereGeometry
                args={[
                    size,
                    24,
                    24,
                ]}
            />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={opacity}
            />
        </mesh>
    );
}