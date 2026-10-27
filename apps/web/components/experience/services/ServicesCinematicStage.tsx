"use client";

import type {
    ReactNode,
} from "react";

interface ServicesCinematicStageProps {
    children: ReactNode;
    className?: string;
}

export function ServicesCinematicStage({
    children,
    className = "",
}: ServicesCinematicStageProps) {
    return (
        <div
            className={`
                pointer-events-none
                fixed
                inset-0
                z-40
                overflow-hidden
                ${className}
            `}
        >
            <div
                className="
                    absolute
                    inset-0
                    [perspective:1400px]
                    [perspective-origin:50%_50%]
                "
            >
                <div
                    className="
                        absolute
                        inset-0
                        [transform-style:preserve-3d]
                    "
                >
                    {children}
                </div>
            </div>
        </div>
    );
}