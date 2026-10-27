"use client";

import Link from "next/link";
import { CalendarDays, Clock3, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function BlogMetaBarV3Mount() {
  const [target, setTarget] = useState<Element | null>(null);
  const [category, setCategory] = useState("Strategy");
  const [shared, setShared] = useState(false);
  useEffect(() => { const frame = requestAnimationFrame(() => { setTarget(document.querySelector("main.blog-article-page article > div:nth-child(2)")); const value = document.querySelector("main.blog-article-page > section:first-child p")?.textContent?.trim(); if (value) setCategory(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()); }); return () => cancelAnimationFrame(frame); }, []);
  const share = async () => { try { if (navigator.share) await navigator.share({ title: document.title, text: "Read this Gardeners Journal article", url: location.href }); else await navigator.clipboard.writeText(location.href); setShared(true); setTimeout(() => setShared(false), 1800); } catch {} };
  if (!target) return null;
  const cls = "flex min-h-5 items-center gap-2 whitespace-nowrap px-4 first:pl-0 not-first:border-l not-first:border-[var(--g-color-primary)]/20";
  return <>{createPortal(<div className="blog-meta-bar flex flex-wrap items-center gap-y-3 text-xs text-[var(--g-color-primary)]/60"><span className={cls}><CalendarDays className="size-4"/>Posted at August 26, 2026</span><span className={cls}><Clock3 className="size-4"/>6 min read</span><span className={cls}>In {category}</span><Link href="/blog/search?author=jessy-james" className={`${cls} transition-colors hover:text-[var(--g-color-primary)]`}>By Jessy James</Link><a href="#comments" className={cls}><MessageCircle className="size-4"/>2 Comments</a><button onClick={share} className={cls}><Share2 className="size-4"/>{shared ? "Link copied" : "Share"}</button></div>,target)}<style>{`main.blog-article-page article > div:nth-child(2) > :not(.blog-meta-bar){display:none!important}`}</style></>;
}
