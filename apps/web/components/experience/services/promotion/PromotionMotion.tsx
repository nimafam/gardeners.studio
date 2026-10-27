"use client";

interface PromotionMotionProps {
    progress: number;
}

function clamp01(
    value: number,
) {
    return Math.min(
        Math.max(value, 0),
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

const CHANNELS = [
    {
        y: 24,
        delay: 0,
    },
    {
        y: 37,
        delay: 0.05,
    },
    {
        y: 50,
        delay: 0.1,
    },
    {
        y: 63,
        delay: 0.15,
    },
    {
        y: 76,
        delay: 0.2,
    },
] as const;

export function PromotionMotion({
    progress,
}: PromotionMotionProps) {
    const p =
        clamp01(progress);

    const establish =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.26,
            ),
        );

    const distribute =
        smootherstep(
            rangeProgress(
                p,
                0.12,
                0.48,
            ),
        );

    const performance =
        smootherstep(
            rangeProgress(
                p,
                0.28,
                0.6,
            ),
        );

    const settle =
        smootherstep(
            rangeProgress(
                p,
                0.48,
                0.72,
            ),
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                [perspective:1400px]
            "
        >
            {/*
             * Ambient reach field
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[55vh]
                    w-[70vw]
                    rounded-full
                    bg-secondary/[0.025]
                    blur-[100px]
                "
                style={{
                    opacity:
                        settle,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            -120px
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

            {/*
             * Distribution channels
             */}

            {CHANNELS.map(
                (
                    channel,
                    index,
                ) => {
                    const channelProgress =
                        smootherstep(
                            rangeProgress(
                                distribute,
                                channel.delay,
                                0.65 +
                                channel.delay,
                            ),
                        );

                    return (
                        <div
                            key={
                                index
                            }
                            className="
                                absolute
                                left-[48%]
                                h-px
                                bg-white/[0.08]
                            "
                            style={{
                                top:
                                    `${channel.y}%`,

                                width:
                                    `${channelProgress *
                                    45
                                    }vw`,

                                opacity:
                                    channelProgress *
                                    (
                                        1 -
                                        settle *
                                        0.45
                                    ),

                                transform: `
                                    translate3d(
                                        0,
                                        0,
                                        ${index *
                                    22 -
                                    44
                                    }px
                                    )
                                `,
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
                                    bg-secondary/70
                                "
                            />
                        </div>
                    );
                },
            )}

            {/*
             * Performance axis
             */}

            <div
                className="
                    absolute
                    bottom-[15%]
                    right-[8%]
                    top-[15%]
                    w-px
                    bg-white/[0.07]
                "
                style={{
                    opacity:
                        performance,
                }}
            />

            {/*
             * Performance markers
             */}

            {[0, 1, 2, 3].map(
                (index) => {
                    const marker =
                        smootherstep(
                            rangeProgress(
                                performance,
                                index *
                                0.08,
                                0.6 +
                                index *
                                0.08,
                            ),
                        );

                    return (
                        <span
                            key={
                                index
                            }
                            className="
                                absolute
                                right-[calc(8%-3px)]
                                size-1.5
                                rounded-full
                                bg-secondary
                            "
                            style={{
                                top:
                                    `${27 +
                                    index *
                                    15
                                    }%`,

                                opacity:
                                    marker,

                                transform: `
                                    scale(
                                        ${marker}
                                    )
                                `,
                            }}
                        />
                    );
                },
            )}

            <div
                className="
                    absolute
                    right-[8%]
                    top-[11%]
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/25
                "
                style={{
                    opacity:
                        establish,
                }}
            >
                Reach / Performance
            </div>
        </div>
    );
}