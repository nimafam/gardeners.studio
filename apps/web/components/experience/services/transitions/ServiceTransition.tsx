"use client";

import {
    CoreToIdentity,
} from "./CoreToIdentity";

import {
    IdentityToDigital,
} from "./IdentityToDigital";

import {
    DigitalToPromotion,
} from "./DigitalToPromotion";

import {
    PromotionToEdge,
} from "./PromotionToEdge";

import {
    resolveTransitionRhythm,
} from "./ResolveTransitionRhythm";

import type {
    ServiceTransitionRuntime,
} from "@/types/service-transition";

interface ServiceTransitionProps {
    transition:
    ServiceTransitionRuntime;
}

export function ServiceTransition({
    transition,
}: ServiceTransitionProps) {
    if (
        !transition.active ||
        !transition.definition
    ) {
        return null;
    }

    /*
     * ========================================================
     * CINEMATIC RHYTHM
     * ========================================================
     *
     * Timeline gives us raw local progress.
     *
     * Rhythm converts:
     *
     * 0 ------------------------------- 1
     *
     * into:
     *
     * HOLD → MOTION → ARRIVAL → HOLD
     */

    const rhythm =
        resolveTransitionRhythm(
            transition.definition.id,
            transition.progress,
        );

    switch (
    transition.definition.id
    ) {
        case "core-to-identity":
            return (
                <CoreToIdentity
                    progress={
                        rhythm.motion
                    }
                />
            );

        case "identity-to-digital":
            return (
                <IdentityToDigital
                    progress={
                        rhythm.motion
                    }
                />
            );

        case "digital-to-promotion":
            return (
                <DigitalToPromotion
                    progress={
                        rhythm.motion
                    }
                />
            );

        case "promotion-to-edge":
            return (
                <PromotionToEdge
                    progress={
                        rhythm.motion
                    }
                />
            );

        default:
            return null;
    }
}