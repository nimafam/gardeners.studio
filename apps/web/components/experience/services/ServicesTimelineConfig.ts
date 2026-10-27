import type {
    ServiceExperienceId,
    ServiceTransitionId,
} from "@/types/service-transition";

export const SERVICES_INTERNAL_START = 0.128;
export const SERVICES_INTERNAL_END = 1;

/*
 * ============================================================
 * SERVICES TIMELINE
 * ============================================================
 *
 * weight = physical scroll share
 *
 * Service weights are based partly on
 * reading/content density.
 *
 * Transition weights remain shorter,
 * but have enough space for cinematic handoff.
 */

export interface ServiceTimelineServiceSegment {
    type: "service";

    service:
    ServiceExperienceId;

    weight: number;
}

export interface ServiceTimelineTransitionSegment {
    type: "transition";

    transition:
    ServiceTransitionId;

    weight: number;
}

export type ServiceTimelineSegment =
    | ServiceTimelineServiceSegment
    | ServiceTimelineTransitionSegment;

export const servicesTimelineConfig =
    [
        {
            type: "service",
            service: "core",
            weight: 3.6,
        },

        {
            type: "transition",
            transition:
                "core-to-identity",
            weight: 1.8,
        },

        {
            type: "service",
            service: "identity",
            weight: 4.2,
        },

        {
            type: "transition",
            transition:
                "identity-to-digital",
            weight: 2.1,
        },

        {
            type: "service",
            service: "digital",
            weight: 3.9,
        },

        {
            type: "transition",
            transition:
                "digital-to-promotion",
            weight: 1.9,
        },

        {
            type: "service",
            service: "promotion",
            weight: 3.5,
        },

        {
            type: "transition",
            transition:
                "promotion-to-edge",
            weight: 2.0,
        },

        {
            type: "service",
            service: "edge",
            weight: 4.5,
        },
    ] as const satisfies
    readonly ServiceTimelineSegment[];
