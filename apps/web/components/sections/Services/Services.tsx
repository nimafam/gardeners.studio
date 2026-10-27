"use client";

import {
    SceneContentRig,
    SceneSection,
    ServicesContentReveal,
    WorldAnchor,
} from "@/components/experience";

import {
    sceneSpatialMap,
} from "@/components/experience/spatial";

import {
    useGraphRuntime,
} from "@/hooks";

import {
    ServicesContent,
} from "./ServicesContent";

export function Services() {
    /*
     * ========================================================
     * GRAPH RUNTIME
     * ========================================================
     */

    const {
        nodes,
    } = useGraphRuntime();

    /*
     * Services حالا Node واقعی خودش را دارد.
     */
    const servicesNode =
        nodes.services;

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
        servicesNode?.position ??
        sceneSpatialMap
            .services
            .nodePosition;

    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (
        <SceneSection
            id="services"
            name="Services"
            order={3}
            className="
                relative
                min-h-[1200svh]
                overflow-visible
                border-0
                bg-transparent
            "
        >
            <WorldAnchor
                position={
                    position
                }

                /*
                 * Content از کنار Services Node
                 * گسترش پیدا می‌کند.
                 */
                align="left"

                /*
                 * فقط Presentation Offset.
                 *
                 * Spatial Position خود Node
                 * دست نمی‌خورد.
                 */
                offset={{
                    x: 48,
                    y: 0,
                }}

                hideWhenBehindCamera

                depthScale={
                    false
                }

                className="
                    z-10
                    w-[min(680px,calc(100vw-64px))]
                "
            >
                <SceneContentRig
                    mode="services"
                    className="
                        pointer-events-auto
                        w-full
                    "
                >
                    <ServicesContentReveal
                        className="
                            w-full
                            max-w-3xl
                        "
                    >
                        <ServicesContent />
                    </ServicesContentReveal>
                </SceneContentRig>
            </WorldAnchor>
        </SceneSection>
    );
}
