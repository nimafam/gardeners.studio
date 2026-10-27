import {
    sceneSpatialMap,
} from "@/components/experience/spatial";

import type {
    GraphComposition,
} from "@/types/graph";

/*
 * ============================================================
 * GRAPH ARCHITECTURE
 * ============================================================
 *
 * Current spatial journey:
 *
 * origin
 *   ↓
 * about
 *   ↓
 * services
 *
 * IMPORTANT:
 *
 * Individual AKORD services are NOT graph nodes.
 *
 * After Services Takeover the experience switches from
 * Graph / Camera choreography to the independent
 * Services Cinematic Experience.
 *
 * Future sections such as Projects may introduce new
 * graph nodes when the spatial journey resumes.
 */

/*
 * ============================================================
 * HERO
 * ============================================================
 */

export const heroGraphComposition:
    GraphComposition = {
    nodes: {
        /*
         * Structural world origin.
         *
         * Previously called "core".
         *
         * This is NOT the AKORD Core service.
         */

        origin: {
            position:
                sceneSpatialMap
                    .hero
                    .nodePosition,

            size: 0.14,
        },

        /*
         * About destination.
         */

        about: {
            position:
                sceneSpatialMap
                    .about
                    .nodePosition,

            size: 0.11,

            curvature: 0.85,
        },

        /*
         * Services destination.
         */

        services: {
            position:
                sceneSpatialMap
                    .services
                    .nodePosition,

            size: 0.11,

            curvature: 0.75,
        },
    },
};

/*
 * ============================================================
 * ABOUT
 * ============================================================
 */

export const aboutGraphComposition:
    GraphComposition = {
    nodes: {
        /*
         * Structural origin remains in World
         * for spatial continuity.
         */

        origin: {
            position: [
                0,
                0,
                -0.4,
            ],

            size: 0.12,
        },

        /*
         * About focal node.
         */

        about: {
            position:
                sceneSpatialMap
                    .about
                    .nodePosition,

            size: 0.14,

            curvature: 0.85,
        },

        /*
         * Services remains visible as the next
         * spatial destination.
         */

        services: {
            position:
                sceneSpatialMap
                    .services
                    .nodePosition,

            size: 0.11,

            curvature: 0.75,
        },
    },
};

/*
 * ============================================================
 * SERVICES
 * ============================================================
 */

export const servicesGraphComposition:
    GraphComposition = {
    nodes: {
        /*
         * Structural origin.
         */

        origin: {
            position:
                sceneSpatialMap
                    .hero
                    .nodePosition,

            size: 0.12,
        },

        /*
         * Previous About node remains in World
         * during Services arrival.
         */

        about: {
            position: [
                sceneSpatialMap
                    .about
                    .nodePosition[0],

                sceneSpatialMap
                    .about
                    .nodePosition[1] +
                0.85,

                sceneSpatialMap
                    .about
                    .nodePosition[2],
            ],

            size: 0.14,

            curvature: 0.85,
        },

        /*
         * Final graph focal point before Takeover.
         */

        services: {
            position:
                sceneSpatialMap
                    .services
                    .nodePosition,

            size: 0.14,

            curvature: 0.75,
        },
    },
};

export const workGraphComposition:
    GraphComposition = {
    nodes: {
        origin: {
            position: [0, 0, -0.9],
            size: 0.1,
        },
        about: {
            position: [2.2, 2.8, -2.8],
            size: 0.09,
            curvature: 0.85,
        },
        services: {
            position:
                sceneSpatialMap.services.nodePosition,
            size: 0.12,
            curvature: 0.75,
        },
        work: {
            position:
                sceneSpatialMap.work.nodePosition,
            size: 0.14,
            curvature: 1.05,
        },
    },
};
