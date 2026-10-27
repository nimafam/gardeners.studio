"use client";

import {
    useSceneChoreography,
} from "@/hooks";

import {
    servicesChoreography,
} from "@/components/experience/choreography";

export function ServicesMotionDebug() {
    const services =
        useSceneChoreography(
            servicesChoreography,
        );

    const cameraMode =
        services.phase === "entry" ||
            services.phase === "settle"
            ? "HOLD"
            : services.phase === "traverse"
                ? "PAN → STRATEGY"
                : "STRATEGY LOCK";

    return (
        <div
            className="
                fixed
                top-6
                right-6
                z-[200]
                w-[260px]
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
                Services Motion Debug
            </div>

            <div className="space-y-2">
                <DebugRow
                    label="Scene"
                    value={
                        services.sceneId
                    }
                />

                <DebugRow
                    label="Progress"
                    value={services.progress.toFixed(
                        3,
                    )}
                />

                <DebugRow
                    label="Phase"
                    value={
                        services.phase
                    }
                />

                <DebugRow
                    label="Phase Progress"
                    value={services.phaseProgress.toFixed(
                        3,
                    )}
                />

                <div
                    className="
                        my-3
                        border-t
                        border-white/10
                    "
                />

                <DebugRow
                    label="Camera"
                    value={
                        cameraMode
                    }
                />
            </div>

            {/* Timeline */}

            <div className="mt-4">
                <div
                    className="
                        mb-1
                        flex
                        justify-between
                        text-[10px]
                        text-white/50
                    "
                >
                    <span>0</span>
                    <span>Services Timeline</span>
                    <span>1</span>
                </div>

                <div
                    className="
                        relative
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-white/10
                    "
                >
                    <div
                        className="
                            absolute
                            inset-y-0
                            left-0
                            bg-white
                            transition-none
                        "
                        style={{
                            width: `${services.progress *
                                100
                                }%`,
                        }}
                    />
                </div>

                {/* Phase markers */}

                <div
                    className="
                        relative
                        mt-1
                        h-3
                        text-[8px]
                        text-white/40
                    "
                >
                    <span
                        className="
                            absolute
                            left-[15%]
                            -translate-x-1/2
                        "
                    >
                        15
                    </span>

                    <span
                        className="
                            absolute
                            left-[25%]
                            -translate-x-1/2
                        "
                    >
                        25
                    </span>

                    <span
                        className="
                            absolute
                            left-[78%]
                            -translate-x-1/2
                        "
                    >
                        78
                    </span>
                </div>
            </div>

            {/* Phase visualization */}

            <div
                className="
                    mt-3
                    grid
                    grid-cols-4
                    gap-1
                    text-center
                    text-[9px]
                "
            >
                <Phase
                    name="ENTRY"
                    active={
                        services.phase ===
                        "entry"
                    }
                />

                <Phase
                    name="SETTLE"
                    active={
                        services.phase ===
                        "settle"
                    }
                />

                <Phase
                    name="PAN"
                    active={
                        services.phase ===
                        "traverse"
                    }
                />

                <Phase
                    name="EXIT"
                    active={
                        services.phase ===
                        "exit"
                    }
                />
            </div>
        </div>
    );
}

/*
 * ------------------------------------------------
 * DEBUG ROW
 * ------------------------------------------------
 */

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
                gap-4
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

/*
 * ------------------------------------------------
 * PHASE
 * ------------------------------------------------
 */

interface PhaseProps {
    name: string;
    active: boolean;
}

function Phase({
    name,
    active,
}: PhaseProps) {
    return (
        <div
            className={`
                rounded
                border
                px-1
                py-1.5

                ${active
                    ? `
                            border-white
                            bg-white
                            text-black
                        `
                    : `
                            border-white/10
                            bg-white/5
                            text-white/40
                        `
                }
            `}
        >
            {name}
        </div>
    );
}