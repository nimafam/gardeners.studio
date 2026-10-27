import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[var(--g-container)] px-[var(--g-gutter)] ${className}`} {...props}>
      {children}
    </div>
  );
}
