export type SceneStatus =
    | "registered"
    | "entering"
    | "active"
    | "leaving"
    | "inactive";

export type SceneRuntimeUpdate = Partial<
    Pick<
        SceneRegistration,
        "progress"
        | "active"
        | "status"
    >
>;

export type SceneContentRigMode =
    | "hero"
    | "about"
    | "services"
    | "work";


export interface SceneNode {
    id: string;
    order: number;
    element: HTMLElement;
}

export interface SceneDefinition {
    id: string;
    name?: string;
    order: number;
    enabled?: boolean;
    preload?: boolean;
    debug?: boolean;
}

export interface SceneRegistration
    extends SceneDefinition {

    progress: number;

    active: boolean;

    status: SceneStatus;
}
