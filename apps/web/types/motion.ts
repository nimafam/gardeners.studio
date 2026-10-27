export type MotionTrigger =
    | "mount"
    | "viewport"
    | "scene"
    | "manual";

export interface MotionTriggerOptions {
    trigger?: MotionTrigger;

    sceneId?: string;

    /*
     * External/manual trigger.
     *
     * Used when animation timing is owned
     * by another system such as choreography.
     */
    active?: boolean;

    once?: boolean;

    threshold?: number;

    rootMargin?: string;
}

export type MotionVariant =
    | "reveal"
    | "stagger"
    | "parallax"
    | "hover"
    | "magnetic"
    | "transition";

export interface MotionConfig {
    disabled?: boolean;

    once?: boolean;

    duration?: number;

    delay?: number;
}
