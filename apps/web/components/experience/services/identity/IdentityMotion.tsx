"use client";

interface IdentityMotionProps {
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

function smoothstep(
    value: number,
): number {
    const t =
        clamp01(value);

    return (
        t *
        t *
        (3 - 2 * t)
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

const SIGNAL_BARS = [
    10,
    18,
    28,
    42,
    26,
    54,
    34,
    46,
    22,
    38,
    16,
    30,
    12,
];

export function IdentityMotion({
    progress,
}: IdentityMotionProps) {
    const p =
        clamp01(progress);

    /*
     * 0.00 → 0.20
     * Receive handoff
     */

    const receive =
        smoothstep(
            rangeProgress(
                p,
                0,
                0.2,
            ),
        );

    /*
     * 0.10 → 0.38
     * Signal expands
     */

    const expand =
        smoothstep(
            rangeProgress(
                p,
                0.1,
                0.38,
            ),
        );

    /*
     * 0.22 → 0.52
     * Resonance field appears
     */

    const resonance =
        smoothstep(
            rangeProgress(
                p,
                0.22,
                0.52,
            ),
        );

    /*
     * 0.45 → 1
     * Background settles.
     */

    const settle =
        smoothstep(
            rangeProgress(
                p,
                0.45,
                0.72,
            ),
        );

    const lineWidth =
        lerp(
            16,
            56,
            expand,
        );

    const fieldScale =
        lerp(
            0.72,
            1,
            resonance,
        );

    const depth =
        lerp(
            140,
            20,
            settle,
        );

    const signalExit =
        smoothstep(
            rangeProgress(
                p,
                0.34,
                0.52,
            ),
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                [transform-style:preserve-3d]
            "
        >
            {/*
             * =================================================
             * ORIGIN
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
                    shadow-[0_0_28px_rgba(187,152,125,0.30)]
                "
                style={{
                    opacity:
                        1 -
                        settle * 0.55,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth}px
                        )
                        scale(
                            ${lerp(
                        0.7,
                        1,
                        receive,
                    )
                        }
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * PRIMARY SIGNAL
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-px
                    bg-secondary/55
                "
                style={{
                    width:
                        `${lineWidth}vw`,

                    opacity:
                        (
                            0.35 +
                            receive * 0.65
                        ) *
                        (
                            1 -
                            signalExit
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth - 20}px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * SIGNAL BARS
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-24
                    items-center
                    gap-[8px]
                "
                style={{
                    opacity:
                        resonance *
                        (
                            1 -
                            signalExit
                        ),

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth + 20}px
                        )
                        scale(
                            ${fieldScale}
                        )
                    `,
                }}
            >
                {SIGNAL_BARS.map(
                    (
                        height,
                        index,
                    ) => {
                        const bar =
                            smoothstep(
                                rangeProgress(
                                    resonance,
                                    index *
                                    0.025,
                                    0.45 +
                                    index *
                                    0.025,
                                ),
                            );

                        return (
                            <span
                                key={
                                    index
                                }
                                className="
                                    block
                                    w-px
                                    bg-white/55
                                "
                                style={{
                                    height:
                                        `${height}px`,

                                    opacity:
                                        bar,

                                    transform: `
                                        scaleY(
                                            ${bar}
                                        )
                                    `,

                                    transformOrigin:
                                        "center",
                                }}
                            />
                        );
                    },
                )}
            </div>

            {/*
             * =================================================
             * RESONANCE RINGS
             * =================================================
             */}

            {[1, 2, 3].map(
                (ring) => {
                    const ringProgress =
                        smoothstep(
                            rangeProgress(
                                resonance,
                                (
                                    ring -
                                    1
                                ) *
                                0.12,
                                1,
                            ),
                        );

                    const size =
                        lerp(
                            80 +
                            ring *
                            30,
                            280 +
                            ring *
                            100,
                            ringProgress,
                        );

                    const resonanceExit =
                        smoothstep(
                            rangeProgress(
                                p,
                                0.46,
                                0.68,
                            ),
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
                                border-white/10
                            "
                            style={{
                                width:
                                    `${size}px`,

                                height:
                                    `${size}px`,

                                opacity:
                                    ringProgress *
                                    0.28 *
                                    (
                                        1 -
                                        resonanceExit
                                    ),

                                transform: `
                                    translate3d(
                                        -50%,
                                        -50%,
                                        ${depth -
                                    ring *
                                    40
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
             * AMBIENT FIELD
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[55vh]
                    w-[55vw]
                    rounded-full
                    bg-white/[0.025]
                    blur-3xl
                "
                style={{
                    opacity:
                        settle * 0.8,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            -100px
                        )
                        scale(
                            ${lerp(
                        0.7,
                        1,
                        settle,
                    )
                        }
                        )
                    `,
                }}
            />
        </div>
    );
}