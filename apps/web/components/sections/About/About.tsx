"use client";

import {
    SceneContentRig,
    SceneSection,
    WorldAnchor,
} from "@/components/experience";

import {
    sceneSpatialMap,
} from "@/components/experience/spatial";

import {
    useGraphRuntime,
} from "@/hooks";

import {
    AboutContent,
} from "./AboutContent";

export function About() {
    /*
     * ========================================================
     * GRAPH RUNTIME
     * ========================================================
     */

    const {
        nodes,
    } = useGraphRuntime();

    const aboutNode =
        nodes.about;

    /*
     * ========================================================
     * WORLD POSITION
     * ========================================================
     *
     * Source of truth:
     *
     * THREE.Mesh
     *   ↓
     * getWorldPosition()
     *   ↓
     * GraphRuntime
     */

    const position =
        aboutNode?.position ??
        sceneSpatialMap
            .about
            .nodePosition;

    return (
        <SceneSection
            id="about"
            name="About"
            order={2}
            className="
                relative
                min-h-svh
                overflow-hidden
                border-0
                bg-transparent
            "
        >
            <WorldAnchor
                position={
                    position
                }

                /*
                 * Anchor به لبه چپ Content
                 * متصل می‌شود.
                 *
                 * بنابراین Content از Node
                 * به سمت راست گسترش پیدا می‌کند.
                 */
                align="left"

                /*
                 * Presentation Offset.
                 *
                 * Node Position تغییر نمی‌کند.
                 */
                offset={{
                    x: 0,
                    y: 0,
                }}

                hideWhenBehindCamera

                /*
                 * فعلاً خاموش.
                 *
                 * بعد از نهایی شدن Composition
                 * در صورت نیاز فعال می‌کنیم.
                 */
                depthScale={
                    false
                }

                className="
                    z-10
                    w-[min(680px,calc(100vw-64px))]
                "
            >
                <SceneContentRig
                    mode="about"
                    className="
                        pointer-events-auto
                        w-full
                    "
                >
                    <AboutContent />
                </SceneContentRig>
            </WorldAnchor>
        </SceneSection>
    );
}