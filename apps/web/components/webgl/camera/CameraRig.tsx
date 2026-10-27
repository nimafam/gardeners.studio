"use client";

import {
    useEffect,
    useMemo,
    useRef,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import {
    MathUtils,
    Vector3,
} from "three";

import {
    useExperience,
    useGraphRuntime,
    useSceneChoreography,
    useSceneTransition,
} from "@/hooks";

import {
    servicesChoreography,
} from "@/components/experience/choreography/ServicesChoreography";

import {
    servicesEntryDolly,
} from "@/components/experience/choreography/ServicesCameraMotion";

import {
    createCameraCurve,
} from "./CameraPath";

import {
    aboutToServicesCameraPath,
    heroToAboutCameraPath,
    servicesToWorkCameraPath,
} from "./CameraPaths";

export function CameraRig() {
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
     * GRAPH RUNTIME
     * ========================================================
     */

    const {
        nodes: graphNodes,
    } = useGraphRuntime();

    /*
     * ========================================================
     * SERVICES CHOREOGRAPHY
     * ========================================================
     */

    const services =
        useSceneChoreography(
            servicesChoreography,
        );

    /*
     * ========================================================
     * SCENE TRANSITIONS
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

    const aboutToServices =
        useSceneTransition({
            fromSceneId:
                "about",

            toSceneId:
                "services",

            startProgress:
                aboutToServicesCameraPath
                    .startProgress,

            endProgress:
                aboutToServicesCameraPath
                    .endProgress,
        });

    /*
     * ========================================================
     * CAMERA CURVES
     * ========================================================
     */

    const heroToAboutCurve =
        useMemo(
            () =>
                createCameraCurve(
                    heroToAboutCameraPath,
                ),
            [],
        );

    const aboutToServicesCurve =
        useMemo(
            () =>
                createCameraCurve(
                    aboutToServicesCameraPath,
                ),
            [],
        );

    const servicesToWorkCurve =
        useMemo(
            () => createCameraCurve(servicesToWorkCameraPath),
            [],
        );

    const workTarget =
        useMemo(
            () => new Vector3(
                servicesToWorkCameraPath.endTarget[0],
                servicesToWorkCameraPath.endTarget[1],
                servicesToWorkCameraPath.endTarget[2],
            ),
            [],
        );

    /*
     * ========================================================
     * HERO TARGET
     * ========================================================
     */

    const heroTarget =
        useMemo(
            () =>
                new Vector3(
                    heroToAboutCameraPath
                        .startTarget[0],

                    heroToAboutCameraPath
                        .startTarget[1],

                    heroToAboutCameraPath
                        .startTarget[2],
                ),
            [],
        );

    /*
     * ========================================================
     * ABOUT TARGET
     * ========================================================
     */

    const aboutTarget =
        useMemo(
            () =>
                new Vector3(
                    heroToAboutCameraPath
                        .endTarget[0],

                    heroToAboutCameraPath
                        .endTarget[1],

                    heroToAboutCameraPath
                        .endTarget[2],
                ),
            [],
        );

    /*
     * ========================================================
     * SERVICES STATIC TARGET
     * ========================================================
     */

    const servicesStaticTarget =
        useMemo(
            () =>
                new Vector3(
                    aboutToServicesCameraPath
                        .endTarget[0],

                    aboutToServicesCameraPath
                        .endTarget[1],

                    aboutToServicesCameraPath
                        .endTarget[2],
                ),
            [],
        );

    /*
     * ========================================================
     * SERVICES ARRIVAL POSITION
     * ========================================================
     */

    const servicesArrivalPosition =
        useMemo(() => {
            const points =
                aboutToServicesCameraPath
                    .points;

            const lastPoint =
                points[
                points.length -
                1
                ];

            return new Vector3(
                lastPoint[0],
                lastPoint[1],
                lastPoint[2],
            );
        }, []);

    /*
     * ========================================================
     * SERVICES DOLLY POSITION
     * ========================================================
     */

    const servicesDollyPosition =
        useMemo(
            () =>
                new Vector3(
                    servicesEntryDolly
                        .endPosition[0],

                    servicesEntryDolly
                        .endPosition[1],

                    servicesEntryDolly
                        .endPosition[2],
                ),
            [],
        );

    /*
     * ========================================================
     * INITIAL CAMERA
     * ========================================================
     */

    const initialPoint =
        heroToAboutCameraPath
            .points[0];

    const currentPosition =
        useRef(
            new Vector3(
                initialPoint[0],
                initialPoint[1],
                initialPoint[2],
            ),
        );

    const currentTarget =
        useRef(
            heroTarget.clone(),
        );

    /*
     * ========================================================
     * POINTER MICRO INTERACTION
     * ========================================================
     */

    const pointerX =
        useRef(0);

    const pointerY =
        useRef(0);

    const pointerOffset =
        useRef(
            new Vector3(),
        );

    useEffect(() => {
        const handlePointerMove = (
            event: PointerEvent,
        ) => {
            pointerX.current =
                (
                    event.clientX /
                    window.innerWidth
                ) *
                2 -
                1;

            pointerY.current =
                -(
                    (
                        event.clientY /
                        window.innerHeight
                    ) *
                    2 -
                    1
                );
        };

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive: true,
            },
        );

        return () => {
            window.removeEventListener(
                "pointermove",
                handlePointerMove,
            );
        };
    }, []);

    /*
     * ========================================================
     * FRAME
     * ========================================================
     */

    useFrame(
        (
            {
                camera,
            },
            delta,
        ) => {
            let pathPosition =
                currentPosition
                    .current
                    .clone();

            let targetPosition =
                currentTarget
                    .current
                    .clone();

            const journeyProgress =
                state.sceneJourneyTransition.progress;

            const servicesEntryProgress =
                state.servicesEntryTransition.progress;

            /*
             * =================================================
             * HERO
             * =================================================
             */

            if (
                state.activeSceneId ===
                "hero"
            ) {
                const progress =
                    heroToAbout
                        .easedProgress;

                pathPosition =
                    heroToAboutCurve
                        .getPointAt(
                            progress,
                        );

                targetPosition =
                    heroTarget
                        .clone()
                        .lerp(
                            aboutTarget,
                            progress,
                        );
            }

            /*
             * =================================================
             * ABOUT
             * =================================================
             */

            if (
                state.activeSceneId ===
                "about"
            ) {
                const progress =
                    aboutToServices
                        .easedProgress;

                pathPosition =
                    aboutToServicesCurve
                        .getPointAt(
                            progress,
                        );

                targetPosition =
                    aboutTarget
                        .clone()
                        .lerp(
                            servicesStaticTarget,
                            progress,
                        );
            }

            /*
             * =================================================
             * SERVICES
             * =================================================
             *
             * Camera responsibility ends at the Services
             * settled composition.
             *
             * After Takeover the internal Services sequence
             * is controlled by Services Cinematic Experience,
             * not by Graph node travel.
             */

            if (
                state.activeSceneId ===
                "services"
            ) {
                const servicesNode =
                    graphNodes.services;

                /*
                 * Keep looking at the actual Services
                 * world position while the Graph is visible.
                 */

                if (
                    servicesNode
                ) {
                    targetPosition =
                        new Vector3(
                            servicesNode
                                .position[0],

                            servicesNode
                                .position[1],

                            servicesNode
                                .position[2],
                        );
                } else {
                    targetPosition =
                        servicesStaticTarget
                            .clone();
                }

                /*
                 * -------------------------------------------------
                 * ENTRY
                 * -------------------------------------------------
                 */

                if (
                    services.phase ===
                    "entry"
                ) {
                    const progress =
                        MathUtils.smoothstep(
                            services
                                .phaseProgress,
                            0,
                            1,
                        );

                    pathPosition =
                        servicesArrivalPosition
                            .clone()
                            .lerp(
                                servicesDollyPosition,
                                progress,
                            );
                }

                /*
                 * -------------------------------------------------
                 * SETTLE
                 * -------------------------------------------------
                 */

                if (
                    services.phase ===
                    "settle"
                ) {
                    pathPosition =
                        servicesDollyPosition
                            .clone();
                }

                /*
                 * -------------------------------------------------
                 * TRAVERSE
                 * -------------------------------------------------
                 *
                 * Hold the camera.
                 *
                 * Takeover / Services Cinematic Experience
                 * owns the visible motion from this point.
                 */

                if (
                    services.phase ===
                    "traverse"
                ) {
                    pathPosition =
                        servicesDollyPosition
                            .clone();
                }

                /*
                 * -------------------------------------------------
                 * EXIT
                 * -------------------------------------------------
                 *
                 * For now we hold the last camera position.
                 *
                 * Later this phase can reconnect to a new
                 * spatial destination such as Projects.
                 */

                if (
                    services.phase ===
                    "exit"
                ) {
                    pathPosition =
                        currentPosition
                            .current
                            .clone();
                }
            }

            if (
                servicesEntryProgress > 0 &&
                journeyProgress <= 0
            ) {
                pathPosition = servicesArrivalPosition
                    .clone()
                    .lerp(
                        servicesDollyPosition,
                        servicesEntryProgress,
                    );

                targetPosition = servicesStaticTarget.clone();
            }

            if (journeyProgress > 0) {
                pathPosition = servicesToWorkCurve.getPointAt(
                    journeyProgress,
                );

                targetPosition = servicesStaticTarget
                    .clone()
                    .lerp(workTarget, journeyProgress);
            }

            /*
             * =================================================
             * POINTER MICRO MOTION
             * =================================================
             */

            const targetPointerX =
                pointerX.current *
                0.18;

            const targetPointerY =
                pointerY.current *
                0.12;

            pointerOffset.current.x =
                MathUtils.damp(
                    pointerOffset
                        .current.x,

                    targetPointerX,

                    4,
                    delta,
                );

            pointerOffset.current.y =
                MathUtils.damp(
                    pointerOffset
                        .current.y,

                    targetPointerY,

                    4,
                    delta,
                );

            /*
             * =================================================
             * POSITION DAMPING
             * =================================================
             */

            currentPosition.current.x =
                MathUtils.damp(
                    currentPosition
                        .current.x,

                    pathPosition.x +
                    pointerOffset
                        .current.x,

                    6,
                    delta,
                );

            currentPosition.current.y =
                MathUtils.damp(
                    currentPosition
                        .current.y,

                    pathPosition.y +
                    pointerOffset
                        .current.y,

                    6,
                    delta,
                );

            currentPosition.current.z =
                MathUtils.damp(
                    currentPosition
                        .current.z,

                    pathPosition.z,

                    6,
                    delta,
                );

            /*
             * =================================================
             * TARGET DAMPING
             * =================================================
             */

            currentTarget.current.x =
                MathUtils.damp(
                    currentTarget
                        .current.x,

                    targetPosition.x,

                    7,
                    delta,
                );

            currentTarget.current.y =
                MathUtils.damp(
                    currentTarget
                        .current.y,

                    targetPosition.y,

                    7,
                    delta,
                );

            currentTarget.current.z =
                MathUtils.damp(
                    currentTarget
                        .current.z,

                    targetPosition.z,

                    7,
                    delta,
                );

            /*
             * =================================================
             * APPLY CAMERA
             * =================================================
             */

            camera.position.copy(
                currentPosition.current,
            );

            camera.lookAt(
                currentTarget.current,
            );
        },
    );

    return null;
}
