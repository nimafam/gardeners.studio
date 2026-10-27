import {
    sceneSpatialMap,
} from "@/components/experience/spatial";

import type {
    CameraPathDefinition,
} from "@/types/camera";

/*
 * ========================================================
 * HERO → ABOUT
 * ========================================================
 *
 * همان حرکت سینماتیک تأییدشده قبلی را
 * نگه می‌داریم، اما مقصد About است.
 */

export const heroToAboutCameraPath:
    CameraPathDefinition = {
    id: "hero-to-about",

    fromSceneId: "hero",
    toSceneId: "about",

    points: [
        /*
         * Hero
         */
        [0, 0, 6],

        /*
         * Orbit begins
         */
        [3.5, 1.2, 5],

        /*
         * Travel around Graph
         */
        [5, 1.8, 1],

        /*
         * Depth
         */
        [3.8, 1.6, -2],

        /*
         * About arrival
         */
        [3.4, 1.45, 2.6],
    ],

    startTarget:
        sceneSpatialMap
            .hero
            .cameraTarget,

    endTarget:
        sceneSpatialMap
            .about
            .cameraTarget,

    startProgress: 0.42,

    endProgress: 0.88,
};

/*
 * ========================================================
 * ABOUT → SERVICES
 * ========================================================
 *
 * این حرکت عمداً با Hero متفاوت است.
 *
 * Hero → About:
 * Orbit / cinematic rotation
 *
 * About → Services:
 * Pull-back + Arc + Re-center
 */

export const aboutToServicesCameraPath:
    CameraPathDefinition = {
    id: "about-to-services",

    fromSceneId: "about",
    toSceneId: "services",

    points: [
        /*
         * EXACT About arrival.
         *
         * continuity با Hero → About
         */
        [3.4, 1.45, 2.6],

        /*
         * ZOOM OUT
         *
         * اول از About فاصله می‌گیریم.
         */
        [4.0, 1.7, 4.4],

        /*
         * WIDE ARC
         *
         * Graph دوباره فرصت دیده‌شدن
         * پیدا می‌کند.
         */
        [3.1, 2.15, 5.1],

        /*
         * RE-CENTER
         */
        [1.1, 1.55, 4.8],

        /*
         * SERVICES ARRIVAL
         */
        [-1.2, 1, 4],
    ],

    startTarget:
        sceneSpatialMap
            .about
            .cameraTarget,

    endTarget:
        sceneSpatialMap
            .services
            .cameraTarget,

    /*
     * Real About Hold.
     */
    startProgress: 0.68,

    /*
     * Leave a small settling window.
     */
    endProgress: 0.96,
};

export const servicesToWorkCameraPath:
    CameraPathDefinition = {
    id: "services-to-work",
    fromSceneId: "services",
    toSceneId: "work",
    points: [
        [-1.2, 1, 4],
        [-2.7, 1.75, 5.8],
        [-0.4, 2.6, 6.3],
        [3.8, 1.1, 4.7],
        [4.45, -0.35, 2.15],
    ],
    startTarget:
        sceneSpatialMap.services.cameraTarget,
    endTarget:
        sceneSpatialMap.work.cameraTarget,
    startProgress: 0,
    endProgress: 1,
};
