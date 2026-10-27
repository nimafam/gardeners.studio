"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

import {
    DigitalMotion,
} from "./DigitalMotion";

import {
    DigitalContent,
} from "./DigitalContent";

interface DigitalExperienceProps {
    service:
    ServiceExperienceDefinition;

    localProgress:
    number;
}

export function DigitalExperience({
    service,
    localProgress,
}: DigitalExperienceProps) {
    return (
        <div
            className="
                absolute
                inset-0
                z-20
                [transform-style:preserve-3d]
            "
        >
            <DigitalMotion
                progress={
                    localProgress
                }
            />

            <DigitalContent
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