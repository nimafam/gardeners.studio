"use client";

import { useEffect } from "react";

import {
    ExperienceCanvas,
    ExperienceLayer,
    ExperienceViewport,
} from ".";

import {
    WebGLCanvas,
    WebGLScene,
} from "@/components/webgl";

export function Experience() {
    useEffect(() => {
        console.log("[Experience] mounted");
    }, []);

    return (
        <ExperienceCanvas>
            <ExperienceViewport>
                <ExperienceLayer id="background" />

                <ExperienceLayer id="webgl">
                    <WebGLCanvas>
                        <WebGLScene />
                    </WebGLCanvas>
                </ExperienceLayer>

                <ExperienceLayer id="effects" />
                <ExperienceLayer id="overlay" />
            </ExperienceViewport>
        </ExperienceCanvas>
    );
}