"use client";

import type { ServiceExperienceDefinition } from "@/types/services-experience";
import type { ServiceTransitionRuntime } from "@/types/service-transition";
import { UnifiedServiceScene } from "../UnifiedServiceScene";

interface ServiceTransitionStageProps {
    transition: ServiceTransitionRuntime;
    fromService: ServiceExperienceDefinition;
    toService: ServiceExperienceDefinition;
}

export function ServiceTransitionStage({
    transition,
    fromService,
    toService,
}: ServiceTransitionStageProps) {
    if (!transition.active || !transition.definition) {
        return null;
    }

    return (
        <div className="absolute inset-0 overflow-hidden [perspective:1600px] [transform-style:preserve-3d]">
            <UnifiedServiceScene
                service={fromService}
                progress={1}
                toService={toService}
                transitionProgress={transition.progress}
            />
        </div>
    );
}
