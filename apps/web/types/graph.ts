export type GraphNodeState =
    | "idle"
    | "active"
    | "focus";

export type Position3D = readonly [
    number,
    number,
    number,
];

export interface GraphNodeDefinition {
    id: string;
    position: Position3D;
    size?: number;
    curvature?: number;
}

export type GraphNodeStateMap =
    Record<string, GraphNodeState>;

export interface GraphSceneState {
    nodes: GraphNodeStateMap;
}

export interface GraphNodeComposition {
    position: Position3D;
    size?: number;
    curvature?: number;
}

export type GraphCompositionNodes =
    Record<string, GraphNodeComposition>;

export interface GraphComposition {
    nodes: GraphCompositionNodes;
}

export type MutablePosition3D = [
    number,
    number,
    number,
];

export type GraphRuntimePositions =
    Record<string, MutablePosition3D>;

export interface GraphNodeRuntimeSnapshot {
    position: Position3D;

    size: number;

    state: GraphNodeState;
}

export type GraphRuntimeSnapshot =
    Record<
        string,
        GraphNodeRuntimeSnapshot
    >;
