"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type BlogPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

function DotField({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`absolute ${className}`} style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 1.45px, transparent 1.85px)", backgroundSize: "12px 12px" }} />;
}

export function BlogArticleDetailView({ post }: { post: BlogPost }) {
  const reduceMotion = useReducedMotion();
  const enter = (delay = 0, x = 0) => ({ initial: reduceMotion ? false as const : { opacity: 0, y: 40, x }, whileInView: { opacity: 1, y: 0, x: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <main className="overflow-hidden bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative flex min-h-[760px] items-end overflow-hidden bg-[radial-gradient(circle_at_18%_25%,rgba(0,63,63,.96)_0%,rgba(62,117,69,.82)_27%,transparent_58%),radial-gradient(circle_at_80%_12%,rgba(226,228,23,.96)_0%,rgba(158,184,37,.82)_33%,transparent_63%),linear-gradient(180deg,#7fa056_0%,#b5c86c_55%,#eaeaea_100%)] px-[var(--g-gutter)] pb-24 pt-44 md:min-h-[980px] md:pb-32 md:pt-56">
        <DotField className="right-0 top-[29%] h-[300px] w-[24%] opacity-90" />
        <DotField className="right-[16%] top-[55%] h-[210px] w-[28%] opacity-85" />
        <motion.div {...enter()} className="relative mx-auto w-full max-w-[1440px]">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/75">{post.category}</p>
          <h1 className="max-w-[980px] text-[clamp(3.7rem,6.8vw,7.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.06em]">{post.title}</h1>
        </motion.div>
      </section>

      <section className="px-[var(--g-gutter)] pb-32 pt-16 md:pb-44 md:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10">
            <motion.div {...enter(0, -24)}>
              <div className="relative aspect-[1.45/1] overflow-hidden bg-[var(--g-color-secondary)]/30"><Image src="/brand/about/figma-image-2.jpg" alt="Placeholder article cover" fill priority sizes="(max-width: 1024px) 100vw, 72vw" className="object-cover" /></div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[var(--g-color-primary)]/35 pb-7 text-xs opacity-60"><span>Posted at {post.date}</span><span>In {post.category}</span><span>By Jessy James</span><span className="flex items-center gap-1.5"><MessageCircle className="size-4" strokeWidth={1.5} />0 Comments</span><button type="button" className="flex items-center gap-1.5"><Share2 className="size-4" strokeWidth={1.5} />Share</button></div>
            </motion.div>

            <motion.aside {...enter(0.1, 24)} className="self-start">
              <div className="relative aspect-square overflow-hidden bg-white"><Image src="/brand/about/figma-image-3.jpg" alt="Placeholder author portrait" fill sizes="330px" className="object-cover" /></div>
              <h2 className="mt-8 text-2xl font-medium uppercase tracking-[-0.03em] text-black">Jessy J.</h2>
              <p className="mt-4 text-sm leading-7 opacity-60">Placeholder author biography. This space introduces the writer and their perspective before the editorial content is connected to the CMS.</p>
              <div className="mt-12 border-t border-[var(--g-color-primary)]/45 pt-8"><h3 className="font-serif text-3xl text-black">Categories</h3><ul className="mt-5 divide-y divide-[var(--g-color-primary)]/20 text-sm">{["Branding", "Design", "Digital", "Strategy"].map((item) => <li key={item}><Link href="/blog" className="flex justify-between py-4 transition-colors hover:text-[var(--g-color-accent)]"><span>{item}</span><span>↗</span></Link></li>)}</ul></div>
            </motion.aside>
          </div>

          <motion.article {...enter(0.08)} className="mt-20 max-w-[920px] space-y-7 text-lg leading-9 text-black/70 md:ml-[8%] md:mt-28">
            <p className="text-[clamp(1.6rem,2.5vw,2.7rem)] font-medium leading-[1.3] text-black">{post.excerpt}</p>
            <p>This placeholder copy demonstrates the intended reading width and editorial rhythm. It can later be replaced with rich-text blocks, imagery, pull quotes and related project references from the CMS.</p>
            <h2 className="pt-6 text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--g-color-primary)]">Strategy creates room for expression.</h2>
            <p>Clear decisions give creative work a useful direction while leaving enough space for character, experimentation and growth.</p>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
