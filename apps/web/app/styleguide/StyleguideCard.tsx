import type { ReactNode } from "react";

interface Props {
    title: string;
    description?: string;
    children: ReactNode;
}

export function StyleguideCard({
    title,
    description,
    children,
}: Props) {
    return (
        <section className="rounded-2xl border bg-card p-8 shadow-sm">

            <div className="mb-8">

                <h2 className="text-xl font-semibold">

                    {title}

                </h2>

                {description && (

                    <p className="mt-2 text-sm text-muted-foreground">

                        {description}

                    </p>

                )}

            </div>

            {children}

        </section>
    );
}