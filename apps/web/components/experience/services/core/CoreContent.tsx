"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface CoreContentProps {
    service: ServiceExperienceDefinition;
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

export function CoreContent({
    service,
    progress,
}: CoreContentProps) {
    /*
     * ========================================================
     * CONTENT TIMELINE
     * ========================================================
     */

    const eyebrowProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.20,
                0.32,
            ),
        );

    const titleProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.23,
                0.37,
            ),
        );

    const metaphorProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.29,
                0.42,
            ),
        );

    const descriptionProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.35,
                0.50,
            ),
        );

    const servicesProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.41,
                0.61,
            ),
        );

    /*
     * Longer visual hold.
     *
     * Actual service duration will also
     * be increased in Services timing.
     */

    const exitProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.90,
                1,
            ),
        );

    const contentX =
        lerp(
            0,
            60,
            exitProgress,
        );

    const contentZ =
        lerp(
            110,
            40,
            exitProgress,
        );

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                z-20
                flex
                items-center
                [transform-style:preserve-3d]
            "
            style={{
                opacity:
                    1 -
                    exitProgress,

                transform: `
                    translate3d(
                        ${contentX}px,
                        3vh,
                        ${contentZ}px
                    )
                `,
            }}
        >
            <div
                className="
                    mx-auto
                    grid
                    w-full
                    max-w-[1320px]
                    grid-cols-12
                    gap-x-8
                    px-8
                    md:px-12
                    xl:px-16
                "
            >
                {/*
                 * =================================================
                 * LEFT / IDENTITY
                 * =================================================
                 */}

                <div
                    className="
                        col-span-12
                        lg:col-span-5
                        lg:col-start-2
                    "
                >
                    {/*
                     * 01 — CORE
                     */}

                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            gap-3
                            text-[14px]
                            uppercase
                            tracking-[0.32em]
                            text-secondary
                        "
                        style={{
                            opacity:
                                eyebrowProgress,

                            filter:
                                `blur(${lerp(
                                    5,
                                    0,
                                    eyebrowProgress,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                14,
                                0,
                                eyebrowProgress,
                            )
                                }px,
                                    ${lerp(
                                    -70,
                                    0,
                                    eyebrowProgress,
                                )
                                }px
                                )
                            `,
                        }}
                    >
                        <span>
                            {service.number}
                        </span>

                        <span
                            className="
                                h-px
                                w-7
                                bg-secondary/45
                            "
                        />

                        <span>
                            {service.title}
                        </span>
                    </div>

                    {/*
                     * CORE
                     */}

                    <h2
                        className="
                            text-[clamp(4.5rem,7.2vw,7.4rem)]
                            font-medium
                            uppercase
                            leading-[0.82]
                            tracking-[-0.055em]
                            text-white
                        "
                        style={{
                            opacity:
                                titleProgress,

                            filter:
                                `blur(${lerp(
                                    9,
                                    0,
                                    titleProgress,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                55,
                                0,
                                titleProgress,
                            )
                                }px,
                                    ${lerp(
                                    -220,
                                    0,
                                    titleProgress,
                                )
                                }px
                                )
                                scale(
                                    ${lerp(
                                    0.86,
                                    1,
                                    titleProgress,
                                )
                                }
                                )
                            `,

                            transformOrigin:
                                "left center",
                        }}
                    >
                        {service.title}
                    </h2>

                    {/*
                     * THE SCORE
                     */}

                    <div
                        className="
                            mt-8
                            flex
                            items-center
                            gap-4
                        "
                        style={{
                            opacity:
                                metaphorProgress,

                            filter:
                                `blur(${lerp(
                                    5,
                                    0,
                                    metaphorProgress,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    ${lerp(
                                -18,
                                0,
                                metaphorProgress,
                            )
                                }px,
                                    0,
                                    ${lerp(
                                    -70,
                                    0,
                                    metaphorProgress,
                                )
                                }px
                                )
                            `,
                        }}
                    >
                        <span
                            className="
                                text-[12px]
                                uppercase
                                tracking-[0.36em]
                                text-secondary
                            "
                        >
                            {service.metaphor}
                        </span>

                        <span
                            className="
                                relative
                                h-px
                                w-20
                                bg-secondary/25
                            "
                            style={{
                                transform: `
                                    scaleX(
                                        ${metaphorProgress}
                                    )
                                `,

                                transformOrigin:
                                    "left",
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
                                    bg-white/65
                                "
                            />
                        </span>
                    </div>

                    {/*
                     * DESCRIPTION
                     */}

                    <div
                        className="
                            mt-8
                            max-w-[440px]
                        "
                        style={{
                            opacity:
                                descriptionProgress,

                            filter:
                                `blur(${lerp(
                                    5,
                                    0,
                                    descriptionProgress,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                20,
                                0,
                                descriptionProgress,
                            )
                                }px,
                                    ${lerp(
                                    -60,
                                    0,
                                    descriptionProgress,
                                )
                                }px
                                )
                            `,
                        }}
                    >
                        <p
                            className="
                                text-[15px]
                                leading-[1.85]
                                text-white/85
                                xl:text-base
                            "
                        >
                            {service.description}
                        </p>
                    </div>
                </div>

                {/*
                 * =================================================
                 * RIGHT / SERVICES
                 * =================================================
                 */}

                <div
                    className="
                        col-span-12
                        mt-12
                        lg:col-span-5
                        lg:col-start-7
                        lg:mt-14
                        lg:pl-10
                    "
                >

                    {service.services.map(
                        (
                            item: string,
                            index: number,
                        ) => {
                            const count =
                                service.services.length;

                            const stagger =
                                count > 1
                                    ? index /
                                    (count - 1)
                                    : 0;

                            const start =
                                stagger *
                                0.38;

                            const end =
                                Math.min(
                                    start +
                                    0.62,
                                    1,
                                );

                            const itemProgress =
                                smootherstep(
                                    rangeProgress(
                                        servicesProgress,
                                        start,
                                        end,
                                    ),
                                );

                            return (
                                <div
                                    key={item}
                                    className="
                                        grid
                                        min-h-[62px]
                                        grid-cols-[1fr_auto]
                                        items-center
                                        gap-8
                                        border-b
                                        border-white/[0.08]
                                    "
                                    style={{
                                        opacity:
                                            itemProgress,

                                        filter:
                                            `blur(${lerp(
                                                4,
                                                0,
                                                itemProgress,
                                            )
                                            }px)`,

                                        transform: `
                                            translate3d(
                                                ${lerp(
                                            26,
                                            0,
                                            itemProgress,
                                        )
                                            }px,
                                                0,
                                                ${lerp(
                                                -45,
                                                0,
                                                itemProgress,
                                            )
                                            }px
                                            )
                                        `,
                                    }}
                                >
                                    <span
                                        className="
                                            text-[14px]
                                            leading-6
                                            text-white/75
                                            xl:text-[15px]
                                        "
                                    >
                                        {item}
                                    </span>

                                    <span
                                        className="
                                            text-[12px]
                                            tabular-nums
                                            tracking-[0.16em]
                                            text-secondary
                                        "
                                    >
                                        {String(
                                            index + 1,
                                        ).padStart(
                                            2,
                                            "0",
                                        )}
                                    </span>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
}