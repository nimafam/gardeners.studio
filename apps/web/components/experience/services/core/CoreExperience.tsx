"use client";

import {
    CoreContent,
} from "./CoreContent";

import {
    CoreMotion,
} from "./CoreMotion";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface CoreExperienceProps {
    service:
    ServiceExperienceDefinition;

    localProgress: number;
}

export function CoreExperience({
    service,
    localProgress,
}: CoreExperienceProps) {
    return (
        <div
            className="
                pointer-events-none
                fixed
                inset-0
                z-20
            "
        >
            {/*
             * Spatial / visual composition
             */}
            <CoreMotion
                progress={
                    localProgress
                }
            />

            {/*
             * Content composition
             */}
            <CoreContent
                service={
                    service
                }
                progress={
                    localProgress
                }
            />
        </div>
    );
}