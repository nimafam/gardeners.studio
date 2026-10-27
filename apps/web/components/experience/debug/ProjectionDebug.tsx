"use client";

import {
    useSpatialProjection,
} from "@/hooks";

export function ProjectionDebug() {
    const {
        camera,
    } = useSpatialProjection();

    return (
        <div className="fixed bottom-6 right-6 z-[100] rounded-xl border bg-card p-4 font-mono text-xs">
            <div>
                Ready: {String(camera.ready)}
            </div>

            <div>
                X: {camera.position.x.toFixed(2)}
            </div>

            <div>
                Y: {camera.position.y.toFixed(2)}
            </div>

            <div>
                Z: {camera.position.z.toFixed(2)}
            </div>

            <div>
                Viewport:
                {" "}
                {camera.viewport.width}
                ×
                {camera.viewport.height}
            </div>
        </div>
    );
}