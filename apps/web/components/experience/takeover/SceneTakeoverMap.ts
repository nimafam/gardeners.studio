import type {
    SceneTakeoverMap,
} from "@/types/takeover";

export const sceneTakeoverMap:
    SceneTakeoverMap = {
    services: {
        enabled: true,

        type: "radial",

        /*
         * Local progress inside
         * the configured takeover phase.
         */
        phase: "traverse",

        startProgress: 0,
        endProgress: 0.06,

        background: "#01362E",

        overscan: 1.15,
    },
};
