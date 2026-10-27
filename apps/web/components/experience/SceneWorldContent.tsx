"use client";

import {
    type ReactNode,
    type CSSProperties,
} from "react";

import {
    useSceneTransition,
} from "@/hooks";

type SceneWorldContentMode =
    | "from"
    | "to";

interface SceneWorldContentProps {
    children: ReactNode;

    fromSceneId: string;
    toSceneId: string;

    mode: SceneWorldContentMode;

    startProgress?: number;
    endProgress?: number;

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

function smoothstep(
    value: number,
) {
    const t =
        clamp01(value);

    return (
        t *
        t *
        (3 - 2 * t)
    );
}

export function SceneWorldContent({
    children,

    fromSceneId,
    toSceneId,

    mode,

    startProgress,
    endProgress,

    className,
}: SceneWorldContentProps) {
    const transition =
        useSceneTransition({
            fromSceneId,
            toSceneId,
            startProgress,
            endProgress,
        });

    const progress =
        transition.easedProgress;

    /*
     * IMPORTANT:
     *
     * Position / rotation / scale
     * اینجا نداریم.
     *
     * Spatial motion کاملاً متعلق
     * به WorldAnchor + Camera است.
     */

    let visibility = 1;

    if (mode === "from") {
        /*
         * Hero مدت بیشتری visible می‌ماند.
         * بعد هنگام ترک World خودش
         * آرام محو می‌شود.
         */

        visibility =
            1 -
            smoothstep(
                remap(
                    progress,
                    0.32,
                    0.68,
                ),
            );
    }

    if (mode === "to") {
        /*
         * Services در ابتدای transition
         * کاملاً invisible است.
         *
         * وقتی Camera به World مقصد
         * نزدیک می‌شود reveal می‌شود.
         */

        visibility =
            smoothstep(
                remap(
                    progress,
                    0.52,
                    0.84,
                ),
            );
    }

    const style: CSSProperties = {
        opacity:
            visibility,

        visibility:
            visibility <= 0.001
                ? "hidden"
                : "visible",

        pointerEvents:
            visibility < 0.5
                ? "none"
                : undefined,

        /*
         * فقط opacity.
         *
         * هیچ spatial transform
         * اینجا اضافه نکن.
         */
        willChange:
            "opacity",
    };

    return (
        <div
            className={className}
            style={style}
            data-scene-world-content
            data-scene-mode={mode}
            data-scene-visibility={
                visibility
            }
        >
            {children}
        </div>
    );
}