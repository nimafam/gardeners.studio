import type {
    ServiceExperienceId,
    ServiceTransitionRuntime,
} from "@/types/service-transition";

import {
    serviceTransitionConfig,
} from "./ServiceTransitionConfig";

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function clamp01(
    value: number,
): number {
    return Math.min(
        Math.max(
            value,
            0,
        ),
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

/*
 * ============================================================
 * RESOLVE SERVICE TRANSITION
 * ============================================================
 *
 * Pure runtime resolver.
 *
 * Responsibilities:
 *
 * current service
 *        +
 * local service progress
 *        ↓
 * transition definition
 *        ↓
 * normalized transition progress
 *
 *
 * This resolver:
 *
 * - knows nothing about Scroll
 * - knows nothing about DOM
 * - knows nothing about React
 * - renders nothing
 * - contains no visual choreography
 *
 * It only resolves transition state.
 */

export function resolveServiceTransition(
    service:
        ServiceExperienceId,

    localProgress:
        number,
): ServiceTransitionRuntime {
    /*
     * ========================================================
     * FIND OUTGOING TRANSITION
     * ========================================================
     *
     * Example:
     *
     * service = "core"
     *
     * finds:
     *
     * core → identity
     */

    const definition =
        serviceTransitionConfig.find(
            (transition) =>
                transition.from ===
                service,
        );

    /*
     * ========================================================
     * NO OUTGOING TRANSITION
     * ========================================================
     *
     * Example:
     *
     * Edge is currently the final service.
     */

    if (!definition) {
        return {
            active: false,

            definition: null,

            fromService: null,

            toService: null,

            progress: 0,
        };
    }

    /*
     * ========================================================
     * NORMALIZE LOCAL PROGRESS
     * ========================================================
     */

    const normalizedLocalProgress =
        clamp01(
            localProgress,
        );

    /*
     * ========================================================
     * BEFORE TRANSITION
     * ========================================================
     *
     * Example:
     *
     * Core transition:
     *
     * startProgress = 0.92
     *
     * localProgress = 0.70
     *
     * Transition exists,
     * but is not active yet.
     */

    if (
        normalizedLocalProgress <
        definition.startProgress
    ) {
        return {
            active: false,

            definition,

            fromService:
                definition.from,

            toService:
                definition.to,

            progress: 0,
        };
    }

    /*
     * ========================================================
     * TRANSITION PROGRESS
     * ========================================================
     *
     * Example:
     *
     * source range:
     *
     * 0.92 → 1.00
     *
     * becomes:
     *
     * 0 → 1
     */

    const transitionProgress =
        rangeProgress(
            normalizedLocalProgress,

            definition.startProgress,

            definition.endProgress,
        );

    /*
     * ========================================================
     * ACTIVE TRANSITION
     * ========================================================
     */

    return {
        active: true,

        definition,

        fromService:
            definition.from,

        toService:
            definition.to,

        progress:
            transitionProgress,
    };
}