import { cn } from "@/lib/utils";

interface ChapterMarkerProps {
    index: string;
    label: string;
    align?: "left" | "right";
    className?: string;
}

export function ChapterMarker({
    index,
    label,
    align = "left",
    className,
}: ChapterMarkerProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4",
                align === "right" && "justify-end",
                className,
            )}
        >
            <span className="h-px w-14 bg-secondary/65 md:w-24" />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-secondary md:text-xs">
                {index} / {label}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </div>
    );
}
