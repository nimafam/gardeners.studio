"use client";

import {
    useContext,
} from "react";

import {
    GraphRuntimeContext,
} from "@/providers/GraphRuntimeProvider";

export function useGraphRuntime() {
    const context =
        useContext(
            GraphRuntimeContext,
        );

    if (!context) {
        throw new Error(
            "useGraphRuntime must be used within a GraphRuntimeProvider.",
        );
    }

    return context;
}