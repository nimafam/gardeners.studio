import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[var(--g-textarea-height)] w-full resize-y rounded-[var(--g-radius-control)] border border-transparent",
        "bg-[var(--g-color-control)] px-6 py-5 text-base leading-7 text-[var(--g-color-primary)] outline-none",
        "placeholder:text-[var(--g-color-primary)]/45 transition-[border-color,box-shadow] duration-[var(--g-duration-fast)]",
        "focus:border-[var(--g-color-primary)] focus:ring-2 focus:ring-[var(--g-color-accent)]/60",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
