import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & { children: ReactNode };

export function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section className={`py-[var(--g-section-space)] ${className}`} {...props}>
      {children}
    </section>
  );
}
