"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal, SplitText, Stagger } from "@/components/motion";
import type { WorkProject } from "./WorkProjectsConfig";

interface SweetLifeProjectSceneProps {
    project: WorkProject;
    active: boolean;
}

const root = "/work/sweet-life-branding";

function useTakeover(active: boolean) {
    const [progress, setProgress] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!active) {
            return;
        }

        let startedAt: number | null = null;
        const tick = (time: number) => {
            if (startedAt === null) startedAt = time;
            const raw = Math.min((time - startedAt) / 1650, 1);
            const eased = raw * raw * (3 - 2 * raw);
            setProgress(eased);
            if (raw < 1) frameRef.current = window.requestAnimationFrame(tick);
        };
        frameRef.current = window.requestAnimationFrame(tick);
        return () => {
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
    }, [active]);

    return active ? progress : 0;
}

export function SweetLifeProjectScene({ project, active }: SweetLifeProjectSceneProps) {
    const takeover = useTakeover(active);
    const overlayOut = 1 - Math.max(0, (takeover - 0.72) / 0.28);

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 z-[55] overflow-hidden bg-[#587C37]"
                style={{ opacity: overlayOut, visibility: takeover < 0.999 ? "visible" : "hidden" }}
            >
                <div className="absolute inset-0 bg-[#F4F1E9]" style={{ clipPath: `circle(${takeover * 148}vmax at 50% 54%)` }} />
                <div className="absolute inset-x-0 bottom-[-8vh] flex items-end justify-center gap-[2.5vw]" style={{ opacity: 1 - takeover * 0.45 }}>
                    {[0.68, 0.9, 1.12, 0.82, 1.04, 0.74, 0.96].map((scale, index) => (
                        <span key={index} className="block w-[9vmin] origin-bottom rounded-[100%_0_100%_0] bg-[#587C37]" style={{ height: `${34 * scale}vmin`, transform: `translateY(${(1 - takeover) * 34}vh) scale(${0.75 + takeover * 0.25}) rotate(45deg)`, transitionDelay: `${index * 35}ms` }} />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: Math.sin(takeover * Math.PI), transform: `scale(${0.88 + takeover * 0.12})` }}>
                    <Image src={project.assets.logo} alt="Sweet Life logo" width={420} height={220} className="w-[min(42vw,360px)]" />
                </div>
            </div>

            <article className="relative z-30 overflow-hidden bg-[#F4F1E9] text-[#35432B]">
                <header className="mx-auto flex min-h-[72svh] w-[min(92vw,1240px)] flex-col items-center justify-center py-24 text-center">
                    <Reveal trigger="viewport" direction="right" distance={24} className="mb-10 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#587C37]/65">
                        <span>04</span><span className="h-px w-12 bg-[#BA4A3B]/55" /><span>Selected Work</span><span className="h-1.5 w-1.5 rounded-full bg-[#BA4A3B]" />
                    </Reveal>
                    <SplitText trigger="viewport" duration={1} stagger={0.075} className="font-heading text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.78] tracking-[-0.06em]">Sweet Life</SplitText>
                    <Stagger trigger="viewport" stagger={0.1} distance={18} delay={0.2} className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 font-body text-[9px] uppercase tracking-[0.22em] text-[#35432B]/52 md:text-[11px]">
                        <span>{project.industry}</span><span>{project.country}</span><span>{project.year}</span>
                    </Stagger>
                </header>

                <section className="mx-auto w-[min(94vw,1440px)]">
                    <Reveal trigger="viewport" direction="left" distance={58} duration={1.15}>
                        <Image src={project.assets.hero} alt="Sweet Life logo construction presentation" width={1586} height={992} priority sizes="94vw" className="h-auto w-full" />
                    </Reveal>
                </section>

                <section className="mx-auto grid w-[min(86vw,1060px)] gap-9 py-24 md:grid-cols-[0.68fr_1.32fr] md:py-32">
                    <Reveal trigger="viewport" direction="right" className="font-body text-[10px] uppercase tracking-[0.25em] text-[#BA4A3B]">The challenge</Reveal>
                    <Reveal trigger="viewport" direction="up" distance={40} duration={0.95}>
                        <p className="font-heading text-[clamp(1.7rem,2.8vw,3rem)] leading-[1.16] tracking-[-0.025em]">{project.challenge}</p>
                    </Reveal>
                </section>

                <section className="bg-[#E8EBDD] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#BA4A3B]">01 · Identity system</div>
                            <h3 className="font-heading text-[clamp(3.1rem,6vw,6.4rem)] leading-[0.86] tracking-[-0.05em]">A living mark,<br />built to grow.</h3>
                        </Reveal>
                        <Reveal trigger="viewport" direction="left" distance={52} duration={1.05}>
                            <Image src={`${root}/brand-guideline/work-logo-construction.png`} alt="Sweet Life logo construction and clear space" width={1600} height={1000} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.15} distance={44} className="mt-6 grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/brand-guideline/work-color-palette.png`} alt="Sweet Life color palette" width={1600} height={1000} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                            <Image src={`${root}/brand-guideline/work-typography.png`} alt="Sweet Life typography system" width={1600} height={1000} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                        </Stagger>
                        <Reveal trigger="viewport" direction="right" distance={46} className="mt-6">
                            <Image src={`${root}/brand-guideline/work-pattern-system.png`} alt="Sweet Life tree pattern system" width={1600} height={1000} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                    </div>
                </section>

                <section className="bg-[#35432B] py-24 text-white md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#AFC683]">02 · Digital experience</div>
                            <h3 className="font-heading text-[clamp(3.1rem,6vw,6.4rem)] leading-[0.86] tracking-[-0.05em]">Care, made<br />easier to navigate.</h3>
                        </Reveal>
                        <Reveal trigger="viewport" direction="up" distance={56} duration={1.1}>
                            <Image src={`${root}/concept-mockups/website-responsive-exact-source.png`} alt="Sweet Life responsive website presentation" width={1600} height={1000} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Reveal trigger="viewport" direction="up" distance={52} duration={1.1} className="mt-7 overflow-hidden bg-[#D9D2C4] p-4 text-[#35432B] md:p-8 lg:p-12">
                            <div className="mb-8 flex items-end justify-between gap-6 border-b border-[#35432B]/18 pb-6 font-body uppercase">
                                <div>
                                    <div className="text-[9px] tracking-[0.26em] text-[#35432B]/50">Website atlas</div>
                                    <p className="mt-3 max-w-xl text-xs normal-case leading-6 text-[#35432B]/62">Three key page journeys, framed as a compact editorial overview.</p>
                                </div>
                                <span className="hidden text-[9px] tracking-[0.22em] text-[#35432B]/42 md:block">Selected views · Original interface</span>
                            </div>

                            <Stagger trigger="viewport" stagger={0.14} distance={54} duration={1} className="grid items-start gap-4 sm:grid-cols-3 md:gap-6">
                                {[
                                    { file: "home-page.png", label: "01 · Home", width: 1440, height: 7884, offset: "" },
                                    { file: "about-us.png", label: "02 · About", width: 1440, height: 4744, offset: "sm:mt-24" },
                                    { file: "articles.png", label: "03 · Articles", width: 1440, height: 4277, offset: "sm:mt-10" },
                                ].map((page) => (
                                    <figure key={page.file} className={page.offset}>
                                        <figcaption className="mb-3 flex items-center justify-between font-body text-[8px] uppercase tracking-[0.2em] text-[#35432B]/55">
                                            <span>{page.label}</span><span className="h-1 w-1 rounded-full bg-[#BA4A3B]" />
                                        </figcaption>
                                        <div className="aspect-[3/5] overflow-hidden bg-[#F7F5EF] shadow-[0_24px_60px_rgba(53,67,43,.14)]">
                                            <div className="relative h-[78%] overflow-hidden">
                                                <Image src={`${root}/website/${page.file}`} alt={`Sweet Life website ${page.label}`} fill sizes="(max-width:639px) 86vw,28vw" className="object-cover object-top" />
                                            </div>
                                            <div className="relative h-[22%] overflow-hidden border-t-4 border-[#D9D2C4]">
                                                <Image src={`${root}/website/${page.file}`} alt="" aria-hidden fill sizes="(max-width:639px) 86vw,28vw" className="object-cover object-bottom" />
                                                <span className="absolute bottom-2 left-2 bg-[#35432B]/88 px-2 py-1 font-body text-[7px] uppercase tracking-[0.18em] text-white/75">Footer</span>
                                            </div>
                                        </div>
                                    </figure>
                                ))}
                            </Stagger>
                        </Reveal>
                    </div>
                </section>

                <section className="py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="left" className="mb-14 max-w-3xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#BA4A3B]">03 · Brand applications</div>
                            <h3 className="font-heading text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.87] tracking-[-0.05em]">A calmer system,<br />across every touchpoint.</h3>
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={46} className="grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/stationery-system-concept-01.png`} alt="Sweet Life stationery concept" width={1536} height={1024} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                            <Image src={`${root}/concept-mockups/promotional-gift-set-concept-01.png`} alt="Sweet Life promotional gift concept" width={1536} height={1024} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                        </Stagger>
                        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.2em] text-[#35432B]/48">Concept visualizations · not presented as manufactured outcomes</p>
                    </div>
                </section>

                <section className="bg-[#E8EBDD] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-12 max-w-3xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#BA4A3B]">04 · Environmental language</div>
                            <h3 className="font-heading text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.87] tracking-[-0.05em]">The pattern,<br />carried into space.</h3>
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={48} className="grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/environmental-pattern-mockup-01.png`} alt="Sweet Life environmental pattern concept" width={1586} height={992} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                            <Image src={`${root}/concept-mockups/interior-reception-concept-01.png`} alt="Sweet Life reception concept visualization" width={1535} height={1024} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                        </Stagger>
                        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.2em] text-[#35432B]/48">Concept visualization only · not documentary photography of the completed location</p>
                    </div>
                </section>

                <section className="bg-[#587C37] py-24 text-white md:py-36">
                    <div className="mx-auto w-[min(92vw,1260px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-12"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-white/60">05 · Motion</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.87] tracking-[-0.05em]">Three forms,<br />one living rhythm.</h3></Reveal>
                        <Reveal trigger="viewport" direction="left" distance={52} duration={1.05} className="aspect-video overflow-hidden bg-[#F4F1E9]"><video src={`${root}/motion/sweet-life-intro.mp4`} className="h-full w-full object-contain" autoPlay muted loop playsInline preload="metadata" /></Reveal>
                    </div>
                </section>

                <footer className="flex min-h-[58svh] items-center justify-center bg-[#F4F1E9] px-6 text-center">
                    <Reveal trigger="viewport" direction="up" distance={42}>
                        <Image src={project.assets.logo} alt="Sweet Life logo" width={320} height={160} className="mx-auto mb-10 w-48" />
                        <h3 className="font-heading text-[clamp(3rem,6vw,6.5rem)] tracking-[-0.05em]">A system for care.</h3>
                        <p className="mt-7 font-body text-[9px] uppercase tracking-[0.25em] text-[#35432B]/52">Core · Identity · Digital · Promotion</p>
                        <Link href="/work" className="mx-auto mt-11 flex w-fit items-center gap-4 rounded-full border border-[#587C37]/25 px-7 py-4 font-body text-[9px] uppercase tracking-[0.24em] transition-colors hover:bg-[#587C37] hover:text-white">Explore all projects <span>↗</span></Link>
                    </Reveal>
                </footer>
            </article>
        </>
    );
}
