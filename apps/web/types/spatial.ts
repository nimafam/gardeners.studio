export interface SpatialVector3 {
    x: number;
    y: number;
    z: number;
}

export interface CameraSpatialState {
    progress: number;

    position: SpatialVector3;
    target: SpatialVector3;

    direction: SpatialVector3;

    yaw: number;
    pitch: number;

    distance: number;
}