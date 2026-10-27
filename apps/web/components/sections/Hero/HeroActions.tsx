import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroActions() {
    return (
        <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
                href="/contact"
                className={cn(
                    buttonVariants({
                        variant: "primary",
                        size: "lg",
                    }),
                )}
            >
                Start a Conversation
            </Link>

            <Link
                href="/#services"
                className={cn(
                    buttonVariants({
                        variant: "outline",
                        size: "lg",
                    }),
                )}
            >
                Explore Services
            </Link>
        </div>
    );
}
