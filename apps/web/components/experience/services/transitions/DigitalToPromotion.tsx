"use client";

interface DigitalToPromotionProps {
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
                t * 6 -
                15
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
            end -
            start
        ) *
        progress
    );
}

const RAYS = [
    {
        angle: -32,
        length: 34,
    },
    {
        angle: -18,
        length: 42,
    },
    {
        angle: -7,
        length: 48,
    },
    {
        angle: 8,
        length: 46,
    },
    {
        angle: 19,
        length: 40,
    },
    {
        angle: 31,
        length: 34,
    },
] as const;

export function DigitalToPromotion({
    progress,
}: DigitalToPromotionProps) {
    const p =
        clamp01(progress);

    /*
     * ========================================================
     * PHASES
     * ========================================================
     *
     * 0.00 → 0.26
     * Digital stage compresses.
     *
     * 0.16 → 0.48
     * Energy / message is focused.
     *
     * 0.32 → 0.72
     * Reach expands outward.
     *
     * 0.58 → 0.88
     * Promotion field resolves.
     *
     * 0.84 → 1.00
     * Handoff disappears.
     */

    const collapse =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.26,
            ),
        );

    const focus =
        smootherstep(
            rangeProgress(
                p,
                0.14,
                0.46,
            ),
        );

    const broadcast =
        smootherstep(
            rangeProgress(
                p,
                0.3,
                0.72,
            ),
        );

    const resolve =
        smootherstep(
            rangeProgress(
                p,
                0.56,
                0.86,
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
     * STAGE COLLAPSE
     * ========================================================
     */

    const stageWidth =
        lerp(
            64,
            12,
            collapse,
        );

    const stageHeight =
        lerp(
            52,
            12,
            collapse,
        );

    const stageDepth =
        lerp(
            0,
            180,
            collapse,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                z-30
                overflow-hidden
                [perspective:1400px]
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
             * COLLAPSING DIGITAL STAGE
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    border
                    border-white/10
                    bg-white/[0.01]
                "
                style={{
                    width:
                        `${stageWidth}vw`,

                    height:
                        `${stageHeight}vh`,

                    opacity:
                        1 -
                        focus *
                        0.8,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${stageDepth}px
                        )
                        rotateX(
                            ${lerp(
                        0,
                        18,
                        collapse,
                    )
                        }deg
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * MESSAGE ORIGIN
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
                    shadow-[0_0_30px_rgba(187,152,125,0.4)]
                "
                style={{
                    opacity:
                        focus *
                        (
                            1 -
                            exit
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            160px
                        )
                        scale(
                            ${lerp(
                        0.5,
                        1.25,
                        focus,
                    )
                        }
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * BROADCAST / REACH
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
                {RAYS.map(
                    (
                        ray,
                        index,
                    ) => {
                        const rayProgress =
                            smootherstep(
                                rangeProgress(
                                    broadcast,
                                    index *
                                    0.035,
                                    0.58 +
                                    index *
                                    0.035,
                                ),
                            );

                        return (
                            <div
                                key={
                                    index
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
                                        `${ray.length *
                                        rayProgress
                                        }vw`,

                                    opacity:
                                        rayProgress *
                                        (
                                            1 -
                                            exit
                                        ),

                                    transform: `
                                        translate3d(
                                            0,
                                            0,
                                            ${index *
                                        12 -
                                        30
                                        }px
                                        )
                                        rotate(
                                            ${ray.angle}deg
                                        )
                                    `,
                                }}
                            >
                                <span
                                    className="
                                        absolute
                                        right-0
                                        top-1/2
                                        size-1.5
                                        -translate-y-1/2
                                        rounded-full
                                        bg-secondary
                                    "
                                    style={{
                                        opacity:
                                            rayProgress,
                                    }}
                                />
                            </div>
                        );
                    },
                )}
            </div>

            {/*
             * =================================================
             * REACH RINGS
             * =================================================
             */}

            {[1, 2, 3].map(
                (ring) => {
                    const ringProgress =
                        smootherstep(
                            rangeProgress(
                                broadcast,
                                (
                                    ring -
                                    1
                                ) *
                                0.12,
                                0.72 +
                                ring *
                                0.05,
                            ),
                        );

                    const size =
                        lerp(
                            30,
                            240 +
                            ring *
                            90,
                            ringProgress,
                        );

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
                                    ringProgress *
                                    0.35 *
                                    (
                                        1 -
                                        resolve
                                    ),

                                transform: `
                                    translate3d(
                                        -50%,
                                        -50%,
                                        ${80 -
                                    ring *
                                    30
                                    }px
                                    )
                                `,
                            }}
                        />
                    );
                },
            )}

            {/*
             * =================================================
             * PROMOTION FIELD
             * =================================================
             */}

            <div
                className="
                    absolute
                    inset-x-[8%]
                    top-1/2
                    h-px
                    bg-white/[0.08]
                "
                style={{
                    opacity:
                        resolve *
                        (
                            1 -
                            exit
                        ),

                    transform: `
                        scaleX(
                            ${resolve}
                        )
                    `,

                    transformOrigin:
                        "center",
                }}
            />

            <div
                className="
                    absolute
                    bottom-[17%]
                    left-1/2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-secondary/70
                "
                style={{
                    opacity:
                        resolve *
                        (
                            1 -
                            exit
                        ),

                    filter:
                        `blur(${lerp(
                            5,
                            0,
                            resolve,
                        )
                        }px)`,

                    transform: `
                        translate3d(
                            -50%,
                            ${lerp(
                        14,
                        0,
                        resolve,
                    )
                        }px,
                            80px
                        )
                    `,
                }}
            >
                Reach / Performance
            </div>
        </div>
    );
}