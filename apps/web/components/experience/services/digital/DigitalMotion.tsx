"use client";

interface DigitalMotionProps {
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

export function DigitalMotion({
    progress,
}: DigitalMotionProps) {
    const p =
        clamp01(progress);

    /*
     * ========================================================
     * TIMELINE
     * ========================================================
     */

    const establish =
        smootherstep(
            rangeProgress(
                p,
                0,
                0.24,
            ),
        );

    const open =
        smootherstep(
            rangeProgress(
                p,
                0.08,
                0.38,
            ),
        );

    const depth =
        smootherstep(
            rangeProgress(
                p,
                0.18,
                0.5,
            ),
        );

    const settle =
        smootherstep(
            rangeProgress(
                p,
                0.38,
                0.64,
            ),
        );

    /*
     * ========================================================
     * CAMERA-LIKE STAGE MOTION
     * ========================================================
     */

    const stageZ =
        lerp(
            -520,
            0,
            establish,
        );

    const stageScale =
        lerp(
            0.64,
            1,
            establish,
        );

    const stageRotateX =
        lerp(
            48,
            0,
            open,
        );

    const stageWidth =
        lerp(
            42,
            88,
            open,
        );

    const stageHeight =
        lerp(
            26,
            72,
            open,
        );

    /*
     * Rack focus.
     */

    const blur =
        lerp(
            7,
            0,
            establish,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
                [perspective:1500px]
                [transform-style:preserve-3d]
            "
        >
            {/*
             * =================================================
             * AMBIENT STAGE FIELD
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[65vh]
                    w-[70vw]
                    rounded-full
                    bg-white/[0.018]
                    blur-[100px]
                "
                style={{
                    opacity:
                        settle * 0.8,

                    transform: `
                        translate3d(
                            -50%,
                            -50%,
                            -180px
                        )
                    `,
                }}
            />

            {/*
             * =================================================
             * PRIMARY STAGE
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    border
                    border-white/[0.10]
                    bg-white/[0.008]
                    [transform-style:preserve-3d]
                "
                style={{
                    width:
                        `${stageWidth}vw`,

                    height:
                        `${stageHeight}vh`,

                    opacity:
                        open,

                    filter:
                        `blur(${blur}px)`,

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
                        "width, height, transform, opacity, filter",
                }}
            >
                {/*
                 * =============================================
                 * STAGE HORIZON
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        left-[7%]
                        right-[7%]
                        top-1/2
                        h-px
                        bg-white/[0.08]
                    "
                    style={{
                        opacity:
                            depth,
                    }}
                />

                {/*
                 * =============================================
                 * LEFT DEPTH PLANE
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[12%]
                        left-[10%]
                        top-[12%]
                        w-px
                        bg-secondary/20
                    "
                    style={{
                        opacity:
                            depth,

                        transform: `
                            translateZ(-80px)
                            scaleY(
                                ${depth}
                            )
                        `,

                        transformOrigin:
                            "center",
                    }}
                />

                {/*
                 * =============================================
                 * RIGHT DEPTH PLANE
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[18%]
                        right-[12%]
                        top-[18%]
                        w-px
                        bg-white/[0.08]
                    "
                    style={{
                        opacity:
                            depth,

                        transform: `
                            translateZ(70px)
                            scaleY(
                                ${depth}
                            )
                        `,

                        transformOrigin:
                            "center",
                    }}
                />

                {/*
                 * =============================================
                 * STAGE MARKERS
                 * =============================================
                 */}

                {[
                    {
                        left: 10,
                        top: 26,
                        z: -80,
                    },
                    {
                        left: 34,
                        top: 50,
                        z: 20,
                    },
                    {
                        left: 68,
                        top: 32,
                        z: 80,
                    },
                    {
                        left: 86,
                        top: 68,
                        z: -30,
                    },
                ].map(
                    (
                        marker,
                        index,
                    ) => {
                        const markerProgress =
                            smootherstep(
                                rangeProgress(
                                    p,
                                    0.24 +
                                    index *
                                    0.045,
                                    0.46 +
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
                                    absolute
                                    size-1.5
                                    rounded-full
                                    bg-secondary/70
                                "
                                style={{
                                    left:
                                        `${marker.left}%`,

                                    top:
                                        `${marker.top}%`,

                                    opacity:
                                        markerProgress,

                                    transform: `
                                        translate3d(
                                            -50%,
                                            -50%,
                                            ${marker.z}px
                                        )
                                        scale(
                                            ${markerProgress}
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
             * STAGE LABEL
             * =================================================
             */}

            <div
                className="
                    absolute
                    bottom-[11%]
                    right-[8%]
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-secondary/55
                "
                style={{
                    opacity:
                        settle,

                    transform: `
                        translate3d(
                            0,
                            ${lerp(
                        10,
                        0,
                        settle,
                    )
                        }px,
                            50px
                        )
                    `,
                }}
            >
                Digital / The Stage
            </div>
        </div>
    );
}