"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ActionButton } from "@/components/ui/button";

export function BlogAuthorButtonMount() {
  const [target, setTarget] = useState<Element | null>(null);
  useEffect(() => { const frame = requestAnimationFrame(() => setTarget(document.querySelector("main.blog-article-page aside > div:first-child"))); return () => cancelAnimationFrame(frame); }, []);
  if (!target) return null;
  return createPortal(<ActionButton href="/blog/search?author=jessy-james" label="More articles by this author" className="mt-7" />, target);
}
