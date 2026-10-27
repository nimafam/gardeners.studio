"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const popular = [
  { title: "Growing a brand system without losing its roots", href: "/blog/growing-a-brand-system" },
  { title: "Designing digital experiences for momentum", href: "/blog/designing-for-momentum" },
  { title: "From an early idea to a complete experience", href: "/blog/from-idea-to-experience" },
] as const;

const socials = [
  ["Instagram", "/brand/icons/social/instagram-primary.svg", 21, 21],
  ["Facebook", "/brand/icons/social/facebook-primary.svg", 9, 17],
  ["LinkedIn", "/brand/icons/social/linkedin-primary.svg", 16, 15],
] as const;

export function BlogArticleSidebarExtrasMount() {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTarget(document.querySelector("main > section:nth-of-type(2) aside"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="mt-14 space-y-14">
      <section aria-labelledby="popular-stories-title" className="border-t border-[var(--g-color-primary)]/45 pt-8">
        <h3 id="popular-stories-title" className="font-serif text-3xl text-black">Popular stories</h3>
        <div className="mt-5 divide-y divide-[var(--g-color-primary)]/20">
          {popular.map((item, index) => <Link key={item.href} href={item.href} className="group grid grid-cols-[38px_1fr] gap-3 py-5"><span className="text-xs text-[var(--g-color-accent)]">0{index + 1}</span><span className="text-sm font-medium leading-5 text-black/75 transition-colors group-hover:text-[var(--g-color-primary)]">{item.title}</span></Link>)}
        </div>
      </section>

      <section aria-labelledby="article-topics-title" className="border-t border-[var(--g-color-primary)]/45 pt-8">
        <h3 id="article-topics-title" className="font-serif text-3xl text-black">Topics</h3>
        <div className="mt-5 flex flex-wrap gap-2">{["Strategy", "Branding", "Identity", "Growth", "Process", "Digital"].map((tag) => <Link key={tag} href="/blog" className="rounded-full border border-[var(--g-color-primary)]/30 px-4 py-2 text-xs transition-colors hover:border-[var(--g-color-accent)] hover:bg-[var(--g-color-accent)] hover:text-black">{tag}</Link>)}</div>
      </section>

      <section aria-labelledby="article-newsletter-title" className="relative overflow-hidden rounded-[20px] bg-[var(--g-color-primary)] p-7 text-white">
        <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-[var(--g-color-accent)]/70 blur-[45px]" />
        <div className="relative"><p className="text-xs uppercase tracking-[0.2em] text-white/50">Gardeners Journal</p><h3 id="article-newsletter-title" className="mt-4 text-3xl font-semibold leading-[0.95] tracking-[-0.045em]">Ideas worth growing.</h3><p className="mt-4 text-sm leading-6 text-white/60">Occasional notes about strategy, design and digital experiences.</p><div className="mt-7 flex overflow-hidden rounded-full bg-white"><input aria-label="Newsletter email" type="email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-black outline-none placeholder:text-black/35" /><button type="button" aria-label="Subscribe" className="grid w-12 place-items-center text-[var(--g-color-primary)]"><ArrowRight className="size-5" strokeWidth={1.5} /></button></div></div>
      </section>

      <section aria-labelledby="follow-gardeners-title" className="border-t border-[var(--g-color-primary)]/45 pt-8">
        <div className="flex items-center justify-between"><h3 id="follow-gardeners-title" className="font-serif text-3xl text-black">Follow us</h3><div className="flex items-center gap-4">{socials.map(([label, src, width, height]) => <Link key={label} href="#" aria-label={label} className="grid size-8 place-items-center transition-transform hover:-translate-y-1"><Image src={src} alt="" width={width} height={height} className="max-h-[21px] w-auto" /></Link>)}</div></div>
      </section>
    </div>,
    target,
  );
}
