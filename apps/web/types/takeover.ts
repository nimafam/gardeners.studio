import type {
    SceneChoreographyPhase,
} from "./choreography";

export type TakeoverType =
    | "radial";

export interface SceneTakeoverDefinition {
    enabled: boolean;

    type: TakeoverType;

    /*
     * Choreography phase in which
     * takeover is executed.
     */
    phase: SceneChoreographyPhase;

    /*
     * Local progress inside phase.
     */
    startProgress: number;

    endProgress: number;

    background: string;

    overscan?: number;
}

export type SceneTakeoverMap =
    Partial<
        Record<
            string,
            SceneTakeoverDefinition
        >
    >;