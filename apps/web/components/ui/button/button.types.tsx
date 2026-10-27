export type ButtonVariant =
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost";

export type ButtonSize =
    | "sm"
    | "md"
    | "lg";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}