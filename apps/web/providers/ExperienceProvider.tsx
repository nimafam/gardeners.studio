"use client";

import {
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    ScrollManager,
    SceneManager,
    TimelineManager,
} from "@/managers";

import { RuntimeRegistry } from "@/runtime";

import { ExperienceContext } from "./ExperienceContext";

import type {
    ExperienceContextValue,
    ExperienceState,
    ScrollDirection,
    SceneJourneyTransitionState,
    ServicesEntryTransitionState,
    TimelineState,
} from "@/types/experience";

import type { SceneDefinition, SceneRegistration, SceneRuntimeUpdate } from "@/types/scene";

interface ExperienceProviderProps {
    children: ReactNode;
}

const initialState: ExperienceState = {
    scroll: {
        y: 0,
        progress: 0,
        direction: "down",
    },
    activeSceneId: undefined,
    scenes: [],
    timeline: {
        progress: 0,
        direction: "idle",
        velocity: 0,
        time: 0,
    },
    sceneJourneyTransition: {
        id: "services-to-work",
        direction: "forward",
        progress: 0,
        status: "idle",
    },
    servicesEntryTransition: {
        direction: "forward",
        progress: 0,
        status: "idle",
    },
};

export function ExperienceProvider({
    children,
}: ExperienceProviderProps) {
    const [state, setState] =
        useState<ExperienceState>(initialState);

    const registerScene = useCallback(
        (
            scene: SceneDefinition,

        ) => {
            setState((current) => {
                const existingScene = current.scenes.find(
                    (registeredScene) =>
                        registeredScene.id === scene.id,
                );

                if (existingScene) {
                    return current;
                }

                const registration: SceneRegistration = {
                    ...scene,
                    progress: 0,
                    active: false,
                    status: "registered",
                }

                const scenes = [
                    ...current.scenes,
                    registration,
                ].sort((first, second) => first.order - second.order);

                return {
                    ...current,
                    scenes,
                };
            });
        },
        [],
    );

    const updateScene = useCallback(

        (
            id: string,
            updates: SceneRuntimeUpdate,
        ) => {

            setState(current => ({

                ...current,

                scenes:

                    current.scenes.map(scene =>

                        scene.id === id

                            ? {

                                ...scene,

                                ...updates,

                            }

                            : scene

                    ),

            }));

        },

        [],

    );

    const setActiveScene = useCallback(
        (id?: string) => {
            setState((current) => {
                if (current.activeSceneId === id) {
                    return current;
                }

                return {
                    ...current,
                    activeSceneId: id,
                };
            });
        },
        [],
    )

    const unregisterScene = useCallback((id: string) => {
        setState((current) => {
            const scenes = current.scenes.filter(
                (scene) => scene.id !== id,
            );

            return {
                ...current,
                activeSceneId:
                    current.activeSceneId === id
                        ? undefined
                        : current.activeSceneId,
                scenes,
            };
        });
    }, []);

    const setScroll = useCallback(
        (
            y: number,
            progress: number,
            direction: ScrollDirection,
        ) => {
            setState((current) => ({
                ...current,
                scroll: {
                    y,
                    progress,
                    direction,
                },
            }));
        },
        [],
    );

    const setTimeline = useCallback(
        (timeline: TimelineState) => {
            setState((current) => {
                const hasChanged =
                    current.timeline.progress !== timeline.progress ||
                    current.timeline.direction !== timeline.direction ||
                    current.timeline.time !== timeline.time ||
                    current.timeline.velocity !== timeline.velocity;

                if (!hasChanged) {
                    return current;
                }

                return {
                    ...current,
                    timeline,
                };
            });
        },
        [],
    )

    const setSceneJourneyTransition = useCallback(
        (transition: SceneJourneyTransitionState) => {
            setState((current) => ({
                ...current,
                sceneJourneyTransition: transition,
            }));
        },
        [],
    );

    const setServicesEntryTransition = useCallback(
        (transition: ServicesEntryTransitionState) => {
            setState((current) => ({
                ...current,
                servicesEntryTransition: transition,
            }));
        },
        [],
    );

    const registry = useMemo(
        () => new RuntimeRegistry(),
        [],
    );

    const value = useMemo<ExperienceContextValue>(
        () => ({
            registry,
            state,

            registerScene,
            updateScene,
            unregisterScene,

            setScroll,
            setTimeline,

            setSceneJourneyTransition,
            setServicesEntryTransition,

            setActiveScene,
        }),
        [
            registry,
            state,

            registerScene,
            unregisterScene,
            updateScene,


            setScroll,
            setTimeline,

            setSceneJourneyTransition,
            setServicesEntryTransition,

            setActiveScene,
        ],
    );

    return (
        <ExperienceContext.Provider value={value}>

            <ScrollManager />

            <TimelineManager />

            <SceneManager />

            {children}
        </ExperienceContext.Provider>
    );
}
