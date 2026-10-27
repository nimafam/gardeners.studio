"use client";

import {
    type CSSProperties,
    type ReactNode,
} from "react";

import {
    useCameraSpatialState,
    useSceneChoreography,
} from "@/hooks";

import type {
    SceneContentRigMode,
} from "@/types/scene";
import { aboutChoreography } from "./choreography";

interface SceneContentRigProps {
    children: ReactNode;

    mode: SceneContentRigMode;

    className?: string;
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

function smoothstep(
    value: number,
) {
    const t =
        clamp(
            value,
            0,
            1,
        );

    return (
        t *
        t *
        (3 - 2 * t)
    );
}

export function SceneContentRig({
    children,
    mode,
    className,
}: SceneContentRigProps) {
    const spatial =
        useCameraSpatialState();

    const about = useSceneChoreography(
        aboutChoreography,
    )

    /*
     * ========================================================
     * HERO CAMERA REFERENCE
     * ========================================================
     */

    const originX = 0;
    const originY = 0;
    const originZ = 6;

    const travelX =
        spatial.position.x -
        originX;

    const travelY =
        spatial.position.y -
        originY;

    const travelZ =
        spatial.position.z -
        originZ;

    /*
     * ========================================================
     * CAMERA ORIENTATION
     * ========================================================
     */

    const yawDegrees =
        spatial.yaw *
        (180 / Math.PI);

    const pitchDegrees =
        spatial.pitch *
        (180 / Math.PI);

    /*
     * ========================================================
     * DEFAULT CONTENT STATE
     * ========================================================
     */

    let opacity = 1;

    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;

    let rotateX = 0;
    let rotateY = 0;

    let scale = 1;

    /*
     * ========================================================
     * HERO
     * ========================================================
     *
     * Hero هنوز به Camera Spatial State
     * وابسته است.
     *
     * این رفتار فعلاً تغییر نمی‌کند.
     */

    if (mode === "hero") {
        /*
         * DOM در جهت مخالف Camera travel
         * حرکت می‌کند.
         */

        translateX =
            -travelX *
            110;

        translateY =
            travelY *
            55;

        translateZ =
            travelZ *
            120;

        /*
         * Rotation از Camera orientation
         * مشتق می‌شود.
         */

        rotateY =
            -yawDegrees *
            0.72;

        rotateX =
            pitchDegrees *
            0.35;

        /*
         * Depth scaling.
         */

        scale =
            clamp(
                1 +
                travelZ *
                0.025,
                0.82,
                1.08,
            );

        /*
         * Fade نقش ثانویه دارد.
         */

        opacity =
            clamp(
                1 -
                spatial.progress *
                1.45,
                0,
                1,
            );
    }

    /*
   * ========================================================
   * ABOUT
   * ========================================================
   */

    if (mode === "about") {
        /*
         * About باید از choreography خودش استفاده کند،
         * نه spatial.progress عمومی Camera.
         */

        const phase =
            about.phase;

        const phaseProgress =
            clamp(
                about.phaseProgress,
                0,
                1,
            );

        /*
         * Defaults:
         * HOLD state
         */

        opacity = 1;

        translateX = 0;
        translateY = 0;
        translateZ = 0;

        rotateX = 0;
        rotateY = 0;

        scale = 1;

        /*
         * ----------------------------------------------------
         * ENTRY / REVEAL
         * ----------------------------------------------------
         */

        if (phase === "entry") {
            const reveal =
                smoothstep(
                    phaseProgress,
                );

            opacity =
                reveal;

            translateX =
                (1 - reveal) *
                10;

            translateY =
                (1 - reveal) *
                5;

            translateZ =
                (1 - reveal) *
                -18;

            rotateY =
                (1 - reveal) *
                1.5;

            rotateX =
                (1 - reveal) *
                -0.4;

            scale =
                0.985 +
                reveal *
                0.01;
        }

        /*
         * ----------------------------------------------------
         * SETTLE
         * ----------------------------------------------------
         *
         * Content در این مرحله باید سریعاً
         * به visibility کامل برسد.
         *
         * Spatial movement را WorldAnchor انجام می‌دهد.
         */

        if (phase === "settle") {
            const settle =
                smoothstep(
                    phaseProgress,
                );

            /*
             * از ابتدای Settle visible است.
             *
             * اگر خواستیم بعداً transition نرم‌تری داشته
             * باشیم می‌توانیم 0.85 → 1 استفاده کنیم.
             */
            opacity = 1;

            translateX =
                (1 - settle) *
                6;

            translateY =
                (1 - settle) *
                3;

            translateZ =
                (1 - settle) *
                -8;

            rotateY =
                (1 - settle) *
                0.75;

            rotateX =
                (1 - settle) *
                -0.2;

            scale =
                0.992 +
                settle *
                0.008;
        }

        /*
         * ----------------------------------------------------
         * TRAVERSE = HOLD
         * ----------------------------------------------------
         *
         * این مهم‌ترین اصلاح است.
         *
         * در About، traverse حرکت نیست؛
         * Scene Hold است.
         *
         * Content باید کاملاً پایدار و visible باشد.
         */

        if (phase === "traverse") {
            opacity = 1;

            translateX = 0;
            translateY = 0;
            translateZ = 0;

            rotateX = 0;
            rotateY = 0;

            scale = 1;
        }

        /*
         * ----------------------------------------------------
         * EXIT
         * ----------------------------------------------------
         */

        if (phase === "exit") {
            const exit =
                smoothstep(
                    phaseProgress,
                );

            opacity =
                1 - exit;

            translateX =
                exit *
                14;

            translateY =
                exit *
                -4;

            translateZ =
                exit *
                14;

            rotateY =
                exit *
                -1;

            scale =
                1 -
                exit *
                0.01;
        }
    }
    /*
     * ========================================================
     * SERVICES
     * ========================================================
     *
     * فعلاً رفتار Services را تغییر نمی‌دهیم.
     *
     * بعداً Services را هم به همان Spatial
     * architecture متصل می‌کنیم.
     */

    if (mode === "services") {
        const inverse =
            1 -
            spatial.progress;

        translateX =
            inverse *
            -260;

        translateY =
            inverse *
            40;

        translateZ =
            inverse *
            -350;

        rotateY =
            inverse *
            28;

        rotateX =
            inverse *
            -4;

        scale =
            0.88 +
            spatial.progress *
            0.12;

        opacity =
            clamp(
                (
                    spatial.progress -
                    0.52
                ) *
                2.4,
                0,
                1,
            );
    }

    /*
     * ========================================================
     * STYLE
     * ========================================================
     */

    const style:
        CSSProperties = {
        opacity,

        transform: `
            translate3d(
                ${translateX}px,
                ${translateY}px,
                ${translateZ}px
            )
            rotateX(
                ${rotateX}deg
            )
            rotateY(
                ${rotateY}deg
            )
            scale(
                ${scale}
            )
        `,

        transformStyle:
            "preserve-3d",

        transformOrigin:
            "center center",

        backfaceVisibility:
            "hidden",

        willChange:
            "transform, opacity",

        pointerEvents:
            opacity <
                0.05
                ? "none"
                : undefined,
    };

    return (
        <div
            className={
                className
            }
            style={
                style
            }
        >
            {children}
        </div>
    );
}