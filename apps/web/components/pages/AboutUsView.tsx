"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const team = [
  { name: "Nima Feyzi", role: "Developer", image: "/brand/about/figma-image-4.png" },
  { name: "Arash Amini", role: "Designer", image: "/brand/about/figma-image-5.png" },
  { name: "Nima Feyzi", role: "Project manager", image: "/brand/about/figma-image-6.png" },
] as const;

const reasons = [
  { title: "Friendly", copy: "Our perspective is to play as a team partner to provide exceptional services, optimal for you." },
  { title: "Flexible", copy: "Every need you might encounter in your business journey has a solution here." },
  { title: "Economical", copy: "Customized packages along with an extensive network of experts make tailor-made solutions possible." },
] as const;

function DotField({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`absolute ${className}`} style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 1.5px, transparent 1.9px)", backgroundSize: "12px 12px" }} />;
}

export function AboutUsView() {
  const reduceMotion = useReducedMotion();
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 42 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="overflow-hidden bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative min-h-[720px] px-[var(--g-gutter)] pb-24 pt-44 md:min-h-[850px] md:pt-56">
        <div aria-hidden="true" className="absolute -left-40 top-0 size-[620px] rounded-full bg-[var(--g-color-accent)]/38 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-32 top-[22%] size-[520px] rounded-full bg-[var(--g-color-accent)]/55 blur-[105px]" />
        <DotField className="right-0 top-[29%] h-[250px] w-[32%] opacity-80" />
        <motion.div {...enter()} className="relative mx-auto grid max-w-[1440px] items-end gap-8 md:grid-cols-[0.36fr_1fr] md:gap-16">
          <h1 className="text-[clamp(5rem,9.5vw,10rem)] font-semibold uppercase leading-[0.78] tracking-[-0.065em] text-[var(--g-color-accent)]"><span className="block">About</span><span className="block">Us</span></h1>
          <p className="max-w-[900px] pb-2 text-[clamp(1.5rem,2.5vw,2.7rem)] font-normal uppercase leading-[1.12] tracking-[-0.04em]">We are with you in every aspect of your journey to flourish.</p>
        </motion.div>
      </section>

      <section className="px-[var(--g-gutter)] pb-28 md:pb-44">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...enter()} className="relative aspect-[1.5/1] overflow-hidden bg-white"><Image src="/brand/about/figma-image-2.jpg" alt="Gardeners team collaborating in the studio" fill priority sizes="100vw" className="object-cover grayscale" /></motion.div>
          <motion.p {...enter(0.08)} className="mt-14 max-w-[1120px] text-[clamp(1.7rem,3vw,3.2rem)] font-medium leading-[1.22] tracking-[0.01em] text-black"><strong className="font-bold">We are <span className="text-[var(--g-color-accent)]">Gardeners</span></strong><br />a team of designers, developers, marketers and consultants who made a business development studio to help others grow their business.<br />We are that piece of a puzzle that can complete your dream picture.</motion.p>
        </div>
      </section>

      <section className="relative px-[var(--g-gutter)] py-24 md:py-36">
        <DotField className="left-[-8%] top-[12%] h-[360px] w-[36%] opacity-75" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.h2 {...enter()} className="self-start text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[0.75] tracking-[-0.07em]"><span className="block text-[var(--g-color-accent)]">Who</span><span className="block text-white/50">We Are</span><span className="block text-[var(--g-color-accent)]">?</span></motion.h2>
          <div className="border-t border-[var(--g-color-primary)]/60 pt-7">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Team</h3>
            <div className="mt-8 grid gap-7 sm:grid-cols-3">
              {team.map((member, index) => <motion.article key={`${member.name}-${index}`} {...enter(index * 0.08)}><div className="relative aspect-[1.55/1] overflow-hidden bg-white"><Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, 30vw" className="object-cover" /></div><h4 className="mt-4 text-lg font-semibold text-black">{member.name}</h4><p className="mt-1 text-sm opacity-60">{member.role}</p></motion.article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--g-gutter)] py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] border-t border-[var(--g-color-primary)]/55 pt-8">
          <h2 className="text-right text-2xl font-medium text-[var(--g-color-accent)] md:text-4xl">Why us?</h2>
          <div className="mt-9">
            {reasons.map((reason, index) => <motion.div key={reason.title} {...enter(index * 0.06)} className="grid gap-3 border-b border-[var(--g-color-primary)]/35 py-6 md:grid-cols-[220px_1fr] md:items-center"><h3 className="flex items-center gap-2 text-base font-semibold text-black"><span className="size-2 rounded-full bg-[var(--g-color-accent)]" />{reason.title}</h3><p className="text-sm leading-6 opacity-70">{reason.copy}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="relative px-[var(--g-gutter)] py-24 md:py-40">
        <div aria-hidden="true" className="absolute left-0 top-1/2 h-[360px] w-[260px] -translate-y-1/2 bg-[url('/brand/testimonial/quote-down.svg')] bg-contain bg-left-center bg-no-repeat opacity-80" />
        <div className="relative mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[0.42fr_0.58fr] md:items-center">
          <motion.h2 {...enter()} className="text-[clamp(4rem,6.8vw,7.5rem)] font-medium uppercase leading-[0.78] tracking-[-0.07em]"><span className="block">Heart</span><span className="block">From</span><strong className="block font-bold text-[var(--g-color-accent)]">Garden</strong><span className="block">Owners</span></motion.h2>
          <motion.div {...enter(0.12)}><blockquote className="max-w-3xl text-[clamp(1.3rem,2.2vw,2.3rem)] font-semibold leading-[1.25] text-black">Your art should be nominated for service of the year. It fits our needs perfectly.</blockquote><p className="mt-8 text-sm uppercase opacity-70">Client Name</p><div className="relative mt-5 size-14 overflow-hidden rounded-full"><Image src="/brand/about/figma-image-3.jpg" alt="Placeholder testimonial author" fill sizes="56px" className="object-cover" /></div><div className="mt-6 flex gap-4"><span className="size-2 rounded-full border border-[var(--g-color-primary)]" /><span className="size-2 rounded-full bg-[var(--g-color-primary)]" /><span className="size-2 rounded-full border border-[var(--g-color-primary)]" /></div></motion.div>
        </div>
      </section>
    </main>
  );
}
