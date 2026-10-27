import type {
    GraphComposition,
} from "@/types/graph";

import {
    aboutGraphComposition,
    heroGraphComposition,
    servicesGraphComposition,
    workGraphComposition,
} from "./GraphCompositions";

const compositions: Record<
    string,
    GraphComposition
> = {
    hero: heroGraphComposition,
    about: aboutGraphComposition,
    services: servicesGraphComposition,
    work: workGraphComposition,
};

export function resolveGraphComposition(
    sceneId: string | undefined,
): GraphComposition {
    if (
        sceneId &&
        compositions[sceneId]
    ) {
        return compositions[sceneId];
    }

    return heroGraphComposition;
}
