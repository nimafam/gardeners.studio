"use client";

import type { ReactNode } from "react";

interface ExperienceCanvasProps {
    children: ReactNode;
}

export function ExperienceCanvas({
    children,
}: ExperienceCanvasProps) {
    return (
        <div
            data-experience-canvas
            className="
                pointer-events-none
                fixed
                inset-0
                z-0
                overflow-hidden
            "
        >
            {children}
        </div>
    );
}