"use client";

import type {
    CSSProperties,
    ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface ExperienceLayerProps {

    id?: string;

    children?: ReactNode;

    className?: string;

    style?: CSSProperties;

}

export function ExperienceLayer({
    id,
    children,
    className,
    style,
}: ExperienceLayerProps) {

    return (
        <div
            id={id}
            data-experience-layer={id}
            className={cn(
                "absolute inset-0",
                className,
            )}
            style={style}
        >
            {children}
        </div>
    );
}