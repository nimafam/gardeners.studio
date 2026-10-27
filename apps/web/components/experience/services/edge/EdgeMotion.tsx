"use client";

interface EdgeMotionProps {
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

const DEPTH_MARKERS = [
    {
        x: 18,
        y: 29,
        z: -180,
    },
    {
        x: 31,
        y: 68,
        z: -80,
    },
    {
        x: 67,
        y: 26,
        z: 40,
    },
    {
        x: 79,
        y: 61,
        z: 130,
    },
    {
        x: 88,
        y: 38,
        z: -40,
    },
] as const;

export function EdgeMotion({
    progress,
}: EdgeMotionProps) {
    const p =
        clamp01(progress);

    /*
     * ========================================================
     * TIMELINE
     * ========================================================
     *
     * 0.00 → 0.24
     * Receive breakthrough.
     *
     * 0.08 → 0.42
     * Threshold separates.
     *
     * 0.20 → 0.56
     * Depth opens.
     *
     * 0.38 → 0.68
     * New horizon resolves.
     *
     * 0.60 → 0.78
     * Environment settles.
     *
     * 0.78 → 1.00
     * Hold.
     */

    const receive =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.24,
            ),
        );

    const separate =
        smootherstep(
            rangeProgress(
                p,
                0.08,
                0.42,
            ),
        );

    const depth =
        smootherstep(
            rangeProgress(
                p,
                0.2,
                0.56,
            ),
        );

    const horizon =
        smootherstep(
            rangeProgress(
                p,
                0.38,
                0.68,
            ),
        );

    const settle =
        smootherstep(
            rangeProgress(
                p,
                0.6,
                0.78,
            ),
        );

    /*
     * Threshold starts in the center
     * and opens horizontally.
     */

    const thresholdGap =
        lerp(
            0,
            28,
            separate,
        );

    /*
     * Subtle camera-like push.
     */

    const worldZ =
        lerp(
            -260,
            0,
            depth,
        );

    const worldScale =
        lerp(
            0.82,
            1,
            depth,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                [perspective:1600px]
                [transform-style:preserve-3d]
            "
        >
            {/*
             * =================================================
             * BREAKTHROUGH FLASH
             * =================================================
             *
             * Very short residue from PromotionToEdge.
             */}

            <div
                className="
                    absolute
                    inset-y-0
                    left-1/2
                    bg-white/[0.035]
                    blur-2xl
                "
                style={{
                    width:
                        `${lerp(
                            12,
                            2,
                            receive,
                        )}vw`,

                    opacity:
                        (1 - receive) *
                        0.9,

                    transform:
                        "translateX(-50%)",
                }}
            />

            {/*
             * =================================================
             * THRESHOLD LEFT
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[13%]
                    top-[13%]
                    w-px
                    bg-white/[0.12]
                "
                style={{
                    left:
                        `calc(
                            50% -
                            ${thresholdGap}vw
                        )`,

                    opacity:
                        (1 - settle) *
                        0.65 +
                        0.12,

                    transform: `
                        translate3d(
                            0,
                            0,
                            ${lerp(
                        100,
                        -100,
                        depth,
                    )
                        }px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * THRESHOLD RIGHT
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[13%]
                    top-[13%]
                    w-px
                    bg-secondary/25
                "
                style={{
                    left:
                        `calc(
                            50% +
                            ${thresholdGap}vw
                        )`,

                    opacity:
                        (1 - settle) *
                        0.8 +
                        0.16,

                    transform: `
                        translate3d(
                            0,
                            0,
                            ${lerp(
                        100,
                        120,
                        depth,
                    )
                        }px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * OPEN WORLD
             * =================================================
             */}

            <div
                className="
                    absolute
                    inset-[7%]
                    [transform-style:preserve-3d]
                "
                style={{
                    opacity:
                        depth,

                    transform: `
                        translate3d(
                            0,
                            0,
                            ${worldZ}px
                        )
                        scale(
                            ${worldScale}
                        )
                    `,
                }}
            >
                {/*
                 * =============================================
                 * NEW HORIZON
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        left-[4%]
                        right-[4%]
                        top-[52%]
                        h-px
                        bg-white/[0.07]
                    "
                    style={{
                        opacity:
                            horizon,

                        transform: `
                            scaleX(
                                ${horizon}
                            )
                        `,

                        transformOrigin:
                            "center",
                    }}
                />

                {/*
                 * Accent horizon
                 */}

                <div
                    className="
                        absolute
                        left-[4%]
                        top-[52%]
                        h-px
                        bg-secondary/35
                    "
                    style={{
                        width:
                            `${lerp(
                                0,
                                16,
                                horizon,
                            )}%`,

                        opacity:
                            horizon,
                    }}
                />

                {/*
                 * =============================================
                 * DEPTH MARKERS
                 * =============================================
                 */}

                {DEPTH_MARKERS.map(
                    (
                        marker,
                        index,
                    ) => {
                        const markerProgress =
                            smootherstep(
                                rangeProgress(
                                    depth,
                                    index *
                                    0.06,
                                    0.56 +
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
                                    size-1.5
                                    rounded-full
                                    border
                                    border-secondary/50
                                    bg-primary
                                "
                                style={{
                                    left:
                                        `${marker.x}%`,

                                    top:
                                        `${marker.y}%`,

                                    opacity:
                                        markerProgress *
                                        (
                                            1 -
                                            settle *
                                            0.4
                                        ),

                                    transform: `
                                        translate3d(
                                            -50%,
                                            -50%,
                                            ${marker.z}px
                                        )
                                        scale(
                                            ${lerp(
                                        0.4,
                                        1,
                                        markerProgress,
                                    )
                                        }
                                        )
                                    `,
                                }}
                            />
                        );
                    },
                )}

                {/*
                 * =============================================
                 * DEPTH GUIDES
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[8%]
                        left-[22%]
                        top-[8%]
                        w-px
                        bg-white/[0.035]
                    "
                    style={{
                        opacity:
                            depth *
                            (
                                1 -
                                settle *
                                0.5
                            ),

                        transform: `
                            translateZ(-120px)
                        `,
                    }}
                />

                <div
                    className="
                        absolute
                        bottom-[18%]
                        right-[18%]
                        top-[18%]
                        w-px
                        bg-secondary/[0.08]
                    "
                    style={{
                        opacity:
                            depth *
                            (
                                1 -
                                settle *
                                0.5
                            ),

                        transform: `
                            translateZ(90px)
                        `,
                    }}
                />
            </div>

            {/*
             * =================================================
             * AMBIENT OPEN FIELD
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[65vh]
                    w-[80vw]
                    rounded-full
                    bg-secondary/[0.018]
                    blur-[120px]
                "
                style={{
                    opacity:
                        settle,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            -220px
                        )
                        scale(
                            ${lerp(
                        0.75,
                        1,
                        settle,
                    )
                        }
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * ENVIRONMENT LABEL
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[10%]
                    right-[8%]
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.32em]
                    text-secondary/45
                "
                style={{
                    opacity:
                        horizon *
                        (
                            1 -
                            settle *
                            0.3
                        ),
                }}
            >
                Beyond / The Edge
            </div>
        </div>
    );
}