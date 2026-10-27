"use client";

import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import {
    useExperience,
} from "@/hooks";

import type {
    SceneRegistration,
} from "@/types/scene";

function clamp(
    value: number,
    minimum = 0,
    maximum = 1,
) {
    return Math.min(
        Math.max(
            value,
            minimum,
        ),
        maximum,
    );
}

export function SceneManager() {
    const {
        registry,
        state,
        updateScene,
        setActiveScene,
    } = useExperience();

    /*
     * ========================================================
     * RUNTIME REFS
     * ========================================================
     */

    const frameId =
        useRef<number | null>(
            null,
        );

    /*
     * IMPORTANT:
     *
     * SceneManager previously depended directly on
     * state.scenes inside updateScenes().
     *
     * That caused updateScenes → requestUpdate → effect
     * to be recreated whenever Scene state changed.
     *
     * We keep the latest registrations in a ref instead.
     */

    const registeredScenesRef =
        useRef<
            SceneRegistration[]
        >(
            state.scenes,
        );

    useEffect(() => {
        registeredScenesRef.current =
            state.scenes;
    }, [
        state.scenes,
    ]);

    /*
     * ========================================================
     * UPDATE SCENES
     * ========================================================
     */

    const updateScenes =
        useCallback(() => {
            const scenes =
                registry.getScenes();

            const registeredScenes =
                registeredScenesRef.current;

            const viewportHeight =
                window.innerHeight;

            const viewportCenter =
                viewportHeight / 2;

            let activeSceneId:
                string | undefined;

            for (
                const sceneNode
                of scenes
            ) {
                const rect =
                    sceneNode.element
                        .getBoundingClientRect();

                /*
                 * Scene progress is based on
                 * the physical DOM height.
                 */

                const totalDistance =
                    rect.height +
                    viewportHeight;

                const progress =
                    clamp(
                        (
                            viewportHeight -
                            rect.top
                        ) /
                        totalDistance,
                    );

                /*
                 * Scene becomes active while
                 * viewport center is inside it.
                 */

                const isActive =
                    rect.top <=
                    viewportCenter &&
                    rect.bottom >=
                    viewportCenter;

                if (isActive) {
                    activeSceneId =
                        sceneNode.id;
                }

                const registeredScene =
                    registeredScenes.find(
                        (
                            scene,
                        ) =>
                            scene.id ===
                            sceneNode.id,
                    );

                if (
                    !registeredScene
                ) {
                    continue;
                }

                const nextStatus =
                    isActive
                        ? "active"
                        : registeredScene.active
                            ? "leaving"
                            : "inactive";

                const hasChanged =
                    registeredScene.active !==
                    isActive ||
                    registeredScene.status !==
                    nextStatus ||
                    Math.abs(
                        registeredScene.progress -
                        progress,
                    ) >
                    0.001;

                if (
                    !hasChanged
                ) {
                    continue;
                }

                updateScene(
                    sceneNode.id,
                    {
                        active:
                            isActive,

                        status:
                            nextStatus,

                        progress,
                    },
                );
            }

            setActiveScene(
                activeSceneId,
            );
        }, [
            registry,
            updateScene,
            setActiveScene,
        ]);

    /*
     * ========================================================
     * RAF SCHEDULER
     * ========================================================
     */

    const requestUpdate =
        useCallback(() => {
            /*
             * One frame at a time.
             */

            if (
                frameId.current !==
                null
            ) {
                return;
            }

            frameId.current =
                window.requestAnimationFrame(
                    () => {
                        /*
                         * CRITICAL:
                         *
                         * Always release the RAF lock.
                         *
                         * Even if updateScenes ever throws,
                         * frameId must return to null.
                         */

                        try {
                            updateScenes();
                        } finally {
                            frameId.current =
                                null;
                        }
                    },
                );
        }, [
            updateScenes,
        ]);

    /*
     * ========================================================
     * LISTENERS
     * ========================================================
     */

    useEffect(() => {
        requestUpdate();

        window.addEventListener(
            "scroll",
            requestUpdate,
            {
                passive: true,
            },
        );

        window.addEventListener(
            "resize",
            requestUpdate,
        );

        const unsubscribe =
            registry.subscribe(
                requestUpdate,
            );

        return () => {
            window.removeEventListener(
                "scroll",
                requestUpdate,
            );

            window.removeEventListener(
                "resize",
                requestUpdate,
            );

            unsubscribe();

            /*
             * CRITICAL FIX:
             *
             * Previous implementation cancelled RAF
             * but left frameId.current populated.
             *
             * That could permanently block
             * requestUpdate().
             */

            if (
                frameId.current !==
                null
            ) {
                window.cancelAnimationFrame(
                    frameId.current,
                );

                frameId.current =
                    null;
            }
        };
    }, [
        registry,
        requestUpdate,
    ]);

    return null;
}