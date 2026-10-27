import type { HTMLAttributes } from "react";

export function Tag({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-[var(--g-radius-control)] border border-black/25 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] ${className}`} {...props} />;
}
