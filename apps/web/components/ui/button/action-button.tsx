import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SharedProps = {
  className?: string;
  label?: string;
};

type ButtonProps = SharedProps & ComponentPropsWithoutRef<"button"> & { href?: never };
type LinkProps = SharedProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: ComponentPropsWithoutRef<typeof Link>["href"] };
type ActionButtonProps = ButtonProps | LinkProps;

const styles = [
  "group/action inline-flex h-[30px] w-fit min-w-[113px] self-start items-center justify-center gap-2 rounded-full",
  "border border-[var(--g-color-primary)]/15 bg-white px-4",
  "text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--g-color-primary)]",
  "cursor-pointer transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out",
  "hover:-translate-y-0.5 hover:border-[var(--g-color-accent)] hover:bg-[var(--g-color-accent)] hover:shadow-[0_8px_24px_rgb(226_228_23_/_22%)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--g-color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--g-color-canvas)]",
  "active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
];

function Content({ label }: { label: string }): ReactNode {
  return (
    <>
      <span>{label}</span>
      <ArrowRight aria-hidden="true" className="w-3.5 translate-x-0 opacity-100 transition-transform duration-200 group-hover/action:translate-x-1" strokeWidth={1.7} />
    </>
  );
}

function ActionButton(props: ActionButtonProps) {
  const { className, label = "Dig More" } = props;

  if (props.href !== undefined) {
    const { href, className: _className, label: _label, ...linkProps } = props;
    void _className;
    void _label;
    return <Link href={href} className={cn(styles, className)} {...linkProps}><Content label={label} /></Link>;
  }

  const { className: _className, label: _label, type = "button", ...buttonProps } = props;
  void _className;
  void _label;
  return <button type={type} className={cn(styles, className)} {...buttonProps}><Content label={label} /></button>;
}

export { ActionButton };
export type { ActionButtonProps };
