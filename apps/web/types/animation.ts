export type AnimationDirection =
    | "up"
    | "down"
    | "left"
    | "right";

export type AnimationState =
    | "idle"
    | "enter"
    | "entered"
    | "exit"
    | "exited";

export interface AnimationOptions {
    duration?: number;
    delay?: number;
    easing?: string;
}