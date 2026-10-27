"use client";

import {
    useState,
} from "react";

import {
    useGraphRuntime,
} from "@/hooks";

import {
    RadialTakeover,
} from "../takeover";

export function TakeoverDebug() {
    const [
        progress,
        setProgress,
    ] = useState(0);

    const {
        nodes,
    } = useGraphRuntime();

    const strategy =
        nodes.strategy;

    if (!strategy) {
        return null;
    }

    return (
        <>
            <RadialTakeover
                position={
                    strategy.position
                }
                progress={
                    progress
                }
                background="#bb987d"
                overscan={1.15}
                initialSize={24}
                className="z-[50]"
            />

            <div
                className="
                    fixed
                    bottom-6
                    left-1/2
                    z-[200]
                    w-[min(420px,calc(100vw-3rem))]
                    -translate-x-1/2
                    rounded-xl
                    border
                    bg-background/95
                    p-4
                    shadow-xl
                    backdrop-blur
                "
            >
                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                        text-xs
                        font-medium
                    "
                >
                    <span>
                        Strategy Takeover
                    </span>

                    <span className="font-mono">
                        {progress.toFixed(
                            2,
                        )}
                    </span>
                </div>

                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.001}
                    value={progress}
                    onChange={(
                        event,
                    ) => {
                        setProgress(
                            Number(
                                event
                                    .currentTarget
                                    .value,
                            ),
                        );
                    }}
                    className="w-full"
                />
            </div>
        </>
    );
}