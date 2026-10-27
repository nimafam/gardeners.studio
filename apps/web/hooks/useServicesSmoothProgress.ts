"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

interface UseServicesSmoothProgressOptions {
    damping?: number;
    epsilon?: number;
}

export function useServicesSmoothProgress(
    target: number,
    {
        damping = 9,
        epsilon = 0.00005,
    }: UseServicesSmoothProgressOptions = {},
) {
    const targetRef =
        useRef(target);

    const currentRef =
        useRef(target);

    const frameRef =
        useRef<number | null>(
            null,
        );

    const lastTimeRef =
        useRef<number | null>(
            null,
        );

    const [
        value,
        setValue,
    ] = useState(target);

    useEffect(() => {
        targetRef.current =
            target;

        /*
         * Animation loop already running.
         *
         * فقط target جدید را می‌گیرد.
         */
        if (
            frameRef.current !==
            null
        ) {
            return;
        }

        const tick = (
            time: number,
        ) => {
            const previousTime =
                lastTimeRef.current ??
                time;

            /*
             * seconds
             */
            const delta =
                Math.min(
                    (
                        time -
                        previousTime
                    ) /
                    1000,

                    0.05,
                );

            lastTimeRef.current =
                time;

            const current =
                currentRef.current;

            const destination =
                targetRef.current;

            /*
             * Frame-rate independent
             * exponential damping.
             */

            const factor =
                1 -
                Math.exp(
                    -damping *
                    delta,
                );

            const next =
                current +
                (
                    destination -
                    current
                ) *
                factor;

            currentRef.current =
                next;

            setValue(next);

            /*
             * Target ممکن است هنگام RAF
             * دوباره تغییر کند.
             */

            const remaining =
                Math.abs(
                    targetRef.current -
                    next,
                );

            if (
                remaining >
                epsilon
            ) {
                frameRef.current =
                    window.requestAnimationFrame(
                        tick,
                    );

                return;
            }

            const finalValue =
                targetRef.current;

            currentRef.current =
                finalValue;

            setValue(
                finalValue,
            );

            lastTimeRef.current =
                null;

            frameRef.current =
                null;
        };

        frameRef.current =
            window.requestAnimationFrame(
                tick,
            );
    }, [
        target,
        damping,
        epsilon,
    ]);

    useEffect(() => {
        return () => {
            if (
                frameRef.current !==
                null
            ) {
                window.cancelAnimationFrame(
                    frameRef.current,
                );

                frameRef.current =
                    null;
            }
        };
    }, []);

    return value;
}