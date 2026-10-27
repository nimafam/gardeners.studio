"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ActionButton } from "@/components/ui/button";

const takeaways = [
  "Start with a clear question before searching for a visual answer.",
  "Build principles that can guide many formats instead of one fixed outcome.",
  "Treat strategy as a shared tool that keeps collaboration coherent.",
] as const;

const related = [
  { index: "01", category: "Branding", title: "Growing a brand system without losing its roots", href: "/blog/growing-a-brand-system" },
  { index: "02", category: "Digital", title: "Designing digital experiences for momentum", href: "/blog/designing-for-momentum" },
  { index: "03", category: "Process", title: "From an early idea to a complete experience", href: "/blog/from-idea-to-experience" },
] as const;

export function BlogArticleClosingContent() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduceMotion ? false as const : { opacity: 0, y: 38 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <section aria-label="Article conclusion and related reading" className="bg-[var(--g-color-canvas)] px-[var(--g-gutter)] pb-32 text-[var(--g-color-primary)] md:pb-44">
      <div className="mx-auto max-w-[1200px]">
        <motion.div {...reveal()} className="grid gap-10 border-t border-[var(--g-color-primary)]/35 pt-14 md:grid-cols-[0.34fr_0.66fr] md:gap-20 md:pt-20">
          <div><p className="text-xs font-medium uppercase tracking-[0.22em] opacity-50">Closing thoughts</p><h2 className="mt-5 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-black">A direction that leaves room to grow.</h2></div>
          <div className="space-y-7 text-lg leading-9 text-black/70"><p>The most valuable strategies continue to work after the first launch. They make future decisions easier because teams understand not only what a brand looks like, but why it behaves the way it does.</p><p>That understanding turns identity into a living system. New campaigns, products and experiences can feel distinctive without losing the thread that connects them to the larger story.</p><p>For now, this closing section acts as placeholder editorial content. Later it can contain the article&apos;s final argument, supporting references and a clear invitation for readers to continue the conversation.</p></div>
        </motion.div>

        <motion.div {...reveal(0.08)} className="mt-20 overflow-hidden rounded-[20px] bg-[var(--g-color-primary)] p-8 text-white md:mt-28 md:p-14">
          <div className="flex flex-col gap-5 border-b border-white/25 pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-xs uppercase tracking-[0.22em] text-white/55">In short</p><h2 className="mt-3 text-[clamp(2.5rem,4.5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">Key takeaways</h2></div><p className="max-w-md text-sm leading-6 text-white/55">A scannable conclusion helps readers retain the central ideas before moving to the next story.</p></div>
          <div className="grid gap-8 pt-9 md:grid-cols-3">{takeaways.map((item, index) => <article key={item} className="border-white/20 md:border-r md:pr-8 last:border-r-0"><span className="grid size-9 place-items-center rounded-full bg-[var(--g-color-accent)] text-black"><Check className="size-4" strokeWidth={2} /></span><p className="mt-6 text-lg font-medium leading-7"><span className="mr-2 text-[var(--g-color-accent)]">0{index + 1}</span>{item}</p></article>)}</div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="mt-24 md:mt-32">
          <div className="flex items-end justify-between gap-8 border-b border-[var(--g-color-primary)]/35 pb-6"><div><p className="text-xs uppercase tracking-[0.2em] opacity-45">Keep reading</p><h2 className="mt-3 text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold tracking-[-0.055em] text-black">Related ideas</h2></div><ActionButton href="/blog" label="All articles" /></div>
          <div className="divide-y divide-[var(--g-color-primary)]/25">{related.map((item) => <Link key={item.href} href={item.href} className="group grid gap-4 py-8 transition-colors hover:text-black md:grid-cols-[70px_160px_1fr_48px] md:items-center"><span className="text-sm opacity-45">{item.index}</span><span className="text-xs uppercase tracking-[0.16em] text-[var(--g-color-accent)]">{item.category}</span><h3 className="text-[clamp(1.5rem,2.5vw,2.7rem)] font-medium leading-[1.05] tracking-[-0.04em]">{item.title}</h3><span className="grid size-11 place-items-center rounded-full border border-[var(--g-color-primary)]/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="size-5" strokeWidth={1.5} /></span></Link>)}</div>
        </motion.div>
      </div>
    </section>
  );
}
