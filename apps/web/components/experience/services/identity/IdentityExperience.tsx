"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

import {
    IdentityContent,
} from "./IdentityContent";

import {
    IdentityMotion,
} from "./IdentityMotion";

interface IdentityExperienceProps {
    service:
    ServiceExperienceDefinition;

    localProgress:
    number;
}

export function IdentityExperience({
    service,
    localProgress,
}: IdentityExperienceProps) {
    return (
        <div
            className="
                absolute
                inset-0
                z-20
                [transform-style:preserve-3d]
            "
        >
            <IdentityMotion
                progress={
                    localProgress
                }
            />

            <IdentityContent
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