"use client";

import type { ServiceExperienceDefinition } from "@/types/services-experience";

export const serviceRings = [
    { id: "core", number: "01", label: "Core", size: 16 },
    { id: "identity", number: "02", label: "Identity", size: 29 },
    { id: "digital", number: "03", label: "Digital", size: 43 },
    { id: "promotion", number: "04", label: "Promotion", size: 57 },
    { id: "edge", number: "05", label: "Edge", size: 71 },
] as const;

export const serviceLabelPositions = [
    { left: "43%", top: "27%" },
    { left: "66%", top: "36%" },
    { left: "36%", top: "45%" },
    { left: "72%", top: "54%" },
    { left: "76%", top: "64%" },
] as const;

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function smootherstep(value: number) {
    const t = clamp01(value);
    return t * t * t * (t * (t * 6 - 15) + 10);
}

interface ServicesRingMemoryProps {
    opacity: number;
}

export function ServicesRingMemory({
    opacity,
}: ServicesRingMemoryProps) {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[35] overflow-hidden [perspective:1500px]"
            style={{
                opacity: clamp01(opacity),
                filter: "blur(1.2px)",
            }}
        >
            <div className="absolute left-[73%] top-1/2 [transform-style:preserve-3d]">
                {serviceRings.map((ring, index) => (
                    <div
                        key={ring.id}
                        className="absolute left-1/2 top-1/2 rounded-full border border-secondary/45"
                        style={{
                            width: `${ring.size * 0.82}vmin`,
                            height: `${ring.size * 0.82}vmin`,
                            transform: `translate(-50%, -50%) rotateX(68deg) translateZ(${index * -58}px)`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0">
                {serviceRings.map((ring, index) => (
                    <div
                        key={ring.id}
                        className="absolute flex items-center gap-2 whitespace-nowrap font-body text-[9px] font-medium uppercase tracking-[0.22em] text-secondary/75"
                        style={serviceLabelPositions[index]}
                    >
                        <span>{ring.number}</span>
                        <span className="h-px w-5 bg-secondary/45" />
                        <span>{ring.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ServiceRingTransitionProps {
    progress: number;
    fromService: ServiceExperienceDefinition;
    toService: ServiceExperienceDefinition;
}

export function ServiceRingTransition({
    progress,
    fromService,
    toService,
}: ServiceRingTransitionProps) {
    const p = clamp01(progress);
    const travel = smootherstep((p - 0.08) / 0.72);
    const arrival = smootherstep((p - 0.48) / 0.38);
    const fromIndex = fromService.index;
    const toIndex = toService.index;
    const forward = toIndex > fromIndex;
    const depthTravel = (toIndex - fromIndex) * 92 * travel;

    return (
        <div className="absolute inset-0 overflow-hidden [perspective:1500px] [transform-style:preserve-3d]">
            <div
                className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                style={{
                    transform: `translate3d(-50%, -50%, ${depthTravel}px) scale(${1 + travel * 0.22})`,
                }}
            >
                {serviceRings.map((ring, index) => {
                    const isFrom = index === fromIndex;
                    const isTo = index === toIndex;
                    const emphasis = isFrom
                        ? 1 - travel
                        : isTo
                            ? arrival
                            : 0;
                    const ringOpacity =
                        isFrom || isTo
                            ? 0.42 + emphasis * 0.58
                            : 0.16;

                    return (
                        <div
                            key={ring.id}
                            className="absolute left-1/2 top-1/2 rounded-full border [transform-style:preserve-3d]"
                            style={{
                                width: `${ring.size}vmin`,
                                height: `${ring.size}vmin`,
                                borderColor: isTo
                                    ? `rgba(242,155,87,${0.45 + arrival * 0.5})`
                                    : `rgba(187,152,125,${ringOpacity})`,
                                boxShadow: isTo
                                    ? `0 0 ${18 + arrival * 44}px rgba(242,155,87,${arrival * 0.2})`
                                    : "none",
                                opacity: ringOpacity,
                                transform: `translate(-50%, -50%) rotateX(68deg) translateZ(${index * -76}px) scale(${1 + emphasis * 0.07})`,
                            }}
                        />
                    );
                })}
            </div>

            <div className="absolute inset-x-0 top-[12vh] flex justify-center">
                <div className="flex items-center gap-4 rounded-full border border-secondary/20 bg-primary/80 px-5 py-2 backdrop-blur-md">
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary/55">
                        {fromService.number} / {fromService.title}
                    </span>
                    <span
                        className="h-px bg-secondary/55"
                        style={{ width: `${32 + travel * 56}px` }}
                    />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary">
                        {toService.number} / {toService.title}
                    </span>
                </div>
            </div>

            <div
                className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] uppercase tracking-[0.32em] text-secondary/55"
                style={{ opacity: 1 - smootherstep((p - 0.84) / 0.16) }}
            >
                {forward ? "Expanding outward" : "Returning to the foundation"}
            </div>
        </div>
    );
}
