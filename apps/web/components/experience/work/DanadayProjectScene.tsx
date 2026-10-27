"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal, Stagger } from "@/components/motion";

import type { WorkProject } from "./WorkProjectsConfig";

interface DanadayProjectSceneProps {
    project: WorkProject;
    active: boolean;
}

const root = "/work/danaday-branding";

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
            const raw = Math.min((time - startedAt) / 1550, 1);
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

export function DanadayProjectScene({ project, active }: DanadayProjectSceneProps) {
    const takeover = useTakeover(active);
    const coverScale = 0.86 + takeover * 0.14;

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 z-[55] overflow-hidden bg-[#013D2D]"
                style={{ opacity: Math.max(0, 1 - Math.max(0, takeover - 0.68) / 0.32), visibility: takeover < 0.999 ? "visible" : "hidden" }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #CFC239 0 1px, transparent 1.5px)", backgroundSize: "30px 30px", transform: `scale(${coverScale})` }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: Math.min(takeover * 2.4, 1), transform: `scale(${coverScale})` }}>
                    <Image src={project.assets.logo} alt="Danaday logo" width={420} height={240} className="w-[min(42vw,340px)] brightness-0 invert" />
                </div>
            </div>

            <article className="relative z-30 overflow-hidden bg-[#F5F5F0] text-[#013D2D]">
                <header className="mx-auto flex min-h-[72svh] w-[min(92vw,1240px)] flex-col items-center justify-center py-24 text-center">
                    <Reveal trigger="viewport" direction="right" distance={24} className="mb-10 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#013D2D]/55">
                        <span>03</span><span className="h-px w-12 bg-[#CFC239]" /><span>Selected Work</span><span className="h-1.5 w-1.5 rounded-full bg-[#CFC239]" />
                    </Reveal>
                    <Reveal trigger="viewport" direction="up" distance={50} duration={1.05}>
                        <h2 className="font-heading text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.78] tracking-[-0.06em]">Danaday</h2>
                    </Reveal>
                    <Stagger trigger="viewport" stagger={0.1} distance={18} delay={0.2} className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 font-body text-[9px] uppercase tracking-[0.22em] text-[#013D2D]/50 md:text-[11px]">
                        <span>{project.industry}</span><span>{project.country}</span><span>{project.year}</span>
                    </Stagger>
                </header>

                <section className="mx-auto w-[min(94vw,1440px)]">
                    <Reveal trigger="viewport" direction="left" distance={62} duration={1.15}>
                        <Image src={project.assets.hero} alt="Danaday executive gift collection concept" width={1536} height={1024} priority sizes="94vw" className="h-auto w-full" />
                    </Reveal>
                </section>

                <section className="mx-auto grid w-[min(86vw,1040px)] gap-8 py-20 md:grid-cols-[0.72fr_1.28fr] md:py-28">
                    <Reveal trigger="viewport" direction="right" className="font-body text-[10px] uppercase tracking-[0.25em] text-[#9A8A13]">The challenge</Reveal>
                    <Reveal trigger="viewport" direction="up" distance={40} duration={0.95}>
                        <p className="font-heading text-[clamp(1.65rem,2.65vw,2.85rem)] leading-[1.16] tracking-[-0.025em]">{project.challenge}</p>
                    </Reveal>
                </section>

                <section className="bg-[#EEEDE6] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#9A8A13]">01 · Identity system</div>
                            <h3 className="font-heading text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.86] tracking-[-0.05em]">One system.<br />Many categories.</h3>
                        </Reveal>
                        <Reveal trigger="viewport" direction="left" distance={50} duration={1.05} className="bg-white">
                            <Image src={`${root}/brand-guideline/work-logo-construction-v2.png`} alt="Danaday logo geometry and construction system" width={1600} height={1000} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={46} className="mt-6 grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/brand-guideline/work-color-palette.png`} alt="Danaday primary and category color palette" width={1600} height={1000} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <Image src={`${root}/brand-guideline/work-typography-english.png`} alt="Danaday English typography system" width={1600} height={1000} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                        </Stagger>
                        <Stagger trigger="viewport" stagger={0.16} distance={46} className="mt-6 grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/stationery-system-concept-01.png`} alt="Danaday stationery system concept" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <Image src={`${root}/concept-mockups/business-cards-system-concept-01.png`} alt="Danaday business card system concept" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                        </Stagger>
                        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.2em] text-[#013D2D]/45">Stationery concept applications</p>
                    </div>
                </section>

                <section className="bg-[#013D2D] py-24 text-white md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14 max-w-4xl">
                            <div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#D8CB3F]">02 · Packaging architecture</div>
                            <h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">Difference,<br />held in coherence.</h3>
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.14} distance={44} className="grid gap-5 md:grid-cols-3">
                            {[
                                ["feed-bag-red-25kg.jpg", "Red Danaday feed bag"],
                                ["feed-bag-green-25kg.jpg", "Green Danaday feed bag"],
                                ["feed-bag-blue-25kg.jpg", "Blue Danaday feed bag"],
                            ].map(([file, alt]) => <Image key={file} src={`${root}/packaging/${file}`} alt={alt} width={800} height={800} sizes="(max-width: 768px) 92vw, 30vw" className="h-auto w-full bg-white" />)}
                        </Stagger>
                    </div>
                </section>

                <section className="bg-[#E8E9E2] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="left" className="mb-14"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#9A8A13]">03 · Digital experience</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">From product depth<br />to useful clarity.</h3></Reveal>
                        <Reveal trigger="viewport" direction="up" distance={56} duration={1.1}>
                            <Image src={`${root}/concept-mockups/website-home-responsive-concept-01.png`} alt="Danaday responsive homepage concept presentation" width={1536} height={1024} sizes="92vw" className="h-auto w-full" />
                        </Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={44} className="mt-6 grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/website-editorial-responsive-concept-01.png`} alt="Danaday magazine and article responsive concept presentation" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <Image src={`${root}/concept-mockups/website-products-responsive-concept-01.png`} alt="Danaday product pages responsive concept presentation" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                        </Stagger>
                        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.2em] text-[#013D2D]/45">Interface mockups composed from the approved website screens</p>
                    </div>
                </section>

                <section className="py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-14"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#9A8A13]">04 · Editorial system</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">A field guide<br />for the brand.</h3></Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={48} className="grid items-start gap-6 md:grid-cols-2">
                            {["1.jpg", "4.jpg", "10.jpg", "20.jpg"].map((file) => <Image key={file} src={`${root}/catalogue/Mc/${file}`} alt={`Danaday catalogue presentation ${file}`} width={file === "20.jpg" ? 3200 : 4000} height={file === "20.jpg" ? 2800 : 2670} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />)}
                        </Stagger>
                    </div>
                </section>

                <section className="bg-[#CFC239] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="up" className="mb-12"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#013D2D]/65">05 · Motion</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">The mark,<br />set in motion.</h3></Reveal>
                        <Reveal trigger="viewport" direction="left" distance={52} duration={1.05} className="aspect-video overflow-hidden bg-[#013D2D]"><video src={`${root}/motion/danaday-motion-01.mp4`} className="h-full w-full object-contain" autoPlay muted loop playsInline preload="metadata" /></Reveal>
                    </div>
                </section>

                <section className="bg-[#F5F5F0] py-24 md:py-36">
                    <div className="mx-auto w-[min(92vw,1360px)]">
                        <Reveal trigger="viewport" direction="right" className="mb-12 max-w-3xl"><div className="mb-4 font-body text-[9px] uppercase tracking-[0.25em] text-[#9A8A13]">Promotional concepts</div><h3 className="font-heading text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.87] tracking-[-0.05em]">The identity,<br />carried outward.</h3><p className="mt-6 max-w-xl font-body text-xs uppercase tracking-[0.18em] text-[#013D2D]/50">Concept visualizations · not presented as manufactured outcomes</p></Reveal>
                        <Stagger trigger="viewport" stagger={0.16} distance={46} className="grid items-start gap-6 md:grid-cols-2">
                            <Image src={`${root}/concept-mockups/promotional-tote-in-hand-concept-01.png`} alt="Danaday promotional tote concept" width={1122} height={1402} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" />
                            <div className="grid gap-6"><Image src={`${root}/concept-mockups/executive-gift-set-concept-01.png`} alt="Danaday executive gift set concept" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" /><Image src={`${root}/concept-mockups/exhibition-welcome-kit-concept-01.png`} alt="Danaday exhibition welcome kit concept" width={1536} height={1024} sizes="(max-width: 768px) 92vw, 45vw" className="h-auto w-full" /></div>
                        </Stagger>
                    </div>
                </section>

                <footer className="flex min-h-[58svh] items-center justify-center bg-[#013D2D] px-6 text-center text-white">
                    <Reveal trigger="viewport" direction="up" distance={42}>
                        <Image src={project.assets.logo} alt="Danaday logo" width={300} height={150} className="mx-auto mb-10 w-44 brightness-0 invert" />
                        <h3 className="font-heading text-[clamp(3rem,6vw,6.5rem)] tracking-[-0.05em]">Danaday, composed.</h3>
                        <p className="mt-7 font-body text-[9px] uppercase tracking-[0.25em] text-white/55">Core · Identity · Digital · Promotion · Edge</p>
                        <Link href="/work" className="mx-auto mt-11 flex w-fit items-center gap-4 rounded-full border border-white/25 px-7 py-4 font-body text-[9px] uppercase tracking-[0.24em] transition-colors hover:bg-white hover:text-[#013D2D]">Explore all projects <span>↗</span></Link>
                    </Reveal>
                </footer>
            </article>
        </>
    );
}
