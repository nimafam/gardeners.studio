"use client";

import type {
    CSSProperties,
    ReactNode,
} from "react";

import {
    useExperience,
    useSceneChoreography,
} from "@/hooks";

import {
    servicesChoreography,
} from "@/components/experience/choreography/ServicesChoreography";

import {
    sceneTakeoverMap,
} from "@/components/experience/takeover/SceneTakeoverMap";

/*
 * ========================================================
 * TYPES
 * ========================================================
 */

export interface ServicesContentRevealProps {
    children: ReactNode;

    className?: string;
}

/*
 * ========================================================
 * HELPERS
 * ========================================================
 */

function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(
            value,
            0,
        ),
        1,
    );
}

function lerp(
    start: number,
    end: number,
    progress: number,
) {
    return (
        start +
        (
            end -
            start
        ) *
        progress
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
) {
    if (
        end <= start
    ) {
        return 0;
    }

    return clamp01(
        (
            value -
            start
        ) /
        (
            end -
            start
        ),
    );
}

function smoothstep(
    value: number,
) {
    const t =
        clamp01(
            value,
        );

    return (
        t *
        t *
        (
            3 -
            2 * t
        )
    );
}

/*
 * ========================================================
 * PHASE ORDER
 * ========================================================
 *
 * برای مقایسه اینکه Takeover قبل یا بعد
 * از phase فعلی قرار دارد.
 */

const phaseOrder = [
    "entry",
    "settle",
    "traverse",
    "exit",
] as const;

/*
 * ========================================================
 * SERVICES INTERNAL TIMING
 * ========================================================
 *
 * TRAVERSE:
 *
 * 0.00 → 0.16
 * Takeover
 *
 * 0.16 → 0.22
 * Post-Takeover Hold
 *
 * 0.22 → 0.28
 * Intro Exit
 *
 * 0.28+
 * Services Experience
 *
 * Takeover timing خودش از SceneTakeoverMap
 * خوانده می‌شود.
 *
 * این دو مقدار فقط متعلق به Intro Exit هستند.
 */

const INTRO_EXIT_START =
    0.008;

const INTRO_EXIT_END =
    0.032;

/*
 * ========================================================
 * COMPONENT
 * ========================================================
 */

export function ServicesContentReveal({
    children,
    className,
}: ServicesContentRevealProps) {
    const { state } = useExperience();
    const choreography =
        useSceneChoreography(
            servicesChoreography,
        );

    const {
        phase,
        phaseProgress,
    } = choreography;

    /*
     * ====================================================
     * ENTRY / SETTLE REVEAL
     * ====================================================
     *
     * ENTRY:
     *
     * Content hidden.
     *
     * SETTLE:
     *
     * ابتدا Content وارد می‌شود،
     * سپس برای مطالعه ثابت می‌ماند.
     */

    let revealProgress =
        smoothstep(
            rangeProgress(
                state.servicesEntryTransition.progress,
                0.5,
                0.86,
            ),
        );

    if (
        phase ===
        "settle"
    ) {
        revealProgress =
            Math.max(
                revealProgress,
                smoothstep(
                rangeProgress(
                    phaseProgress,
                    0.05,
                    0.25,
                )),
            );
    }

    /*
     * از Traverse به بعد Content
     * کاملاً reveal شده است.
     */

    if (
        phase ===
        "traverse" ||
        phase ===
        "exit"
    ) {
        revealProgress = 1;
    }

    /*
     * ====================================================
     * REVEAL PRESENTATION
     * ====================================================
     */

    const revealOpacity =
        revealProgress;

    const revealTranslateY =
        lerp(
            24,
            0,
            revealProgress,
        );

    const revealScale =
        lerp(
            0.985,
            1,
            revealProgress,
        );

    /*
     * ====================================================
     * TAKEOVER COLOR PROGRESS
     * ====================================================
     *
     * Single source of truth:
     *
     * SceneTakeoverMap
     *
     * SETTLE:
     * Dark content
     *
     * TAKEOVER:
     * Dark → Light
     *
     * AFTER TAKEOVER:
     * Light content
     */

    const takeoverDefinition =
        sceneTakeoverMap
            .services;

    let takeoverProgress =
        smoothstep(
            rangeProgress(
                state.servicesEntryTransition.progress,
                0.3,
                0.68,
            ),
        );

    if (
        takeoverDefinition &&
        takeoverDefinition.enabled
    ) {
        const currentPhaseIndex =
            phaseOrder.indexOf(
                phase,
            );

        const takeoverPhaseIndex =
            phaseOrder.indexOf(
                takeoverDefinition
                    .phase,
            );

        /*
         * Before takeover phase.
         */

        if (
            currentPhaseIndex <
            takeoverPhaseIndex
        ) {
            takeoverProgress = Math.max(takeoverProgress, 0);
        }

        /*
         * During takeover phase.
         */

        if (
            phase ===
            takeoverDefinition.phase
        ) {
            takeoverProgress =
                Math.max(
                    takeoverProgress,
                    smoothstep(
                    rangeProgress(
                        phaseProgress,

                        takeoverDefinition
                            .startProgress,

                        takeoverDefinition
                            .endProgress,
                    )),
                );
        }

        /*
         * After takeover phase.
         */

        if (
            currentPhaseIndex >
            takeoverPhaseIndex
        ) {
            takeoverProgress = 1;
        }
    }

    /*
     * ====================================================
     * COLOR INTERPOLATION
     * ====================================================
     *
     * Brand dark:
     *
     * #01362E
     *
     * Light:
     *
     * #F5F0EB
     */

    const darkColor = {
        r: 1,
        g: 54,
        b: 46,
    };

    const lightColor = {
        r: 245,
        g: 240,
        b: 235,
    };

    const colorR =
        Math.round(
            lerp(
                darkColor.r,
                lightColor.r,
                takeoverProgress,
            ),
        );

    const colorG =
        Math.round(
            lerp(
                darkColor.g,
                lightColor.g,
                takeoverProgress,
            ),
        );

    const colorB =
        Math.round(
            lerp(
                darkColor.b,
                lightColor.b,
                takeoverProgress,
            ),
        );

    const contentColor =
        `rgb(${colorR}, ${colorG}, ${colorB})`;

    /*
     * ====================================================
     * SERVICES INTRO EXIT
     * ====================================================
     *
     * TAKEOVER:
     *
     * 0.00 → 0.16
     *
     * Intro stays visible.
     *
     *
     * POST TAKEOVER HOLD:
     *
     * 0.16 → 0.22
     *
     * Intro stays completely static.
     *
     *
     * INTRO EXIT:
     *
     * 0.22 → 0.28
     *
     * Fade
     * +
     * slight upward movement
     * +
     * subtle scale reduction.
     */

    let introExitProgress = 0;

    if (
        phase ===
        "traverse"
    ) {
        introExitProgress =
            smoothstep(
                rangeProgress(
                    phaseProgress,
                    INTRO_EXIT_START,
                    INTRO_EXIT_END,
                ),
            );
    }

    if (
        phase ===
        "exit"
    ) {
        introExitProgress = 1;
    }

    /*
     * ====================================================
     * EXIT PRESENTATION
     * ====================================================
     */

    const exitOpacity =
        1 -
        introExitProgress;

    const exitTranslateY =
        lerp(
            0,
            -18,
            introExitProgress,
        );

    const exitScale =
        lerp(
            1,
            0.965,
            introExitProgress,
        );

    /*
     * ====================================================
     * FINAL PRESENTATION
     * ====================================================
     *
     * Reveal Motion
     *      +
     * Exit Motion
     *
     * با هم compose می‌شوند.
     */

    const finalOpacity =
        revealOpacity *
        exitOpacity;

    const finalTranslateY =
        revealTranslateY +
        exitTranslateY;

    const finalScale =
        revealScale *
        exitScale;

    const style: CSSProperties = {
        opacity:
            finalOpacity,

        color:
            contentColor,

        transform: `
            translate3d(
                0,
                ${finalTranslateY}px,
                0
            )
            scale(${finalScale})
        `,

        transformOrigin:
            "left center",

        willChange:
            "transform, opacity, color",
    };

    /*
     * ====================================================
     * RENDER
     * ====================================================
     */

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
