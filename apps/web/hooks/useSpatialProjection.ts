"use client";

import {
    useContext,
} from "react";

import {
    SpatialProjectionContext,
} from "@/providers/SpatialProjectionProvider";

export function useSpatialProjection() {
    const context =
        useContext(
            SpatialProjectionContext,
        );

    if (!context) {
        throw new Error(
            "useSpatialProjection must be used within a SpatialProjectionProvider.",
        );
    }

    return context;
}