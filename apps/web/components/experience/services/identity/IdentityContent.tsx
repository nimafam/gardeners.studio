"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface IdentityContentProps {
    service:
    ServiceExperienceDefinition;

    progress:
    number;
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

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
        (end - start) *
        progress
    );
}

/*
 * ============================================================
 * IDENTITY SERVICES
 * ============================================================
 */

const identityServices = [
    "Brand naming",

    "Visual identity & logo design",

    "Brand book & guidelines",

    "Stationery & office suite design",

    "Verbal identity & tone of voice",

    "Sonic branding",

    "Tagline & slogan development",
] as const;

/*
 * ============================================================
 * IDENTITY CONTENT
 * ============================================================
 */

export function IdentityContent({
    progress,
}: IdentityContentProps) {
    /*
     * --------------------------------------------------------
     * CONTENT TIMING
     * --------------------------------------------------------
     *
     * Signal is already established by IdentityMotion.
     *
     * 0.20 → 0.32   index
     * 0.27 → 0.42   title
     * 0.34 → 0.48   metaphor
     * 0.42 → 0.58   description
     * 0.54 → 0.78   services
     * 0.78 → 1.00   hold / read
     */

    const indexProgress =
        smoothstep(
            rangeProgress(
                progress,
                0.2,
                0.32,
            ),
        );

    const titleProgress =
        smoothstep(
            rangeProgress(
                progress,
                0.27,
                0.42,
            ),
        );

    const metaphorProgress =
        smoothstep(
            rangeProgress(
                progress,
                0.34,
                0.48,
            ),
        );

    const descriptionProgress =
        smoothstep(
            rangeProgress(
                progress,
                0.42,
                0.58,
            ),
        );

    const servicesProgress =
        smoothstep(
            rangeProgress(
                progress,
                0.54,
                0.78,
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
                px-6
                md:px-12
                lg:px-20
            "
        >
            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-7xl
                "
            >
                {/*
                 * =================================================
                 * STRUCTURAL AXIS
                 * =================================================
                 */}

                <div
                    className="
                        absolute
                        -left-8
                        top-0
                        hidden
                        h-full
                        w-px
                        bg-white/10
                        md:block
                    "
                    style={{
                        opacity:
                            indexProgress,
                    }}
                >
                    <span
                        className="
                            absolute
                            left-1/2
                            top-0
                            size-2
                            -translate-x-1/2
                            rounded-full
                            bg-secondary
                            shadow-[0_0_18px_rgba(187,152,125,0.35)]
                        "
                    />
                </div>

                {/*
                 * =================================================
                 * SERVICE INDEX
                 * =================================================
                 */}

                <div
                    className="
                        mb-5
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.32em]
                        text-secondary
                    "
                    style={{
                        opacity:
                            indexProgress,

                        transform: `
                            translate3d(
                                0,
                                ${lerp(
                            14,
                            0,
                            indexProgress,
                        )
                            }px,
                                0
                            )
                        `,
                    }}
                >
                    02 — Identity
                </div>

                {/*
                 * =================================================
                 * MAIN TITLE
                 * =================================================
                 *
                 * Identity is the primary semantic element.
                 */}

                <h2
                    className="
                        text-5xl
                        font-bold
                        leading-[0.9]
                        tracking-[-0.045em]
                        text-white
                        md:text-7xl
                        lg:text-8xl
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
                                0,
                                ${lerp(
                            36,
                            0,
                            titleProgress,
                        )
                            }px,
                                ${lerp(
                                -60,
                                0,
                                titleProgress,
                            )
                            }px
                            )
                        `,
                    }}
                >
                    Identity
                </h2>

                {/*
                 * =================================================
                 * METAPHOR
                 * =================================================
                 */}

                <div
                    className="
                        mt-3
                        text-lg
                        font-medium
                        italic
                        tracking-[-0.02em]
                        text-secondary
                        md:text-2xl
                    "
                    style={{
                        opacity:
                            metaphorProgress,

                        transform: `
                            translate3d(
                                0,
                                ${lerp(
                            18,
                            0,
                            metaphorProgress,
                        )
                            }px,
                                0
                            )
                        `,
                    }}
                >
                    The Voice
                </div>

                {/*
                 * =================================================
                 * DESCRIPTION
                 * =================================================
                 */}

                <p
                    className="
                        mt-7
                        max-w-2xl
                        text-sm
                        leading-6
                        text-white/80
                        md:text-base
                        md:leading-7
                    "
                    style={{
                        opacity:
                            descriptionProgress,

                        transform: `
                            translate3d(
                                0,
                                ${lerp(
                            20,
                            0,
                            descriptionProgress,
                        )
                            }px,
                                0
                            )
                        `,
                    }}
                >
                    A voice is what makes a
                    musician recognizable
                    across a crowded hall. We
                    craft identities that are
                    unmistakable — coherent,
                    expressive, and built to
                    last across every
                    touchpoint.
                </p>

                {/*
                 * =================================================
                 * SERVICES
                 * =================================================
                 */}

                <div
                    className="
                        mt-9
                        grid
                        gap-5
                        border-t
                        border-white/10
                        pt-5
                        lg:grid-cols-[140px_1fr]
                    "
                    style={{
                        opacity:
                            servicesProgress,

                        transform: `
                            translate3d(
                                0,
                                ${lerp(
                            24,
                            0,
                            servicesProgress,
                        )
                            }px,
                                0
                            )
                        `,
                    }}
                >
                    {/*
                     * SERVICES LABEL
                     */}

                    <div
                        className="
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-white/60
                        "
                    >
                        Services
                    </div>

                    {/*
                     * SERVICE LIST
                     */}

                    <div
                        className="
                            grid
                            gap-x-10
                            gap-y-2.5
                            md:grid-cols-2
                        "
                    >
                        {identityServices.map(
                            (
                                item,
                                index,
                            ) => {
                                const itemProgress =
                                    smoothstep(
                                        rangeProgress(
                                            servicesProgress,
                                            index *
                                            0.045,
                                            0.5 +
                                            index *
                                            0.045,
                                        ),
                                    );

                                return (
                                    <div
                                        key={
                                            item
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            text-[12px]
                                            leading-5
                                            text-white/90
                                            md:text-[13px]
                                        "
                                        style={{
                                            opacity:
                                                itemProgress,

                                            transform: `
                                                translate3d(
                                                    ${lerp(
                                                12,
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
                                                size-1.5
                                                shrink-0
                                                rounded-full
                                                bg-secondary
                                            "
                                        />

                                        <span>
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
        </div>
    );
}