"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    useExperience,
    useSceneChoreography,
} from "@/hooks";

import {
    servicesChoreography,
} from "@/components/experience/choreography/ServicesChoreography";

import {
    servicesExperienceConfig,
} from "./ServicesExperienceConfig";

import {
    resolveServicesTimeline,
} from "./ResolveServicesTimeline";

import {
    SERVICES_INTERNAL_END,
    SERVICES_INTERNAL_START,
} from "./ServicesTimelineConfig";

import {
    useServicesSmoothProgress,
} from "@/hooks/useServicesSmoothProgress";

import {
    ServicesCinematicStage,
} from "./ServicesCinematicStage";

import {
    ServiceExperienceRenderer,
} from "./ServiceExperienceRenderer";

import {
    ServiceTransitionStage,
} from "./transitions/ServiceTransitionStage";

import {
    transitionRhythmConfig,
} from "./transitions/TransitionRhythmConfig";

import type {
    ActiveServiceExperience,
    ServiceExperienceDefinition,
} from "@/types/services-experience";

import type {
    ServiceTransitionRuntime,
} from "@/types/service-transition";

/*
 * ============================================================
 * INTERNAL SERVICES RANGE
 * ============================================================
 */

const CORE_ENTRY_PRELOAD =
    0.3;

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function clamp01(
    value: number,
): number {
    return Math.min(
        Math.max(
            value,
            0,
        ),
        1,
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
): number {
    if (end <= start) {
        return 0;
    }

    return clamp01(
        (
            value -
            start
        ) /
        (
            end -
            start
        ),
    );
}

function getServiceDefinition(
    serviceId: string,
):
    ServiceExperienceDefinition | null {
    return (
        servicesExperienceConfig.find(
            (
                service,
            ) =>
                service.id ===
                serviceId,
        ) ??
        null
    );
}

/*
 * ============================================================
 * TRANSITION MAP
 * ============================================================
 */

const transitionMap = {
    "core-to-identity": {
        from: "core",
        to: "identity",
    },

    "identity-to-digital": {
        from: "identity",
        to: "digital",
    },

    "digital-to-promotion": {
        from: "digital",
        to: "promotion",
    },

    "promotion-to-edge": {
        from: "promotion",
        to: "edge",
    },
} as const;

type TransitionMapId =
    keyof typeof transitionMap;

function getServiceEntryPreload(
    serviceId: string,
): number {
    const transitionId =
        (
            Object.keys(
                transitionMap,
            ) as TransitionMapId[]
        ).find(
            (id) =>
                transitionMap[id].to ===
                serviceId,
        );

    return transitionId
        ? transitionRhythmConfig[
            transitionId
        ].destinationPreload
        : 0;
}

/*
 * ============================================================
 * AUTONOMOUS TRANSITION STATE
 * ============================================================
 */

interface AutonomousTransitionState {
    id: TransitionMapId;

    direction:
        | "forward"
        | "backward";

    progress: number;

    completed: boolean;
}

/*
 * ============================================================
 * SERVICES EXPERIENCE HOOK
 * ============================================================
 *
 * IMPORTANT:
 *
 * This hook remains available because
 * ServicesExperienceDebug depends on it.
 *
 * It represents the physical / scroll-driven
 * Services timeline.
 */

export function useServicesExperience():
    ActiveServiceExperience | null {
    const choreography =
        useSceneChoreography(
            servicesChoreography,
        );

    /*
     * ========================================================
     * ACTIVATION
     * ========================================================
     */

    const isExperienceActive =
        choreography.phase ===
        "traverse" &&
        choreography.phaseProgress >=
        SERVICES_INTERNAL_START;

    /*
     * ========================================================
     * RAW INTERNAL PROGRESS
     * ========================================================
     */

    const rawProgress =
        choreography.phase ===
            "exit"
            ? 1
            : isExperienceActive
                ? rangeProgress(
                    choreography
                        .phaseProgress,

                    SERVICES_INTERNAL_START,

                    SERVICES_INTERNAL_END,
                )
                : 0;

    /*
     * ========================================================
     * SMOOTHED PHYSICAL PROGRESS
     * ========================================================
     */

    const progress =
        useServicesSmoothProgress(
            rawProgress,
            {
                damping: 9,
            },
        );

    /*
     * ========================================================
     * PHYSICAL TIMELINE RESOLUTION
     * ========================================================
     */

    return useMemo(() => {
        if (
            !isExperienceActive &&
            choreography.phase !==
            "exit" &&
            progress <= 0
        ) {
            return null;
        }

        const timeline =
            resolveServicesTimeline(
                progress,
            );

        const active =
            timeline.active;

        /*
         * ====================================================
         * SERVICE SEGMENT
         * ====================================================
         */

        if (
            active.segment.type ===
            "service"
        ) {
            const service =
                getServiceDefinition(
                    active.segment
                        .service,
                );

            if (!service) {
                return null;
            }

            return {
                service,

                progress,

                localProgress:
                    active.localProgress,
            };
        }

        /*
         * ====================================================
         * TRANSITION SEGMENT
         * ====================================================
         *
         * Debug/runtime representation keeps
         * the source service fully composed.
         */

        const previous =
            timeline.segments[
            active.index -
            1
            ];

        if (
            !previous ||
            previous.segment.type !==
            "service"
        ) {
            return null;
        }

        const service =
            getServiceDefinition(
                previous.segment
                    .service,
            );

        if (!service) {
            return null;
        }

        return {
            service,

            progress,

            localProgress: 1,
        };
    }, [
        choreography.phase,
        isExperienceActive,
        progress,
    ]);
}

/*
 * ============================================================
 * SERVICES EXPERIENCE
 * ============================================================
 */

export function ServicesExperience() {
    const {
        state: {
            scroll,
            sceneJourneyTransition,
        },
    } = useExperience();

    /*
     * Physical / scroll-driven runtime.
     */

    const experience =
        useServicesExperience();

    /*
     * ========================================================
     * AUTONOMOUS TRANSITION
     * ========================================================
     */

    const [
        autonomousTransition,
        setAutonomousTransition,
    ] =
        useState<AutonomousTransitionState | null>(
            null,
        );

    /*
     * ========================================================
     * RAF REFERENCES
     * ========================================================
     */

    const frameRef =
        useRef<number | null>(
            null,
        );

    const startTimeRef =
        useRef<number | null>(
            null,
        );

    /*
     * Prevent the same physical transition
     * from starting repeatedly while scroll
     * remains inside its timeline segment.
     */

    const triggeredTransitionRef =
        useRef<TransitionMapId | null>(
            null,
        );

    /*
     * ========================================================
     * PHYSICAL TIMELINE
     * ========================================================
     *
     * IMPORTANT:
     *
     * Hooks must remain unconditional.
     *
     * Therefore we resolve a safe progress
     * even when Services is not active.
     */

    const progress =
        experience?.progress ??
        0;

    const timeline =
        resolveServicesTimeline(
            progress,
        );

    const activeSegment =
        timeline.active;

    /*
     * ========================================================
     * PHYSICAL TRANSITION DETECTION
     * ========================================================
     */

    const physicalTransitionId:
        TransitionMapId | null =
        experience &&
            activeSegment.segment.type ===
            "transition"
            ? activeSegment.segment
                .transition
            : null;

    const hasAutonomousTransition =
        autonomousTransition !==
        null;

    /*
     * ========================================================
     * AUTONOMOUS TRANSITION CONTROLLER
     * ========================================================
     *
     * Scroll only TRIGGERS the transition.
     *
     * Once triggered:
     *
     * requestAnimationFrame owns progress
     * from 0 → 1.
     *
     * Releasing the wheel must NOT stop
     * the transition.
     */

    useEffect(() => {
        if (!physicalTransitionId) {
            return;
        }

        /*
         * Once a transition begins, it owns the
         * visual gesture until completion. Fast
         * physical scroll must not replace or
         * cancel it with another transition.
         */

        if (hasAutonomousTransition) {
            return;
        }

        /*
         * ====================================================
         * ALREADY TRIGGERED
         * ====================================================
         */

        if (
            triggeredTransitionRef.current ===
            physicalTransitionId
        ) {
            return;
        }

        /*
         * ====================================================
         * START NEW TRANSITION
         * ====================================================
         */

        triggeredTransitionRef.current =
            physicalTransitionId;

        const profile =
            transitionRhythmConfig[
            physicalTransitionId
            ];

        startTimeRef.current =
            null;

        setAutonomousTransition({
            id:
                physicalTransitionId,

            direction:
                scroll.direction ===
                    "up"
                    ? "backward"
                    : "forward",

            progress: 0,

            completed: false,
        });

        /*
         * ====================================================
         * AUTONOMOUS RAF
         * ====================================================
         */

        const tick = (
            time: number,
        ) => {
            if (
                startTimeRef.current ===
                null
            ) {
                startTimeRef.current =
                    time;
            }

            const elapsed =
                time -
                startTimeRef.current;

            const nextProgress =
                clamp01(
                    elapsed /
                    profile.duration,
                );

            setAutonomousTransition(
                (current) => {
                    if (
                        !current ||
                        current.id !==
                        physicalTransitionId
                    ) {
                        return current;
                    }

                    return {
                        id:
                            physicalTransitionId,

                        direction:
                            current.direction,

                        progress:
                            nextProgress,

                        completed:
                            nextProgress >= 1,
                    };
                },
            );

            /*
             * =================================================
             * CONTINUE
             * =================================================
             */

            if (
                nextProgress < 1
            ) {
                frameRef.current =
                    window.requestAnimationFrame(
                        tick,
                    );

                return;
            }

            /*
             * =================================================
             * COMPLETE
             * =================================================
             */

            frameRef.current =
                null;

            startTimeRef.current =
                null;
        };

        frameRef.current =
            window.requestAnimationFrame(
                tick,
            );

    }, [
        hasAutonomousTransition,
        physicalTransitionId,
        scroll.direction,
    ]);

    /*
     * The autonomous gesture stays mounted while
     * its matching physical transition remains
     * active. Once both sides have moved beyond
     * that handoff, normal Service rendering may
     * safely resume.
     */

    useEffect(() => {
        if (
            !autonomousTransition?.completed ||
            physicalTransitionId ===
            autonomousTransition.id
        ) {
            return;
        }

        const releaseFrame =
            window.requestAnimationFrame(
                () => {
                    setAutonomousTransition(
                        (current) =>
                            current?.completed &&
                                current.id !==
                                physicalTransitionId
                                ? null
                                : current,
                    );
                },
            );

        return () => {
            window.cancelAnimationFrame(
                releaseFrame,
            );
        };
    }, [
        autonomousTransition?.completed,
        autonomousTransition?.id,
        physicalTransitionId,
    ]);

    useEffect(() => {
        if (
            !physicalTransitionId &&
            !hasAutonomousTransition
        ) {
            triggeredTransitionRef.current =
                null;
        }
    }, [
        hasAutonomousTransition,
        physicalTransitionId,
    ]);

    /*
     * ========================================================
     * COMPONENT UNMOUNT CLEANUP
     * ========================================================
     */

    useEffect(() => {
        return () => {
            if (
                frameRef.current !==
                null
            ) {
                window.cancelAnimationFrame(
                    frameRef.current,
                );

                frameRef.current =
                    null;
            }

            startTimeRef.current =
                null;
        };
    }, []);

    /*
     * ========================================================
     * SERVICES NOT ACTIVE
     * ========================================================
     *
     * IMPORTANT:
     *
     * This return happens AFTER all hooks.
     */

    if (!experience) {
        return null;
    }

    /*
     * ========================================================
     * AUTONOMOUS VISUAL OWNERSHIP
     * ========================================================
     */

    if (
        autonomousTransition
    ) {
        const transitionId =
            autonomousTransition.id;

        const mapping =
            transitionMap[
            transitionId
            ];

        const fromService =
            getServiceDefinition(
                mapping.from,
            );

        const toService =
            getServiceDefinition(
                mapping.to,
            );

        if (
            !fromService ||
            !toService
        ) {
            return null;
        }

        /*
         * ====================================================
         * COMMITTED DESTINATION
         * ====================================================
         *
         * Autonomous animation has finished.
         *
         * Physical scroll may still be inside
         * the Transition segment.
         *
         * Do NOT rewind.
         *
         * Hold destination until physical
         * timeline reaches the Service segment.
         */

        if (
            autonomousTransition
                .completed
        ) {
            const profile =
                transitionRhythmConfig[
                transitionId
                ];

            const committedService =
                autonomousTransition
                    .direction ===
                    "forward"
                    ? toService
                    : fromService;

            const committedProgress =
                autonomousTransition
                    .direction ===
                    "forward"
                    ? profile
                        .destinationPreload
                    : 1;

            return (
                <ServicesCinematicStage>
                    <ServiceExperienceRenderer
                        service={
                            committedService
                        }
                        localProgress={
                            committedProgress
                        }
                    />
                </ServicesCinematicStage>
            );
        }

        /*
         * ====================================================
         * RUNNING AUTONOMOUS TRANSITION
         * ====================================================
         */

        const renderedProgress =
            autonomousTransition
                .direction ===
                "forward"
                ? autonomousTransition
                    .progress
                : 1 -
                autonomousTransition
                    .progress;

        const transition:
            ServiceTransitionRuntime = {
            active: true,

            definition: {
                id:
                    transitionId,

                from:
                    mapping.from,

                to:
                    mapping.to,

                /*
                 * Legacy compatibility.
                 *
                 * Timing is no longer controlled
                 * by these values.
                 */
                startProgress: 0,

                endProgress: 1,
            },

            fromService:
                mapping.from,

            toService:
                mapping.to,

            /*
             * =================================================
             * IMPORTANT
             * =================================================
             *
             * This progress is TIME-DRIVEN.
             *
             * It is NOT:
             *
             * activeSegment.localProgress
             */

            progress:
                renderedProgress,
        };

        return (
            <ServicesCinematicStage>
                <ServiceTransitionStage
                    transition={
                        transition
                    }
                    fromService={
                        fromService
                    }
                    toService={
                        toService
                    }
                />
            </ServicesCinematicStage>
        );
    }

    /*
     * ========================================================
     * NORMAL SERVICE SEGMENT
     * ========================================================
     */

    if (
        activeSegment.segment.type ===
        "service"
    ) {
        const service =
            getServiceDefinition(
                activeSegment.segment
                    .service,
            );

        if (!service) {
            return null;
        }

        /*
         * ====================================================
         * SERVICE CONTINUITY
         * ====================================================
         *
         * Core has no previous internal
         * Service transition.
         *
         * All later Services already entered
         * partially during their handoff.
         */

        const entryPreload =
            getServiceEntryPreload(
                service.id,
            );

        const serviceProgress =
            service.id ===
                "core"
                ? CORE_ENTRY_PRELOAD +
                (
                    1 -
                    CORE_ENTRY_PRELOAD
                ) *
                activeSegment
                    .localProgress
                : entryPreload +
                (
                    1 -
                    entryPreload
                ) *
                activeSegment
                    .localProgress;

        return (
            <ServicesCinematicStage>
                <div
                    className="h-full w-full"
                    style={
                        service.id === "edge"
                            ? {
                                opacity: 1 - clamp01(
                                    sceneJourneyTransition.progress / 0.34,
                                ),
                                transform: `scale(${1 - 0.82 * clamp01(
                                    sceneJourneyTransition.progress / 0.38,
                                )})`,
                                transformOrigin: "50% 50%",
                            }
                            : undefined
                    }
                >
                    <ServiceExperienceRenderer
                        service={service}
                        localProgress={serviceProgress}
                    />
                </div>
            </ServicesCinematicStage>
        );
    }

    /*
     * ========================================================
     * PHYSICAL TRANSITION FALLBACK
     * ========================================================
     *
     * There can be one render between:
     *
     * physical timeline entering Transition
     *
     * and
     *
     * useEffect creating autonomousTransition.
     *
     * Keep the source Service visible during
     * that frame instead of rendering blank.
     */

    const fallbackTransitionId =
        activeSegment.segment
            .transition;

    const fallbackMapping =
        transitionMap[
        fallbackTransitionId
        ];

    const fallbackFromService =
        getServiceDefinition(
            scroll.direction ===
                "up"
                ? fallbackMapping.to
                : fallbackMapping.from,
        );

    if (!fallbackFromService) {
        return null;
    }

    return (
        <ServicesCinematicStage>
            <ServiceExperienceRenderer
                service={
                    fallbackFromService
                }
                localProgress={1}
            />
        </ServicesCinematicStage>
    );
}
