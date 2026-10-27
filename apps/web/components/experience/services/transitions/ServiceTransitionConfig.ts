import type {
    ServiceTransitionDefinition,
} from "@/types/service-transition";

/*
 * Legacy service-local transition thresholds.
 *
 * The active Services Timeline now owns physical
 * transition segments, while TransitionRhythmConfig
 * owns autonomous cinematic timing. This config is
 * retained only for the legacy pure resolver and must
 * not duplicate the rhythm profile system.
 */

export const serviceTransitionConfig =
    [
        {
            id: "core-to-identity",
            from: "core",
            to: "identity",
            startProgress: 0.92,
            endProgress: 1,
        },
        {
            id: "identity-to-digital",
            from: "identity",
            to: "digital",
            startProgress: 0.92,
            endProgress: 1,
        },
        {
            id: "digital-to-promotion",
            from: "digital",
            to: "promotion",
            startProgress: 0.92,
            endProgress: 1,
        },
        {
            id: "promotion-to-edge",
            from: "promotion",
            to: "edge",
            startProgress: 0.92,
            endProgress: 1,
        },
    ] as const satisfies
    readonly ServiceTransitionDefinition[];
