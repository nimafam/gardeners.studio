"use client";

import {
    servicesChoreography,
} from "@/components/experience/choreography";

import {
    useSceneChoreography,
} from "@/hooks";

export function ServicesChoreographyDebug() {
    const choreography =
        useSceneChoreography(
            servicesChoreography,
        );

    return (
        <div
            className="
                fixed
                bottom-6
                left-6
                z-[200]
                min-w-[220px]
                rounded-xl
                border
                bg-background/90
                p-4
                font-mono
                text-xs
                backdrop-blur
            "
        >
            <div className="mb-2 font-semibold">
                Services Choreography
            </div>

            <div>
                Progress:{" "}
                {choreography.progress.toFixed(
                    3,
                )}
            </div>

            <div>
                Phase:{" "}
                {choreography.phase}
            </div>

            <div>
                Phase Progress:{" "}
                {choreography.phaseProgress.toFixed(
                    3,
                )}
            </div>
        </div>
    );
}