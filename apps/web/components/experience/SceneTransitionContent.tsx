"use client";

import {
    type CSSProperties,
    type ReactNode,
} from "react";

import {
    useSceneTransition,
} from "@/hooks";

type TransitionMode =
    | "exit"
    | "enter";

interface SceneTransitionContentProps {
    children: ReactNode;

    fromSceneId: string;
    toSceneId: string;

    mode: TransitionMode;

    startProgress?: number;
    endProgress?: number;

    className?: string;
}

function clamp01(value: number) {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function remap(
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
 * Cubic ease-in-out.
 *
 * برخلاف CSS transition،
 * همچنان کاملاً scroll-driven است.
 */
function easeInOutCubic(
    value: number,
) {
    const t = clamp01(value);

    return t < 0.5
        ? 4 * t * t * t
        : 1 -
        Math.pow(
            -2 * t + 2,
            3,
        ) /
        2;
}

export function SceneTransitionContent({
    children,

    fromSceneId,
    toSceneId,

    mode,

    startProgress = 0.32,
    endProgress = 0.94,

    className,
}: SceneTransitionContentProps) {
    const transition =
        useSceneTransition({
            fromSceneId,
            toSceneId,
            startProgress,
            endProgress,
        });

    const timeline =
        transition.easedProgress;

    /*
     * Hero کمی دیرتر شروع به خروج می‌کند.
     *
     * Camera ابتدا فرصت دارد
     * حرکت خودش را آغاز کند.
     */
    const rawExitProgress =
        remap(
            timeline,
            0.08,
            0.46,
        );

    /*
     * Scene بعدی زمانی وارد می‌شود
     * که Camera بخش اصلی Orbit
     * را طی کرده است.
     */
    const rawEnterProgress =
        remap(
            timeline,
            0.58,
            0.92,
        );

    const exitProgress =
        easeInOutCubic(
            rawExitProgress,
        );

    const enterProgress =
        easeInOutCubic(
            rawEnterProgress,
        );

    let opacity = 1;

    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;

    let rotateY = 0;

    let scale = 1;

    if (mode === "exit") {
        /*
         * حرکت افقی را محدود نگه می‌داریم.
         * بخش اصلی حس خروج از depth می‌آید.
         */

        translateX =
            exitProgress * 70;

        translateY =
            exitProgress * -8;

        translateZ =
            exitProgress * -160;

        rotateY =
            exitProgress * -8;

        scale =
            1 -
            exitProgress * 0.035;

        /*
         * Fade را کمی دیرتر از حرکت
         * شروع می‌کنیم.
         */

        const fadeProgress =
            easeInOutCubic(
                remap(
                    exitProgress,
                    0.12,
                    0.9,
                ),
            );

        opacity =
            1 - fadeProgress;
    }

    if (mode === "enter") {
        const inverse =
            1 - enterProgress;

        translateX =
            inverse * -70;

        translateY =
            inverse * 8;

        translateZ =
            inverse * -160;

        rotateY =
            inverse * 8;

        scale =
            0.965 +
            enterProgress *
            0.035;

        const fadeProgress =
            easeInOutCubic(
                remap(
                    enterProgress,
                    0.05,
                    0.85,
                ),
            );

        opacity =
            fadeProgress;
    }

    const style: CSSProperties = {
        opacity,

        transform: `
            translate3d(
                ${translateX}px,
                ${translateY}px,
                ${translateZ}px
            )
            rotateY(${rotateY}deg)
            scale(${scale})
        `,

        transformOrigin:
            mode === "exit"
                ? "left center"
                : "right center",

        transformStyle:
            "preserve-3d",

        backfaceVisibility:
            "hidden",

        willChange:
            "transform, opacity",

        pointerEvents:
            opacity < 0.1
                ? "none"
                : undefined,
    };

    return (
        <div
            className={className}
            style={style}
        >
            {children}
        </div>
    );
}