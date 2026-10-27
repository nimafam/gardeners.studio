"use client";

import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    CameraProjectionSnapshot,
    SpatialProjectionContextValue,
} from "@/types/projection";

export const SpatialProjectionContext =
    createContext<
        SpatialProjectionContextValue | undefined
    >(undefined);

const initialCamera: CameraProjectionSnapshot = {
    position: {
        x: 0,
        y: 0,
        z: 0,
    },

    quaternion: {
        x: 0,
        y: 0,
        z: 0,
        w: 1,
    },

    projectionMatrix: [],

    matrixWorldInverse: [],

    viewport: {
        width: 0,
        height: 0,
    },

    ready: false,
};

interface SpatialProjectionProviderProps {
    children: ReactNode;
}

export function SpatialProjectionProvider({
    children,
}: SpatialProjectionProviderProps) {
    const [camera, setCamera] =
        useState<CameraProjectionSnapshot>(
            initialCamera,
        );

    const updateCamera =
        useCallback(
            (
                snapshot: CameraProjectionSnapshot,
            ) => {
                setCamera(snapshot);
            },
            [],
        );

    const value =
        useMemo<SpatialProjectionContextValue>(
            () => ({
                camera,
                updateCamera,
            }),
            [
                camera,
                updateCamera,
            ],
        );

    return (
        <SpatialProjectionContext.Provider
            value={value}
        >
            {children}
        </SpatialProjectionContext.Provider>
    );
}