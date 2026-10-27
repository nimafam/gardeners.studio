"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, MessageCircle, Send, Share2, X } from "lucide-react";

const comments = [
  { name: "Reader Name", initials: "RN", date: "August 25, 2026", body: "A thoughtful placeholder comment about the relationship between strategy and creative expression." },
  { name: "Journal Reader", initials: "JR", date: "August 26, 2026", body: "This structure makes the main ideas easy to follow while leaving room for a useful discussion." },
] as const;

export function BlogEngagementV2Mount() {
  const [target, setTarget] = useState<Element | null>(null);
  const [liked, setLiked] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [shared, setShared] = useState(false);
  useEffect(() => { const frame = requestAnimationFrame(() => setTarget(document.querySelector("main.blog-article-page article"))); return () => cancelAnimationFrame(frame); }, []);
  const prevent = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  const share = async () => { try { if (navigator.share) await navigator.share({ title: document.title, url: location.href }); else await navigator.clipboard.writeText(location.href); setShared(true); setTimeout(() => setShared(false), 1800); } catch {} };
  if (!target) return null;

  return createPortal(<section id="comments" className="mt-24 border-t border-[var(--g-color-primary)]/35 pt-10">
    <div className="flex flex-col gap-6 border-b border-[var(--g-color-primary)]/25 pb-10 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs uppercase tracking-[0.2em] opacity-45">End of the story</p><h2 className="mt-2 text-3xl font-semibold text-black">Was this article useful?</h2></div><div className="flex gap-3"><button onClick={() => setLiked(!liked)} aria-pressed={liked} className={`flex h-12 items-center gap-2 rounded-full border px-5 ${liked ? "border-[var(--g-color-accent)] bg-[var(--g-color-accent)] text-black" : "border-[var(--g-color-primary)]/30"}`}><Heart className="size-5" fill={liked ? "currentColor" : "none"}/>{liked ? 25 : 24}</button><a href="#comment-form" className="flex h-12 items-center gap-2 rounded-full border border-[var(--g-color-primary)]/30 px-5"><MessageCircle className="size-5"/>{comments.length}</a><button onClick={share} aria-label="Share article" className="flex h-12 items-center gap-2 rounded-full border border-[var(--g-color-primary)]/30 px-4"><Share2 className="size-5"/>{shared && <span className="text-xs">Copied</span>}</button></div></div>
    <div className="pt-14"><div className="flex items-end justify-between border-b border-[var(--g-color-primary)]/25 pb-5"><h2 className="text-5xl font-semibold tracking-[-0.05em] text-black">Comments</h2><span className="text-sm opacity-45">{comments.length} responses</span></div><div className="divide-y divide-[var(--g-color-primary)]/20">{comments.map((comment,index)=><article key={comment.name} className="grid grid-cols-[48px_1fr] gap-5 py-8"><div className="grid size-12 place-items-center rounded-full bg-[var(--g-color-secondary)]/35 text-xs font-bold">{comment.initials}</div><div><div className="flex justify-between gap-4"><h3 className="font-semibold text-black">{comment.name}</h3><time className="text-xs opacity-40">{comment.date}</time></div><p className="mt-3 text-sm leading-7 text-black/65">{comment.body}</p><button type="button" onClick={() => setReplyTo(replyTo === index ? null : index)} className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] opacity-55">Reply</button>{replyTo === index && <form onSubmit={prevent} className="mt-6 rounded-[20px] bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Reply to {comment.name}</p><button type="button" onClick={() => setReplyTo(null)} aria-label="Cancel reply"><X className="size-4"/></button></div><textarea required rows={3} placeholder="Write your reply" className="mt-4 w-full resize-none rounded-[20px] bg-[var(--g-color-canvas)] p-4 outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]"/><button className="mt-3 flex items-center gap-2 rounded-full bg-[var(--g-color-accent)] px-5 py-3 text-sm font-semibold text-black">Post reply <Send className="size-4"/></button></form>}</div></article>)}</div>
    <form id="comment-form" onSubmit={prevent} className="mt-12 rounded-[20px] bg-white p-6 md:p-9"><p className="text-xs uppercase tracking-[0.18em] opacity-40">Join the conversation</p><h3 className="mt-2 text-3xl font-semibold text-black">Leave a comment</h3><div className="mt-7 grid gap-4 sm:grid-cols-2"><input required placeholder="Full name" className="h-14 rounded-[20px] bg-[var(--g-color-canvas)] px-5 outline-none"/><input required type="email" placeholder="Email address" className="h-14 rounded-[20px] bg-[var(--g-color-canvas)] px-5 outline-none"/><textarea required rows={5} placeholder="Write your comment" className="resize-none rounded-[20px] bg-[var(--g-color-canvas)] p-5 outline-none sm:col-span-2"/><button className="flex h-14 w-fit items-center gap-3 rounded-full bg-[var(--g-color-accent)] px-7 font-semibold text-black sm:col-span-2">Post comment <Send className="size-4"/></button></div></form></div>
  </section>, target);
}
