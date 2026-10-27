"use client";

import {
    createContext,
    useCallback,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";

import type {
    GraphNodeRuntimeSnapshot,
    GraphRuntimeSnapshot,
} from "@/types/graph";

interface GraphRuntimeContextValue {
    nodes: GraphRuntimeSnapshot;

    updateNode: (
        id: string,
        snapshot: GraphNodeRuntimeSnapshot,
    ) => void;

    getNode: (
        id: string,
    ) => GraphNodeRuntimeSnapshot | undefined;
}

export const GraphRuntimeContext =
    createContext<
        GraphRuntimeContextValue | undefined
    >(undefined);

interface GraphRuntimeProviderProps {
    children: ReactNode;
}

export function GraphRuntimeProvider({
    children,
}: GraphRuntimeProviderProps) {
    const nodesRef =
        useRef<GraphRuntimeSnapshot>(
            {},
        );

    const [
        nodes,
        setNodes,
    ] = useState<GraphRuntimeSnapshot>(
        {},
    );

    const updateNode =
        useCallback(
            (
                id: string,
                snapshot:
                    GraphNodeRuntimeSnapshot,
            ) => {
                const previous =
                    nodesRef.current[id];

                /*
                 * از Renderهای بی‌دلیل جلوگیری می‌کنیم.
                 */
                if (
                    previous &&
                    Math.abs(
                        previous.position[0] -
                        snapshot.position[0],
                    ) < 0.0001 &&
                    Math.abs(
                        previous.position[1] -
                        snapshot.position[1],
                    ) < 0.0001 &&
                    Math.abs(
                        previous.position[2] -
                        snapshot.position[2],
                    ) < 0.0001 &&
                    previous.size ===
                    snapshot.size &&
                    previous.state ===
                    snapshot.state
                ) {
                    return;
                }

                const next = {
                    ...nodesRef.current,

                    [id]: snapshot,
                };

                nodesRef.current =
                    next;

                setNodes(next);
            },
            [],
        );

    const getNode =
        useCallback(
            (id: string) =>
                nodesRef.current[id],
            [],
        );

    const value =
        useMemo(
            () => ({
                nodes,
                updateNode,
                getNode,
            }),
            [
                nodes,
                updateNode,
                getNode,
            ],
        );

    return (
        <GraphRuntimeContext.Provider
            value={value}
        >
            {children}
        </GraphRuntimeContext.Provider>
    );
}