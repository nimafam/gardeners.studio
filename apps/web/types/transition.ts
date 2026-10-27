export interface SceneTransitionOptions {
    fromSceneId: string;
    toSceneId: string;

    startProgress?: number;
    endProgress?: number;
}

export interface SceneTransitionState {
    progress: number;
    easedProgress: number;

    active: boolean;
    completed: boolean;
}