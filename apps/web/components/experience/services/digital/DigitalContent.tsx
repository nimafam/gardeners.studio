"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface DigitalContentProps {
    service:
    ServiceExperienceDefinition;

    progress:
    number;
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

export function DigitalContent({
    service,
    progress,
}: DigitalContentProps) {
    /*
     * Let the stage establish first.
     */

    const eyebrow =
        smootherstep(
            rangeProgress(
                progress,
                0.22,
                0.34,
            ),
        );

    const title =
        smootherstep(
            rangeProgress(
                progress,
                0.28,
                0.43,
            ),
        );

    const metaphor =
        smootherstep(
            rangeProgress(
                progress,
                0.34,
                0.48,
            ),
        );

    const description =
        smootherstep(
            rangeProgress(
                progress,
                0.42,
                0.58,
            ),
        );

    const services =
        smootherstep(
            rangeProgress(
                progress,
                0.52,
                0.76,
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
                    mx-auto
                    grid
                    w-full
                    max-w-[1320px]
                    grid-cols-12
                    gap-x-8
                "
            >
                {/*
                 * =================================================
                 * LEFT CONTENT
                 * =================================================
                 */}

                <div
                    className="
                        col-span-12
                        lg:col-span-5
                        lg:col-start-2
                    "
                >
                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            gap-3
                            text-[11px]
                            uppercase
                            tracking-[0.32em]
                            text-secondary
                        "
                        style={{
                            opacity:
                                eyebrow,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                14,
                                0,
                                eyebrow,
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
                                w-7
                                bg-secondary/45
                            "
                        />

                        <span>
                            {service.title}
                        </span>
                    </div>

                    {/*
                     * DIGITAL
                     */}

                    <h2
                        className="
                            text-[clamp(4.5rem,7vw,7.2rem)]
                            font-bold
                            uppercase
                            leading-[0.84]
                            tracking-[-0.055em]
                            text-white
                        "
                        style={{
                            opacity:
                                title,

                            filter:
                                `blur(${lerp(
                                    8,
                                    0,
                                    title,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                50,
                                0,
                                title,
                            )
                                }px,
                                    ${lerp(
                                    -160,
                                    0,
                                    title,
                                )
                                }px
                                )
                                scale(
                                    ${lerp(
                                    0.87,
                                    1,
                                    title,
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
                     * THE STAGE
                     */}

                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            gap-4
                        "
                        style={{
                            opacity:
                                metaphor,

                            transform: `
                                translate3d(
                                    ${lerp(
                                -18,
                                0,
                                metaphor,
                            )
                                }px,
                                    0,
                                    0
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
                                w-20
                                bg-secondary/25
                            "
                        />
                    </div>

                    {/*
                     * DESCRIPTION
                     */}

                    <p
                        className="
                            mt-8
                            max-w-[460px]
                            text-[15px]
                            leading-[1.85]
                            text-white/70
                            xl:text-base
                        "
                        style={{
                            opacity:
                                description,

                            transform: `
                                translate3d(
                                    0,
                                    ${lerp(
                                22,
                                0,
                                description,
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
                 * =================================================
                 * RIGHT SERVICES
                 * =================================================
                 */}

                <div
                    className="
                        col-span-12
                        mt-12
                        lg:col-span-5
                        lg:col-start-7
                        lg:mt-16
                        lg:pl-10
                    "
                >
                    {service.services.map(
                        (
                            item: string,
                            index: number,
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

                            const start =
                                stagger *
                                0.4;

                            const end =
                                Math.min(
                                    start +
                                    0.6,
                                    1,
                                );

                            const itemProgress =
                                smootherstep(
                                    rangeProgress(
                                        services,
                                        start,
                                        end,
                                    ),
                                );

                            return (
                                <div
                                    key={
                                        item
                                    }
                                    className="
                                        grid
                                        min-h-[60px]
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
                                            28,
                                            0,
                                            itemProgress,
                                        )
                                            }px,
                                                0,
                                                ${lerp(
                                                -60,
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
                                        "
                                    >
                                        {item}
                                    </span>

                                    <span
                                        className="
                                            text-[10px]
                                            tabular-nums
                                            tracking-[0.15em]
                                            text-secondary/70
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
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
}