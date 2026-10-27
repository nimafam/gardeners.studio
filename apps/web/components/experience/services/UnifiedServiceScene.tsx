"use client";

import type { ServiceExperienceDefinition } from "@/types/services-experience";
import { serviceRings } from "./ServicesRingVisuals";

interface UnifiedServiceSceneProps {
    service: ServiceExperienceDefinition;
    progress: number;
    toService?: ServiceExperienceDefinition;
    transitionProgress?: number;
}

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
}

const serviceGeometryPoses = [
    { rotateZ: 0, rotateY: 0, scaleX: 1, scaleY: 1 },
    { rotateZ: -10, rotateY: 0, scaleX: 1.02, scaleY: 0.96 },
    { rotateZ: -10, rotateY: 12, scaleX: 1.02, scaleY: 0.96 },
    { rotateZ: 14, rotateY: 12, scaleX: 1.12, scaleY: 0.96 },
    { rotateZ: 14, rotateY: 12, scaleX: 0.78, scaleY: 0.6 },
] as const;

function interpolate(from: number, to: number, progress: number) {
    return from + (to - from) * progress;
}

type RevealDirection = "up" | "down" | "left" | "right";

function revealTransform(progress: number, direction: RevealDirection, distance: number) {
    const remaining = (1 - progress) * distance;
    const x = direction === "left" ? remaining : direction === "right" ? -remaining : 0;
    const y = direction === "up" ? remaining : direction === "down" ? -remaining : 0;
    return `translate3d(${x}px, ${y}px, 0)`;
}

export function UnifiedServiceScene({
    service,
    progress,
    toService,
    transitionProgress = 0,
}: UnifiedServiceSceneProps) {
    const transition = smooth(transitionProgress);
    const fromIndex = service.index;
    const toIndex = toService?.index ?? fromIndex;
    const activeIndex = fromIndex + (toIndex - fromIndex) * transition;
    const contentOut = toService ? 1 - smooth((transitionProgress - 0.08) / 0.42) : 1;
    const destinationSelected = Boolean(toService) && transitionProgress >= 0.46;
    const shownService = destinationSelected && toService ? toService : service;
    const isDeparting = Boolean(toService) && !destinationSelected;
    const motionIndex = shownService.index % 5;
    const titleUsesSplit = motionIndex === 0 || motionIndex === 2 || motionIndex === 4;
    const revealDirections = ["right", "up", "left", "down", "right"] as const;
    const descriptionDirections = ["up", "left", "right", "up", "left"] as const;
    const contentEntrance = isDeparting
        ? 1
        : toService
            ? smooth((transitionProgress - 0.46) / 0.5)
            : service.id === "core"
                ? smooth((progress - 0.3) / 0.24)
                : 1;
    const markerReveal = smooth(contentEntrance / 0.42);
    const metaphorReveal = smooth((contentEntrance - 0.06) / 0.46);
    const titleReveal = smooth((contentEntrance - 0.12) / 0.52);
    const descriptionReveal = smooth((contentEntrance - 0.28) / 0.56);
    const capabilitiesReveal = smooth((contentEntrance - 0.34) / 0.5);
    const titleWords = shownService.title.trim().split(/\s+/);
    const geometryScale = 1 + activeIndex * 0.045;
    const geometryY = 7 - activeIndex * 2.2;
    const transitionPulse = Math.sin(transition * Math.PI);
    const transitionKind = !toService
        ? "settled"
        : service.id === "core"
            ? "organic"
            : service.id === "identity"
                ? "transmission"
                : service.id === "digital"
                    ? "broadcast"
                    : "threshold";

    const fromPose = serviceGeometryPoses[fromIndex] ?? serviceGeometryPoses[0];
    const toPose = serviceGeometryPoses[toIndex] ?? fromPose;
    const geometryRotateZ = interpolate(fromPose.rotateZ, toPose.rotateZ, transition);
    const geometryRotateY = interpolate(fromPose.rotateY, toPose.rotateY, transition);
    const geometryScaleX = interpolate(fromPose.scaleX, toPose.scaleX, transition);
    const geometryScaleY = interpolate(fromPose.scaleY, toPose.scaleY, transition);
    const geometryBlur =
        transitionKind === "transmission"
            ? transitionPulse * 1.8
            : 0;

    return (
        <div className="absolute inset-0 overflow-hidden bg-primary text-primary-foreground [perspective:1600px]">
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    background: "radial-gradient(circle at 66% 44%, rgba(187,152,125,.09), transparent 36%), radial-gradient(circle at 18% 84%, rgba(242,155,87,.045), transparent 28%)",
                }}
            />

            <div
                className="absolute left-[68%] top-[48%] [transform-style:preserve-3d]"
                style={{
                    filter: `blur(${geometryBlur}px)`,
                    transform: `translate3d(-50%, -50%, 0) translateY(${geometryY}vh) rotateY(${geometryRotateY}deg) rotateZ(${geometryRotateZ}deg) scale(${geometryScale * geometryScaleX}, ${geometryScale * geometryScaleY})`,
                }}
            >
                {serviceRings.map((ring, index) => {
                    const distance = Math.abs(index - activeIndex);
                    const emphasis = 1 - clamp01(distance);
                    const passed = index < activeIndex;
                    const depth = (index - activeIndex) * -82;

                    return (
                        <div
                            key={ring.id}
                            className="absolute left-1/2 top-1/2 rounded-full border [transform-style:preserve-3d]"
                            style={{
                                width: `${ring.size}vmin`,
                                height: `${ring.size}vmin`,
                                borderColor: emphasis > 0.2
                                    ? `rgba(242,155,87,${0.52 + emphasis * 0.4})`
                                    : `rgba(187,152,125,${passed ? 0.12 : 0.3})`,
                                opacity: passed ? 0.28 : 0.55 + emphasis * 0.45,
                                boxShadow: emphasis > 0.2
                                    ? `0 0 ${28 + emphasis * 34}px rgba(242,155,87,${0.08 + emphasis * 0.1})`
                                    : "none",
                                transform: `translate(-50%, -50%) rotateX(68deg) translateZ(${depth}px) scale(${1 + emphasis * 0.055})`,
                            }}
                        />
                    );
                })}

                <div
                    className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-accent"
                    style={{
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 34px rgba(242,155,87,.48)",
                    }}
                />
            </div>

            {transitionKind === "organic" && (
                <div
                    className="absolute left-[68%] top-[55%] rounded-full border border-accent/35"
                    style={{
                        width: `${18 + transition * 28}vmin`,
                        height: `${18 + transition * 28}vmin`,
                        opacity: transitionPulse,
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 54px rgba(242,155,87,.1)",
                    }}
                />
            )}

            {transitionKind === "transmission" && (
                <div
                    className="absolute bottom-[8vh] top-[12vh] w-px bg-gradient-to-b from-transparent via-secondary/55 to-transparent"
                    style={{
                        left: `${58 + transition * 20}%`,
                        opacity: transitionPulse,
                        boxShadow: "0 0 24px rgba(187,152,125,.2)",
                    }}
                />
            )}

            {transitionKind === "broadcast" && (
                <div
                    className="absolute left-[68%] top-[55%] h-[62vmin] w-[62vmin]"
                    style={{
                        opacity: transitionPulse * 0.55,
                        transform: `translate(-50%, -50%) rotate(${transition * 42}deg)`,
                        background: "repeating-conic-gradient(from 0deg, rgba(187,152,125,.28) 0deg 0.4deg, transparent 0.4deg 30deg)",
                        maskImage: "radial-gradient(circle, transparent 0 30%, black 31% 100%)",
                    }}
                />
            )}

            {transitionKind === "threshold" && (
                <div
                    className="absolute left-[68%] top-[55%] rounded-full border border-accent/45"
                    style={{
                        width: `${58 + transition * 34}vmin`,
                        height: `${58 - transitionPulse * 26}vmin`,
                        opacity: transitionPulse,
                        transform: "translate(-50%, -50%) rotateX(68deg)",
                        boxShadow: "inset 0 0 80px rgba(242,155,87,.06), 0 0 44px rgba(242,155,87,.08)",
                    }}
                />
            )}

            <div
                className="absolute inset-x-[5vw] top-[8vh] flex items-center justify-between"
                style={{
                    opacity: markerReveal,
                    transform: revealTransform(markerReveal, revealDirections[(motionIndex + 3) % 5], 14),
                }}
            >
                <div className="flex items-center gap-4 font-body text-[10px] font-medium uppercase tracking-[0.3em] text-secondary">
                    <span>{shownService.number}</span>
                    <span className="h-px w-16 bg-secondary/55" />
                    <span>{shownService.title}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
                <div className="font-body text-[9px] uppercase tracking-[0.26em] text-secondary/45">
                    Layer {shownService.number} of 05
                </div>
            </div>

            <div
                key={shownService.id}
                className="absolute inset-x-[5vw] top-[19vh] bottom-[9vh] grid grid-cols-12 gap-x-7"
                style={{
                    opacity: isDeparting ? contentOut : 1,
                    transform: `translate3d(${isDeparting ? (1 - contentOut) * -28 : 0}px, 0, 0)`,
                }}
            >
                <div className="col-span-5 flex flex-col justify-center">
                    <div
                        className="font-body text-xs uppercase tracking-[0.28em] text-secondary/75"
                        style={{
                            opacity: metaphorReveal,
                            letterSpacing: `${0.28 + (1 - metaphorReveal) * 0.18}em`,
                            transform: `${revealTransform(metaphorReveal, revealDirections[motionIndex], 38)} scale(${0.94 + metaphorReveal * 0.06})`,
                        }}
                    >
                        {shownService.metaphor}
                    </div>
                    {titleUsesSplit ? (
                        <h2 className="font-heading mt-4 text-[clamp(4.5rem,8vw,9rem)] font-normal leading-[0.75] tracking-[-0.055em] text-[#F5F0EB]">
                            {titleWords.map((word, index) => {
                                const wordReveal = smooth((titleReveal - index * 0.12) / 0.72);
                                return (
                                    <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
                                        <span
                                            className="inline-block"
                                            style={{
                                                transform: `translate3d(0, ${(1 - wordReveal) * 125}%, 0) rotate(${(1 - wordReveal) * -3}deg)`,
                                            }}
                                        >
                                            {word}
                                        </span>
                                        {index < titleWords.length - 1 && <span>&nbsp;</span>}
                                    </span>
                                );
                            })}
                        </h2>
                    ) : (
                        <div
                            style={{
                                clipPath: `inset(${(1 - titleReveal) * 100}% 0 0 0)`,
                                transform: `${revealTransform(titleReveal, revealDirections[(motionIndex + 1) % 5], 86)} scale(${0.92 + titleReveal * 0.08})`,
                            }}
                        >
                            <h2 className="font-heading mt-4 text-[clamp(4.5rem,8vw,9rem)] font-normal leading-[0.75] tracking-[-0.055em] text-[#F5F0EB]">
                                {shownService.title}
                            </h2>
                        </div>
                    )}
                    <p
                        className="mt-8 max-w-xl border-l border-secondary/45 pl-6 font-body text-sm leading-[1.75] text-[#F5F0EB]/65 md:text-base"
                        style={{
                            opacity: descriptionReveal,
                            clipPath: `inset(0 ${(1 - descriptionReveal) * 100}% 0 0)`,
                            transform: revealTransform(descriptionReveal, descriptionDirections[motionIndex], 46),
                        }}
                    >
                        {shownService.description}
                    </p>
                </div>

                <div className="col-span-5 col-start-8 flex flex-col justify-end pb-[4vh]">
                    <div
                        className="mb-5 flex items-center gap-3 font-body text-[9px] uppercase tracking-[0.28em] text-secondary/60"
                        style={{
                            opacity: capabilitiesReveal,
                            transform: revealTransform(capabilitiesReveal, revealDirections[(motionIndex + 2) % 5], 18),
                        }}
                    >
                        <span>Capabilities</span>
                        <span className="h-px flex-1 bg-secondary/25" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-7">
                        {shownService.services.map((item, index) => {
                            const itemReveal = smooth((capabilitiesReveal - index * (motionIndex % 2 === 0 ? 0.055 : 0.075)) / 0.62);
                            return (
                                <div
                                    key={item}
                                    className="flex min-h-12 items-center gap-3 border-t border-secondary/20 py-3 font-body text-xs leading-5 text-[#F5F0EB]/68"
                                    style={{
                                        opacity: itemReveal,
                                        clipPath: `inset(0 ${(1 - itemReveal) * 100}% 0 0)`,
                                        transform: `translate3d(${(1 - itemReveal) * (index % 2 === 0 ? -1 : 1) * (28 + motionIndex * 5)}px, ${(1 - itemReveal) * 8}px, 0)`,
                                    }}
                                >
                                <span className="text-[9px] text-secondary/55">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span>{item}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[4vh] left-[5vw] right-[5vw] flex items-center gap-4">
                <span className="font-body text-[9px] uppercase tracking-[0.28em] text-secondary/50">
                    Core
                </span>
                <div className="relative h-px flex-1 bg-secondary/15">
                    <div
                        className="absolute inset-y-0 left-0 bg-secondary/65"
                        style={{ width: `${(activeIndex / 4) * 100}%` }}
                    />
                    <div
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                        style={{ left: `${(activeIndex / 4) * 100}%` }}
                    />
                </div>
                <span className="font-body text-[9px] uppercase tracking-[0.28em] text-secondary/50">
                    Edge
                </span>
            </div>
        </div>
    );
}
