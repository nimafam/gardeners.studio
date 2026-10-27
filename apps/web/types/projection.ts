export interface ProjectionVector3 {
    x: number;
    y: number;
    z: number;
}

export interface CameraProjectionSnapshot {
    position: ProjectionVector3;

    quaternion: {
        x: number;
        y: number;
        z: number;
        w: number;
    };

    projectionMatrix: number[];

    matrixWorldInverse: number[];

    viewport: {
        width: number;
        height: number;
    };

    ready: boolean;
}

export interface SpatialProjectionContextValue {
    camera: CameraProjectionSnapshot;

    updateCamera: (
        snapshot: CameraProjectionSnapshot,
    ) => void;
}