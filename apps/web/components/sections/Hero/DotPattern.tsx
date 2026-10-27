"use client";

import { motion } from "motion/react";

import styles from "./DotPattern.module.css";

export function DotPattern() {
  return (
    <motion.div
      className={styles.pattern}
      aria-hidden="true"
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={{ opacity: [0, 0.92, 0.92], x: [0, 0, 14], y: [44, 0, -10], scale: [0.94, 1, 1] }}
      transition={{ duration: 9, times: [0, 0.14, 1], ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
    />
  );
}
