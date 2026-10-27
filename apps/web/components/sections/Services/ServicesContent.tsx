"use client";

import { ChapterMarker } from "@/components/experience";
import { Reveal, SplitText, Stagger } from "@/components/motion";
import { servicesChoreography } from "@/components/experience/choreography/ServicesChoreography";
import { useExperience, useSceneChoreography } from "@/hooks";

export function ServicesContent() {
    const { state } = useExperience();
    const choreography = useSceneChoreography(servicesChoreography);
    const typographyActive =
        state.servicesEntryTransition.progress >= 0.5 ||
        (choreography.phase === "settle" &&
            choreography.phaseProgress >= 0.05) ||
        choreography.phase === "traverse" ||
        choreography.phase === "exit";

    return (
        <div className="max-w-3xl">
            <Reveal
                trigger="manual"
                active={typographyActive}
                direction="up"
                distance={14}
                duration={0.6}
            >
                <ChapterMarker
                    index="03"
                    label="Services"
                    className="mb-7 md:mb-9"
                />
            </Reveal>

            <div className="font-heading max-w-3xl text-balance text-[clamp(3.3rem,5.8vw,6.5rem)] font-normal leading-[0.84] tracking-[-0.05em]">
                <SplitText
                    trigger="manual"
                    active={typographyActive}
                    stagger={0.045}
                    duration={0.85}
                    delay={0.08}
                    className="block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit]"
                >
                    A full repertoire—
                </SplitText>
                <SplitText
                    trigger="manual"
                    active={typographyActive}
                    stagger={0.045}
                    duration={0.85}
                    delay={0.18}
                    className="mt-[0.08em] block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit] text-secondary"
                >
                    every instrument in its place.
                </SplitText>
            </div>

            <Stagger
                trigger="manual"
                active={typographyActive}
                delay={0.38}
                stagger={0.12}
                duration={0.7}
                distance={18}
            >
                <p className="mt-8 max-w-2xl border-l border-secondary/55 pl-6 font-body text-base leading-[1.75] text-current opacity-70 md:mt-10 md:pl-7 md:text-lg">
                    Strategy, identity, digital experiences, promotion, and emerging technology—composed as one coherent business system.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-secondary md:text-xs">
                    <span>01 Core</span>
                    <span>02 Identity</span>
                    <span>03 Digital</span>
                    <span>04 Promotion</span>
                    <span>05 Edge</span>
                </div>
            </Stagger>
        </div>
    );
}
