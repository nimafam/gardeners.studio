"use client";

import {
    Experience,
    ServicesTakeover,
} from "@/components/experience";

import { ServicesExperienceDebug, ServicesMotionDebug } from "@/components/experience/debug";
import { ServicesExperience } from "@/components/experience/services";

import {
    Hero,
    About,
    Services,
} from "@/components/sections";

export default function HeroSectionPlaygroundPage() {
    return (
        <main
            className="
                relative
                min-h-screen
                w-full
                overflow-x-clip
            "
        >
            {/*
             * =================================================
             * EXPERIENCE / WEBGL LAYER
             * =================================================
             *
             * SceneGraph + Camera + WebGL world.
             *
             * این لایه مستقل از DOM Sections است.
             */}

            <Experience />

            {/*
             * =================================================
             * TAKEOVER
             * =================================================
             *
             * فعلاً برای Debug می‌توانی کامنت نگهش داری.
             */}


            <ServicesTakeover />


            {/*
             * =================================================
             * PAGE SECTIONS
             * =================================================
             *
             * مهم:
             *
             * این مجموعه نباید داخل WorldAnchor باشد.
             *
             * هر Section اگر نیاز به Spatial Anchor داشته باشد
             * خودش مسئول WorldAnchor خودش است.
             *
             * About  → nodes.about
             * Services → nodes.services
             */}

            <div
                className="
                    relative
                    z-30
                    w-full
                "
            >
                <Hero />

                <About />

                <Services />

                <ServicesExperience />
            </div>

            {/*
             * =================================================
             * DEBUG
             * =================================================
             */}

            <ServicesExperienceDebug />

            <ServicesMotionDebug />


            {/*
            <ExperienceDebugPanel />

            <SceneTransitionDebug />

            <ProjectionDebug />

            <ServicesChoreographyDebug />

            <TakeoverDebug />
            */}
        </main>
    );
}