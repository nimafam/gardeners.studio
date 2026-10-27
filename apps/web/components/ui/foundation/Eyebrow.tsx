import type { HTMLAttributes } from "react";

export function Eyebrow({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-xs font-medium uppercase tracking-[0.16em] text-[var(--g-color-muted)] ${className}`} {...props} />;
}
