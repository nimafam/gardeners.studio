import type {
    Position3D,
} from "@/types/graph";

export interface CameraMotionFrame {
    position: Position3D;
    target: Position3D;
}

export interface LinearPanMotionDefinition {
    startPosition: Position3D;
    endPosition: Position3D;

    startTarget: Position3D;
    endTarget: Position3D;
}