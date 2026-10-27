"use client";

import { useEffect, useRef, useState } from "react";
import { servicesChoreography } from "@/components/experience/choreography/ServicesChoreography";
import { useSceneChoreography } from "@/hooks";
import { ServicesCinematicStage } from "./ServicesCinematicStage";
import {
    serviceRings,
} from "./ServicesRingVisuals";

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function smootherstep(value: number) {
    const t = clamp01(value);
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function useAutonomousStage(target: boolean, duration: number) {
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
        }

        const from = progressRef.current;
        const to = target ? 1 : 0;

        if (Math.abs(to - from) < 0.001) {
            progressRef.current = to;
            setProgress(to);
            return;
        }

        let startTime: number | null = null;
        const adjustedDuration = duration * Math.abs(to - from);

        const tick = (time: number) => {
            if (startTime === null) startTime = time;
            const elapsed = clamp01((time - startTime) / adjustedDuration);
            const next = from + (to - from) * smootherstep(elapsed);

            progressRef.current = next;
            setProgress(next);

            if (elapsed < 1) {
                frameRef.current = window.requestAnimationFrame(tick);
            } else {
                frameRef.current = null;
            }
        };

        frameRef.current = window.requestAnimationFrame(tick);

        return () => {
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [duration, target]);

    return progress;
}

export function ServicesOverviewJourney() {
    const choreography = useSceneChoreography(servicesChoreography);
    const inTraverse = choreography.phase === "traverse";
    const phaseProgress = inTraverse ? choreography.phaseProgress : 0;

    const revealTarget = inTraverse && phaseProgress >= 0.038;
    const reveal = useAutonomousStage(revealTarget, 1500);
    const tiltTarget = inTraverse && phaseProgress >= 0.082 && reveal >= 0.98;
    const tilt = useAutonomousStage(tiltTarget, 2200);
    const diveTarget = inTraverse && phaseProgress >= 0.128 && tilt >= 0.98;
    const dive = useAutonomousStage(diveTarget, 1500);

    if (!inTraverse || (!revealTarget && reveal <= 0.001)) return null;

    const overviewOpacity = 1 - smootherstep((dive - 0.68) / 0.32);
    const handoff = smootherstep(dive);
    const flatLabelsOpacity = (1 - tilt) * (1 - dive);
    const depthLabelsOpacity = tilt * (1 - dive);

    return (
        <ServicesCinematicStage className="z-[45]">
            <div
                className="absolute inset-0 bg-primary"
                style={{
                    opacity: 1 - smootherstep((dive - 0.46) / 0.54),
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    opacity: overviewOpacity,
                    transform: `scale(${1 - handoff * 0.035})`,
                    transformOrigin: "50% 50%",
                }}
            >
                <div
                    className="absolute"
                    style={{
                        left: `${50 + handoff * 18}%`,
                        top: `${50 + handoff * 5}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {serviceRings.map((ring, index) => {
                        const ringReveal = smootherstep((reveal - index * 0.1) / 0.6);
                        const revealScale = 0.82 + ringReveal * 0.18;
                        const projectedHeight = 1 - tilt * 0.63;
                        const depthOffset = index * tilt * 7.2;
                        const active = index === 0;

                        return (
                            <div
                                key={ring.id}
                                className="absolute left-1/2 top-1/2 rounded-full border"
                                style={{
                                    width: `${ring.size}vmin`,
                                    height: `${ring.size}vmin`,
                                    borderColor: active
                                        ? "rgba(242,155,87,0.9)"
                                        : `rgba(187,152,125,${0.72 - index * 0.08})`,
                                    boxShadow: active
                                        ? `0 0 ${18 + dive * 34}px rgba(242,155,87,${0.16 + dive * 0.12})`
                                        : "none",
                                    opacity: ringReveal * (1 - dive * index * 0.13),
                                    transform: `translate(-50%, -50%) translateY(${depthOffset}vmin) scale(${revealScale}, ${revealScale * projectedHeight})`,
                                }}
                            >
                                <div
                                    className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-3 py-1 font-body text-[9px] font-medium uppercase tracking-[0.22em] text-secondary md:text-[10px]"
                                    style={{ opacity: flatLabelsOpacity * ringReveal }}
                                >
                                    <span>{ring.number}</span>
                                    <span className="h-px w-4 bg-secondary/50" />
                                    <span>{ring.label}</span>
                                </div>
                            </div>
                        );
                    })}

                    <div
                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-accent"
                        style={{
                            opacity: reveal,
                            boxShadow: `0 0 ${20 + dive * 42}px rgba(242,155,87,0.45)`,
                            transform: `translate(-50%, -50%) scale(${1 + dive * 2})`,
                        }}
                    />
                </div>

                <div
                    className="absolute right-[6vw] top-1/2 flex -translate-y-1/2 flex-col items-end gap-6 md:gap-8"
                    style={{ opacity: depthLabelsOpacity }}
                >
                    {serviceRings.map((ring, index) => (
                        <div
                            key={ring.id}
                            className="flex origin-right items-center justify-end gap-3 whitespace-nowrap font-body uppercase tracking-[0.24em] transition-[opacity,transform,font-size] duration-500"
                            style={{
                                fontSize: index === 0 ? "13px" : "10px",
                                fontWeight: index === 0 ? 600 : 500,
                                opacity: index === 0 ? 1 : 0.62,
                                transform: index === 0 ? "scale(1.06)" : "scale(1)",
                                color: index === 0
                                    ? "var(--color-secondary)"
                                    : "rgba(187,152,125,.78)",
                            }}
                        >
                            <span>{ring.number}</span>
                            <span
                                className="h-px bg-secondary/55"
                                style={{ width: `${28 + index * 7}px` }}
                            />
                            <span>{ring.label}</span>
                            <span
                                className="h-1 w-1 rounded-full"
                                style={{
                                    background: index === 0
                                        ? "var(--color-accent)"
                                        : "rgba(187,152,125,.55)",
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div
                    className="absolute inset-x-0 bottom-[8vh] text-center font-body text-[10px] font-medium uppercase tracking-[0.3em] text-secondary/65 md:text-xs"
                    style={{ opacity: reveal * (1 - tilt) }}
                >
                    One system. Five expanding layers.
                </div>
                <div
                    className="absolute inset-x-0 bottom-[8vh] text-center font-body text-[10px] font-medium uppercase tracking-[0.3em] text-secondary/65 md:text-xs"
                    style={{ opacity: tilt * (1 - dive) }}
                >
                    Core to edge — foundation into possibility.
                </div>
            </div>
        </ServicesCinematicStage>
    );
}
