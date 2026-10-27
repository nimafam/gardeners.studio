"use client";

import { useMemo } from "react";

import { useExperience } from "@/hooks";

import {
    resolveGraphComposition,
    resolveGraphState,
} from "@/components/webgl/graph";

import type {
    GraphNodeDefinition,
} from "@/types/graph";

export function ExperienceDebugPanel() {
    const { state } = useExperience();

    const composition = useMemo(
        () =>
            resolveGraphComposition(
                state.activeSceneId,
            ),
        [state.activeSceneId],
    );

    const nodes = useMemo<GraphNodeDefinition[]>(
        () =>
            Object.entries(
                composition.nodes,
            ).map(
                ([
                    id,
                    definition,
                ]) => ({
                    id,
                    ...definition,
                }),
            ),
        [composition],
    );

    const graphState = useMemo(
        () =>
            resolveGraphState(
                state.activeSceneId,
                nodes,
            ),
        [
            state.activeSceneId,
            nodes,
        ],
    );

    return (
        <aside
            className="
                fixed
                right-6
                top-24
                z-50
                hidden
                w-[340px]
                xl:block
            "
        >
            <div
                className="
                    max-h-[calc(100vh-7rem)]
                    overflow-auto
                    rounded-2xl
                    border
                    bg-card/95
                    p-4
                    shadow-lg
                    backdrop-blur
                "
            >
                <h2 className="text-sm font-semibold">
                    Experience Debug
                </h2>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Active Scene
                    </p>

                    <div className="rounded-lg border p-3 text-sm">
                        {state.activeSceneId ?? "none"}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Graph State
                    </p>

                    <pre className="rounded-lg border p-3 text-xs leading-5">
                        {JSON.stringify(
                            graphState,
                            null,
                            2,
                        )}
                    </pre>
                </div>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Graph Composition
                    </p>

                    <pre className="rounded-lg border p-3 text-xs leading-5">
                        {JSON.stringify(
                            composition,
                            null,
                            2,
                        )}
                    </pre>
                </div>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Experience State
                    </p>

                    <pre className="rounded-lg border p-3 text-xs leading-5">
                        {JSON.stringify(
                            state,
                            null,
                            2,
                        )}
                    </pre>
                </div>
            </div>
        </aside>
    );
}