import type {
    ServiceExperienceDefinition,
} from "@/types/services-experience";

/*
 * ============================================================
 * SERVICE EXPERIENCE ID
 * ============================================================
 *
 * ID را از Type واقعی پروژه استخراج می‌کنیم.
 *
 * بنابراین Type موازی و duplicate نمی‌سازیم.
 */

export type ServiceExperienceId =
    ServiceExperienceDefinition["id"];

/*
 * ============================================================
 * SERVICE TRANSITION ID
 * ============================================================
 */

export type ServiceTransitionId =
    | "core-to-identity"
    | "identity-to-digital"
    | "digital-to-promotion"
    | "promotion-to-edge";

/*
 * ============================================================
 * SERVICE TRANSITION DEFINITION
 * ============================================================
 */

export interface ServiceTransitionDefinition {
    id:
    ServiceTransitionId;

    from:
    ServiceExperienceId;

    to:
    ServiceExperienceId;

    /*
     * Local progress of the source Service.
     *
     * Example:
     *
     * Core
     *
     * 0.92 ─────────────── 1.00
     *        handoff
     */

    startProgress:
    number;

    endProgress:
    number;
}

/*
 * ============================================================
 * SERVICE TRANSITION RUNTIME
 * ============================================================
 */

export interface ServiceTransitionRuntime {
    active:
    boolean;

    definition:
    ServiceTransitionDefinition | null;

    fromService:
    ServiceExperienceId | null;

    toService:
    ServiceExperienceId | null;

    /*
     * Normalized transition progress:
     *
     * 0 → transition begins
     * 1 → transition completed
     */

    progress:
    number;
}