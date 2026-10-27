"use client";

import type { ReactNode } from "react";

interface ExperienceViewportProps {
    children: ReactNode;
}

export function ExperienceViewport({
    children,
}: ExperienceViewportProps) {
    return (
        <div
            className="
                absolute
                inset-0
                h-full
                w-full
            "
        >
            {children}
        </div>
    );
}