import type {
    SceneSpatialDefinition,
} from "./SceneSpatialDefinition";

export const sceneSpatialMap: Record<
    string,
    SceneSpatialDefinition
> = {
    hero: {
        nodePosition: [
            0,
            0,
            0,
        ],

        contentAnchor: [
            -2.4,
            0.35,
            0,
        ],

        cameraTarget: [
            0,
            0,
            0,
        ],
    },

    /*
     * ----------------------------------------
     * ABOUT
     * ----------------------------------------
     *
     * About را عمداً کمی بالاتر و عمیق‌تر
     * از Hero قرار می‌دهیم تا حرکت بعدی
     * صرفاً horizontal نباشد.
     */

    about: {
        nodePosition: [
            2.0,
            2.0,
            -2.2,
        ],

        contentAnchor: [
            1.3,
            0.5,
            -1.8,
        ],

        cameraTarget: [
            2.0,
            0.8,
            -2.2,
        ],
    },

    /*
     * ----------------------------------------
     * SERVICES
     * ----------------------------------------
     */

    services: {

        nodePosition: [
            -2.2,
            0,
            -0.8,
        ],

        contentAnchor: [
            -2.2,
            0.25,
            -0.8,
        ],

        cameraTarget: [
            0,
            0,
            -0.8,
        ],
    },

    work: {
        nodePosition: [
            2.8,
            -1.35,
            -3.4,
        ],

        contentAnchor: [
            2.8,
            -0.9,
            -3.4,
        ],

        cameraTarget: [
            2.15,
            -0.75,
            -3.4,
        ],
    },
};
