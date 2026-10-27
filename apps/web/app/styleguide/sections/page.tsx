"use client";

import Link from "next/link";

export default function SectionPage() {
    return (
        <div className="grid gap-6">
            <Link
                href="/styleguide/sections/hero"
                className="
                    block
                    rounded-2xl
                    border
                    bg-card
                    p-6
                    transition
                    hover:bg-muted
                "
            >
                <h2 className="font-semibold">
                    Hero
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Hero section with Experience Engine and Motion
                </p>
            </Link>
        </div>
    );
}