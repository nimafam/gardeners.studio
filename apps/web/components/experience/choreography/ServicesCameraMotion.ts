import type {
    LinearPanMotionDefinition,
} from "@/components/webgl/camera/motions";

import {
    sceneSpatialMap,
} from "@/components/experience/spatial";

/*
 * ========================================================
 * SERVICES ENTRY DOLLY
 * ========================================================
 *
 * About → Services CameraPath ما را به
 * محدوده Services می‌رساند.
 *
 * این Motion مسئول حرکت داخل Services ENTRY است:
 *
 * Arrival
 *    ↓
 * Dolly toward Services
 *    ↓
 * Services Node clearly visible
 *    ↓
 * SETTLE
 *
 * startPosition در CameraRig با position واقعی
 * Camera در لحظه ورود override خواهد شد.
 */

export const servicesEntryDolly:
    LinearPanMotionDefinition = {
    /*
     * Runtime start.
     */
    startPosition: [
        0,
        0,
        0,
    ],

    /*
     * Dolly destination.
     *
     * Camera کمی نزدیک‌تر می‌شود ولی
     * فاصله کافی برای دیدن خود Node
     * و شروع Takeover باقی می‌ماند.
     */
    endPosition: [
        -1.45,
        1.05,
        3.15,
    ],

    /*
     * Runtime CameraRig این Target را
     * هنگام شروع Entry override می‌کند
     * تا continuity حفظ شود.
     */
    startTarget:
        sceneSpatialMap
            .services
            .cameraTarget,

    /*
     * مقصد نگاه Camera خود Services است.
     */
    endTarget:
        sceneSpatialMap
            .services
            .cameraTarget,
};

/*
 * ========================================================
 * SERVICES → STRATEGY PAN
 * ========================================================
 *
 * حرکت داخلی بعدی Services.
 *
 * فعلاً بدون تغییر نگه داشته می‌شود.
 */

export const servicesToStrategyPan:
    LinearPanMotionDefinition = {
    /*
     * Runtime CameraRig این مقدار را
     * هنگام شروع Traverse override می‌کند.
     */
    startPosition: [
        0,
        0,
        0,
    ],

    /*
     * Camera destination.
     */
    endPosition: [
        -3.8,
        1.6,
        4.2,
    ],

    /*
     * Runtime target.
     */
    startTarget:
        sceneSpatialMap
            .services
            .cameraTarget,

    /*
     * Strategy target.
     */
    endTarget: [
        -2.4,
        1.4,
        0.2,
    ],
};