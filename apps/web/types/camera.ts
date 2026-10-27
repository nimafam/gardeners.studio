import type { Position3D } from "./graph";

export interface CameraPathDefinition {
    id: string;

    fromSceneId: string;
    toSceneId: string;

    points: Position3D[];

    startTarget: Position3D;
    endTarget: Position3D;

    startProgress?: number;
    endProgress?: number;
}