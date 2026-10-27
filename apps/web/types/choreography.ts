export type SceneChoreographyPhase =
    | "entry"
    | "settle"
    | "traverse"
    | "exit";

export interface SceneChoreographyRange {
    start: number;
    end: number;
}

export interface SceneChoreographyDefinition {
    sceneId: string;

    entry: SceneChoreographyRange;

    settle: SceneChoreographyRange;

    traverse: SceneChoreographyRange;

    exit: SceneChoreographyRange;
}

export interface SceneChoreographyState {
    sceneId: string;

    progress: number;

    phase: SceneChoreographyPhase;

    phaseProgress: number;
}