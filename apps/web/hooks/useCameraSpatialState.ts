"use client";

import {
    useMemo,
} from "react";

import {
    Vector3,
} from "three";

import {
    useExperience,
} from "@/hooks/useExperience";

import {
    useSceneTransition,
} from "@/hooks/useSceneTransition";

import {
    createCameraCurve,
} from "@/components/webgl/camera/CameraPath";

import {
    aboutToServicesCameraPath,
    heroToAboutCameraPath,
} from "@/components/webgl/camera/CameraPaths";

import type {
    CameraSpatialState,
} from "@/types/spatial";

export function useCameraSpatialState():
    CameraSpatialState {
    /*
     * ------------------------------------------------
     * EXPERIENCE
     * ------------------------------------------------
     */

    const {
        state,
    } = useExperience();

    /*
     * ------------------------------------------------
     * HERO → ABOUT
     * ------------------------------------------------
     */

    const heroToAbout =
        useSceneTransition({
            fromSceneId: "hero",
            toSceneId: "about",

            startProgress:
                heroToAboutCameraPath
                    .startProgress,

            endProgress:
                heroToAboutCameraPath
                    .endProgress,
        });

    /*
     * ------------------------------------------------
     * ABOUT → SERVICES
     * ------------------------------------------------
     */

    const aboutToServices =
        useSceneTransition({
            fromSceneId: "about",
            toSceneId: "services",

            startProgress:
                aboutToServicesCameraPath
                    .startProgress,

            endProgress:
                aboutToServicesCameraPath
                    .endProgress,
        });

    /*
     * ------------------------------------------------
     * CURVES
     * ------------------------------------------------
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

    /*
     * ------------------------------------------------
     * TARGETS
     * ------------------------------------------------
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

    const servicesTarget =
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
     * ------------------------------------------------
     * RESOLVE CURRENT SPATIAL STATE
     * ------------------------------------------------
     */

    return useMemo(() => {
        /*
         * Default:
         * Hero initial state.
         */

        let progress = 0;

        let position =
            heroToAboutCurve.getPointAt(
                0,
            );

        let target =
            heroTarget.clone();

        /*
         * ============================================
         * HERO
         * ============================================
         */

        if (
            state.activeSceneId ===
            "hero"
        ) {
            progress =
                heroToAbout
                    .easedProgress;

            position =
                heroToAboutCurve
                    .getPointAt(
                        progress,
                    );

            target =
                heroTarget
                    .clone()
                    .lerp(
                        aboutTarget,
                        progress,
                    );
        }

        /*
         * ============================================
         * ABOUT
         * ============================================
         */

        if (
            state.activeSceneId ===
            "about"
        ) {
            progress =
                aboutToServices
                    .easedProgress;

            position =
                aboutToServicesCurve
                    .getPointAt(
                        progress,
                    );

            target =
                aboutTarget
                    .clone()
                    .lerp(
                        servicesTarget,
                        progress,
                    );
        }

        /*
         * ============================================
         * SERVICES
         * ============================================
         *
         * فعلاً روی Arrival Pose نگه می‌داریم.
         *
         * Services choreography را بعداً دوباره
         * روی همین ساختار سوار می‌کنیم.
         */

        if (
            state.activeSceneId ===
            "services"
        ) {
            progress = 1;

            position =
                aboutToServicesCurve
                    .getPointAt(
                        1,
                    );

            target =
                servicesTarget.clone();
        }

        /*
         * ------------------------------------------------
         * CAMERA DIRECTION
         * ------------------------------------------------
         */

        const direction =
            target
                .clone()
                .sub(
                    position,
                )
                .normalize();

        /*
         * ------------------------------------------------
         * YAW
         * ------------------------------------------------
         */

        const yaw =
            Math.atan2(
                direction.x,
                -direction.z,
            );

        /*
         * ------------------------------------------------
         * PITCH
         * ------------------------------------------------
         */

        const pitch =
            Math.asin(
                direction.y,
            );

        /*
         * ------------------------------------------------
         * DISTANCE
         * ------------------------------------------------
         */

        const distance =
            position.distanceTo(
                target,
            );

        /*
         * ------------------------------------------------
         * PUBLIC SPATIAL STATE
         * ------------------------------------------------
         */

        return {
            progress,

            position: {
                x: position.x,
                y: position.y,
                z: position.z,
            },

            target: {
                x: target.x,
                y: target.y,
                z: target.z,
            },

            direction: {
                x: direction.x,
                y: direction.y,
                z: direction.z,
            },

            yaw,

            pitch,

            distance,
        };
    }, [
        state.activeSceneId,

        heroToAbout.easedProgress,
        aboutToServices.easedProgress,

        heroToAboutCurve,
        aboutToServicesCurve,

        heroTarget,
        aboutTarget,
        servicesTarget,
    ]);
}