"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal, Stagger } from "@/components/motion";

import type { WorkProject } from "./WorkProjectsConfig";

interface TaliapharmedProjectSceneProps {
    project: WorkProject;
    active: boolean;
}

const root = "/work/taliapharmed-branding";

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
}

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
            setProgress(1 - Math.pow(1 - raw, 4));
            if (raw < 1) frameRef.current = window.requestAnimationFrame(tick);
        };

        frameRef.current = window.requestAnimationFrame(tick);
        return () => {
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
    }, [active]);

    return active ? progress : 0;
}

export function TaliapharmedProjectScene({ project, active }: TaliapharmedProjectSceneProps) {
    const takeover = useTakeover(active);
    const sparkIn = smooth(takeover / 0.3);
    const lineDraw = smooth((takeover - 0.12) / 0.34);
    const pulse = smooth((takeover - 0.56) / 0.32);
    const overlayOpacity = 1 - smooth((takeover - 0.68) / 0.32);

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden bg-[#822125]" style={{ opacity: overlayOpacity, visibility: takeover < 0.999 ? "visible" : "hidden" }}>
                <div className="absolute inset-0 grid place-items-center">
                    <div
                        className="col-start-1 row-start-1 aspect-square w-[18vmin] rounded-full bg-[#C9DC50] blur-2xl"
                        style={{ opacity: pulse * 0.58, transform: `scale(${0.4 + pulse * 7})` }}
                    />
                    <svg
                        aria-hidden
                        viewBox="180 0 212 210.18"
                        className="col-start-1 row-start-1 w-[min(28vmin,250px)] overflow-visible"
                        style={{ opacity: sparkIn * (1 - pulse * 0.32), transform: `scale(${0.3 + sparkIn * 0.7 + pulse * 0.16})` }}
                    >
                        <line pathLength="1" x1="180" y1="105.09" x2="391.97" y2="105.09" stroke="#C9DC50" strokeWidth="2" strokeDasharray="1" strokeDashoffset={1 - lineDraw} />
                        <line pathLength="1" x1="286.88" y1="0" x2="286.88" y2="210.18" stroke="#C9DC50" strokeWidth="2" strokeDasharray="1" strokeDashoffset={1 - lineDraw} />
                        <path fill="#C9DC50" d="M286.88,39.2A65.88,65.88,0,0,1,221,105.09,65.89,65.89,0,0,1,286.88,171a65.9,65.9,0,0,1,65.89-65.9A65.9,65.9,0,0,1,286.88,39.2Z" />
                    </svg>
                </div>
            </div>

            <article className="relative z-30 overflow-hidden bg-[#F4F1EA] text-[#303434]">
                <header className="relative mx-auto w-[min(92vw,1280px)] pb-10 pt-28 text-center md:pt-36">
                    <Reveal trigger="viewport" direction="down" distance={18} className="relative mb-10 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#822125]/65">
                        <span>05</span><span className="h-px w-12 bg-[#C9CC50]" /><span>Selected Work</span><span className="h-1.5 w-1.5 rotate-45 bg-[#C9CC50]" />
                    </Reveal>
                    <Reveal trigger="viewport" direction="up" distance={52} duration={1.05} className="relative">
                        <h2 className="font-heading text-[clamp(3.8rem,9vw,9rem)] leading-[0.78] tracking-[-0.06em]">Taliapharmed</h2>
                    </Reveal>
                    <Stagger trigger="viewport" stagger={0.1} distance={16} delay={0.2} className="relative mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 font-body text-[9px] uppercase tracking-[0.22em] text-[#303434]/52 md:text-[11px]">
                        <span>{project.industry}</span><span>{project.country}</span><span>{project.year}</span>
                    </Stagger>
                    <Reveal trigger="viewport" direction="up" distance={52} duration={1.05} delay={0.12} className="relative mt-14 aspect-[16/8.5] overflow-hidden bg-[#E5E4E0]">
                        <Image
                            src={`${root}/stationery/stationery-mockup-02.png`}
                            alt="Taliapharmed stationery detail"
                            fill
                            priority
                            unoptimized
                            sizes="92vw"
                            className="object-cover object-center"
                        />
                    </Reveal>
                </header>

                <section className="mx-auto w-[min(94vw,1440px)]">
                    <Reveal trigger="viewport" direction="left" distance={64} duration={1.15}>
                        <Image src={project.assets.hero} alt="Taliapharmed identity system" width={1568} height={1003} priority sizes="94vw" className="h-auto w-full" />
                    </Reveal>
                </section>

                <section className="mx-auto grid w-[min(86vw,1040px)] gap-8 py-20 md:grid-cols-[0.7fr_1.3fr] md:py-28">
                    <Reveal trigger="viewport" direction="right" className="font-body text-[10px] uppercase tracking-[0.25em] text-[#822125]">The challenge</Reveal>
                    <Reveal trigger="viewport" direction="up" distance={40} duration={0.95}>
                        <p className="font-heading text-[clamp(1.65rem,2.65vw,2.85rem)] leading-[1.16] tracking-[-0.025em]">{project.challenge}</p>
                    </Reveal>
                </section>

                <section className="bg-[#E9E7E0] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#822125]">01 · Identity system</div>
                            <h3 className="font-heading text-[clamp(3.1rem,6vw,6.4rem)] leading-[0.86] tracking-[-0.05em]">Precision,<br />made recognizable.</h3>
                        </Reveal>
                        <Image
                            src={`${root}/concept-mockups/stationery-complete-01.png`}
                            alt="Taliapharmed complete stationery system"
                            width={1536}
                            height={1024}
                            sizes="92vw"
                            loading="eager"
                            unoptimized
                            className="h-auto w-full"
                        />
                        <Stagger trigger="viewport" stagger={0.16} distance={44} className="mt-6 grid gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/identity-system-01.png`} alt="Taliapharmed logo, color, type and official pattern system" width={1568} height={1003} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                            <Image src={`${root}/stationery/business-card-mockup-01.png`} alt="Taliapharmed business cards" width={3000} height={2250} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                        </Stagger>
                    </div>
                </section>

                <section className="relative bg-[#222B08] py-24 text-white md:py-36">
                    <div className="relative mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="left" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#C9CC50]">02 · Digital experience</div>
                            <h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">Complex information,<br />held in clarity.</h3>
                        </Reveal>
                        <Reveal trigger="viewport" direction="up" distance={58} duration={1.1}>
                            <Image src={`${root}/concept-mockups/website-responsive-english-01.png`} alt="Taliapharmed responsive website presentation" width={1536} height={1024} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.14} distance={48} className="mt-7 grid gap-5 sm:grid-cols-3">
                            {[
                                ["home-page.png", "01 · Home"],
                                ["products.png", "02 · Products"],
                                ["magazine.png", "03 · Magazine"],
                            ].map(([file, label], index) => (
                                <figure key={file} className={index === 1 ? "sm:mt-16" : index === 2 ? "sm:mt-8" : ""}>
                                    <figcaption className="mb-3 flex justify-between font-body text-[8px] uppercase tracking-[0.2em] text-white/55"><span>{label}</span><span className="h-1.5 w-1.5 rotate-45 bg-[#C9CC50]" /></figcaption>
                                    <div className="aspect-[3/5] overflow-hidden bg-white">
                                        <div className="relative h-[80%]"><Image src={`${root}/website/${file}`} alt={`Taliapharmed website ${label}`} fill sizes="(max-width:639px) 86vw,28vw" className="object-cover object-top" /></div>
                                        <div className="relative h-[20%] border-t-4 border-[#C9CC50]"><Image src={`${root}/website/${file}`} alt="" aria-hidden fill sizes="(max-width:639px) 86vw,28vw" className="object-cover object-bottom" /></div>
                                    </div>
                                </figure>
                            ))}
                        </Stagger>
                    </div>
                </section>

                <section className="py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#822125]">03 · Packaging concepts</div>
                            <h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">A coherent family,<br />across changing formats.</h3>
                        </Reveal>
                        <Reveal trigger="viewport" direction="left" distance={56} duration={1.1}>
                            <Image src={`${root}/concept-mockups/packaging-family-01.png`} alt="Taliapharmed packaging family concept" width={1586} height={992} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Reveal trigger="viewport" direction="right" distance={52} duration={1.05} className="mt-6">
                            <Image src={`${root}/concept-mockups/packaging-expanded-formats-01.png`} alt="Taliapharmed expanded packaging formats concept" width={1586} height={992} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.14} distance={42} className="mt-6 grid gap-5 md:grid-cols-3">
                            {[1, 2, 3].map((number) => <Image key={number} src={`${root}/packaging/jar-mockup-0${number}.png`} alt={`Taliapharmed packaging concept ${number}`} width={700} height={933} sizes="(max-width:768px) 92vw,30vw" className="h-auto w-full bg-[#ECE9E1]" />)}
                        </Stagger>
                        <p className="mt-6 max-w-3xl font-body text-[9px] uppercase leading-5 tracking-[0.18em] text-[#303434]/45">Concept visualization · Placeholder product names and copy · No pharmaceutical efficacy, regulatory or availability claim.</p>
                    </div>
                </section>

                <section className="bg-[#822125] py-24 text-white md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-14 max-w-3xl"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#C9CC50]">04 · Brand in context</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">From the desk<br />to the environment.</h3></Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={48} className="grid gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/promotional-gifts-01.png`} alt="Taliapharmed promotional gift concept" width={1586} height={992} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                            <Image src={`${root}/concept-mockups/environmental-branding-01.png`} alt="Taliapharmed environmental branding concept" width={1586} height={992} sizes="(max-width:768px) 92vw,45vw" className="h-auto w-full" />
                        </Stagger>
                        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.2em] text-white/45">Concept applications · Not production photography</p>
                    </div>
                </section>

                <footer className="relative flex min-h-[64svh] items-center justify-center overflow-hidden bg-[#F4F1EA] px-6 text-center">
                    <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[clamp(72px,9vw,180px)] opacity-[0.16]"
                        style={{ background: `url(${root}/brand/patterns/pattern-brand-horizontal-lime.svg) center / auto 100% repeat-x` }}
                    />
                    <Reveal trigger="viewport" direction="up" distance={44} duration={1} className="relative">
                        <Image src={project.assets.logo} alt="Taliapharmed logo" width={420} height={190} className="mx-auto mb-10 w-[min(48vw,320px)]" />
                        <p className="font-body text-[9px] uppercase tracking-[0.25em] text-[#303434]/50">Core · Identity · Digital · Promotion</p>
                        <Link href="/work" className="mx-auto mt-11 flex w-fit items-center gap-4 rounded-full border border-[#822125]/25 px-7 py-4 font-body text-[9px] uppercase tracking-[0.24em] transition-colors hover:bg-[#822125] hover:text-white">Explore all projects <span>↗</span></Link>
                    </Reveal>
                </footer>
            </article>
        </>
    );
}
