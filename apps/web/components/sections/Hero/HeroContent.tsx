"use client";

import { ChapterMarker } from "@/components/experience";
import { Reveal, SplitText, Stagger } from "@/components/motion";

import { HeroActions } from "./HeroActions";

export function HeroContent() {
    return (
        <div className="max-w-5xl text-primary">
            <Reveal
                trigger="scene"
                sceneId="hero"
                direction="up"
                distance={14}
                duration={0.6}
            >
                <ChapterMarker
                    index="01"
                    label="AKORD"
                    className="mb-8 md:mb-10"
                />
            </Reveal>

            <div className="font-heading text-balance text-[clamp(3.7rem,7.6vw,8rem)] font-normal leading-[0.82] tracking-[-0.055em]">
                <SplitText
                    trigger="scene"
                    sceneId="hero"
                    stagger={0.05}
                    duration={0.86}
                    delay={0.08}
                    className="block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit]"
                >
                    Every business deserves
                </SplitText>
                <SplitText
                    trigger="scene"
                    sceneId="hero"
                    stagger={0.05}
                    duration={0.86}
                    delay={0.2}
                    className="mt-[0.08em] block font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit] text-secondary"
                >
                    a perfect composition.
                </SplitText>
            </div>

            <Stagger
                trigger="scene"
                sceneId="hero"
                delay={0.44}
                stagger={0.12}
            >
                <p className="mt-9 max-w-2xl border-l border-secondary/45 pl-6 font-body text-base leading-[1.75] text-primary/65 md:mt-11 md:pl-7 md:text-lg">
                    We compose strategy, identity, digital experiences, and growth into one coherent business performance.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-primary/40 md:text-xs">
                    <span>Strategy</span>
                    <span className="text-secondary">Identity</span>
                    <span>Digital</span>
                    <span className="text-secondary">Growth</span>
                </div>

                <HeroActions />
            </Stagger>
        </div>
    );
}
