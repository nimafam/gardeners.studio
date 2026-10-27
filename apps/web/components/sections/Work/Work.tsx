"use client";

import Image from "next/image";
import { ChapterMarker, SceneSection } from "@/components/experience";
import {
    type WorkProject,
    workProjects,
    WorkProjectScene,
} from "@/components/experience/work";
import { Reveal } from "@/components/motion";
import { useExperience } from "@/hooks";
import { useEffect, useRef, useState } from "react";

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

export function Work() {
    const { state } = useExperience();
    const journeyProgress = state.sceneJourneyTransition.progress;
    const reveal = clamp01((journeyProgress - 0.68) / 0.24);
    const titleReveal = clamp01((reveal - 0.12) / 0.68);
    const detailReveal = clamp01((reveal - 0.42) / 0.58);
    const projectsStartRef = useRef<HTMLDivElement>(null);
    const [projectsActive, setProjectsActive] = useState(false);
    const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

    useEffect(() => {
        let frame: number | null = null;
        const update = () => {
            frame = null;
            const top = projectsStartRef.current?.getBoundingClientRect().top;
            if (top !== undefined) setProjectsActive(top <= window.innerHeight * 0.72);
        };
        const onScroll = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        if (!selectedProject) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedProject]);

    return (
        <SceneSection
            id="work"
            name="Work"
            order={4}
            className="relative block min-h-0 overflow-visible bg-transparent"
        >
            <div className="h-[118svh]" aria-hidden="true" />
            <div ref={projectsStartRef} className="relative z-30 min-h-screen bg-[#F0F0EB] text-[#253B2A]">
                <div
                    className="absolute inset-0 bg-[#F0F0EB] transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(.22,.75,.18,1)]"
                    style={{ clipPath: `circle(${projectsActive ? 150 : 0}vmax at 76% 48%)` }}
                />
                <div className="relative mx-auto w-[min(92vw,1360px)] py-24 md:py-36">
                    <Reveal trigger="viewport" direction="up" distance={36} className="mb-20 flex flex-col gap-8 border-b border-[#455C2F]/15 pb-14 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-5 font-body text-[9px] uppercase tracking-[0.26em] text-[#455C2F]/55">Projects index</div>
                            <h3 className="font-heading text-[clamp(3.8rem,7vw,7.5rem)] font-normal leading-[0.82] tracking-[-0.055em]">Selected<br />compositions.</h3>
                        </div>
                        <p className="max-w-sm font-body text-sm leading-[1.8] text-[#253B2A]/58">Choose a project to enter its complete case study.</p>
                    </Reveal>

                    <div className="grid gap-16">
                        {workProjects.map((project, index) => (
                            <Reveal key={project.slug} trigger="viewport" direction={index % 2 === 0 ? "left" : "right"} distance={50} duration={1}>
                                <button type="button" onClick={() => setSelectedProject(project)} className="group grid w-full cursor-pointer gap-8 text-left md:grid-cols-[1.45fr_0.55fr] md:items-end">
                                    <div className="relative aspect-[3/2] overflow-hidden bg-[#D8D8D2]">
                                        <Image src={project.assets.hero} alt={`${project.title} project cover`} fill unoptimized={project.slug === "danaday-branding"} sizes="(max-width: 768px) 92vw, 68vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]" />
                                    </div>
                                    <div className="pb-3">
                                        <div className="mb-8 font-body text-[9px] uppercase tracking-[0.24em] text-[#455C2F]/55">{String(index + 1).padStart(2, "0")} / {project.year}</div>
                                        <h4 className="font-heading text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.82] tracking-[-0.05em]">{project.title}</h4>
                                        <p className="mt-7 font-body text-sm text-[#253B2A]/60">{project.industry} · {project.country}</p>
                                        <div className="mt-10 flex w-fit items-center gap-5 border-b border-[#455C2F]/30 pb-2 font-body text-[9px] uppercase tracking-[0.24em]"><span>Open case study</span><span className="transition-transform duration-500 group-hover:translate-x-1">↗</span></div>
                                    </div>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {selectedProject && (
                <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[#F0F0EB]">
                    <button type="button" onClick={() => setSelectedProject(null)} className="fixed right-5 top-5 z-[80] flex h-12 items-center gap-3 rounded-full border border-[#455C2F]/20 bg-[#F0F0EB]/90 px-5 font-body text-[9px] uppercase tracking-[0.22em] text-[#253B2A] backdrop-blur-md transition-colors hover:bg-[#455C2F] hover:text-[#F0F0EB]" aria-label="Close project case study"><span>Close</span><span className="text-base leading-none">×</span></button>
                    <WorkProjectScene project={selectedProject} active />
                </div>
            )}

            <div
                className="pointer-events-none fixed inset-0 z-20 flex items-center justify-end px-7 md:px-14 lg:px-24 xl:px-32"
                style={{
                    opacity: reveal * (projectsActive ? 0 : 1),
                    transform: `translate3d(0, ${(1 - reveal) * 32}px, 0)`,
                    visibility: reveal > 0 ? "visible" : "hidden",
                    transition: "opacity 700ms cubic-bezier(.22,.75,.18,1)",
                }}
            >
                <div className="w-full max-w-[900px] text-right text-primary">
                    <div
                        className="mb-7 md:mb-9"
                        style={{
                            opacity: detailReveal,
                            transform: `translate3d(${(1 - detailReveal) * 18}px, 0, 0)`,
                        }}
                    >
                        <ChapterMarker
                            index="04"
                            label="Selected Work"
                            align="right"
                        />
                    </div>

                    <h2
                        className="font-heading text-balance text-[clamp(4rem,8.4vw,8.5rem)] font-normal leading-[0.78] tracking-[-0.055em]"
                        style={{
                            opacity: titleReveal,
                            transform: `translate3d(0, ${(1 - titleReveal) * 28}px, 0)`,
                        }}
                    >
                        <span className="block">Ideas, made</span>
                        <span className="mt-[0.08em] block text-secondary">
                            tangible.
                        </span>
                    </h2>

                    <div
                        className="mt-9 flex items-start justify-end gap-5 md:mt-12 md:gap-7"
                        style={{
                            opacity: detailReveal,
                            transform: `translate3d(0, ${(1 - detailReveal) * 20}px, 0)`,
                        }}
                    >
                        <p className="max-w-[590px] border-r border-secondary/45 pr-5 font-body text-sm leading-[1.75] text-primary/68 md:pr-7 md:text-lg">
                            A curated body of systems, identities, and digital experiences—each shaped around a real business challenge and built to create lasting value.
                        </p>
                    </div>

                    <div
                        className="mt-7 flex flex-wrap justify-end gap-x-5 gap-y-2 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-primary/40 md:text-xs"
                        style={{ opacity: detailReveal }}
                    >
                        <span>Strategy</span>
                        <span className="text-secondary">Identity</span>
                        <span>Digital</span>
                        <span className="text-secondary">Experience</span>
                    </div>
                </div>
            </div>
        </SceneSection>
    );
}
