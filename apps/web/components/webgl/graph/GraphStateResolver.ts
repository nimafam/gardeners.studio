import type {
    GraphNodeDefinition,
    GraphSceneState,
} from "@/types/graph";

const sceneStates: Record<
    string,
    GraphSceneState
> = {
    /*
     * ========================================================
     * HERO
     * ========================================================
     */

    hero: {
        nodes: {
            origin: "focus",

            about: "active",

            services: "idle",

            serviceCore: "idle",

            serviceIdentity: "idle",

            serviceDigital: "idle",

            servicePromotion: "idle",

            serviceEdge: "idle",
        },
    },

    /*
     * ========================================================
     * ABOUT
     * ========================================================
     */

    about: {
        nodes: {
            origin: "active",

            about: "focus",

            services: "active",

            serviceCore: "idle",

            serviceIdentity: "idle",

            serviceDigital: "idle",

            servicePromotion: "idle",

            serviceEdge: "idle",
        },
    },

    /*
     * ========================================================
     * SERVICES
     * ========================================================
     *
     * Scene-level state only.
     *
     * During Services Intro the Services node
     * remains the focal point.
     *
     * Internal service focus will be handled
     * by Services Experience in the next step.
     */

    services: {
        nodes: {
            origin: "idle",

            about: "idle",

            services: "focus",

            serviceCore: "idle",

            serviceIdentity: "idle",

            serviceDigital: "idle",

            servicePromotion: "idle",

            serviceEdge: "idle",
        },
    },

    work: {
        nodes: {
            origin: "idle",
            about: "idle",
            services: "active",
            work: "focus",
        },
    },
};

export function resolveGraphState(
    sceneId: string | undefined,
    nodes: GraphNodeDefinition[],
): GraphSceneState {
    const sceneState =
        sceneId
            ? sceneStates[
            sceneId
            ]
            : undefined;

    if (sceneState) {
        return sceneState;
    }

    return {
        nodes:
            Object.fromEntries(
                nodes.map(
                    (node) => [
                        node.id,
                        "idle",
                    ],
                ),
            ),
    };
}
