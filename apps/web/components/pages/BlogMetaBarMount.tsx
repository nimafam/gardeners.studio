"use client";

import { CalendarDays, Clock3, MessageCircle, Share2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function BlogMetaBarMount() {
  const [target, setTarget] = useState<Element | null>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTarget(document.querySelector("main.blog-article-page article > div:nth-child(2)")));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const share = async () => {
    const data = { title: document.title, text: "Read this Gardeners Journal article", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch { /* The user may cancel the native share dialog. */ }
  };

  if (!target) return null;
  const items = [
    <span key="date" className="flex items-center gap-2"><CalendarDays className="size-4" strokeWidth={1.5} />August 26, 2026</span>,
    <span key="time" className="flex items-center gap-2"><Clock3 className="size-4" strokeWidth={1.5} />6 min read</span>,
    <span key="author" className="flex items-center gap-2"><UserRound className="size-4" strokeWidth={1.5} />Jessy James</span>,
    <a key="comments" href="#comments" className="flex items-center gap-2"><MessageCircle className="size-4" strokeWidth={1.5} />2 Comments</a>,
    <button key="share" type="button" onClick={share} className="flex items-center gap-2"><Share2 className="size-4" strokeWidth={1.5} />{shared ? "Link copied" : "Share"}</button>,
  ];

  return <>{createPortal(<div className="blog-meta-bar flex flex-wrap items-center gap-y-3 text-xs text-[var(--g-color-primary)]/60">{items.map((item, index) => <div key={index} className="flex items-center"><span className="px-4 first:pl-0">{item}</span>{index < items.length - 1 && <span aria-hidden="true" className="h-4 w-px bg-[var(--g-color-primary)]/25" />}</div>)}</div>, target)}<style>{`main.blog-article-page article > div:nth-child(2) > :not(.blog-meta-bar){display:none!important}`}</style></>;
}
