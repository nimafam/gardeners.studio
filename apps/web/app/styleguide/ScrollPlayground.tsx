import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export function ScrollPlayground({
    children,
}: Props) {
    return (
        <div className="space-y-0">

            {children}

        </div>
    );
}
