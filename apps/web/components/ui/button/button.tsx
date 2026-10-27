import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "rounded-[var(--g-radius-control)] border border-transparent bg-clip-padding text-xs font-bold uppercase tracking-[0.16em]",
    "outline-none select-none cursor-pointer transition-all duration-[var(--g-duration-fast)] ease-[var(--g-ease-out)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--g-color-accent)] focus-visible:ring-offset-2",
    "active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: "bg-[var(--g-color-primary)] text-white hover:bg-[var(--g-color-accent)] hover:text-[var(--g-color-primary)]",
        secondary: "bg-[var(--g-color-secondary)] text-[var(--g-color-primary)] hover:bg-white",
        accent: "bg-[var(--g-color-accent)] text-[var(--g-color-primary)] hover:bg-[var(--g-color-primary)] hover:text-white",
        outline: "border-black/30 bg-transparent text-[var(--g-color-primary)] hover:border-[var(--g-color-primary)] hover:bg-[var(--g-color-primary)] hover:text-white",
        ghost: "bg-transparent text-[var(--g-color-primary)] hover:bg-black/5",
        link: "h-auto rounded-none border-0 bg-transparent p-0 text-[var(--g-color-primary)] shadow-none underline-offset-4 hover:underline",
        plain: "h-auto rounded-none border-0 bg-transparent p-0 text-[var(--g-color-primary)] shadow-none hover:opacity-60",
        destructive: "bg-red-100 text-red-700 hover:bg-red-200 focus-visible:ring-red-400",
      },
      size: {
        default: "h-[46px] gap-3 px-6",
        form: "h-[var(--g-control-height)] gap-3 px-8",
        xs: "h-8 gap-1 px-3 text-[0.625rem] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-2 px-4",
        lg: "h-14 gap-3 px-8 text-sm",
        icon: "size-[46px]",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function Button({ className, variant = "primary", size = "default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
