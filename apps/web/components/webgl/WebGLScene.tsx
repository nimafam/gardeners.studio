"use client";

import {
    CameraRig,
} from "./camera";

import {
    SceneGraph,
} from "./graph";

export function WebGLScene() {
    return (
        <>
            <CameraRig />

            <SceneGraph />
        </>
    );
}