"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Play, Share2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ActionButton } from "@/components/ui/button";

type BlogPost = { slug: string; category: string; date: string; title: string; excerpt: string };

const related = [
  ["01", "Branding", "Growing a brand system without losing its roots", "/blog/growing-a-brand-system"],
  ["02", "Digital", "Designing digital experiences for momentum", "/blog/designing-for-momentum"],
  ["03", "Process", "From an early idea to a complete experience", "/blog/from-idea-to-experience"],
] as const;

export function BlogArticleUnifiedView({ post }: { post: BlogPost }) {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduceMotion ? false as const : { opacity: 0, y: 38 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <main className="blog-article-page overflow-hidden bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative flex min-h-[894px] items-end overflow-hidden bg-[#eaeaea] bg-[url('/brand/blog/article-hero-background.svg')] bg-[length:100%_100%] bg-center bg-no-repeat px-[var(--g-gutter)] pb-44 pt-44 md:pt-56">
        <div aria-hidden="true" className="absolute right-0 top-[27%] h-[390px] w-[46%] opacity-90 [background-image:radial-gradient(circle,rgba(255,255,255,.98)_0_1.45px,transparent_1.85px)] [background-size:12px_12px] [clip-path:polygon(43%_0,100%_0,100%_50%,72%_50%,72%_100%,0_100%,0_50%,43%_50%)]" />
        <motion.div {...reveal()} className="relative mx-auto mb-12 w-full max-w-[1440px]"><p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/75">{post.category}</p><h1 className="max-w-[980px] text-[clamp(3.7rem,6.8vw,7.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.06em]">{post.title}</h1></motion.div>
      </section>

      <section className="relative z-10 -mt-32 px-[var(--g-gutter)] pb-32 md:pb-44">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,3.15fr)_340px]">
            <article className="min-w-0">
              <motion.div {...reveal()} className="relative aspect-[1.45/1] overflow-hidden bg-white"><Image src="/brand/about/figma-image-2.jpg" alt="Placeholder article cover" fill priority sizes="(max-width:1024px) 100vw, 74vw" className="object-cover" /></motion.div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-b border-[var(--g-color-primary)]/30 pb-7 text-xs opacity-55"><span>Posted at {post.date}</span><span>In {post.category}</span><span>By Jessy James</span><span className="flex gap-1.5"><MessageCircle className="size-4" />0 Comments</span><button type="button" className="flex gap-1.5"><Share2 className="size-4" />Share</button></div>

              <motion.div {...reveal()} className="mx-auto mt-16 max-w-[880px] space-y-7 text-lg leading-9 text-black/70"><p className="text-[clamp(1.7rem,2.8vw,3rem)] font-medium leading-[1.28] text-black">{post.excerpt}</p><p>Strategy begins by defining the problem with enough clarity that a team can make confident decisions. It connects business goals, audience needs and the character of a brand before visual choices compete for attention.</p></motion.div>

              <motion.blockquote {...reveal()} className="relative my-20 border-y border-[var(--g-color-primary)]/35 py-14 pl-[clamp(2rem,7vw,7rem)]"><span aria-hidden="true" className="absolute left-0 top-10 h-24 w-20 bg-[url('/brand/testimonial/quote-down.svg')] bg-contain bg-no-repeat opacity-75" /><p className="text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.05em] text-black">Good strategy gives every creative idea a reason to exist.</p><footer className="mt-6 text-xs uppercase tracking-[0.18em] opacity-45">Gardeners Journal</footer></motion.blockquote>

              <motion.div {...reveal()} className="mx-auto max-w-[880px] space-y-7 text-lg leading-9 text-black/70"><p>When that foundation is shared, collaboration becomes faster and more generous. Designers can explore, writers can develop a distinctive voice and developers can build systems that remain coherent as requirements evolve.</p><p>A useful framework is specific enough to guide the work and flexible enough to support new formats, audiences and moments without losing its central idea.</p></motion.div>

              <motion.figure {...reveal()} className="mt-20"><button type="button" aria-label="Play placeholder video" className="group relative grid aspect-video w-full place-items-center overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_72%_28%,#E2E417_0%,#7d9c31_24%,#003F3F_65%)]"><span aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(255,255,255,.9)_0_1.4px,transparent_1.8px)] [background-size:12px_12px]" /><span className="relative grid size-24 place-items-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-110"><Play className="ml-1 size-10" fill="currentColor" /></span><span className="absolute bottom-7 left-7 text-xs uppercase tracking-[0.2em] text-white/75">Video placeholder · Brand strategy in motion</span></button></motion.figure>

              <div className="mt-20 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
                <motion.div {...reveal()} className="space-y-7 text-lg leading-9 text-black/70"><p>The result is expression with continuity: every touchpoint can feel fresh while still belonging to the same story and supporting the same strategic direction.</p><p>This placeholder section will later support rich text, linked research and project-specific insights delivered by the CMS.</p></motion.div>
                <motion.div {...reveal(0.08)} className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#d9d9d9] via-white to-[var(--g-color-secondary)]"><div className="absolute -bottom-20 -right-10 size-72 rounded-full bg-[var(--g-color-accent)]/75 blur-[45px]" /><div className="absolute left-[9%] top-[10%] h-[70%] w-[60%] -rotate-3 rounded-[20px] bg-white/70 p-7 shadow-xl"><span className="text-xs uppercase tracking-[0.18em]">Editorial image</span><strong className="mt-10 block text-4xl leading-[0.92] tracking-[-0.06em]">Ideas need a clear place to grow.</strong></div></motion.div>
              </div>

              <motion.div {...reveal()} className="mt-24 grid gap-10 border-t border-[var(--g-color-primary)]/35 pt-14 md:grid-cols-[0.4fr_0.6fr]"><div><p className="text-xs uppercase tracking-[0.2em] opacity-45">Closing thoughts</p><h2 className="mt-5 text-[clamp(2.7rem,4.5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-black">A direction that leaves room to grow.</h2></div><div className="space-y-7 text-lg leading-9 text-black/70"><p>The most valuable strategies continue to work after launch. They help teams understand not only what a brand looks like, but why it behaves the way it does.</p><p>That understanding turns identity into a living system and makes every future decision more coherent.</p></div></motion.div>

              <motion.div {...reveal()} className="mt-20 rounded-[20px] bg-[var(--g-color-primary)] p-8 text-white md:p-12"><p className="text-xs uppercase tracking-[0.2em] text-white/45">In short</p><h2 className="mt-3 text-5xl font-semibold tracking-[-0.055em]">Key takeaways</h2><div className="mt-9 grid gap-7 md:grid-cols-3">{["Define the question before the visual answer.","Build principles that work across formats.","Use strategy as a shared collaborative tool."].map((item,index)=><p key={item} className="border-white/20 text-base leading-6 md:border-r md:pr-6 last:border-0"><span className="mb-4 grid size-8 place-items-center rounded-full bg-[var(--g-color-accent)] text-black"><Check className="size-4" /></span>0{index+1} · {item}</p>)}</div></motion.div>
            </article>

            <aside className="min-w-0 space-y-12 lg:pt-0">
              <div><div className="relative aspect-square overflow-hidden bg-white"><Image src="/brand/about/figma-image-3.jpg" alt="Placeholder author" fill sizes="340px" className="object-cover" /></div><h2 className="mt-7 text-2xl uppercase text-black">Jessy J.</h2><p className="mt-3 text-sm leading-7 opacity-60">Placeholder author biography introducing the writer and their perspective.</p></div>
              <SidebarList title="Categories" items={["Branding","Design","Digital","Strategy"]} />
              <SidebarList title="Popular stories" items={["Growing a brand system","Designing for momentum","From idea to experience"]} numbered />
              <div className="border-t border-[var(--g-color-primary)]/40 pt-7"><h3 className="font-serif text-3xl text-black">Topics</h3><div className="mt-5 flex flex-wrap gap-2">{["Strategy","Branding","Identity","Growth","Process","Digital"].map(tag=><span key={tag} className="rounded-full border border-[var(--g-color-primary)]/30 px-4 py-2 text-xs">{tag}</span>)}</div></div>
              <div className="relative overflow-hidden rounded-[20px] bg-[var(--g-color-primary)] p-7 text-white"><div className="absolute -right-14 -top-14 size-44 rounded-full bg-[var(--g-color-accent)]/75 blur-[40px]" /><div className="relative"><p className="text-xs uppercase tracking-[0.18em] text-white/45">Gardeners Journal</p><h3 className="mt-4 text-3xl font-semibold leading-none">Ideas worth growing.</h3><p className="mt-4 text-sm leading-6 text-white/55">Occasional notes about strategy, design and digital experiences.</p><div className="mt-6 flex overflow-hidden rounded-full bg-white"><input aria-label="Email" placeholder="Email address" className="min-w-0 flex-1 px-4 py-3 text-sm text-black outline-none"/><button aria-label="Subscribe" className="w-12 text-[var(--g-color-primary)]"><ArrowRight className="mx-auto size-5" /></button></div></div></div>
            </aside>
          </div>

          <motion.div {...reveal()} className="mt-28"><div className="flex items-end justify-between border-b border-[var(--g-color-primary)]/35 pb-6"><div><p className="text-xs uppercase tracking-[0.2em] opacity-45">Keep reading</p><h2 className="mt-3 text-5xl font-semibold tracking-[-0.055em] text-black">Related ideas</h2></div><ActionButton href="/blog" label="All articles" /></div><div className="divide-y divide-[var(--g-color-primary)]/25">{related.map(([index,category,title,href])=><Link key={href} href={href} className="group grid gap-4 py-8 md:grid-cols-[70px_160px_1fr_48px] md:items-center"><span className="text-sm opacity-40">{index}</span><span className="w-fit rounded-full bg-[var(--g-color-accent)] px-4 py-2 text-xs uppercase tracking-[0.12em]">{category}</span><h3 className="text-[clamp(1.5rem,2.5vw,2.7rem)] font-medium leading-tight tracking-[-0.04em]">{title}</h3><span className="grid size-11 place-items-center rounded-full border border-[var(--g-color-primary)]/30 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="size-5" /></span></Link>)}</div></motion.div>
        </div>
      </section>
    </main>
  );
}

function SidebarList({ title, items, numbered = false }: { title: string; items: readonly string[]; numbered?: boolean }) {
  return <div className="border-t border-[var(--g-color-primary)]/40 pt-7"><h3 className="font-serif text-3xl text-black">{title}</h3><div className="mt-4 divide-y divide-[var(--g-color-primary)]/20">{items.map((item,index)=><Link key={item} href="/blog" className="grid grid-cols-[32px_1fr] gap-3 py-4 text-sm leading-5"><span className="text-[var(--g-color-accent)]">{numbered ? `0${index+1}` : "↗"}</span><span>{item}</span></Link>)}</div></div>;
}
