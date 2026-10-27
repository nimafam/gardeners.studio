import type { HTMLAttributes, ReactNode } from "react";

type GridProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function Grid({ children, className = "", ...props }: GridProps) {
  return (
    <div className={`grid grid-cols-4 gap-[var(--g-grid-gap)] md:grid-cols-12 ${className}`} {...props}>
      {children}
    </div>
  );
}
