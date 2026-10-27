"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface PromotionContentProps {
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

export function PromotionContent({
    service,
    progress,
}: PromotionContentProps) {
    const indexProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.2,
                0.34,
            ),
        );

    const titleProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.27,
                0.43,
            ),
        );

    const metaphorProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.34,
                0.48,
            ),
        );

    const descriptionProgress =
        smootherstep(
            rangeProgress(
                progress,
                0.42,
                0.58,
            ),
        );

    const servicesProgress =
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
                 * LEFT — IDENTITY
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
                            text-[10px]
                            uppercase
                            tracking-[0.32em]
                            text-secondary
                        "
                        style={{
                            opacity:
                                indexProgress,
                        }}
                    >
                        {service.number}
                        {" — "}
                        {service.title}
                    </div>

                    <h2
                        className="
                            text-[clamp(4rem,7vw,7rem)]
                            font-bold
                            uppercase
                            leading-[0.86]
                            tracking-[-0.055em]
                            text-white
                        "
                        style={{
                            opacity:
                                titleProgress,

                            filter:
                                `blur(${lerp(
                                    7,
                                    0,
                                    titleProgress,
                                )
                                }px)`,

                            transform: `
                                translate3d(
                                    ${lerp(
                                -35,
                                0,
                                titleProgress,
                            )
                                }px,
                                    0,
                                    ${lerp(
                                    -100,
                                    0,
                                    titleProgress,
                                )
                                }px
                                )
                            `,
                        }}
                    >
                        {service.title}
                    </h2>

                    <div
                        className="
                            mt-5
                            text-[12px]
                            uppercase
                            tracking-[0.3em]
                            text-secondary
                        "
                        style={{
                            opacity:
                                metaphorProgress,
                        }}
                    >
                        {service.metaphor}
                    </div>

                    <p
                        className="
                            mt-8
                            max-w-[480px]
                            text-[15px]
                            leading-[1.85]
                            text-white/65
                        "
                        style={{
                            opacity:
                                descriptionProgress,

                            transform: `
                                translateY(
                                    ${lerp(
                                18,
                                0,
                                descriptionProgress,
                            )
                                }px
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
                 * RIGHT — SERVICES
                 */}

                <div
                    className="
                        col-span-12
                        mt-12
                        lg:col-span-5
                        lg:col-start-7
                        lg:mt-12
                        lg:pl-10
                    "
                >
                    <div
                        className="
                            mb-5
                            text-[9px]
                            uppercase
                            tracking-[0.32em]
                            text-white/30
                        "
                        style={{
                            opacity:
                                servicesProgress,
                        }}
                    >
                        Services
                    </div>

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
                                        grid
                                        min-h-[58px]
                                        grid-cols-[40px_1fr]
                                        items-center
                                        border-b
                                        border-white/[0.07]
                                    "
                                    style={{
                                        opacity:
                                            itemProgress,

                                        transform: `
                                            translate3d(
                                                ${lerp(
                                            26,
                                            0,
                                            itemProgress,
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
                                            text-[9px]
                                            tabular-nums
                                            tracking-[0.15em]
                                            text-secondary/60
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
                                            text-[14px]
                                            leading-6
                                            text-white/70
                                        "
                                    >
                                        {item}
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