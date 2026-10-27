"use client";

interface PromotionToEdgeProps {
    progress: number;
}

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
        (end - start) *
        progress
    );
}

const CHANNELS = [
    -30,
    -18,
    -8,
    8,
    18,
    30,
] as const;

export function PromotionToEdge({
    progress,
}: PromotionToEdgeProps) {
    const p =
        clamp01(progress);

    /*
     * ========================================================
     * TIMELINE
     * ========================================================
     *
     * 0.00 → 0.32
     * Promotion channels converge.
     *
     * 0.18 → 0.50
     * Energy concentrates.
     *
     * 0.38 → 0.70
     * Threshold appears.
     *
     * 0.58 → 0.88
     * Breakthrough.
     *
     * 0.84 → 1.00
     * Transition dissolves.
     */

    const converge =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.32,
            ),
        );

    const concentrate =
        smootherstep(
            rangeProgress(
                p,
                0.18,
                0.5,
            ),
        );

    const threshold =
        smootherstep(
            rangeProgress(
                p,
                0.38,
                0.7,
            ),
        );

    const breakthrough =
        smootherstep(
            rangeProgress(
                p,
                0.58,
                0.88,
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

    const thresholdHeight =
        lerp(
            0,
            68,
            threshold,
        );

    const thresholdGlow =
        threshold *
        (1 - breakthrough);

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

                willChange:
                    "opacity, filter",
            }}
        >
            {/*
             * =================================================
             * CONVERGING CHANNELS
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    size-0
                    [transform-style:preserve-3d]
                "
            >
                {CHANNELS.map(
                    (
                        angle,
                        index,
                    ) => {
                        const channelProgress =
                            smootherstep(
                                rangeProgress(
                                    converge,
                                    index *
                                    0.025,
                                    0.62 +
                                    index *
                                    0.025,
                                ),
                            );

                        /*
                         * Start wide.
                         * Collapse toward origin.
                         */

                        const distance =
                            lerp(
                                42,
                                3,
                                channelProgress,
                            );

                        return (
                            <div
                                key={
                                    angle
                                }
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    h-px
                                    origin-left
                                    bg-secondary/35
                                "
                                style={{
                                    width:
                                        `${distance}vw`,

                                    opacity:
                                        (
                                            1 -
                                            breakthrough
                                        ) *
                                        0.8,

                                    transform: `
                                        translate3d(
                                            0,
                                            0,
                                            ${index *
                                        14 -
                                        35
                                        }px
                                        )
                                        rotate(
                                            ${angle}deg
                                        )
                                    `,

                                    transformOrigin:
                                        "left center",
                                }}
                            >
                                <span
                                    className="
                                        absolute
                                        right-0
                                        top-1/2
                                        size-1
                                        -translate-y-1/2
                                        rounded-full
                                        bg-secondary
                                    "
                                    style={{
                                        opacity:
                                            channelProgress,
                                    }}
                                />
                            </div>
                        );
                    },
                )}
            </div>

            {/*
             * =================================================
             * CONCENTRATED ORIGIN
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    rounded-full
                    bg-secondary
                "
                style={{
                    width:
                        `${lerp(
                            4,
                            10,
                            concentrate,
                        )}px`,

                    height:
                        `${lerp(
                            4,
                            10,
                            concentrate,
                        )}px`,

                    opacity:
                        concentrate *
                        (
                            1 -
                            breakthrough *
                            0.6
                        ),

                    boxShadow: `
                        0 0 ${lerp(
                        8,
                        42,
                        concentrate,
                    )
                        }px
                        rgba(
                            187,
                            152,
                            125,
                            ${lerp(
                            0.15,
                            0.45,
                            concentrate,
                        )
                        }
                        )
                    `,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            120px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * THRESHOLD
             * =================================================
             *
             * This is the "edge".
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    w-px
                    bg-white/25
                "
                style={{
                    height:
                        `${thresholdHeight}vh`,

                    opacity:
                        threshold *
                        (
                            1 -
                            exit
                        ),

                    boxShadow: `
                        0 0 ${lerp(
                        0,
                        26,
                        thresholdGlow,
                    )
                        }px
                        rgba(
                            255,
                            255,
                            255,
                            ${thresholdGlow *
                        0.18
                        }
                        )
                    `,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            60px
                        )
                    `,

                    transformOrigin:
                        "center",
                }}
            />

            {/*
             * =================================================
             * BREAKTHROUGH SLICE
             * =================================================
             */}

            <div
                className="
                    absolute
                    inset-y-0
                    left-1/2
                    bg-white/[0.035]
                "
                style={{
                    width:
                        `${lerp(
                            0,
                            38,
                            breakthrough,
                        )}vw`,

                    opacity:
                        breakthrough *
                        (
                            1 -
                            exit
                        ),

                    filter:
                        `blur(${lerp(
                            0,
                            18,
                            breakthrough,
                        )
                        }px)`,

                    transform: `
                        translateX(-50%)
                    `,
                }}
            />

            {/*
             * =================================================
             * LEFT / RIGHT SEPARATION
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[18%]
                    left-[8%]
                    top-[18%]
                    border-r
                    border-white/[0.05]
                "
                style={{
                    width:
                        `${lerp(
                            42,
                            20,
                            breakthrough,
                        )
                        }%`,

                    opacity:
                        breakthrough,
                }}
            />

            <div
                className="
                    absolute
                    bottom-[18%]
                    right-[8%]
                    top-[18%]
                    border-l
                    border-secondary/10
                "
                style={{
                    width:
                        `${lerp(
                            42,
                            20,
                            breakthrough,
                        )
                        }%`,

                    opacity:
                        breakthrough,
                }}
            />

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
                        breakthrough *
                        (
                            1 -
                            exit
                        ),

                    filter:
                        `blur(${lerp(
                            5,
                            0,
                            breakthrough,
                        )
                        }px)`,

                    transform: `
                        translate3d(
                            -50%,
                            ${lerp(
                        14,
                        0,
                        breakthrough,
                    )
                        }px,
                            80px
                        )
                    `,
                }}
            >
                Threshold / Breakthrough
            </div>
        </div>
    );
}