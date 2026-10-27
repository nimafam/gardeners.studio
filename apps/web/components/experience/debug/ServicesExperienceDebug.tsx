"use client";

import {
    useServicesExperience,
} from "@/components/experience/services/ServicesExperience";

export function ServicesExperienceDebug() {
    const experience =
        useServicesExperience();

    /*
     * Before Services Experience starts:
     *
     * Takeover
     * Post-Takeover Hold
     * Intro Exit
     *
     * هیچ Service فعالی نداریم.
     */
    if (!experience) {
        return null;
    }

    const {
        service,
        progress,
        localProgress,
    } = experience;

    return (
        <div
            className="
                pointer-events-none
                fixed
                bottom-6
                right-6
                z-[9999]
                w-[280px]
                rounded-xl
                border
                border-white/10
                bg-black/80
                p-4
                font-mono
                text-xs
                text-white
                backdrop-blur
            "
        >
            <div
                className="
                    mb-3
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white/50
                "
            >
                Services Experience
            </div>

            <div className="space-y-2">
                <div>
                    <span className="text-white/40">
                        Active
                    </span>

                    <div
                        className="
                            mt-1
                            text-sm
                            font-semibold
                        "
                    >
                        {service.number}
                        {" — "}
                        {service.title}
                    </div>
                </div>

                <div>
                    <span className="text-white/40">
                        Metaphor
                    </span>

                    <div>
                        {service.metaphor}
                    </div>
                </div>

                <div>
                    <span className="text-white/40">
                        Motion
                    </span>

                    <div>
                        {service.motionType}
                    </div>
                </div>

                <div>
                    <span className="text-white/40">
                        Experience
                    </span>

                    <div>
                        {progress.toFixed(3)}
                    </div>
                </div>

                <div>
                    <span className="text-white/40">
                        Local
                    </span>

                    <div>
                        {localProgress.toFixed(3)}
                    </div>
                </div>

                <div
                    className="
                        mt-3
                        h-1
                        overflow-hidden
                        rounded-full
                        bg-white/10
                    "
                >
                    <div
                        className="
                            h-full
                            bg-white
                        "
                        style={{
                            width:
                                `${localProgress * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}