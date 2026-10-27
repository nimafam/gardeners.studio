"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function BlogArticleExtendedContent() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduceMotion ? false as const : { opacity: 0, y: 42 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <section aria-label="Extended article content" className="overflow-hidden bg-[var(--g-color-canvas)] px-[var(--g-gutter)] pb-32 text-[var(--g-color-primary)] md:pb-44">
      <div className="mx-auto max-w-[1200px]">
        <motion.blockquote {...reveal()} className="relative border-y border-[var(--g-color-primary)]/35 py-14 pl-[clamp(2rem,8vw,8rem)] pr-4 md:py-20">
          <span aria-hidden="true" className="absolute left-0 top-8 h-24 w-20 bg-[url('/brand/testimonial/quote-down.svg')] bg-contain bg-left-top bg-no-repeat opacity-75 md:top-14 md:h-32 md:w-28" />
          <p className="max-w-[920px] text-[clamp(2.1rem,4.5vw,5rem)] font-medium leading-[1.05] tracking-[-0.05em] text-black">Good strategy does not limit creative expression. It gives every idea a reason to exist.</p>
          <footer className="mt-7 text-xs font-medium uppercase tracking-[0.18em] opacity-55">Gardeners Journal · Placeholder quote</footer>
        </motion.blockquote>

        <motion.div {...reveal(0.08)} className="mx-auto mt-20 grid max-w-[980px] gap-7 text-lg leading-9 text-black/70 md:mt-28">
          <p>Strategy begins by defining the problem with enough clarity that a team can make confident decisions. It connects business goals, audience needs and the character of a brand before visual choices begin to compete for attention.</p>
          <p>When that foundation is shared, collaboration becomes faster and more generous. Designers can explore, writers can develop a distinctive voice and developers can build systems that remain coherent as new requirements appear.</p>
        </motion.div>

        <motion.figure {...reveal(0.08)} className="mt-20 md:mt-28">
          <button type="button" aria-label="Play placeholder video" className="group relative grid aspect-video w-full place-items-center overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_72%_28%,#E2E417_0%,#7d9c31_24%,#003F3F_65%)]">
            <span aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(255,255,255,.9)_0_1.4px,transparent_1.8px)] [background-size:12px_12px]" />
            <span className="relative grid size-20 place-items-center rounded-full bg-white text-[var(--g-color-primary)] shadow-[0_16px_50px_rgba(0,0,0,.2)] transition-transform duration-500 group-hover:scale-110 md:size-28"><Play className="ml-1 size-8 md:size-11" fill="currentColor" strokeWidth={1.2} /></span>
            <span className="absolute bottom-7 left-7 text-xs font-medium uppercase tracking-[0.2em] text-white/80">Video placeholder · Brand strategy in motion</span>
          </button>
          <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] opacity-45">A future embedded video or motion case study</figcaption>
        </motion.figure>

        <div className="mt-20 grid items-start gap-12 md:mt-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <motion.div {...reveal()} className="space-y-7 text-lg leading-9 text-black/70">
            <p>A useful strategic system is specific enough to guide the work and flexible enough to evolve. Instead of prescribing a single answer, it creates principles that can respond to different formats, audiences and moments.</p>
            <p>The result is expression with continuity: each touchpoint can feel fresh while still belonging to the same story. This placeholder section will later support rich text, linked research and project-specific insights from the CMS.</p>
          </motion.div>
          <motion.figure {...reveal(0.1)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#d8d8d8_0%,#f5f5f5_45%,#b2b3b6_100%)]">
              <div aria-hidden="true" className="absolute -bottom-[18%] -right-[8%] size-[72%] rounded-full bg-[var(--g-color-accent)]/75 blur-[55px]" />
              <div aria-hidden="true" className="absolute left-[9%] top-[10%] h-[70%] w-[58%] rotate-[-5deg] rounded-[20px] border border-[var(--g-color-primary)]/20 bg-white/65 p-8 shadow-[0_30px_70px_rgba(0,0,0,.12)]"><span className="text-xs font-semibold uppercase tracking-[0.2em]">Editorial image placeholder</span><span className="mt-12 block text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.9] tracking-[-0.06em]">Ideas need a clear place to grow.</span></div>
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] opacity-45">Supporting article image placeholder</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
