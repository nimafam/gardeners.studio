"use client";

import {
    useExperience,
    useSceneTransition,
} from "@/hooks";

import {
    aboutToServicesCameraPath,
    heroToAboutCameraPath,
} from "@/components/webgl/camera";

export function SceneTransitionDebug() {
    const {
        state,
    } = useExperience();

    /*
     * ----------------------------------------
     * HERO → ABOUT
     * ----------------------------------------
     */

    const heroToAbout =
        useSceneTransition({
            fromSceneId: "hero",
            toSceneId: "about",

            startProgress:
                heroToAboutCameraPath
                    .startProgress,

            endProgress:
                heroToAboutCameraPath
                    .endProgress,
        });

    /*
     * ----------------------------------------
     * ABOUT → SERVICES
     * ----------------------------------------
     */

    const aboutToServices =
        useSceneTransition({
            fromSceneId: "about",
            toSceneId: "services",

            startProgress:
                aboutToServicesCameraPath
                    .startProgress,

            endProgress:
                aboutToServicesCameraPath
                    .endProgress,
        });

    /*
     * ----------------------------------------
     * ACTIVE TRANSITION
     * ----------------------------------------
     */

    const activeTransition =
        state.activeSceneId === "hero"
            ? {
                name: "Hero → About",
                transition:
                    heroToAbout,
            }
            : state.activeSceneId ===
                "about"
                ? {
                    name: "About → Services",
                    transition:
                        aboutToServices,
                }
                : null;

    return (
        <div
            className="
                fixed
                bottom-6
                left-6
                z-[9999]
                min-w-[260px]
                rounded-xl
                border
                border-white/10
                bg-black/80
                p-4
                font-mono
                text-xs
                text-white
                shadow-xl
                backdrop-blur-md
            "
        >
            <div
                className="
                    mb-3
                    border-b
                    border-white/10
                    pb-2
                    font-semibold
                "
            >
                Scene Transition Debug
            </div>

            <div className="space-y-2">
                <DebugRow
                    label="Scene"
                    value={
                        state.activeSceneId ??
                        "none"
                    }
                />

                <DebugRow
                    label="Transition"
                    value={
                        activeTransition
                            ?.name ??
                        "HOLD"
                    }
                />

                {activeTransition ? (
                    <>
                        <DebugRow
                            label="Raw"
                            value={
                                activeTransition
                                    .transition
                                    .progress
                                    .toFixed(
                                        3,
                                    )
                            }
                        />

                        <DebugRow
                            label="Eased"
                            value={
                                activeTransition
                                    .transition
                                    .easedProgress
                                    .toFixed(
                                        3,
                                    )
                            }
                        />

                        <div className="pt-2">
                            <div
                                className="
                                    h-1.5
                                    overflow-hidden
                                    rounded-full
                                    bg-white/10
                                "
                            >
                                <div
                                    className="
                                        h-full
                                        bg-white
                                    "
                                    style={{
                                        width: `${activeTransition
                                                .transition
                                                .easedProgress *
                                            100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <DebugRow
                        label="Camera"
                        value="ARRIVAL / HOLD"
                    />
                )}
            </div>
        </div>
    );
}

interface DebugRowProps {
    label: string;
    value: string;
}

function DebugRow({
    label,
    value,
}: DebugRowProps) {
    return (
        <div
            className="
                flex
                items-center
                justify-between
                gap-6
            "
        >
            <span className="text-white/50">
                {label}
            </span>

            <span className="text-right">
                {value}
            </span>
        </div>
    );
}