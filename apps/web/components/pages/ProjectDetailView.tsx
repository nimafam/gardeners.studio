"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { WorkProject } from "@/content/work-projects";

const sideSocials = [
  ["Behance", "/brand/icons/social/behance-black.svg", 21, 13],
  ["LinkedIn", "/brand/icons/social/linkedin-black.svg", 16, 15],
  ["Facebook", "/brand/icons/social/facebook-black.svg", 9, 17],
  ["Twitter", "/brand/icons/social/twitter-black.svg", 16, 13],
] as const;
const shareSocials = [
  ["Instagram", "/brand/icons/social/instagram-primary.svg", 21, 21],
  ["Facebook", "/brand/icons/social/facebook-primary.svg", 9, 17],
  ["LinkedIn", "/brand/icons/social/linkedin-primary.svg", 16, 15],
] as const;

function DotField({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`absolute opacity-70 ${className}`} style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.96) 0 1.35px, transparent 1.7px)", backgroundSize: "11px 11px" }} />;
}

function SocialMarks({ placement }: { placement: "side" | "share" }) {
  const items = placement === "side" ? sideSocials : shareSocials;
  return <div className={`flex items-center gap-5 ${placement === "side" ? "flex-col" : ""}`}>{items.map(([label, src, width, height]) => <Link key={label} href="#" aria-label={label} className="grid size-6 place-items-center transition-transform duration-300 hover:-translate-y-0.5"><Image src={src} alt="" width={width} height={height} className="max-h-[21px] w-auto" /></Link>)}</div>;
}

export function ProjectDetailView({ project }: { project: WorkProject }) {
  const reduceMotion = useReducedMotion();
  const gallery = project.gallery.slice(0, 3);
  const category = project.services[0] ?? project.industry;
  return (
    <main className="overflow-hidden bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative px-[var(--g-gutter)] pb-10 pt-40 md:pb-16 md:pt-48">
        <div aria-hidden="true" className="absolute left-[28%] top-[26%] size-[360px] rounded-full bg-[var(--g-color-accent)]/45 blur-[95px] md:size-[520px]" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-[1440px] text-center">
          <h1 className="text-[clamp(4.2rem,8.6vw,9.2rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-black">{project.title}</h1>
          <div className="mx-auto mt-8 max-w-[900px] border-t border-[var(--g-color-primary)]/70 pt-5"><p className="text-[clamp(1.4rem,2.2vw,2.35rem)] font-normal tracking-[-0.035em]">{category}</p></div>
        </motion.div>
      </section>
      <section className="relative px-[var(--g-gutter)] pb-[clamp(8rem,18vw,20rem)] pt-6 md:pt-10">
        <DotField className="right-[-4%] top-5 h-[260px] w-[26%]" /><DotField className="right-[8%] top-[17%] h-[260px] w-[25%]" />
        <div aria-hidden="true" className="absolute bottom-[8%] left-[-10%] size-[430px] rounded-full bg-[var(--g-color-accent)]/75 blur-[100px]" /><DotField className="bottom-[9%] left-[-2%] h-[330px] w-[27%]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[76px_minmax(0,860px)_minmax(280px,1fr)] lg:gap-10 xl:grid-cols-[80px_minmax(0,900px)_360px]">
          <motion.aside initial={reduceMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65 }} className="hidden pt-4 lg:block" aria-label="Project social links"><SocialMarks placement="side" /></motion.aside>
          <div className="space-y-6">{gallery.map((item, index) => <motion.figure key={item.id} initial={reduceMotion ? false : { opacity: 0, y: 58, scale: 0.985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }} className="relative aspect-[1.53/1] overflow-hidden bg-white"><Image src={item.src} alt={item.label} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 58vw" className={item.fit === "cover" ? "object-cover" : "object-contain"} /></motion.figure>)}</div>
          <motion.aside initial={reduceMotion ? false : { opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 self-start lg:sticky lg:top-36">
            <dl className="space-y-7 text-sm leading-6"><div><dt className="text-lg font-semibold">Client</dt><dd className="mt-1 opacity-75">{project.client}</dd></div><div><dt className="text-lg font-semibold">Date</dt><dd className="mt-1 opacity-75">{project.year}</dd></div><div><dt className="text-lg font-semibold">Category</dt><dd className="mt-1 opacity-75">{category}</dd></div><div><dt className="text-lg font-semibold">Tags</dt><dd className="mt-1 opacity-75">{project.services.join(", ")}</dd></div></dl>
            <div className="mt-8 max-w-md"><h2 className="text-[clamp(1.75rem,2.2vw,2.4rem)] font-semibold tracking-[-0.035em]">About This Project</h2><p className="mt-4 text-sm leading-7 opacity-80">{project.challenge}</p></div>
            <div className="mt-8"><p className="text-base font-semibold">Share</p><div className="mt-3"><SocialMarks placement="share" /></div></div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
