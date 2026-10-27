"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, MessageCircle, Send, Share2 } from "lucide-react";

const comments = [
  { name: "Reader Name", initials: "RN", date: "Placeholder date", body: "A thoughtful placeholder comment about the relationship between strategy and creative expression." },
  { name: "Journal Reader", initials: "JR", date: "Placeholder date", body: "This structure makes the main ideas easy to follow while leaving room for a useful discussion." },
] as const;

export function BlogEngagementMount() {
  const [target, setTarget] = useState<Element | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTarget(document.querySelector("main.blog-article-page article")));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  if (!target) return null;

  return createPortal(
    <section id="comments" aria-labelledby="comments-title" className="mt-24 border-t border-[var(--g-color-primary)]/35 pt-10">
      <div className="flex flex-col gap-6 border-b border-[var(--g-color-primary)]/25 pb-10 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs uppercase tracking-[0.2em] opacity-45">End of the story</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-black">Was this article useful?</h2></div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setLiked((value) => !value)} aria-pressed={liked} className={`flex h-12 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${liked ? "border-[var(--g-color-accent)] bg-[var(--g-color-accent)] text-black" : "border-[var(--g-color-primary)]/30 hover:border-[var(--g-color-primary)]"}`}><Heart className="size-5" fill={liked ? "currentColor" : "none"} strokeWidth={1.6} />{liked ? 25 : 24}</button>
          <a href="#comment-form" className="flex h-12 items-center gap-2 rounded-full border border-[var(--g-color-primary)]/30 px-5 text-sm"><MessageCircle className="size-5" strokeWidth={1.6} />{comments.length}</a>
          <button type="button" aria-label="Share article" className="grid size-12 place-items-center rounded-full border border-[var(--g-color-primary)]/30"><Share2 className="size-5" strokeWidth={1.6} /></button>
        </div>
      </div>

      <div className="pt-14">
        <div className="flex items-end justify-between border-b border-[var(--g-color-primary)]/25 pb-5"><h2 id="comments-title" className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold tracking-[-0.055em] text-black">Comments</h2><span className="text-sm opacity-45">{comments.length} responses</span></div>
        <div className="divide-y divide-[var(--g-color-primary)]/20">{comments.map((comment) => <article key={comment.name} className="grid grid-cols-[48px_1fr] gap-5 py-8"><div className="grid size-12 place-items-center rounded-full bg-[var(--g-color-secondary)]/35 text-xs font-bold">{comment.initials}</div><div><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-semibold text-black">{comment.name}</h3><time className="text-xs opacity-40">{comment.date}</time></div><p className="mt-3 max-w-2xl text-sm leading-7 text-black/65">{comment.body}</p><button type="button" className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--g-color-primary)]/55 hover:text-[var(--g-color-primary)]">Reply</button></div></article>)}</div>

        <form id="comment-form" onSubmit={submit} className="mt-12 rounded-[20px] bg-white p-6 md:p-9"><div className="flex items-center justify-between gap-6"><div><p className="text-xs uppercase tracking-[0.18em] opacity-40">Join the conversation</p><h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-black">Leave a comment</h3></div><MessageCircle className="size-8 opacity-25" strokeWidth={1.3} /></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><input required aria-label="Name" placeholder="Full name" className="h-14 rounded-[20px] bg-[var(--g-color-canvas)] px-5 outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]"/><input required type="email" aria-label="Email" placeholder="Email address" className="h-14 rounded-[20px] bg-[var(--g-color-canvas)] px-5 outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]"/><textarea required aria-label="Comment" placeholder="Write your comment" rows={5} className="resize-none rounded-[20px] bg-[var(--g-color-canvas)] p-5 outline-none focus:ring-2 focus:ring-[var(--g-color-accent)] sm:col-span-2"/><button type="submit" className="flex h-14 w-fit items-center gap-3 rounded-full bg-[var(--g-color-accent)] px-7 font-semibold text-black sm:col-span-2">Post comment <Send className="size-4" strokeWidth={1.6} /></button></div></form>
      </div>
    </section>,
    target,
  );
}
