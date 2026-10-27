"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

import {
    EdgeMotion,
} from "./EdgeMotion";

import {
    EdgeContent,
} from "./EdgeContent";

interface EdgeExperienceProps {
    service:
    ServiceExperienceDefinition;

    localProgress:
    number;
}

export function EdgeExperience({
    service,
    localProgress,
}: EdgeExperienceProps) {
    return (
        <div
            className="
                absolute
                inset-0
                z-20
                [transform-style:preserve-3d]
            "
        >
            <EdgeMotion
                progress={
                    localProgress
                }
            />

            <EdgeContent
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