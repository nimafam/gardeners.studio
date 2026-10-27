"use client";

import { UnifiedServiceScene } from "./UnifiedServiceScene";

import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

interface ServiceExperienceRendererProps {
    service:
    ServiceExperienceDefinition;

    localProgress: number;
}

export function ServiceExperienceRenderer({
    service,
    localProgress,
}: ServiceExperienceRendererProps) {
    return (
        <UnifiedServiceScene
            service={service}
            progress={localProgress}
        />
    );
}
