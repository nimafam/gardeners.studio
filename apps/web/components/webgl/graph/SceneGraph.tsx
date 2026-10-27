"use client";

import {
    useMemo,
    useRef,
    useState,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import {
    MathUtils,
    type Group,
} from "three";

import {
    useExperience,
    useGraphRuntime,
    useSceneTransition,
} from "@/hooks";

import {
    heroToAboutCameraPath,
} from "@/components/webgl/camera";

import {
    GraphConnection,
} from "./GraphConnection";

import {
    GraphNode,
} from "./GraphNode";

import {
    resolveGraphState,
} from "./GraphStateResolver";

import {
    resolveGraphComposition,
} from "./GraphCompositionResolver";

import type {
    GraphNodeDefinition,
    GraphRuntimePositions,
    Position3D,
} from "@/types/graph";

export function SceneGraph() {
    const groupRef =
        useRef<Group | null>(
            null,
        );

    /*
     * ========================================================
     * EXPERIENCE
     * ========================================================
     */

    const {
        state,
    } = useExperience();

    /*
     * ========================================================
     * HERO → ABOUT
     * ========================================================
     */

    const heroToAbout =
        useSceneTransition({
            fromSceneId:
                "hero",

            toSceneId:
                "about",

            startProgress:
                heroToAboutCameraPath
                    .startProgress,

            endProgress:
                heroToAboutCameraPath
                    .endProgress,
        });

    /*
     * ========================================================
     * GRAPH RUNTIME
     * ========================================================
     */

    const {
        updateNode,
    } = useGraphRuntime();

    /*
     * ========================================================
     * COMPOSITION
     * ========================================================
     */

    const composition =
        useMemo(
            () =>
                resolveGraphComposition(
                    state.sceneJourneyTransition.progress > 0
                        ? "work"
                        : state.activeSceneId,
                ),
            [
                state.activeSceneId,
                state.sceneJourneyTransition.progress,
            ],
        );

    /*
     * ========================================================
     * NODE DEFINITIONS
     * ========================================================
     */

    const nodes =
        useMemo<
            GraphNodeDefinition[]
        >(
            () =>
                Object.entries(
                    composition.nodes,
                ).map(
                    ([
                        id,
                        definition,
                    ]) => ({
                        id,
                        ...definition,
                    }),
                ),
            [
                composition,
            ],
        );

    /*
     * ========================================================
     * GRAPH STATE
     * ========================================================
     */

    const graphState =
        useMemo(
            () =>
                resolveGraphState(
                    state.sceneJourneyTransition.progress > 0
                        ? "work"
                        : state.activeSceneId,
                    nodes,
                ),
            [
                state.activeSceneId,
                state.sceneJourneyTransition.progress,
                nodes,
            ],
        );

    /*
     * ========================================================
     * LOCAL RUNTIME POSITIONS
     * ========================================================
     */

    const [
        runtimePositions,
        setRuntimePositions,
    ] =
        useState<GraphRuntimePositions>(
            () => {
                const initial =
                    resolveGraphComposition(
                        state.activeSceneId,
                    );

                return Object.fromEntries(
                    Object.entries(
                        initial.nodes,
                    ).map(
                        ([
                            id,
                            node,
                        ]) => [
                                id,
                                [
                                    node.position[0],
                                    node.position[1],
                                    node.position[2],
                                ],
                            ],
                    ),
                );
            },
        );

    /*
     * ========================================================
     * GRAPH MOTION
     * ========================================================
     */

    useFrame(
        (
            {
                clock,
            },
            delta,
        ) => {
            const group =
                groupRef.current;

            if (group) {
                const time =
                    clock.elapsedTime;

                /*
                 * Hero → About choreography.
                 */

                const targetRotationX =
                    heroToAbout
                        .easedProgress *
                    -0.58;

                /*
                 * Ambient movement.
                 */

                const ambientRotationX =
                    Math.cos(
                        time *
                        0.12,
                    ) *
                    0.01;

                const ambientRotationY =
                    Math.sin(
                        time *
                        0.15,
                    ) *
                    0.025;

                group.rotation.x =
                    MathUtils.damp(
                        group.rotation.x,

                        targetRotationX +
                        ambientRotationX,

                        5,
                        delta,
                    );

                group.rotation.y =
                    MathUtils.damp(
                        group.rotation.y,

                        ambientRotationY,

                        5,
                        delta,
                    );

                group.position.y =
                    Math.sin(
                        time *
                        0.25,
                    ) *
                    0.025;
            }

            /*
             * =================================================
             * COMPOSITION TRANSITION
             * =================================================
             */

            setRuntimePositions(
                (
                    current,
                ) => {
                    let changed =
                        false;

                    const next:
                        GraphRuntimePositions =
                        {};

                    for (
                        const [
                            id,
                            definition,
                        ] of Object.entries(
                            composition.nodes,
                        )
                    ) {
                        const target =
                            definition.position;

                        const previous =
                            current[
                            id
                            ] ?? [
                                target[0],
                                target[1],
                                target[2],
                            ];

                        const x =
                            MathUtils.damp(
                                previous[0],
                                target[0],
                                4,
                                delta,
                            );

                        const y =
                            MathUtils.damp(
                                previous[1],
                                target[1],
                                4,
                                delta,
                            );

                        const z =
                            MathUtils.damp(
                                previous[2],
                                target[2],
                                4,
                                delta,
                            );

                        if (
                            Math.abs(
                                x -
                                previous[0],
                            ) >
                            0.0001 ||
                            Math.abs(
                                y -
                                previous[1],
                            ) >
                            0.0001 ||
                            Math.abs(
                                z -
                                previous[2],
                            ) >
                            0.0001
                        ) {
                            changed =
                                true;
                        }

                        next[id] = [
                            x,
                            y,
                            z,
                        ];
                    }

                    return changed
                        ? next
                        : current;
                },
            );
        },
    );

    /*
     * ========================================================
     * GRAPH ORIGIN
     * ========================================================
     *
     * Previously:
     *
     * core
     *
     * Canonical naming:
     *
     * origin
     *
     * IMPORTANT:
     *
     * origin is the structural root of the graph.
     * It is NOT the AKORD Core service.
     */

    const originNode =
        nodes.find(
            (node) =>
                node.id ===
                "origin",
        );

    const originPosition =
        runtimePositions
            .origin;

    if (
        !originNode ||
        !originPosition
    ) {
        return null;
    }

    /*
     * ========================================================
     * WORLD POSITION CALLBACK
     * ========================================================
     */

    const handleWorldPosition =
        (
            node:
                GraphNodeDefinition,

            worldPosition:
                Position3D,
        ) => {
            updateNode(
                node.id,
                {
                    position:
                        worldPosition,

                    size:
                        node.size ??
                        0.1,

                    state:
                        graphState
                            .nodes[
                        node.id
                        ] ??
                        "idle",
                },
            );
        };

    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (
        <group
            ref={groupRef}
        >
            {/*
             * =================================================
             * CONNECTIONS
             * =================================================
             *
             * فعلاً topology قبلی را حفظ می‌کنیم:
             *
             * origin → every node
             *
             * بعداً برای Services Experience
             * topology مستقل را طراحی می‌کنیم.
             */}

            {nodes
                .filter(
                    (node) =>
                        node.id !==
                        "origin",
                )
                .map(
                    (node) => {
                        const position =
                            runtimePositions[
                            node.id
                            ];

                        if (
                            !position
                        ) {
                            return null;
                        }

                        return (
                            <GraphConnection
                                key={`origin-${node.id}`}

                                start={
                                    originPosition
                                }

                                end={
                                    position
                                }

                                curvature={
                                    node.curvature
                                }
                            />
                        );
                    },
                )}

            {/*
             * =================================================
             * NODES
             * =================================================
             */}

            {nodes.map(
                (node) => {
                    const position =
                        runtimePositions[
                        node.id
                        ];

                    if (
                        !position
                    ) {
                        return null;
                    }

                    return (
                        <GraphNode
                            key={
                                node.id
                            }

                            position={
                                position
                            }

                            size={
                                node.id === "services"
                                    ? (node.size ?? 0.1) *
                                        (1 +
                                            Math.sin(
                                                Math.PI *
                                                state.servicesEntryTransition.progress,
                                            ) * 0.32)
                                    : node.size
                            }

                            state={
                                graphState
                                    .nodes[
                                node.id
                                ] ??
                                "idle"
                            }

                            color={
                                node.id ===
                                    "services"
                                    ? "#01362E"
                                    : "#BB987D"
                            }

                            onWorldPositionChange={(
                                worldPosition,
                            ) => {
                                handleWorldPosition(
                                    node,
                                    worldPosition,
                                );
                            }}
                        />
                    );
                },
            )}
        </group>
    );
}
