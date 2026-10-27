import type { ReactNode } from "react";

import {
    ExperienceProvider,
    GraphRuntimeProvider,
    SpatialProjectionProvider,
} from "@/providers";

import {
    StyleguideFooter,
    StyleguideHeader,
    StyleguideSidebar,
} from "./";

interface Props {
    children: ReactNode;
}

export default function StyleguideLayout({
    children,
}: Props) {
    return (
        <ExperienceProvider>
            <SpatialProjectionProvider>
                <GraphRuntimeProvider>
                    <div className="flex min-h-screen bg-background">

                <StyleguideSidebar />

                <div className="flex flex-1 flex-col">

                    <StyleguideHeader />

                    <main className="flex-1">

                        <div className="mx-auto w-full max-w-7xl px-8 py-10">

                            {children}

                        </div>

                    </main>

                    <StyleguideFooter />

                </div>

                    </div>
                </GraphRuntimeProvider>
            </SpatialProjectionProvider>
        </ExperienceProvider>
    );
}
