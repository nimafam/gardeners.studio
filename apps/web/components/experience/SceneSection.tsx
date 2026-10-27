"use client";

import {
    useEffect,
    useRef,
    ComponentPropsWithoutRef,
    ReactNode,
} from "react";

import { useExperience } from "@/hooks";
import { useSceneRegistration } from "@/hooks/useSceneRegistration";
import { cn } from "@/lib/utils";

interface SceneSectionProps
    extends Omit<
        ComponentPropsWithoutRef<"section">,
        "id" | "children"
    > {
    id: string;
    name?: string;
    order: number;
    enabled?: boolean;
    preload?: boolean;
    debug?: boolean;
    children: ReactNode;
}

export function SceneSection({
    id,
    name,
    order,
    enabled = true,
    preload = false,
    debug = false,
    children,
    className,
    ...sectionProps
}: SceneSectionProps) {
    const elementRef =
        useRef<HTMLElement | null>(null);

    const { registry } = useExperience();

    useSceneRegistration({
        id,
        name,
        order,
        enabled,
        preload,
        debug,
    });

    useEffect(() => {
        const element = elementRef.current;

        if (!element || !enabled) {
            return;
        }

        registry.registerScene({
            id,
            order,
            element,
        });

        return () => {
            registry.unregisterScene(id);
        }
    }, [
        id,
        order,
        enabled,
        registry,
    ])

    return (
        <section
            ref={elementRef}
            id={id}
            data-scene-id={id}
            data-scene-order={order}
            className={cn(
                "relative flex min-h-screen items-center justify-center",
                className,
            )}
            {...sectionProps}
        >
            {children}
        </section>
    );
}