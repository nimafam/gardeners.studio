export type ServiceExperienceId =
    | "core"
    | "identity"
    | "digital"
    | "promotion"
    | "edge";

export type ServiceMotionType =
    | "foundation"
    | "signal"
    | "perspective"
    | "performance"
    | "convergence";

export interface ServiceExperienceDefinition {
    id: ServiceExperienceId;

    index: number;

    number: string;

    title: string;

    metaphor: string;

    description: string;

    services: readonly string[];

    motionType: ServiceMotionType;

    /*
     * Local range inside Services Experience.
     *
     * 0 → 1
     */
    start: number;

    end: number;
}

export interface ActiveServiceExperience {
    service:
    ServiceExperienceDefinition;

    /*
     * Global normalized progress
     * inside the internal Services Experience.
     */
    progress: number;

    /*
     * 0 → 1 progress of the active service.
     */
    localProgress: number;
}