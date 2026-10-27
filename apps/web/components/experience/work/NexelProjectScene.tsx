"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal, Stagger } from "@/components/motion";
import type { WorkProject } from "./WorkProjectsConfig";

interface NexelProjectSceneProps {
    project: WorkProject;
    active: boolean;
}

const guideline = "/work/nexel-branding/brand-guideline";

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function useEntrance(active: boolean) {
    const [progress, setProgress] = useState(0);
    const valueRef = useRef(0);

    useEffect(() => {
        const from = valueRef.current;
        const to = active ? 1 : 0;
        let frame = 0;
        let start: number | null = null;
        const duration = 1650 * Math.abs(to - from);
        const tick = (time: number) => {
            if (start === null) start = time;
            const t = clamp01((time - start) / Math.max(duration, 1));
            const eased = 1 - Math.pow(1 - t, 4);
            const next = from + (to - from) * eased;
            valueRef.current = next;
            setProgress(next);
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active]);

    return progress;
}

function GuidelineImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return <Image src={src} alt={alt} width={842} height={595} sizes="(max-width: 768px) 92vw, 45vw" unoptimized className={`h-auto w-full ${className}`} />;
}

export function NexelProjectScene({ project, active }: NexelProjectSceneProps) {
    const entrance = useEntrance(active);
    const exit = clamp01((entrance - 0.72) / 0.28);

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 z-[75] overflow-hidden bg-[#0B154F]"
                style={{
                    clipPath: `polygon(0 0, ${entrance * 118}% 0, ${Math.max(0, entrance * 118 - 18)}% 100%, 0 100%)`,
                    opacity: 1 - exit,
                    visibility: entrance > 0 && entrance < 0.999 ? "visible" : "hidden",
                }}
            >
                <div className="absolute right-[-8vw] top-1/2 h-[42vmax] w-[18vmax] -translate-y-1/2 rotate-45 bg-[#28C0B5]" />
                <div className="absolute inset-0 flex items-center justify-center font-heading text-[clamp(4rem,11vw,11rem)] font-semibold tracking-[-0.06em] text-white" style={{ opacity: clamp01(entrance / 0.24) * (1 - clamp01((entrance - 0.58) / 0.2)) }}>NEXEL</div>
            </div>

            <article className="relative overflow-hidden bg-white text-[#0B154F]">
                <header className="relative mx-auto flex min-h-[72svh] w-[min(92vw,1240px)] flex-col items-center justify-center py-24 text-center">
                    <div className="absolute right-[-12vw] top-[12%] h-44 w-44 rotate-45 border-[28px] border-[#28C0B5]/15 md:h-72 md:w-72" />
                    <Reveal trigger="viewport" direction="down" distance={20} className="mb-9 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#0B154F]/55"><span>02</span><span className="h-px w-12 bg-[#28C0B5]" /><span>Selected Work</span><span className="h-1.5 w-1.5 rounded-full bg-[#28C0B5]" /></Reveal>
                    <Reveal trigger="viewport" direction="up" distance={46} duration={1}><h2 className="font-heading text-[clamp(4.8rem,11vw,10rem)] font-semibold leading-[0.76] tracking-[-0.065em]">Nexel</h2></Reveal>
                    <Stagger trigger="viewport" stagger={0.09} distance={14} className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 font-body text-[9px] uppercase tracking-[0.22em] text-[#0B154F]/50"><span>{project.industry}</span><span>{project.country}</span><span>{project.year}</span></Stagger>
                </header>

                <section className="mx-auto w-[min(92vw,1360px)]">
                    <Reveal trigger="viewport" direction="left" distance={58} duration={1.1}><Image src={project.assets.hero} alt="Nexel brand applications" width={1684} height={1191} priority sizes="92vw" className="h-auto w-full" /></Reveal>
                </section>

                <section className="mx-auto grid w-[min(88vw,1120px)] gap-12 py-28 md:grid-cols-[0.72fr_1.28fr] md:py-40">
                    <Reveal trigger="viewport" direction="right" className="font-body text-[10px] uppercase tracking-[0.25em] text-[#28AFA7]">The challenge</Reveal>
                    <Reveal trigger="viewport" direction="up" distance={38} duration={0.95}><p className="font-heading text-[clamp(2rem,3.4vw,3.8rem)] font-semibold leading-[1.08] tracking-[-0.035em]">{project.challenge}</p></Reveal>
                </section>

                <section className="bg-[#F1F3F4] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1320px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-16"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#28AFA7]">01 · Logo system</div><h3 className="font-heading text-[clamp(3.2rem,6vw,6.5rem)] font-semibold leading-[0.84] tracking-[-0.05em]">A mark built<br />to move forward.</h3></Reveal>
                        <Reveal trigger="viewport" direction="up" distance={52} duration={1.05} className="relative mb-5 overflow-hidden border border-[#0B154F]/10 bg-white p-5 md:p-12">
                            <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#0B154F 1px, transparent 1px), linear-gradient(90deg, #0B154F 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
                            <div className="relative mx-auto w-full md:w-[82%]">
                                <GuidelineImage src={`${guideline}/guideline-04-logo-clear-space.png`} alt="Nexel logo construction and clear space" />
                            </div>
                            <div className="absolute bottom-5 left-6 font-body text-[8px] uppercase tracking-[0.24em] text-[#0B154F]/40">Construction · Space · Alignment</div>
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={44} className="grid items-start gap-5 md:grid-cols-2">
                            <GuidelineImage src={`${guideline}/guideline-02-logo-variations.png`} alt="Nexel logo variations" />
                            <GuidelineImage src={`${guideline}/guideline-03-logo-color-variations.png`} alt="Nexel logo color variations" />
                        </Stagger>
                    </div>
                </section>

                <section className="bg-[#0B154F] py-24 text-white md:py-36">
                    <div className="mx-auto w-[min(92vw,1320px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#28C0B5]">02 · Color system</div><h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.86] tracking-[-0.05em]">Precision with range.</h3></Reveal>
                        <Stagger trigger="viewport" stagger={0.18} distance={42} className="grid items-start gap-5 md:grid-cols-2">
                            <GuidelineImage src={`${guideline}/guideline-06-primary-palette.png`} alt="Nexel primary color palette" />
                            <GuidelineImage src={`${guideline}/guideline-07-extended-palette.png`} alt="Nexel extended color palette" />
                        </Stagger>
                    </div>
                </section>

                <section className="mx-auto w-[min(92vw,1320px)] py-24 md:py-36">
                    <Reveal trigger="viewport" direction="left" className="mb-14"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#28AFA7]">03 · Typography</div><h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.86] tracking-[-0.05em]">Bilingual by design.</h3></Reveal>
                    <Stagger trigger="viewport" stagger={0.15} distance={42} className="grid items-start gap-5 md:grid-cols-2">
                        <GuidelineImage src={`${guideline}/guideline-09-english-typography.png`} alt="Nexel English typography" />
                        <GuidelineImage src={`${guideline}/guideline-10-persian-typography.png`} alt="Nexel Persian typography" />
                        <div className="md:col-span-2"><GuidelineImage src={`${guideline}/guideline-11-typography-composition.png`} alt="Nexel typography composition" /></div>
                    </Stagger>
                </section>

                <section className="bg-[#F1F3F4] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1320px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-14"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#28AFA7]">04 · Applications</div><h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.86] tracking-[-0.05em]">The system at work.</h3></Reveal>
                        <Stagger trigger="viewport" stagger={0.17} distance={48} duration={1} className="grid items-start gap-5 md:grid-cols-2">
                            <Image src="/work/nexel-branding/concept-mockups/identity-stationery-system-concept-01.png" alt="Nexel identity and stationery system" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <Image src="/work/nexel-branding/concept-mockups/applied-brand-touchpoints-concept-01.png" alt="Nexel applied brand touchpoints" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                        </Stagger>
                    </div>
                </section>

                <section className="bg-[#E9FAF8] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1320px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14 max-w-3xl"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#28AFA7]">Promotion · Smart City Conference</div><h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.88] tracking-[-0.05em]">Identity in a public context.</h3></Reveal>
                        <Reveal trigger="viewport" direction="up" distance={52} duration={1.05}>
                            <Image src="/work/nexel-branding/concept-mockups/social-campaign-devices-final-01.png" alt="Nexel Smart City Conference campaign on tablet and mobile" width={1536} height={1024} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                    </div>
                </section>

                <footer className="flex min-h-[58svh] items-center justify-center bg-white px-6 text-center">
                    <Reveal trigger="viewport" direction="up" distance={42}><h3 className="font-heading text-[clamp(3rem,6vw,6.5rem)] font-semibold tracking-[-0.05em]">Nexel, composed.</h3><p className="mt-7 font-body text-[9px] uppercase tracking-[0.25em] text-[#0B154F]/50">Core · Identity · Digital · Promotion</p><Link href="/work" className="mx-auto mt-11 flex w-fit items-center gap-4 rounded-full border border-[#0B154F]/20 px-7 py-4 font-body text-[9px] uppercase tracking-[0.24em] transition-colors hover:bg-[#0B154F] hover:text-white">Explore all projects <span>↗</span></Link></Reveal>
                </footer>
            </article>
        </>
    );
}
