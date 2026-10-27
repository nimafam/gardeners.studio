"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal, Stagger } from "@/components/motion";

import type { WorkProject } from "./WorkProjectsConfig";
import { DanadayProjectScene } from "./DanadayProjectScene";
import { NexelProjectScene } from "./NexelProjectScene";
import { SweetLifeProjectScene } from "./SweetLifeProjectScene";
import { TaliapharmedProjectScene } from "./TaliapharmedProjectScene";

interface WorkProjectSceneProps {
    project: WorkProject;
    active: boolean;
}

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
}

function useAutonomousProgress(active: boolean, duration: number) {
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);

        const from = progressRef.current;
        const to = active ? 1 : 0;
        if (Math.abs(to - from) < 0.001) return;

        let startTime: number | null = null;
        const adjustedDuration = duration * Math.abs(to - from);
        const tick = (time: number) => {
            if (startTime === null) startTime = time;
            const elapsed = clamp01((time - startTime) / adjustedDuration);
            const eased = elapsed < 0.5
                ? 4 * elapsed ** 3
                : 1 - Math.pow(-2 * elapsed + 2, 3) / 2;
            const next = from + (to - from) * eased;

            progressRef.current = next;
            setProgress(next);
            frameRef.current = elapsed < 1
                ? window.requestAnimationFrame(tick)
                : null;
        };

        frameRef.current = window.requestAnimationFrame(tick);
        return () => {
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
    }, [active, duration]);

    return progress;
}

function BrowserMockup({ src, title }: { src: string; title: string }) {
    return (
        <div className="overflow-hidden rounded-[1.35rem] border border-[#455C2F]/15 bg-[#F7F7F3] shadow-[0_40px_100px_rgba(43,55,37,0.15)]">
            <div className="flex h-11 items-center gap-2 border-b border-[#455C2F]/10 px-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#455C2F]/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9C9EA1]/55" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D7D9D2]" />
                <span className="mx-auto h-5 w-[34%] rounded-full bg-[#455C2F]/[0.06]" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={src} alt={title} fill sizes="(max-width: 768px) 92vw, 72vw" className="object-cover object-top" />
            </div>
        </div>
    );
}

function PhoneMockup({ src, title }: { src: string; title: string }) {
    return (
        <div className="rounded-[2rem] border-[7px] border-[#253B2A] bg-[#253B2A] p-1 shadow-[0_35px_80px_rgba(28,45,32,0.25)]">
            <div className="relative aspect-[440/860] overflow-hidden rounded-[1.35rem] bg-white">
                <Image src={src} alt={title} fill sizes="(max-width: 768px) 38vw, 18vw" className="object-cover object-top" />
                <span className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#253B2A]" />
            </div>
        </div>
    );
}

function ShimojProjectScene({ project, active }: WorkProjectSceneProps) {
    const takeover = useAutonomousProgress(active, 1900);
    const fieldIn = smooth(takeover / 0.62);
    const logoIn = smooth(takeover / 0.22) * (1 - smooth((takeover - 0.58) / 0.22));
    const overlayOut = 1 - smooth((takeover - 0.7) / 0.3);

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 z-[55] overflow-hidden bg-[#455C2F]"
                style={{
                    clipPath: `circle(${fieldIn * 150}vmax at 76% 52%)`,
                    opacity: overlayOut,
                    visibility: takeover > 0 && takeover < 0.999 ? "visible" : "hidden",
                }}
            >
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: logoIn, transform: `scale(${0.9 + takeover * 0.1})` }}
                >
                    {project.assets.logoMotion ? (
                        <video
                            className="h-[32vmin] w-[32vmin] object-contain mix-blend-screen"
                            src={project.assets.logoMotion}
                            autoPlay
                            muted
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <Image src={project.assets.logo} alt={`${project.title} logo`} width={380} height={160} className="w-[24vmin] brightness-0 invert" />
                    )}
                </div>
            </div>

            <article className="relative z-30 overflow-hidden bg-[#F0F0EB] text-[#253B2A]">
                <header className="mx-auto flex min-h-[68svh] w-[min(92vw,1180px)] flex-col items-center justify-center py-20 text-center md:min-h-[74svh]">
                    <Reveal trigger="viewport" direction="down" distance={18} duration={0.75} className="mb-10 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#455C2F]/60 md:text-[10px]">
                        <span>01</span><span className="h-px w-12 bg-[#455C2F]/30" /><span>Selected Work</span><span className="h-1.5 w-1.5 rounded-full bg-[#455C2F]" />
                    </Reveal>
                    <Reveal trigger="viewport" direction="up" distance={46} duration={1.05} delay={0.08}>
                        <h2 className="font-heading text-[clamp(4.8rem,11vw,10rem)] font-normal leading-[0.72] tracking-[-0.065em]">{project.title}</h2>
                    </Reveal>
                    <Stagger trigger="viewport" stagger={0.09} distance={14} delay={0.22} className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 font-body text-[9px] uppercase tracking-[0.22em] text-[#253B2A]/55 md:text-[11px]">
                        <span>{project.industry}</span><span>{project.country}</span><span>{project.year}</span>
                    </Stagger>
                </header>

                <section className="mx-auto w-[min(94vw,1420px)]">
                    <Reveal trigger="viewport" direction="up" distance={54} duration={1.15} className="relative aspect-[16/10] overflow-hidden bg-[#DCDDDA]">
                        <Image src={project.assets.hero} alt={`${project.title} catalogue cover`} fill priority sizes="94vw" className="object-cover" />
                    </Reveal>
                </section>

                <section className="mx-auto grid w-[min(88vw,1120px)] gap-12 py-28 md:grid-cols-[0.8fr_1.2fr] md:py-40">
                    <Reveal trigger="viewport" direction="right" distance={30} className="font-body text-[10px] uppercase tracking-[0.25em] text-[#455C2F]/60">The project</Reveal>
                    <Reveal trigger="viewport" direction="left" distance={44} duration={0.95}>
                        <h3 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,5rem)] font-normal leading-[0.92] tracking-[-0.04em]">One connected identity, expressed across every touchpoint.</h3>
                        <p className="mt-10 max-w-2xl font-body text-base leading-[1.9] text-[#253B2A]/68 md:text-lg">{project.outcome.split(" No unverified")[0]}</p>
                    </Reveal>
                </section>

                {project.assets.websiteDesktop && project.assets.websiteMobile && (
                    <section className="bg-[#DDE1D7] py-24 md:py-36">
                        <div className="mx-auto w-[min(92vw,1320px)]">
                            <Reveal trigger="viewport" direction="up" distance={32} className="mb-14 flex items-end justify-between gap-6">
                                <div><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#455C2F]/60">Digital Experience</div><h3 className="font-heading text-[clamp(3rem,5vw,5.5rem)] leading-[0.86] tracking-[-0.045em]">Website, from desktop<br />to mobile.</h3></div>
                                <span className="hidden font-body text-[10px] uppercase tracking-[0.22em] text-[#455C2F]/45 md:block">Responsive system</span>
                            </Reveal>
                            {project.assets.websiteDevicesMockup ? (
                                <Reveal trigger="viewport" direction="left" distance={58} duration={1.1} className="relative aspect-[3/2] overflow-hidden bg-[#D8D8D0]">
                                    <Image src={project.assets.websiteDevicesMockup} alt={`${project.title} responsive website presentation`} fill sizes="92vw" className="object-cover" />
                                </Reveal>
                            ) : (
                                <Reveal trigger="viewport" direction="left" distance={58} duration={1.1} className="relative pb-20 md:pr-[13%]">
                                    <BrowserMockup src={project.assets.websiteDesktop} title={`${project.title} website desktop`} />
                                    <div className="absolute -bottom-3 right-[3%] w-[28%] max-w-[280px] md:bottom-0">
                                        <PhoneMockup src={project.assets.websiteMobile} title={`${project.title} website mobile`} />
                                    </div>
                                </Reveal>
                            )}
                            {project.assets.websiteMobileHandMockup && (
                                <Reveal trigger="viewport" direction="right" distance={46} duration={1} className="ml-auto mt-6 w-full overflow-hidden bg-[#D8D8D0] md:w-[62%]">
                                    <Image src={project.assets.websiteMobileHandMockup} alt={`${project.title} mobile website in use`} width={1536} height={1024} sizes="(max-width: 768px) 92vw, 58vw" className="h-auto w-full" />
                                </Reveal>
                            )}
                        </div>
                    </section>
                )}

                <section className="bg-[#455C2F] py-20 text-[#F0F0EB] md:py-28">
                    <div className="mx-auto grid w-[min(88vw,1120px)] gap-10 md:grid-cols-[0.75fr_1.25fr]">
                        <Reveal trigger="viewport" direction="right" distance={30} className="font-body text-[10px] uppercase tracking-[0.26em] text-white/55">The challenge</Reveal>
                        <Reveal trigger="viewport" direction="up" distance={38} duration={0.95}>
                            <p className="font-heading text-[clamp(1.9rem,3.15vw,3.55rem)] font-normal leading-[1.1] tracking-[-0.03em]">{project.challenge}</p>
                        </Reveal>
                    </div>
                </section>

                <section className="mx-auto w-[min(92vw,1320px)] py-28 md:py-40">
                    <Reveal trigger="viewport" direction="up" distance={34} className="mb-16 text-center"><div className="mb-5 font-body text-[9px] uppercase tracking-[0.25em] text-[#455C2F]/60">Identity System</div><h3 className="font-heading text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.85] tracking-[-0.05em]">Built from a living mark.</h3></Reveal>
                    <Stagger trigger="viewport" stagger={0.16} distance={52} duration={0.9} className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
                        <div className="relative flex min-h-[580px] items-center justify-center overflow-hidden bg-[#E2E3DE]">
                            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#455C2F 1px, transparent 1px), linear-gradient(90deg, #455C2F 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
                            <div className="absolute h-[66%] aspect-square rounded-full border border-[#455C2F]/25" /><div className="absolute h-[43%] aspect-square rounded-full border border-[#455C2F]/25" /><div className="absolute inset-x-[12%] top-1/2 h-px bg-[#455C2F]/25" /><div className="absolute inset-y-[12%] left-1/2 w-px bg-[#455C2F]/25" />
                            <Image src={project.assets.symbol} alt={`${project.title} symbol construction`} width={300} height={300} className="relative z-10 w-[27%]" />
                        </div>
                        <div className="grid grid-cols-2">
                            {[{hex:"#455C2F",name:"Forest"},{hex:"#9C9EA1",name:"Stone"},{hex:"#F0F0EB",name:"Paper"},{hex:"#253B2A",name:"Deep Green"}].map((color) => (
                                <div key={color.hex} className="flex min-h-[285px] flex-col justify-end p-6" style={{ backgroundColor: color.hex, color: color.hex === "#F0F0EB" ? "#253B2A" : "#F0F0EB" }}><span className="font-body text-[9px] uppercase tracking-[0.2em]">{color.name}</span><span className="mt-2 font-body text-xs opacity-65">{color.hex}</span></div>
                            ))}
                        </div>
                    </Stagger>
                </section>

                {project.assets.logoMotion && (
                    <section className="mx-auto w-[min(92vw,1320px)] pb-28 md:pb-40">
                        <Reveal trigger="viewport" direction="right" distance={26} className="mb-8 flex items-center justify-between font-body text-[9px] uppercase tracking-[0.24em] text-[#455C2F]/55"><span>Logo motion</span><span>Motion principle</span></Reveal>
                        <Reveal trigger="viewport" direction="up" distance={48} duration={1.05} className="aspect-video overflow-hidden bg-[#455C2F]"><video className="h-full w-full object-contain" src={project.assets.logoMotion} autoPlay muted loop playsInline preload="metadata" /></Reveal>
                    </section>
                )}

                {project.assets.brandGiftsMockup && (
                    <section className="mx-auto w-[min(92vw,1320px)] pb-28 md:pb-40">
                        <Reveal trigger="viewport" direction="right" distance={30} className="mb-10 max-w-xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#455C2F]/60">Brand applications</div>
                            <h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] leading-[0.88] tracking-[-0.045em]">Identity, made physical.</h3>
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={48} duration={1} className="grid gap-5 md:grid-cols-2">
                            <Image src={project.assets.brandGiftsMockup} alt={`${project.title} brand applications`} width={1535} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            {project.assets.toteBagMockup && <Image src={project.assets.toteBagMockup} alt={`${project.title} branded tote bag`} width={1535} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />}
                        </Stagger>
                    </section>
                )}

                <section className="bg-[#DFDFDA] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1320px)]">
                        <Reveal trigger="viewport" direction="left" distance={34} className="mb-14 max-w-2xl"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#455C2F]/60">Editorial system</div><h3 className="font-heading text-[clamp(3rem,5.5vw,6rem)] leading-[0.88] tracking-[-0.045em]">A consistent voice in print.</h3></Reveal>
                        {project.assets.businessCardsMockup && (
                            <Reveal trigger="viewport" direction="up" distance={48} duration={1.05} className="mb-5 overflow-hidden bg-[#D2D2CE]">
                                <Image src={project.assets.businessCardsMockup} alt={`${project.title} business cards`} width={1535} height={1024} sizes="92vw" className="h-auto w-full" />
                            </Reveal>
                        )}
                        <Stagger trigger="viewport" stagger={0.14} distance={42} duration={0.85} className="grid items-start gap-5 md:grid-cols-2">
                            <Image src="/work/shimojco/catalogue/catalogue-mockup-01.jpg" alt={`${project.title} catalogue opening spread`} width={4000} height={2670} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <Image src="/work/shimojco/catalogue/catalogue-mockup-07.jpg" alt={`${project.title} catalogue structure spread`} width={4000} height={2670} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <div>
                                <Image src="/work/shimojco/catalogue/catalogue-mockup-23.jpg" alt={`${project.title} catalogue cover`} width={3200} height={2800} sizes="(max-width: 768px) 92vw, 66vw" className="h-auto w-full" />
                            </div>
                            <div>
                                <Image src={project.assets.detail} alt={`${project.title} brochure system`} width={3000} height={2250} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            </div>
                        </Stagger>
                    </div>
                </section>

                <footer className="flex min-h-[62svh] items-center justify-center bg-[#F0F0EB] px-6 text-center">
                    <Reveal trigger="viewport" direction="up" distance={42} duration={1}>
                        <Image src={project.assets.logo} alt={`${project.title} logo`} width={280} height={120} className="mx-auto mb-9 w-36" />
                        <p className="font-body text-[10px] uppercase tracking-[0.26em] text-[#455C2F]/55">Core · Identity · Digital · Promotion · Edge</p>
                        <Link href="/work" className="group mx-auto mt-12 flex w-fit items-center gap-5 rounded-full border border-[#455C2F]/25 px-7 py-4 font-body text-[10px] uppercase tracking-[0.24em] transition-colors duration-500 hover:bg-[#455C2F] hover:text-[#F0F0EB]"><span>Explore all projects</span><span className="transition-transform duration-500 group-hover:translate-x-1">↗</span></Link>
                    </Reveal>
                </footer>
            </article>
        </>
    );
}

export function WorkProjectScene(props: WorkProjectSceneProps) {
    if (props.project.slug === "danaday-branding") {
        return <DanadayProjectScene {...props} />;
    }

    if (props.project.slug === "nexel-branding") {
        return <NexelProjectScene {...props} />;
    }

    if (props.project.slug === "sweet-life-branding") {
        return <SweetLifeProjectScene {...props} />;
    }

    if (props.project.slug === "taliapharmed-branding") {
        return <TaliapharmedProjectScene {...props} />;
    }

    return <ShimojProjectScene {...props} />;
}
