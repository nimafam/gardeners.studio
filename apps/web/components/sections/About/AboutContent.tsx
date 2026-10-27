"use client";

import { ChapterMarker } from "@/components/experience";
import { Reveal, SplitText, Stagger } from "@/components/motion";
import { aboutChoreography } from "@/components/experience/choreography";
import { useSceneChoreography } from "@/hooks";

export function AboutContent() {
    const choreography = useSceneChoreography(aboutChoreography);
    const typographyActive =
        (choreography.phase === "settle" &&
            choreography.phaseProgress >= 0.06) ||
        choreography.phase === "traverse";

    return (
        <div className="flex max-w-3xl flex-col items-start text-primary">
            <Reveal
                trigger="manual"
                active={typographyActive}
                direction="up"
                distance={12}
                duration={0.55}
            >
                <ChapterMarker
                    index="02"
                    label="About"
                    className="mb-8 md:mb-10"
                />
            </Reveal>

            <div className="font-heading max-w-3xl text-[clamp(3.5rem,6.5vw,7rem)] font-normal leading-[0.82] tracking-[-0.055em]">
                <SplitText
                    trigger="manual"
                    active={typographyActive}
                    stagger={0.065}
                    duration={0.8}
                    delay={0.08}
                    className="block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit]"
                >
                    Strategy composed.
                </SplitText>
                <SplitText
                    trigger="manual"
                    active={typographyActive}
                    stagger={0.065}
                    duration={0.8}
                    delay={0.2}
                    className="mt-[0.08em] block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit] text-secondary"
                >
                    Execution conducted.
                </SplitText>
            </div>

            <Reveal
                trigger="manual"
                active={typographyActive}
                direction="up"
                distance={16}
                duration={0.65}
                delay={0.34}
            >
                <p className="mt-9 max-w-xl border-l border-secondary/45 pl-6 font-body text-base leading-[1.75] text-primary/65 md:mt-11 md:pl-7 md:text-lg">
                    AKORD brings strategy, identity, technology, and growth into one coherent business composition.
                </p>
            </Reveal>

            <Stagger
                trigger="manual"
                active={typographyActive}
                delay={0.48}
                stagger={0.14}
                duration={0.7}
                distance={18}
                className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-2"
            >
                <div className="relative overflow-hidden rounded-2xl border border-secondary/30 bg-secondary/[0.09] p-5 backdrop-blur-sm md:p-6">
                    <span className="absolute inset-x-0 top-0 h-px bg-secondary/80" />
                    <div className="font-body text-xs font-medium uppercase tracking-[0.22em] text-secondary">
                        Composer
                    </div>
                    <p className="mt-3 max-w-xs font-body text-sm leading-6 text-primary/58">
                        Defining the strategy, structure, and direction of the business.
                    </p>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.055] p-5 backdrop-blur-sm md:p-6">
                    <span className="absolute inset-x-0 top-0 h-px bg-accent/65" />
                    <div className="font-body text-xs font-medium uppercase tracking-[0.22em] text-accent">
                        Conductor
                    </div>
                    <p className="mt-3 max-w-xs font-body text-sm leading-6 text-primary/58">
                        Orchestrating disciplines, teams, and execution into one aligned performance.
                    </p>
                </div>
            </Stagger>
        </div>
    );
}
