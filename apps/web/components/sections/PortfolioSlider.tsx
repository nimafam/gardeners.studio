"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { workProjects } from "@/content/work-projects";

const projects = workProjects.slice(-3);
const projectSurfaces = ["#d7d0bd", "#d9dfcf", "#e3ded1"] as const;

const imageVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction > 0 ? -58 : 58, scale: 0.985 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, y: direction > 0 ? 58 : -58, scale: 0.985 }),
};

const copyVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -36 : 36 }),
};

export function PortfolioSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const project = projects[activeIndex];

  const selectUp = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const selectDown = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  return (
    <section id="project" className="scroll-mt-32 px-[var(--g-gutter)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="ml-auto max-w-[920px] border-b border-[var(--g-color-primary)]/35 pb-3">
          <h2 className="text-3xl font-semibold text-[var(--g-color-accent)] md:text-5xl">Portfolio</h2>
          <p className="mt-2 text-lg uppercase text-[var(--g-color-primary)]/80 md:text-2xl">Dig deeper</p>
        </div>

        <div className="mt-10 grid min-h-[520px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative z-10 overflow-hidden py-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.slug}
                custom={direction}
                variants={copyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <p className="text-xl">{String(activeIndex + 1).padStart(2, "0")}</p>
                <p className="mt-12 text-sm text-[var(--g-color-primary)]/55">/{project.services.slice(0, 2).join(" · ")}</p>
                <Link href="/work" className="mt-3 block w-fit text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-none tracking-[-0.06em] transition-colors hover:text-[var(--g-color-accent)]">
                  {project.title}
                </Link>
                <p className="mt-7 max-w-md text-sm leading-6 text-[var(--g-color-primary)]/55">{project.industry} · {project.country} · {project.year}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative ml-auto w-full max-w-[680px] pb-14">
            <div className="overflow-hidden rounded-[20px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.assets.hero}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[1.35/1] overflow-hidden rounded-[20px]"
                  style={{ backgroundColor: projectSurfaces[activeIndex] }}
                >
                  <Image src={project.assets.hero} alt={`${project.title} featured project`} fill priority={activeIndex === 0} className="object-contain p-[8%]" sizes="(max-width: 1024px) 100vw, 55vw" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 right-0 flex items-center gap-3">
              <button type="button" onClick={selectDown} aria-label="Next project" className="grid size-10 place-items-center rounded-full border border-[var(--g-color-primary)] text-[var(--g-color-primary)] transition-colors hover:border-[var(--g-color-accent)] hover:bg-[var(--g-color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--g-color-accent)]">
                <ChevronDown aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </button>
              <button type="button" onClick={selectUp} aria-label="Previous project" className="grid size-10 place-items-center rounded-full border border-[var(--g-color-primary)] text-[var(--g-color-primary)] transition-colors hover:border-[var(--g-color-accent)] hover:bg-[var(--g-color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--g-color-accent)]">
                <ChevronUp aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-12 border-b border-[var(--g-color-primary)]/30 pb-4 text-center text-xl uppercase text-[var(--g-color-primary)]/70">We are with you in every aspect of your journey to flourish.</p>
      </div>
    </section>
  );
}
