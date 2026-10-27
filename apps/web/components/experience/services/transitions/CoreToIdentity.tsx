"use client";

interface CoreToIdentityProps {
    progress: number;
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
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

function rangeProgress(
    value: number,
    start: number,
    end: number,
) {
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
) {
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

/*
 * ============================================================
 * CORE → IDENTITY
 * ============================================================
 *
 * Visual handoff:
 *
 * 0.00
 * Core is still dominant.
 *
 * 0.00 → 0.30
 * Foundation point separates from Core.
 *
 * 0.20 → 0.60
 * Structural line becomes horizontal signal.
 *
 * 0.45 → 0.85
 * Signal gains resonance / waveform.
 *
 * 0.75 → 1.00
 * Identity-ready signal remains.
 */

export function CoreToIdentity({
    progress,
}: CoreToIdentityProps) {
    const p =
        clamp01(
            progress,
        );

    const handoffExit =
        smootherstep(
            rangeProgress(
                p,
                0.92,
                1,
            ),
        );

    const handoffOpacity =
        1 - handoffExit;
    /*
     * ========================================================
     * PHASES
     * ========================================================
     */

    const release =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.32,
            ),
        );

    const travel =
        smootherstep(
            rangeProgress(
                p,
                0.16,
                0.62,
            ),
        );

    const signal =
        smootherstep(
            rangeProgress(
                p,
                0.1,
                0.64,
            ),
        );

    const resonance =
        smootherstep(
            rangeProgress(
                p,
                0.28,
                0.82,
            ),
        );

    /*
     * ========================================================
     * PRIMARY POINT
     * ========================================================
     *
     * Starts close to the Core foundation axis
     * and travels toward the center.
     */

    const pointX =
        lerp(
            4,
            50,
            travel,
        );

    const pointScale =
        lerp(
            1,
            0.72,
            signal,
        );

    /*
     * ========================================================
     * SIGNAL LINE
     * ========================================================
     */

    const signalWidth =
        lerp(
            0,
            50,
            signal,
        );

    const signalOpacity =
        signal;

    /*
     * ========================================================
     * DEPTH / FOCUS
     * ========================================================
     */

    const depth =
        lerp(
            60,
            180,
            travel,
        );

    const blur =
        lerp(
            2.5,
            0,
            release,
        );

    return (
        <div
            className="
            pointer-events-none
            absolute
            inset-0
            z-30
            overflow-hidden
            [transform-style:preserve-3d]
        "
            style={{
                opacity:
                    handoffOpacity,

                filter:
                    `blur(${lerp(
                        0,
                        4,
                        handoffExit,
                    )
                    }px)`,

                transform: `
                scale(
                    ${lerp(
                    1,
                    1.025,
                    handoffExit,
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
             * PRIMARY HANDOFF POINT
             * =================================================
             */}

            <div
                className="
                    absolute
                    top-1/2
                    size-4
                    rounded-full
                    bg-secondary
                    shadow-[0_0_44px_rgba(187,152,125,0.7)]
                "
                style={{
                    left:
                        `${pointX}%`,

                    opacity:
                        release,

                    filter:
                        `blur(${blur}px)`,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth}px
                        )
                        scale(
                            ${pointScale}
                        )
                    `,

                    willChange:
                        "left, transform, filter, opacity",
                }}
            />

            {/*
             * =================================================
             * STRUCTURE → SIGNAL
             * =================================================
             *
             * Horizontal line grows from the moving point.
             */}

            <div
                className="
                    absolute
                    top-1/2
                    h-px
                    bg-secondary/80
                "
                style={{
                    left:
                        `${pointX}%`,

                    width:
                        `${signalWidth}vw`,

                    opacity:
                        signalOpacity,

                    transform: `
                        translate3d(
                            0,
                            -50%,
                            ${depth - 20}px
                        )
                    `,

                    transformOrigin:
                        "left center",

                    willChange:
                        "left, width, opacity, transform",
                }}
            />

            {/*
             * =================================================
             * SIGNAL TERMINAL
             * =================================================
             */}

            <div
                className="
                    absolute
                    top-1/2
                    size-1.5
                    rounded-full
                    bg-white/70
                "
                style={{
                    left:
                        `calc(
                            ${pointX}% +
                            ${signalWidth}vw
                        )`,

                    opacity:
                        signal,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth}px
                        )
                        scale(
                            ${signal}
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * RESONANCE FIELD
             * =================================================
             *
             * These are NOT decorative circles.
             *
             * They represent the structural point beginning
             * to behave like a voice / signal source.
             */}

            <div
                className="
                    absolute
                    top-1/2
                    rounded-full
                    border
                    border-secondary/25
                "
                style={{
                    left:
                        `${pointX}%`,

                    width:
                        `${lerp(
                            12,
                            110,
                            resonance,
                        )}px`,

                    height:
                        `${lerp(
                            12,
                            110,
                            resonance,
                        )}px`,

                    opacity:
                        resonance *
                        0.65,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth - 60}px
                        )
                    `,
                }}
            />

            <div
                className="
                    absolute
                    top-1/2
                    rounded-full
                    border
                    border-white/10
                "
                style={{
                    left:
                        `${pointX}%`,

                    width:
                        `${lerp(
                            8,
                            180,
                            resonance,
                        )}px`,

                    height:
                        `${lerp(
                            8,
                            180,
                            resonance,
                        )}px`,

                    opacity:
                        resonance *
                        0.4,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            ${depth - 100}px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * FIRST VOICE PULSE
             * =================================================
             *
             * Very small waveform preview.
             *
             * IdentityExperience will take ownership of this
             * language after the handoff.
             */}

            <div
                className="
                    absolute
                    top-1/2
                    flex
                    h-14
                    items-center
                    gap-[5px]
                "
                style={{
                    left:
                        `calc(
                            ${pointX}% +
                            4vw
                        )`,

                    opacity:
                        resonance,

                    transform: `
                        translate3d(
                            0,
                            -50%,
                            ${depth + 20}px
                        )
                    `,
                }}
            >
                {[
                    8,
                    18,
                    30,
                    44,
                    26,
                    52,
                    34,
                    20,
                    10,
                ].map(
                    (
                        height,
                        index,
                    ) => {
                        const barProgress =
                            smootherstep(
                                rangeProgress(
                                    resonance,
                                    index *
                                    0.045,
                                    0.48 +
                                    index *
                                    0.045,
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
                                        barProgress,

                                    transform: `
                                        scaleY(
                                            ${barProgress}
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
             * VOICE ANNOTATION
             * =================================================
             */}

            <div
                className="
                    absolute
                    top-[calc(50%+64px)]
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-secondary/70
                "
                style={{
                    left:
                        `calc(
                            ${pointX}% +
                            4vw
                        )`,

                    opacity:
                        resonance,

                    filter:
                        `blur(${lerp(
                            3,
                            0,
                            resonance,
                        )
                        }px)`,

                    transform: `
                        translate3d(
                            0,
                            ${lerp(
                        10,
                        0,
                        resonance,
                    )
                        }px,
                            ${depth}px
                        )
                    `,
                }}
            >
                Signal / Voice
            </div>
        </div>
    );
}
