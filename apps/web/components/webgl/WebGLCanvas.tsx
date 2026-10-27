"use client";

import {
    useEffect,
    type ReactNode,
} from "react";

import {
    Canvas,
} from "@react-three/fiber";

import { CameraProjectionBridge } from "./camera/CameraProjectionBridge";

interface WebGLCanvasProps {
    children: ReactNode;
}

export function WebGLCanvas({
    children,
}: WebGLCanvasProps) {
    useEffect(() => {
        console.log(
            "[WebGLCanvas] mounted",
        );
    }, []);

    return (
        <Canvas
            dpr={[1, 2]}
            camera={{
                position: [0, 0, 6],
                fov: 45,
                near: 0.1,
                far: 100,
            }}
            gl={{
                antialias: true,
                alpha: true,
            }}
        >
            <CameraProjectionBridge />

            {children}
        </Canvas>
    );
}