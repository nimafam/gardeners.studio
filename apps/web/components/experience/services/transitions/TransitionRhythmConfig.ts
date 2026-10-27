import type {
    ServiceTransitionId,
} from "@/types/service-transition";

export interface TransitionRhythmProfile {
    /*
     * Total autonomous transition duration
     * in milliseconds.
     */
    duration: number;

    /*
     * End of initial breathing room.
     */
    departureHoldEnd: number;

    /*
     * Main transition motion range.
     */
    motionStart: number;
    motionEnd: number;

    /*
     * Destination arrival range.
     */
    arrivalStart: number;
    arrivalEnd: number;

    /*
     * Point where transition visual
     * begins to recede.
     */
    visualExitStart: number;

    /*
     * How far the destination Service
     * is composed during the handoff.
     */
    destinationPreload: number;
}

export const transitionRhythmConfig:
    Record<
        ServiceTransitionId,
        TransitionRhythmProfile
    > = {
    /*
     * ========================================================
     * CORE → IDENTITY
     * ========================================================
     */

    "core-to-identity": {
        duration: 1650,

        departureHoldEnd: 0.08,

        motionStart: 0.04,
        motionEnd: 0.72,

        arrivalStart: 0.38,
        arrivalEnd: 0.86,

        visualExitStart: 0.88,

        destinationPreload: 0.78,
    },

    /*
     * ========================================================
     * IDENTITY → DIGITAL
     * ========================================================
     */

    "identity-to-digital": {
        duration: 1950,

        departureHoldEnd: 0.16,

        motionStart: 0.12,
        motionEnd: 0.78,

        arrivalStart: 0.49,
        arrivalEnd: 0.86,

        visualExitStart: 0.9,

        destinationPreload: 0.76,
    },

    /*
     * ========================================================
     * DIGITAL → PROMOTION
     * ========================================================
     */

    "digital-to-promotion": {
        duration: 1500,

        departureHoldEnd: 0.1,

        motionStart: 0.08,
        motionEnd: 0.72,

        arrivalStart: 0.44,
        arrivalEnd: 0.81,

        visualExitStart: 0.85,

        destinationPreload: 0.76,
    },

    /*
     * ========================================================
     * PROMOTION → EDGE
     * ========================================================
     */

    "promotion-to-edge": {
        duration: 1850,

        departureHoldEnd: 0.14,

        motionStart: 0.11,
        motionEnd: 0.75,

        arrivalStart: 0.47,
        arrivalEnd: 0.82,

        visualExitStart: 0.9,

        destinationPreload: 0.74,
    },
};
