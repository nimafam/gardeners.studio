"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

interface UseDampedProgressOptions {
    damping?: number;
    epsilon?: number;
}

export function useDampedProgress(
    target: number,
    {
        damping = 10,
        epsilon = 0.0001,
    }: UseDampedProgressOptions = {},
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

    /*
     * Always keep the latest target
     * without restarting the animation.
     */

    useEffect(() => {
        targetRef.current =
            target;

        if (
            frameRef.current !==
            null
        ) {
            return;
        }

        const update = (
            time: number,
        ) => {
            const previousTime =
                lastTimeRef.current ??
                time;

            const delta =
                Math.min(
                    (
                        time -
                        previousTime
                    ) / 1000,
                    0.1,
                );

            lastTimeRef.current =
                time;

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

            const current =
                currentRef.current;

            const destination =
                targetRef.current;

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

            if (
                Math.abs(
                    destination -
                    next,
                ) >
                epsilon
            ) {
                frameRef.current =
                    requestAnimationFrame(
                        update,
                    );

                return;
            }

            currentRef.current =
                destination;

            setValue(
                destination,
            );

            frameRef.current =
                null;

            lastTimeRef.current =
                null;
        };

        frameRef.current =
            requestAnimationFrame(
                update,
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
                cancelAnimationFrame(
                    frameRef.current,
                );
            }
        };
    }, []);

    return value;
}