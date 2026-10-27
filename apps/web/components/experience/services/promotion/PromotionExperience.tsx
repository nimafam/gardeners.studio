"use client";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

import {
    PromotionMotion,
} from "./PromotionMotion";

import {
    PromotionContent,
} from "./PromotionContent";

interface PromotionExperienceProps {
    service:
    ServiceExperienceDefinition;

    localProgress:
    number;
}

export function PromotionExperience({
    service,
    localProgress,
}: PromotionExperienceProps) {
    return (
        <div
            className="
                absolute
                inset-0
                z-20
                [transform-style:preserve-3d]
            "
        >
            <PromotionMotion
                progress={
                    localProgress
                }
            />

            <PromotionContent
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