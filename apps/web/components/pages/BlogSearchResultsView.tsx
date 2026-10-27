import Link from "next/link";
import { Search } from "lucide-react";

type Post = { slug: string; category: string; date: string; title: string; excerpt: string };

type Props = {
  posts: readonly Post[];
  query?: string;
  author?: string;
};

function displayAuthor(author?: string) {
  if (!author) return "";
  return author.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function BlogSearchResultsView({ posts, query = "", author }: Props) {
  const authorName = displayAuthor(author);
  const heading = authorName ? `Articles by ${authorName}` : query ? `Results for “${query}”` : "Explore the Journal";

  return (
    <main className="min-h-screen bg-[var(--g-color-canvas)] px-[var(--g-gutter)] pb-32 pt-44 text-[var(--g-color-primary)] md:pb-44 md:pt-56">
      <section className="mx-auto max-w-[1440px]">
        <header className="grid gap-10 border-b border-[var(--g-color-primary)]/35 pb-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-45">Gardeners Journal</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,7vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-black">{heading}</h1>
            {authorName && <p className="mt-7 max-w-2xl text-lg leading-8 opacity-60">Placeholder author introduction. All published stories by {authorName} are collected here.</p>}
          </div>

          <form action="/blog/search" className="flex items-center gap-3 rounded-[20px] bg-white p-2 pl-5">
            <Search aria-hidden="true" className="size-5 shrink-0 opacity-45" />
            <input name="q" defaultValue={query} placeholder="Search the Journal" aria-label="Search articles" className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-[var(--g-color-primary)]/35" />
            <button className="rounded-[14px] bg-[var(--g-color-accent)] px-6 py-3 text-sm font-medium text-[var(--g-color-primary)] transition-transform hover:-translate-y-0.5">Search</button>
          </form>
        </header>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--g-color-primary)]/20 pb-5">
          <p className="text-sm uppercase tracking-[0.14em] opacity-45">{posts.length} {posts.length === 1 ? "result" : "results"}</p>
          {(query || author) && <Link href="/blog/search" className="text-sm underline underline-offset-4">Clear filters</Link>}
        </div>

        {posts.length ? (
          <div className="mt-10 grid gap-x-7 gap-y-14 md:grid-cols-2">
            {posts.map((post, index) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[var(--g-color-primary)]">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${index % 2 ? "78% 28%" : "24% 68%"},#E2E417 0%,#779633 24%,#003F3F 67%)` }} />
                    <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,.95)_0_1.3px,transparent_1.7px)] [background-size:12px_12px]" />
                    <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-white/65">Journal · 0{index + 1}</span>
                  </div>
                  <span className="mt-5 inline-flex rounded-full bg-[var(--g-color-accent)] px-4 py-2 text-xs uppercase tracking-[0.12em]">{post.category}</span>
                  <h2 className="mt-4 text-[clamp(2rem,3.2vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-black transition-colors group-hover:text-[var(--g-color-primary)]">{post.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 opacity-55">{post.excerpt}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.12em] opacity-35">{post.date} · 6 min read</p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-[20px] border border-[var(--g-color-primary)]/25 p-12 text-center">
            <h2 className="text-3xl font-semibold text-black">No articles found</h2>
            <p className="mt-3 opacity-55">Try another phrase or clear the current filters.</p>
          </div>
        )}
      </section>
    </main>
  );
}
