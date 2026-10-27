"use client";

interface CoreMotionProps {
    progress: number;
}

function clamp01(value: number) {
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

function smootherstep(value: number) {
    const t = clamp01(value);

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
) {
    return (
        start +
        (end - start) *
        progress
    );
}

export function CoreMotion({
    progress,
}: CoreMotionProps) {
    /*
     * ========================================================
     * PHASES
     * ========================================================
     */

    const establish =
        smootherstep(
            rangeProgress(
                progress,
                0,
                0.25,
            ),
        );

    const structure =
        smootherstep(
            rangeProgress(
                progress,
                0.12,
                0.40,
            ),
        );

    const annotation =
        smootherstep(
            rangeProgress(
                progress,
                0.30,
                0.48,
            ),
        );

    const exit =
        smootherstep(
            rangeProgress(
                progress,
                0.90,
                1,
            ),
        );

    /*
     * ========================================================
     * DOLLY
     * ========================================================
     */

    const z =
        lerp(
            -720,
            0,
            establish,
        );

    const scale =
        lerp(
            0.52,
            1,
            establish,
        );

    const rotateY =
        lerp(
            -7,
            0,
            establish,
        );

    const rotateX =
        lerp(
            4,
            0,
            establish,
        );

    /*
     * ========================================================
     * RACK FOCUS
     * ========================================================
     */

    const focus =
        smootherstep(
            rangeProgress(
                progress,
                0,
                0.22,
            ),
        );

    const blurWindow =
        rangeProgress(
            progress,
            0.05,
            0.18,
        );

    const blurPeak =
        Math.sin(
            blurWindow *
            Math.PI,
        );

    const blur =
        Math.max(
            0,
            lerp(
                7,
                0,
                focus,
            ) +
            blurPeak * 1.6,
        );

    /*
     * ========================================================
     * EXIT
     * ========================================================
     */

    const exitX =
        lerp(
            0,
            -120,
            exit,
        );

    const exitZ =
        lerp(
            0,
            -140,
            exit,
        );

    const exitRotateY =
        lerp(
            0,
            -6,
            exit,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                z-0
                overflow-hidden
                [transform-style:preserve-3d]
            "
        >
            {/*
             * =================================================
             * AMBIENT DEPTH
             * =================================================
             */}

            <div
                className="
                    absolute
                    left-[32%]
                    top-[48%]
                    h-[440px]
                    w-[440px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-white/[0.012]
                    blur-[110px]
                "
                style={{
                    opacity:
                        structure *
                        (1 - exit),
                }}
            />

            {/*
             * =================================================
             * STRUCTURAL WORLD
             * =================================================
             */}

            <div
                className="
                    absolute
                    inset-0
                    [transform-style:preserve-3d]
                "
                style={{
                    opacity:
                        1 - exit,

                    filter:
                        `blur(${blur}px)`,

                    transform: `
                        translate3d(
                            ${exitX}px,
                            0,
                            ${z + exitZ}px
                        )
                        rotateX(
                            ${rotateX}deg
                        )
                        rotateY(
                            ${rotateY +
                        exitRotateY
                        }deg
                        )
                        scale(
                            ${scale}
                        )
                    `,

                    transformOrigin:
                        "50% 50%",

                    willChange:
                        "transform, filter, opacity",
                }}
            >
                {/*
                 * =============================================
                 * LEFT FOUNDATION AXIS
                 * =============================================
                 *
                 * خط عمودی سمت چپ.
                 *
                 * عمداً از لبه فاصله دارد و opacity آن
                 * پایین است تا تبدیل به border نشود.
                 */}

                <div
                    className="
                        absolute
                        bottom-[12%]
                        left-[3.6%]
                        top-[16%]
                        w-px
                        bg-white/[0.12]
                    "
                    style={{
                        opacity:
                            structure,

                        transform: `
                            translateZ(-35px)
                            scaleY(
                                ${structure}
                            )
                        `,

                        transformOrigin:
                            "center",
                    }}
                />

                {/*
                 * =============================================
                 * AXIS PRIMARY POINT
                 * =============================================
                 *
                 * همان نقطه Secondary روی خط.
                 */}

                <div
                    className="
                        absolute
                        left-[3.6%]
                        top-[48%]
                        size-2.5
                        rounded-full
                        bg-secondary
                        shadow-[0_0_18px_rgba(187,152,125,0.22)]
                    "
                    style={{
                        opacity:
                            structure,

                        transform: `
                            translate3d(
                                -50%,
                                -50%,
                                25px
                            )
                            scale(
                                ${lerp(
                            0.25,
                            1,
                            structure,
                        )
                            }
                            )
                        `,
                    }}
                />

                {/*
                 * =============================================
                 * SMALL UPPER DEPTH POINT
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        left-[3.6%]
                        top-[25%]
                        size-1
                        rounded-full
                        bg-white/35
                    "
                    style={{
                        opacity:
                            structure * 0.65,

                        transform: `
                            translate3d(
                                -50%,
                                -50%,
                                -70px
                            )
                        `,
                    }}
                />

                {/*
                 * =============================================
                 * FOUNDATION ANNOTATION
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[13%]
                        left-[4.7%]
                        flex
                        items-center
                        gap-4
                        whitespace-nowrap
                    "
                    style={{
                        opacity:
                            annotation *
                            (1 - exit),

                        filter:
                            `blur(${lerp(
                                3,
                                0,
                                annotation,
                            )
                            }px)`,

                        transform: `
                            translate3d(
                                ${lerp(
                            -12,
                            0,
                            annotation,
                        )
                            }px,
                                0,
                                -20px
                            )
                        `,
                    }}
                >
                    {/*
                     * Small leading marker
                     */}

                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-secondary
                        "
                    />

                    <span
                        className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.30em]
                            text-white/65
                        "
                    >
                        Foundation
                    </span>

                    {/*
                     * Separator
                     */}

                    <span
                        className="
                            h-px
                            w-5
                            bg-secondary/45
                        "
                    />

                    <span
                        className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.30em]
                            text-secondary/85
                        "
                    >
                        The Score
                    </span>
                </div>

                {/*
                 * =============================================
                 * FAR DEPTH POINT
                 * =============================================
                 */}

                <div
                    className="
                        absolute
                        bottom-[21%]
                        right-[12%]
                        size-1
                        rounded-full
                        bg-secondary/35
                    "
                    style={{
                        opacity:
                            structure * 0.40,

                        transform: `
                            translateZ(70px)
                        `,
                    }}
                />
            </div>
        </div>
    );
}