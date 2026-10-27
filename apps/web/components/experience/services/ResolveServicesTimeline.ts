import type {
    ServiceTimelineSegment,
} from "./ServicesTimelineConfig";

import {
    servicesTimelineConfig,
} from "./ServicesTimelineConfig";

/*
 * ============================================================
 * RESOLVED TIMELINE TYPES
 * ============================================================
 */

export interface ResolvedServiceTimelineSegment {
    segment:
    ServiceTimelineSegment;

    index:
    number;

    start:
    number;

    end:
    number;

    /*
     * Progress local to this segment.
     *
     * Always:
     *
     * 0 → 1
     */
    localProgress:
    number;
}

export interface ResolvedServicesTimeline {
    progress:
    number;

    active:
    ResolvedServiceTimelineSegment;

    segments:
    readonly ResolvedServiceTimelineSegment[];
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function clamp01(
    value: number,
): number {
    return Math.min(
        Math.max(
            value,
            0,
        ),
        1,
    );
}

function rangeProgress(
    value: number,
    start: number,
    end: number,
): number {
    if (end <= start) {
        return 0;
    }

    return clamp01(
        (value - start) /
        (end - start),
    );
}

/*
 * ============================================================
 * BUILD NORMALIZED SEGMENTS
 * ============================================================
 *
 * Example:
 *
 * weights:
 *
 * Core       3
 * Transition 1
 * Identity   3
 *
 * Runtime converts them to:
 *
 * Core       0.000 → 0.428
 * Transition 0.428 → 0.571
 * Identity   0.571 → 1.000
 */

function buildTimelineSegments() {
    const totalWeight =
        servicesTimelineConfig.reduce(
            (
                total,
                segment,
            ) =>
                total +
                segment.weight,

            0,
        );

    if (totalWeight <= 0) {
        throw new Error(
            "Services timeline must have a positive total weight.",
        );
    }

    let cursor = 0;

    return servicesTimelineConfig.map(
        (
            segment,
            index,
        ) => {
            const size =
                segment.weight /
                totalWeight;

            const start =
                cursor;

            /*
             * Force final segment to exactly 1
             * to avoid floating-point gaps.
             */

            const end =
                index ===
                    servicesTimelineConfig.length -
                    1
                    ? 1
                    : cursor +
                    size;

            cursor =
                end;

            return {
                segment,
                index,
                start,
                end,
            };
        },
    );
}

/*
 * Config is static, so calculate ranges once.
 */

const normalizedSegments =
    buildTimelineSegments();

export function getServiceTimelineRange(serviceId: string) {
    const range = normalizedSegments.find(
        ({ segment }) =>
            segment.type === "service" && segment.service === serviceId,
    );

    return range
        ? { start: range.start, end: range.end }
        : null;
}

/*
 * ============================================================
 * RESOLVER
 * ============================================================
 */

export function resolveServicesTimeline(
    progress: number,
): ResolvedServicesTimeline {
    const normalizedProgress =
        clamp01(progress);

    const resolved =
        normalizedSegments.map(
            ({
                segment,
                index,
                start,
                end,
            }) => ({
                segment,
                index,
                start,
                end,

                localProgress:
                    rangeProgress(
                        normalizedProgress,
                        start,
                        end,
                    ),
            }),
        );

    /*
     * Find the segment that owns
     * the current global progress.
     */

    const active =
        resolved.find(
            (
                current,
            ) =>
                normalizedProgress >=
                current.start &&
                (
                    normalizedProgress <
                    current.end ||
                    current.end === 1
                ),
        ) ??
        resolved[
        resolved.length - 1
        ];

    return {
        progress:
            normalizedProgress,

        active,

        segments:
            resolved,
    };
}
