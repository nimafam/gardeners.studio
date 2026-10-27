"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SceneSection } from "@/components/experience";
import { Reveal, SplitText, Stagger } from "@/components/motion";
import { ContactInquiryForm } from "./ContactInquiryForm";

function clamp01(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function ease(value: number) {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
}

const TRANSITION_DURATION = 2100;
const REDUCED_TRANSITION_DURATION = 1150;

export function Contact() {
    const rootRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number | null>(null);
    const scrollFrameRef = useRef<number | null>(null);
    const startedRef = useRef(false);
    const progressRef = useRef(0);
    const [progress, setProgress] = useState(0);
    const [contentActive, setContentActive] = useState(false);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const startTransition = () => {
            if (startedRef.current) return;
            startedRef.current = true;

            const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? REDUCED_TRANSITION_DURATION
                : TRANSITION_DURATION;
            const startedAt = performance.now();
            const tick = (now: number) => {
                const next = clamp01((now - startedAt) / duration);
                progressRef.current = next;
                setProgress(next);
                if (next >= 0.58) setContentActive(true);
                if (next < 1) frameRef.current = window.requestAnimationFrame(tick);
            };
            frameRef.current = window.requestAnimationFrame(tick);
        };

        const settleOnContact = () => {
            if (scrollFrameRef.current !== null) {
                window.cancelAnimationFrame(scrollFrameRef.current);
            }

            const from = window.scrollY;
            const to = root.getBoundingClientRect().top + window.scrollY;
            const distance = to - from;
            const duration = 850;
            let startedAt: number | null = null;

            const tick = (now: number) => {
                if (startedAt === null) startedAt = now;
                const elapsed = clamp01((now - startedAt) / duration);
                const eased = elapsed * elapsed * elapsed * (elapsed * (elapsed * 6 - 15) + 10);
                window.scrollTo(0, from + distance * eased);

                if (elapsed < 1) {
                    scrollFrameRef.current = window.requestAnimationFrame(tick);
                } else {
                    scrollFrameRef.current = null;
                }
            };

            scrollFrameRef.current = window.requestAnimationFrame(tick);
        };

        const canBeginHandoff = () => {
            if (startedRef.current) return false;
            const rect = root.getBoundingClientRect();
            return rect.top <= window.innerHeight * 1.3 && rect.bottom > 0;
        };
        const beginHandoff = () => {
            settleOnContact();
            startTransition();
        };
        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY <= 0 || !canBeginHandoff()) return;
            event.preventDefault();
            beginHandoff();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!["ArrowDown", "PageDown", " "].includes(event.key) || !canBeginHandoff()) return;
            event.preventDefault();
            beginHandoff();
        };

        const handleScroll = () => {
            const rect = root.getBoundingClientRect();

            if (
                !startedRef.current &&
                window.location.hash === "#contact" &&
                rect.top <= window.innerHeight * 0.72 &&
                rect.bottom > 0
            ) {
                startTransition();
            }

            // Allow the handoff to replay after the visitor has genuinely
            // returned to Work. This also prevents stale mount-time state.
            if (rect.top > window.innerHeight * 1.08 && progressRef.current >= 1) {
                startedRef.current = false;
                progressRef.current = 0;
                setProgress(0);
                setContentActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);

        // Browser scroll restoration happens after mount. Delay this check so
        // a refresh at Contact can replay the handoff without allowing an
        // unstable first layout to trigger it off-screen.
        const restorationTimer = window.setTimeout(() => {
            const rect = root.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            if (visibleHeight >= window.innerHeight * 0.28) startTransition();
        }, 900);

        return () => {
            window.clearTimeout(restorationTimer);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
            if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
        };
    }, []);

    const gather = ease(progress / 0.34);
    const resolve = ease((progress - 0.24) / 0.42);
    const contactIn = ease((progress - 0.52) / 0.32);
    const geometryOut = 1 - ease((progress - 0.48) / 0.3);
    const labelOut = 1 - ease(progress / 0.24);
    const notes = [{ x: -35, y: 20 }, { x: -17, y: 35 }, { x: 0, y: 50 }, { x: 18, y: 65 }, { x: 36, y: 80 }];

    return (
        <SceneSection id="contact" name="Contact" order={5} className="relative block min-h-0 overflow-visible bg-[#01362E] text-white">
            <div ref={rootRef} className="relative min-h-svh overflow-hidden bg-[#F0F0EB]">
                <div
                    className="absolute inset-0 bg-[#01362E] will-change-[clip-path]"
                    style={{ clipPath: `circle(${resolve * 145}vmax at 50% 50%)` }}
                />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: geometryOut }}>
                    <div className="relative h-[38vh] w-[min(82vw,1180px)]">
                        {[0, 1, 2, 3, 4].map((line) => (
                            <span
                                key={line}
                                className="absolute h-px bg-[#01362E]/20"
                                style={{ top: `${20 + line * 15}%`, left: `${gather * 28}%`, width: `${100 - gather * 56}%`, opacity: 1 - resolve }}
                            />
                        ))}
                        {notes.map((note, index) => {
                            const x = 50 + note.x + (50 + (index - 2) * 2.4 - (50 + note.x)) * gather;
                            const y = note.y + (50 + (index - 2) * 8 - note.y) * gather;
                            return (
                                <span
                                    key={index}
                                    className="absolute h-3 w-3 rounded-full bg-[#BB987D] shadow-[0_0_0_8px_rgba(187,152,125,.08)] md:h-4 md:w-4"
                                    style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) scale(${0.8 + gather * 0.35})` }}
                                />
                            );
                        })}
                        <span
                            className="absolute left-1/2 top-1/2 aspect-square rounded-full border border-[#BB987D]/40"
                            style={{ width: `${12 + resolve * 70}vmin`, opacity: resolve, transform: `translate(-50%,-50%) rotateX(${72 - resolve * 48}deg)` }}
                        />
                    </div>
                </div>

                <div
                    className="pointer-events-none absolute inset-x-0 top-[14%] text-center font-body text-[9px] uppercase tracking-[.28em] text-[#01362E]/45"
                    style={{ opacity: labelOut, transform: `translateY(${progress * -24}px)` }}
                >
                    Selected compositions · final cadence
                </div>

                <div
                    className="relative z-10 mx-auto grid min-h-svh w-[min(90vw,1320px)] gap-12 pb-12 pt-28 lg:grid-cols-[.78fr_1.22fr] lg:items-center"
                    style={{ pointerEvents: contactIn > 0.82 ? "auto" : "none" }}
                >
                    <div style={{ visibility: contentActive ? "visible" : "hidden" }}>
                        <Stagger active={contentActive} trigger="manual" stagger={0.09} distance={18} className="flex items-center gap-4 font-body text-[9px] uppercase tracking-[.28em] text-[#BB987D]">
                            <span>05</span>
                            <span className="h-px w-12 bg-[#BB987D]/55" />
                            <span>Contact</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#BB987D]" />
                        </Stagger>
                        <div className="mt-9">
                            <SplitText active={contentActive} trigger="manual" duration={0.9} stagger={0.08} className="font-heading text-[clamp(3.7rem,7vw,7.6rem)] leading-[.79] tracking-[-.055em] text-white">The next</SplitText>
                            <SplitText active={contentActive} trigger="manual" delay={0.16} duration={0.9} stagger={0.08} className="font-heading text-[clamp(3.7rem,7vw,7.6rem)] leading-[.79] tracking-[-.055em] text-[#BB987D]">movement.</SplitText>
                        </div>
                        <Reveal active={contentActive} trigger="manual" direction="left" distance={30} delay={0.34} duration={0.9}>
                            <p className="mt-8 max-w-md border-l border-[#BB987D]/45 pl-6 font-body text-sm leading-7 text-white/60">Tell us where the business stands and what the next composition needs to achieve.</p>
                        </Reveal>
                    </div>

                    <div style={{ visibility: contentActive ? "visible" : "hidden" }}>
                        <Reveal active={contentActive} trigger="manual" direction="right" distance={42} delay={0.2} duration={1}>
                            <ContactInquiryForm active={contentActive} />
                        </Reveal>
                    </div>
                </div>
            </div>

            <footer className="relative bg-[#01362E] px-6 py-10 md:px-12">
                <div className="mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-white/15 pt-9 font-body text-[9px] uppercase tracking-[.22em] text-white/42 md:flex-row md:items-center md:justify-between">
                    <span>AKORD · Every business deserves a perfect composition.</span>
                    <div className="flex flex-wrap gap-6"><Link href="/#about">About</Link><Link href="/#services">Services</Link><Link href="/work">Work</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
                </div>
            </footer>
        </SceneSection>
    );
}
