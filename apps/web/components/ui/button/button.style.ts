import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-lg",
        "font-medium",
        "transition-all",
        "duration-200",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary: "...",
                secondary: "...",
                accent: "...",
                outline: "...",
                ghost: "...",
            },

            size: {
                sm: "...",
                md: "...",
                lg: "...",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);