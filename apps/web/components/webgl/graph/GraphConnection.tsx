"use client";

import { useMemo } from "react";

import { Line } from "@react-three/drei";

import {
    QuadraticBezierCurve3,
    Vector3,
} from "three";

import type {
    Position3D,
} from "@/types/graph";

export interface GraphConnectionProps {
    start: Position3D;
    end: Position3D;

    curvature?: number;

    color?: string;
    opacity?: number;
    lineWidth?: number;

    segments?: number;
}

export function GraphConnection({
    start,
    end,
    curvature = 0.45,
    color = "#BB987D",
    opacity = 0.35,
    lineWidth = 1,
    segments = 32,
}: GraphConnectionProps) {
    const points = useMemo(() => {
        const startVector =
            new Vector3(
                start[0],
                start[1],
                start[2],
            );

        const endVector =
            new Vector3(
                end[0],
                end[1],
                end[2],
            );

        const controlPoint =
            startVector
                .clone()
                .lerp(
                    endVector,
                    0.5,
                );

        controlPoint.z +=
            curvature;

        const curve =
            new QuadraticBezierCurve3(
                startVector,
                controlPoint,
                endVector,
            );

        return curve.getPoints(
            segments,
        );
    }, [
        start,
        end,
        curvature,
        segments,
    ]);

    return (
        <Line
            points={points}
            color={color}
            lineWidth={lineWidth}
            transparent
            opacity={opacity}
        />
    );
}