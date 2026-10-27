"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface EdgeContentProps {
    service:
    ServiceExperienceDefinition;

    progress:
    number;
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

export function EdgeContent({
    service,
    progress,
}: EdgeContentProps) {
    /*
     * Environment gets a moment to open
     * before typography arrives.
     */

    const indexProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.18,
                0.31,
            ),
        );

    const titleProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.24,
                0.4,
            ),
        );

    const metaphorProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.32,
                0.46,
            ),
        );

    const descriptionProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.4,
                0.56,
            ),
        );

    const servicesProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.5,
                0.74,
            ),
        );

    return (
        <div
            className="
                absolute
                inset-0
                z-20
                flex
                items-center
                px-8
                md:px-12
                xl:px-16
            "
        >
            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[1320px]
                "
            >
                {/*
                 * =================================================
                 * TOP INDEX
                 * =================================================
                 */}

                <div
                    className="
                        mb-6
                        flex
                        items-center
                        gap-4
                        text-[10px]
                        uppercase
                        tracking-[0.34em]
                        text-secondary
                    "
                    style={{
                        opacity:
                            indexProgress,

                        transform: `
                            translate3d(
                                0,
                                ${lerp(
                            16,
                            0,
                            indexProgress,
                        )
                            }px,
                                0
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
                            w-8
                            bg-secondary/40
                        "
                    />

                    <span>
                        {service.title}
                    </span>
                </div>

                {/*
                 * =================================================
                 * HERO TITLE
                 * =================================================
                 *
                 * Edge gets more visual authority because
                 * it is the final service.
                 */}

                <h2
                    className="
                        text-[clamp(5rem,11vw,11rem)]
                        font-bold
                        uppercase
                        leading-[0.76]
                        tracking-[-0.065em]
                        text-white
                    "
                    style={{
                        opacity:
                            titleProgress,

                        filter:
                            `blur(${lerp(
                                10,
                                0,
                                titleProgress,
                            )
                            }px)`,

                        transform: `
                            translate3d(
                                ${lerp(
                            -50,
                            0,
                            titleProgress,
                        )
                            }px,
                                ${lerp(
                                38,
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
                                0.82,
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
                 * =================================================
                 * METAPHOR
                 * =================================================
                 */}

                <div
                    className="
                        mt-7
                        flex
                        items-center
                        gap-5
                    "
                    style={{
                        opacity:
                            metaphorProgress,

                        transform: `
                            translateX(
                                ${lerp(
                            -20,
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
                            tracking-[0.34em]
                            text-secondary
                        "
                    >
                        {service.metaphor}
                    </span>

                    <span
                        className="
                            h-px
                            w-24
                            bg-secondary/25
                        "
                    />
                </div>

                {/*
                 * =================================================
                 * LOWER CONTENT
                 * =================================================
                 */}

                <div
                    className="
                        mt-10
                        grid
                        grid-cols-12
                        gap-x-8
                    "
                >
                    {/*
                     * DESCRIPTION
                     */}

                    <div
                        className="
                            col-span-12
                            lg:col-span-5
                        "
                    >
                        <p
                            className="
                                max-w-[500px]
                                text-[15px]
                                leading-[1.9]
                                text-white/65
                                xl:text-base
                            "
                            style={{
                                opacity:
                                    descriptionProgress,

                                transform: `
                                    translate3d(
                                        0,
                                        ${lerp(
                                    22,
                                    0,
                                    descriptionProgress,
                                )
                                    }px,
                                        0
                                    )
                                `,
                            }}
                        >
                            {
                                service.description
                            }
                        </p>
                    </div>

                    {/*
                     * SERVICES
                     */}

                    <div
                        className="
                            col-span-12
                            mt-10
                            lg:col-span-6
                            lg:col-start-7
                            lg:mt-0
                        "
                        style={{
                            opacity:
                                servicesProgress,
                        }}
                    >
                        <div
                            className="
                                mb-4
                                text-[9px]
                                uppercase
                                tracking-[0.32em]
                                text-white/30
                            "
                        >
                            Services
                        </div>

                        <div
                            className="
                                grid
                                gap-x-8
                                md:grid-cols-2
                            "
                        >
                            {service.services.map(
                                (
                                    item:
                                        string,
                                    index:
                                        number,
                                ) => {
                                    const count =
                                        service
                                            .services
                                            .length;

                                    const stagger =
                                        count > 1
                                            ? index /
                                            (
                                                count -
                                                1
                                            )
                                            : 0;

                                    const itemProgress =
                                        smootherstep(
                                            rangeProgress(
                                                servicesProgress,

                                                stagger *
                                                0.35,

                                                Math.min(
                                                    stagger *
                                                    0.35 +
                                                    0.65,
                                                    1,
                                                ),
                                            ),
                                        );

                                    return (
                                        <div
                                            key={
                                                item
                                            }
                                            className="
                                                flex
                                                min-h-[54px]
                                                items-center
                                                gap-4
                                                border-b
                                                border-white/[0.07]
                                            "
                                            style={{
                                                opacity:
                                                    itemProgress,

                                                transform: `
                                                    translate3d(
                                                        0,
                                                        ${lerp(
                                                    18,
                                                    0,
                                                    itemProgress,
                                                )
                                                    }px,
                                                        ${lerp(
                                                        -50,
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
                                                    text-[9px]
                                                    tabular-nums
                                                    tracking-[0.15em]
                                                    text-secondary/55
                                                "
                                            >
                                                {String(
                                                    index +
                                                    1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>

                                            <span
                                                className="
                                                    text-[13px]
                                                    leading-5
                                                    text-white/70
                                                "
                                            >
                                                {
                                                    item
                                                }
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>

                {/*
                 * =================================================
                 * FINAL HORIZON
                 * =================================================
                 */}

                <div
                    className="
                        mt-10
                        h-px
                        w-full
                        bg-white/[0.06]
                    "
                    style={{
                        opacity:
                            servicesProgress,

                        transform: `
                            scaleX(
                                ${servicesProgress}
                            )
                        `,

                        transformOrigin:
                            "left",
                    }}
                />
            </div>
        </div>
    );
}