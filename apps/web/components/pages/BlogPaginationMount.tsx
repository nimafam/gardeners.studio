"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BlogPaginationMount() {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTarget(document.querySelector("main > section:nth-of-type(3) > div > div:nth-child(2)"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!target) return null;

  return createPortal(
    <nav aria-label="Blog pagination" className="mt-14 flex items-center justify-center gap-2 border-t border-[var(--g-color-primary)]/25 pt-8">
      <button type="button" disabled aria-label="Previous page" className="grid size-11 place-items-center rounded-full border border-[var(--g-color-primary)]/35 opacity-35"><ChevronLeft className="size-5" strokeWidth={1.5} /></button>
      {[1, 2, 3].map((page) => <button key={page} type="button" aria-label={`Page ${page}`} aria-current={page === 1 ? "page" : undefined} className={`grid size-11 place-items-center rounded-full border text-sm font-medium transition-colors ${page === 1 ? "border-[var(--g-color-accent)] bg-[var(--g-color-accent)] text-black" : "border-[var(--g-color-primary)]/35 hover:border-[var(--g-color-primary)]"}`}>{String(page).padStart(2, "0")}</button>)}
      <button type="button" aria-label="Next page" className="grid size-11 place-items-center rounded-full border border-[var(--g-color-primary)]/35 transition-colors hover:border-[var(--g-color-primary)]"><ChevronRight className="size-5" strokeWidth={1.5} /></button>
    </nav>,
    target,
  );
}
