"use client";

import { SceneSection } from "@/components/experience";
import { useExperience } from "@/hooks";

export default function ExperiencePage() {
    const { state } = useExperience();

    return (
        <div className="relative">

            <aside className="fixed right-6 top-24 z-50 w-[320px]">
                <div className="rounded-2xl border bg-card/95 p-4 shadow-lg backdrop-blur">
                    <h2 className="mb-3 text-sm font-semibold">
                        Experience State
                    </h2>

                    <pre className="max-h-[70vh] overflow-auto text-xs leading-5">
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </div>
            </aside>

            <div className="space-y-8 pr-[360px]">
                <SceneSection
                    id="hero"
                    name="Hero"
                    order={1}
                    className="rounded-2xl border bg-card"
                >
                    <h2 className="text-5xl font-semibold">
                        Hero Scene
                    </h2>
                </SceneSection>

                <SceneSection
                    id="about"
                    name="About"
                    order={2}
                    className="rounded-2xl border bg-muted"
                >
                    <h2 className="text-5xl font-semibold">
                        About Scene
                    </h2>
                </SceneSection>

                <SceneSection
                    id="services"
                    name="Services"
                    order={3}
                    className="rounded-2xl border bg-card"
                >
                    <h2 className="text-5xl font-semibold">
                        Services Scene
                    </h2>
                </SceneSection>
            </div>

        </div>
    );
}