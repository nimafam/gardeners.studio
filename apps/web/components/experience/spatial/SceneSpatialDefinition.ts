import type {
    Position3D,
} from "@/types/graph";

export interface SceneSpatialDefinition {
    /*
     * موقعیت اصلی Node در Graph.
     */
    nodePosition: Position3D;

    /*
     * نقطه‌ای که Camera هنگام حضور
     * در این Scene به آن نگاه می‌کند.
     *
     * الزاماً برابر nodePosition نیست.
     */
    cameraTarget: Position3D;

    /*
     * محل قرارگیری DOM Content
     * در World Space.
     *
     * الزاماً روی Node قرار ندارد.
     */
    contentAnchor: Position3D;
}

export type SceneSpatialId =
    | "hero"
    | "about"
    | "services"
    | "work";
