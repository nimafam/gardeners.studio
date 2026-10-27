"use client";

import { useEffect } from "react";

import { useExperience } from "./useExperience";

import type { SceneDefinition } from "@/types/scene";

export function useSceneRegistration({
    id,
    name,
    order,
    enabled = true,
    preload = false,
    debug = false,
}: SceneDefinition,
) {
    const {
        registerScene,
        unregisterScene,
    } = useExperience();

    useEffect(() => {
        registerScene({
            id,
            name,
            order,
            enabled,
            preload,
            debug,
        },);

        return () => {
            unregisterScene(id);
        };
    }, [
        id,
        name,
        order,
        enabled,
        preload,
        debug,
        registerScene,
        unregisterScene,
    ]);
}
