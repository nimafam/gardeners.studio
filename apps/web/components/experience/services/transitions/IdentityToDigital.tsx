"use client";

interface IdentityToDigitalProps {
    progress: number;
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function clamp01(
    value: number,
): number {
    return Math.min(
        Math.max(value, 0),
        1,
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
): number {
    if (end <= start) {
        return 0;
    }

    return clamp01(
        (value - start) /
        (end - start),
    );
}

function smootherstep(
    value: number,
): number {
    const t =
        clamp01(value);

    return (
        t *
        t *
        t *
        (
            t *
            (
                t * 6 - 15
            ) +
            10
        )
    );
}

function lerp(
    start: number,
    end: number,
    progress: number,
): number {
    return (
        start +
        (
            end - start
        ) *
        progress
    );
}

/*
 * ============================================================
 * IDENTITY → DIGITAL
 * ============================================================
 *
 * Narrative:
 *
 * Voice
 *   ↓
 * Resonance collapses
 *   ↓
 * Signal focuses
 *   ↓
 * Transmission axis
 *   ↓
 * Digital plane appears in depth
 *   ↓
 * Stage opens
 *
 *
 * Timeline
 *
 * 0.00 → 0.24
 * Identity residue collapses
 *
 * 0.12 → 0.42
 * Transmission appears
 *
 * 0.28 → 0.68
 * Digital stage opens
 *
 * 0.50 → 0.84
 * Stage resolves
 *
 * 0.84 → 1.00
 * Handoff dissolves
 */

export function IdentityToDigital({
    progress,
}: IdentityToDigitalProps) {
    const p =
        clamp01(progress);

    /*
     * ========================================================
     * PHASES
     * ========================================================
     */

    const collapse =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.24,
            ),
        );

    const transmission =
        smootherstep(
            rangeProgress(
                p,
                0.12,
                0.42,
            ),
        );

    const stageOpen =
        smootherstep(
            rangeProgress(
                p,
                0.28,
                0.68,
            ),
        );

    const stageResolve =
        smootherstep(
            rangeProgress(
                p,
                0.5,
                0.84,
            ),
        );

    const exit =
        smootherstep(
            rangeProgress(
                p,
                0.84,
                1,
            ),
        );

    /*
     * ========================================================
     * RESONANCE COLLAPSE
     * ========================================================
     */

    const resonanceSize =
        lerp(
            360,
            24,
            collapse,
        );

    const resonanceBlur =
        lerp(
            0,
            6,
            collapse,
        );

    /*
     * ========================================================
     * TRANSMISSION
     * ========================================================
     */

    const axisHeight =
        lerp(
            0,
            42,
            transmission,
        );

    /*
     * ========================================================
     * DIGITAL STAGE
     * ========================================================
     */

    const stageWidth =
        lerp(
            5,
            70,
            stageOpen,
        );

    const stageHeight =
        lerp(
            3,
            58,
            stageOpen,
        );

    const stageZ =
        lerp(
            -420,
            40,
            stageOpen,
        );

    const stageRotateX =
        lerp(
            72,
            0,
            stageOpen,
        );

    const stageScale =
        lerp(
            0.68,
            1,
            stageResolve,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                z-30
                overflow-hidden
                [perspective:1500px]
                [transform-style:preserve-3d]
            "
            style={{
                opacity:
                    1 - exit,

                filter:
                    `blur(${lerp(
                        0,
                        3,
                        exit,
                    )
                    }px)`,

                transform: `
                    scale(
                        ${lerp(
                    1,
                    1.015,
                    exit,
                )
                    }
                    )
                `,

                willChange:
                    "opacity, filter, transform",
            }}
        >
            {/*
             * =================================================
             * IDENTITY RESONANCE RESIDUE
             * =================================================
             */}

            {[1, 2, 3].map(
                (ring) => {
                    const ringOffset =
                        (
                            ring -
                            1
                        ) *
                        42;

                    const size =
                        resonanceSize +
                        ringOffset;

                    return (
                        <div
                            key={
                                ring
                            }
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                rounded-full
                                border
                                border-white/[0.08]
                            "
                            style={{
                                width:
                                    `${size}px`,

                                height:
                                    `${size}px`,

                                opacity:
                                    (
                                        1 -
                                        collapse
                                    ) *
                                    (
                                        0.22 -
                                        ring *
                                        0.035
                                    ),

                                filter:
                                    `blur(${resonanceBlur
                                    }px)`,

                                transform: `
                                    translate3d(
                                        -50%,
                                        -50%,
                                        ${-ring *
                                    30
                                    }px
                                    )
                                `,

                                willChange:
                                    "width, height, opacity, filter",
                            }}
                        />
                    );
                },
            )}

            {/*
             * =================================================
             * COLLAPSE ORIGIN
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    size-2
                    rounded-full
                    bg-secondary
                    shadow-[0_0_30px_rgba(187,152,125,0.40)]
                "
                style={{
                    opacity:
                        Math.max(
                            collapse,
                            transmission,
                        ) *
                        (
                            1 -
                            stageResolve
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            120px
                        )
                        scale(
                            ${lerp(
                        0.45,
                        1.2,
                        collapse,
                    )
                        }
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * TRANSMISSION AXIS
             * =================================================
             *
             * Voice stops behaving like resonance.
             *
             * It becomes directional.
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    w-px
                    bg-secondary/60
                "
                style={{
                    height:
                        `${axisHeight}vh`,

                    opacity:
                        transmission *
                        (
                            1 -
                            stageResolve *
                            0.75
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            70px
                        )
                    `,

                    transformOrigin:
                        "center",
                }}
            />

            {/*
             * =================================================
             * TRANSMISSION PULSE
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    size-1.5
                    rounded-full
                    bg-white/80
                    shadow-[0_0_16px_rgba(255,255,255,0.25)]
                "
                style={{
                    top:
                        `${lerp(
                            50,
                            70,
                            transmission,
                        )}%`,

                    opacity:
                        transmission *
                        (
                            1 -
                            stageResolve
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            100px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * DIGITAL STAGE
             * =================================================
             *
             * Transmission becomes a spatial surface.
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    border
                    border-white/[0.12]
                    bg-white/[0.012]
                    [transform-style:preserve-3d]
                "
                style={{
                    width:
                        `${stageWidth}vw`,

                    height:
                        `${stageHeight}vh`,

                    opacity:
                        stageOpen,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${stageZ}px
                        )
                        rotateX(
                            ${stageRotateX}deg
                        )
                        scale(
                            ${stageScale}
                        )
                    `,

                    willChange:
                        "width, height, opacity, transform",
                }}
            >
                {/*
                 * =============================================
                 * HORIZON
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        left-[8%]
                        right-[8%]
                        top-1/2
                        h-px
                        bg-white/[0.08]
                    "
                    style={{
                        opacity:
                            stageResolve,
                    }}
                />

                {/*
                 * =============================================
                 * VERTICAL GUIDE
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[10%]
                        left-1/2
                        top-[10%]
                        w-px
                        bg-white/[0.05]
                    "
                    style={{
                        opacity:
                            stageResolve *
                            0.7,
                    }}
                />

                {/*
                 * =============================================
                 * TOP LEFT CORNER
                 * =============================================
                 */}

                <span
                    className="
                        absolute
                        left-0
                        top-0
                        h-px
                        bg-secondary
                    "
                    style={{
                        width:
                            `${lerp(
                                0,
                                48,
                                stageResolve,
                            )}px`,

                        opacity:
                            stageResolve,
                    }}
                />

                <span
                    className="
                        absolute
                        left-0
                        top-0
                        w-px
                        bg-secondary
                    "
                    style={{
                        height:
                            `${lerp(
                                0,
                                48,
                                stageResolve,
                            )}px`,

                        opacity:
                            stageResolve,
                    }}
                />

                {/*
                 * =============================================
                 * BOTTOM RIGHT CORNER
                 * =============================================
                 */}

                <span
                    className="
                        absolute
                        bottom-0
                        right-0
                        h-px
                        bg-white/30
                    "
                    style={{
                        width:
                            `${lerp(
                                0,
                                48,
                                stageResolve,
                            )}px`,

                        opacity:
                            stageResolve,
                    }}
                />

                <span
                    className="
                        absolute
                        bottom-0
                        right-0
                        w-px
                        bg-white/30
                    "
                    style={{
                        height:
                            `${lerp(
                                0,
                                48,
                                stageResolve,
                            )}px`,

                        opacity:
                            stageResolve,
                    }}
                />

                {/*
                 * =============================================
                 * DEPTH POINTS
                 * =============================================
                 */}

                {[
                    {
                        x: 18,
                        y: 30,
                        z: -70,
                    },
                    {
                        x: 38,
                        y: 62,
                        z: 30,
                    },
                    {
                        x: 66,
                        y: 35,
                        z: 80,
                    },
                    {
                        x: 82,
                        y: 68,
                        z: -20,
                    },
                ].map(
                    (
                        point,
                        index,
                    ) => {
                        const pointProgress =
                            smootherstep(
                                rangeProgress(
                                    stageResolve,
                                    index *
                                    0.06,
                                    0.55 +
                                    index *
                                    0.06,
                                ),
                            );

                        return (
                            <span
                                key={
                                    index
                                }
                                className="
                                    absolute
                                    size-1
                                    rounded-full
                                    bg-secondary/75
                                "
                                style={{
                                    left:
                                        `${point.x}%`,

                                    top:
                                        `${point.y}%`,

                                    opacity:
                                        pointProgress,

                                    transform: `
                                        translate3d(
                                            -50%,
                                            -50%,
                                            ${point.z}px
                                        )
                                        scale(
                                            ${pointProgress}
                                        )
                                    `,
                                }}
                            />
                        );
                    },
                )}
            </div>

            {/*
             * =================================================
             * HANDOFF LABEL
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[15%]
                    left-1/2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-secondary/70
                "
                style={{
                    opacity:
                        stageResolve *
                        (
                            1 -
                            exit
                        ),

                    filter:
                        `blur(${lerp(
                            5,
                            0,
                            stageResolve,
                        )
                        }px)`,

                    transform: `
                        translate3d(
                            -50%,
                            ${lerp(
                        14,
                        0,
                        stageResolve,
                    )
                        }px,
                            80px
                        )
                    `,
                }}
            >
                Transmission / Stage
            </div>
        </div>
    );
}