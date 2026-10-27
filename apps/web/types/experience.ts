import { RuntimeRegistry } from "@/runtime";
import type {
    SceneDefinition,
    SceneRegistration,
    SceneRuntimeUpdate,
} from "./scene";

export type ScrollDirection = "up" | "down";

export type TimelineDirection =
    | "forward"
    | "backward"
    | "idle";

export interface ScrollState {
    y: number;
    progress: number;
    direction: ScrollDirection;
}

export interface TimelineState {
    progress: number;
    direction: TimelineDirection;
    velocity: number;
    time: number;
}

export interface SceneJourneyTransitionState {
    id: "services-to-work";
    direction: "forward" | "backward";
    progress: number;
    status: "idle" | "running" | "complete";
}

export interface ServicesEntryTransitionState {
    direction: "forward" | "backward";
    progress: number;
    status: "idle" | "running" | "complete";
}

export interface ExperienceState {
    scroll: ScrollState;
    timeline: TimelineState;
    activeSceneId?: string;
    scenes: SceneRegistration[];
    sceneJourneyTransition: SceneJourneyTransitionState;
    servicesEntryTransition: ServicesEntryTransitionState;
}


export interface ExperienceContextValue {
    registry: RuntimeRegistry;

    state: ExperienceState;

    registerScene: (
        scene: SceneDefinition,
    ) => void;

    unregisterScene: (
        id: string,
    ) => void;

    updateScene: (
        id: string,
        updates: SceneRuntimeUpdate,
    ) => void;

    setActiveScene: (
        id?: string,
    ) => void;

    setScroll: (
        y: number,
        progress: number,
        direction: ScrollDirection,
    ) => void;

    setTimeline: (
        timeline: TimelineState,
    ) => void;

    setSceneJourneyTransition: (
        transition: SceneJourneyTransitionState,
    ) => void;

    setServicesEntryTransition: (
        transition: ServicesEntryTransitionState,
    ) => void;
}
