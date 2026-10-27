"use client";

import {
    useRef,
} from "react";

import {
    useFrame,
    useThree,
} from "@react-three/fiber";

import {
    useSpatialProjection,
} from "@/hooks";

export function CameraProjectionBridge() {
    const {
        camera,
        size,
    } = useThree();

    const {
        updateCamera,
    } = useSpatialProjection();

    /*
     * Bridge را لازم نیست با نرخ کامل
     * 60fps وارد React state کنیم.
     *
     * فعلاً حدود 30fps برای تست Projection
     * کافی است.
     */
    const elapsed =
        useRef(0);

    useFrame((_, delta) => {
        elapsed.current += delta;

        if (elapsed.current < 1 / 30) {
            return;
        }

        elapsed.current = 0;

        /*
         * مهم:
         * CameraRig قبل از projection
         * position / lookAt را تغییر می‌دهد.
         */

        camera.updateMatrixWorld();

        updateCamera({
            position: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z,
            },

            quaternion: {
                x: camera.quaternion.x,
                y: camera.quaternion.y,
                z: camera.quaternion.z,
                w: camera.quaternion.w,
            },

            projectionMatrix:
                camera.projectionMatrix
                    .toArray(),

            matrixWorldInverse:
                camera.matrixWorldInverse
                    .toArray(),

            viewport: {
                width: size.width,
                height: size.height,
            },

            ready: true,
        });
    });

    return null;
}