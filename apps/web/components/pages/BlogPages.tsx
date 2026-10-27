import Link from "next/link";
import { ActionButton } from "@/components/ui/button";

export const placeholderPosts = [
  { slug: "growing-a-brand-system", category: "Branding", date: "Placeholder date", title: "Growing a brand system without losing its roots", excerpt: "A placeholder introduction about building flexible identities that remain coherent as businesses change." },
  { slug: "designing-for-momentum", category: "Digital", date: "Placeholder date", title: "Designing digital experiences for momentum", excerpt: "A placeholder story about turning complex customer journeys into clear and useful digital products." },
  { slug: "strategy-before-expression", category: "Strategy", date: "Placeholder date", title: "Why strategy comes before expression", excerpt: "A placeholder note about the decisions that help creative work become relevant, distinctive and durable." },
  { slug: "systems-that-grow", category: "Identity", date: "Placeholder date", title: "Systems that are designed to grow", excerpt: "A placeholder article about creating visual tools teams can use consistently across every touchpoint." },
  { slug: "from-idea-to-experience", category: "Process", date: "Placeholder date", title: "From an early idea to a complete experience", excerpt: "A placeholder look inside a collaborative process spanning research, design, development and launch." },
] as const;

function PlaceholderArtwork({ index, compact = false }: { index: number; compact?: boolean }) {
  const positions = ["20% 25%", "76% 28%", "35% 76%", "78% 72%", "50% 48%"];
  return <div aria-hidden="true" className={`relative overflow-hidden rounded-[20px] bg-[var(--g-color-primary)] ${compact ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
    <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at ${positions[index % positions.length]}, #E2E417 0%, #7f9b2c 18%, #003F3F 52%, #003F3F 100%)` }} />
    <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(255,255,255,.9)_0_1.2px,transparent_1.7px)] [background-size:12px_12px]" />
    <span className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-[0.22em] text-white/65">Journal placeholder · 0{index + 1}</span>
  </div>;
}

export function BlogPageContent() {
  const [featured, ...posts] = placeholderPosts;
  const hottest = placeholderPosts.slice(1, 5);

  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <section className="relative min-h-[760px] overflow-hidden px-[var(--g-gutter)] pb-16 pt-44 md:pt-56">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_23%_30%,rgba(226,228,23,.72),transparent_28%),radial-gradient(circle_at_88%_42%,rgba(91,129,47,.72),transparent_23%),linear-gradient(180deg,#eaeaea_0%,#eaeaea_78%,rgba(234,234,234,0)_100%)]" />
      <div aria-hidden="true" className="absolute right-0 top-[28%] h-[280px] w-[36%] opacity-90 [background-image:radial-gradient(circle,rgba(255,255,255,.98)_0_1.7px,transparent_2px)] [background-size:13px_13px]" />
      <div className="relative mx-auto max-w-[1440px]">
        <h1 className="text-[clamp(5rem,9vw,9rem)] font-semibold leading-none tracking-[-0.07em] text-[var(--g-color-accent)]">BLOG</h1>
        <p className="mt-6 max-w-4xl text-[clamp(1.3rem,2.2vw,2.25rem)] font-medium uppercase leading-[1.15] tracking-[-0.035em]">We are with you in every aspect of your journey<br className="hidden md:block" /> to flourish.</p>

        <Link href={`/blog/${featured.slug}`} className="group relative mt-14 grid min-h-[500px] overflow-hidden rounded-[20px] bg-[#f4e7ef] p-10 md:grid-cols-[0.8fr_1.2fr] md:p-16">
          <div className="relative z-10 flex flex-col justify-center">
            <span className="w-fit bg-[#ff4d31] px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white">{featured.category}</span>
            <h2 className="mt-10 max-w-lg text-[clamp(2.8rem,5vw,5.6rem)] font-medium uppercase leading-[0.95] tracking-[-0.055em] text-[#ff4d31]">{featured.title}</h2>
            <span className="mt-16 text-2xl transition-transform group-hover:translate-x-2">↗</span>
          </div>
          <div aria-hidden="true" className="relative mt-10 min-h-[270px] md:mt-0">
            <div className="absolute inset-[8%] rotate-[-4deg] bg-white shadow-[0_30px_60px_rgba(0,0,0,.12)]" />
            <div className="absolute right-[8%] top-[2%] h-[44%] w-[44%] rotate-3 bg-[#efefef] p-5 text-sm font-semibold text-black/60 shadow-lg">Placeholder editorial graphic</div>
            <div className="absolute bottom-[4%] left-[17%] h-[43%] w-[55%] bg-[var(--g-color-primary)] shadow-xl" />
            <div className="absolute right-[6%] top-[14%] h-3 w-[48%] rotate-[-38deg] rounded-full bg-[var(--g-color-accent)] shadow-lg" />
          </div>
        </Link>
      </div>
    </section>

    <section className="px-[var(--g-gutter)] pb-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex items-center justify-between border-b border-[var(--g-color-primary)]/35 pb-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em]">Hottest stuff now</h2>
          <span className="text-xl opacity-50">‹  ›</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{hottest.map((post,index)=><article key={post.slug}>
          <Link href={`/blog/${post.slug}`}><PlaceholderArtwork index={index+1} compact /></Link>
          <span className="mt-3 inline-block bg-[var(--g-color-accent)] px-2 py-1 text-[8px] uppercase tracking-[0.14em]">{post.category}</span>
          <h3 className="mt-2 text-lg font-semibold leading-[1.05] tracking-[-0.03em]"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.1em] opacity-35">{post.date}</p>
        </article>)}</div>
      </div>
    </section>

    <section className="px-[var(--g-gutter)] pb-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="space-y-10">
          <div className="grid aspect-[3/4] place-items-center rounded-[20px] bg-[var(--g-color-accent)] p-6 text-center text-4xl font-semibold leading-[0.9] tracking-[-0.05em]">Getting<br/>started<br/>with<br/>growth.</div>
          <div><h3 className="border-b border-[var(--g-color-primary)]/30 pb-4 text-sm font-semibold">Latest Post Now</h3><ul className="mt-4 space-y-5">{posts.slice(0,4).map((post,index)=><li key={post.slug} className="grid grid-cols-[50px_1fr] gap-3"><div className="bg-[var(--g-color-primary)]/15 text-center text-xs leading-[50px]">0{index+1}</div><div><Link href={`/blog/${post.slug}`} className="text-xs font-semibold leading-tight">{post.title}</Link><p className="mt-1 text-[9px] opacity-40">{post.date}</p></div></li>)}</ul></div>
          <div><h3 className="border-b border-[var(--g-color-primary)]/30 pb-4 text-sm font-semibold">Follow us</h3><div className="mt-4 grid grid-cols-4 gap-2">{["In","Be","Ig","Yt"].map((item,index)=><span key={item} className="grid aspect-square place-items-center text-xs font-bold text-white" style={{backgroundColor:["#00b7ed","#e2e417","#ff5a36","#003f3f"][index]}}>{item}</span>)}</div></div>
        </aside>

        <div>
          <article>
            <PlaceholderArtwork index={2} />
            <span className="mt-4 inline-block bg-[var(--g-color-accent)] px-3 py-1 text-[9px] uppercase tracking-[0.15em]">Latest news</span>
            <h2 className="mt-4 text-center text-[clamp(2.2rem,3.8vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.05em]">{featured.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 opacity-55">{featured.excerpt}</p>
            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.12em] opacity-35">{featured.date}</p>
          </article>
          <div className="mt-12 grid gap-8 md:grid-cols-2">{posts.map((post,index)=><article key={post.slug}><Link href={`/blog/${post.slug}`}><PlaceholderArtwork index={index+3} compact /></Link><span className="mt-4 inline-block bg-[var(--g-color-accent)] px-2 py-1 text-[8px] uppercase tracking-[0.14em]">{post.category}</span><h3 className="mt-3 text-2xl font-semibold leading-[1.02] tracking-[-0.04em]">{post.title}</h3><p className="mt-3 text-[10px] uppercase tracking-[0.1em] opacity-35">{post.date}</p></article>)}</div>
        </div>

        <aside className="space-y-10">
          <div><h3 className="border-b border-[var(--g-color-primary)]/30 pb-4 text-sm font-semibold">Design highlights</h3><div className="divide-y divide-[var(--g-color-primary)]/20">{posts.slice(0,3).map(post=><article key={post.slug} className="py-5"><Link href={`/blog/${post.slug}`} className="text-lg font-semibold leading-tight">{post.title}</Link><p className="mt-2 text-[10px] opacity-40">{post.date}</p></article>)}</div></div>
          <PlaceholderArtwork index={4} compact />
          <div><h3 className="border-b border-[var(--g-color-primary)]/30 pb-4 text-center text-sm font-semibold">Trending stuff</h3><ul className="divide-y divide-[var(--g-color-primary)]/20 text-center">{posts.slice(0,4).map(post=><li key={post.slug} className="py-5"><span className="text-[9px] uppercase tracking-[0.12em] text-[var(--g-color-accent)]">{post.category}</span><p className="mt-2 text-sm font-medium">{post.title}</p></li>)}</ul></div>
          <div><h3 className="text-sm font-semibold">Subscribe to newsletter</h3><div className="mt-4 flex"><input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 border-b border-[var(--g-color-primary)]/35 bg-transparent py-3 text-sm outline-none"/><button type="button" className="bg-[var(--g-color-primary)] px-5 text-[9px] uppercase tracking-[0.14em] text-white">Subscribe</button></div></div>
        </aside>
      </div>
    </section>

    <section className="px-[var(--g-gutter)] pb-64 md:pb-96">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid min-h-[155px] place-items-center rounded-[20px] bg-[#13c1df] px-8 text-2xl font-semibold uppercase text-white">Virtual design festival · Placeholder</div>
        <div className="mt-10 grid gap-7 md:grid-cols-3"><div className="grid aspect-square place-items-center rounded-[20px] bg-[var(--g-color-accent)] p-10 text-center text-4xl font-semibold leading-tight">Our news are harmonious and sometimes contrasting.</div><div className="grid aspect-square place-items-center rounded-[20px] bg-[#efc7dd] p-10 text-3xl font-medium leading-tight">Companies need cultures that allow people to flourish.</div><div className="grid aspect-square place-items-center rounded-[20px] bg-black p-10 text-3xl font-medium text-white">Our future journal feed.</div></div>
      </div>
    </section>
  </main>;
}

export function BlogArticlePage({ post }: { post: (typeof placeholderPosts)[number] }) {
  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <article><header className="px-[var(--g-gutter)] pb-16 pt-44 md:pt-56"><div className="mx-auto max-w-[1440px]"><p className="text-xs uppercase tracking-[0.18em] opacity-45">{post.category} · {post.date}</p><h1 className="mt-8 max-w-[1250px] text-[clamp(4rem,9vw,9rem)] font-semibold leading-[0.82] tracking-[-0.07em]">{post.title}</h1></div></header><div className="px-[var(--g-gutter)]"><div className="mx-auto max-w-[1440px]"><PlaceholderArtwork index={placeholderPosts.findIndex((item) => item.slug === post.slug)} /></div></div><div className="px-[var(--g-gutter)] py-20 md:py-28"><div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[0.28fr_0.72fr]"><aside className="text-xs uppercase tracking-[0.18em] opacity-45">Placeholder article<br />Gardeners Journal</aside><div className="space-y-7 text-lg leading-9 opacity-75"><p>{post.excerpt}</p><p>This is placeholder copy reserved for future editorial content. It demonstrates the intended reading width, rhythm and hierarchy before the journal is connected to the CMS.</p><h2 className="pt-8 text-4xl font-semibold leading-tight tracking-[-0.045em] opacity-100">A section heading for the future story</h2><p>Additional placeholder paragraphs can later be replaced by rich-text blocks, images, pull quotes and related-project references without changing the visual structure of the page.</p></div></div></div></article>
    <section className="px-[var(--g-gutter)] pb-32"><div className="mx-auto flex max-w-[1440px] items-end justify-between gap-8 border-t border-[var(--g-color-primary)]/35 pt-10"><h2 className="text-[clamp(2.5rem,5vw,5rem)] font-semibold tracking-[-0.055em]">More ideas for growth.</h2><ActionButton href="/blog" label="All articles" /></div></section>
  </main>;
}
