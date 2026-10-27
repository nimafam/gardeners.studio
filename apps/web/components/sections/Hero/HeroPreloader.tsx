"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "gardeners-intro-v2";

type HeroPreloaderProps = {
  onReveal: () => void;
};

export function HeroPreloader({ onReveal }: HeroPreloaderProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const revealed = useRef(false);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
  }, [onReveal]);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    const previousOverflow = document.body.style.overflow;
    let revealTimer = 0;
    let exitTimer = 0;

    if (seen) {
      const frame = window.requestAnimationFrame(() => {
        reveal();
        setVisible(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    document.body.style.overflow = "hidden";
    revealTimer = window.setTimeout(reveal, reduceMotion ? 120 : 900);
    exitTimer = window.setTimeout(() => setVisible(false), reduceMotion ? 180 : 1120);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion, reveal]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        sessionStorage.setItem(SESSION_KEY, "seen");
        document.body.style.overflow = "";
        reveal();
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[var(--g-color-primary)]"
          role="status"
          aria-label="Gardeners is opening"
          initial={{ clipPath: "circle(150% at 86% 82%)" }}
          exit={{ clipPath: reduceMotion ? "circle(150% at 86% 82%)" : "circle(0% at 86% 82%)", opacity: reduceMotion ? 0 : 1 }}
          transition={{ duration: reduceMotion ? 0.22 : 0.78, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute -bottom-[44vmax] -right-[35vmax] aspect-square w-[112vmax] rounded-full blur-[38px]"
            style={{ background: "radial-gradient(circle at 40% 38%, #e2e417 0%, #a8b51d 20%, #39743a 48%, #003f3f 72%)" }}
            initial={{ opacity: 0.35, scale: 0.42 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.15 : 1.15, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="relative z-10 grid h-[172px] w-[142px] place-items-center rounded-[20px] bg-[rgb(234_234_234_/_92%)] shadow-[0_24px_70px_rgb(0_25_25_/_28%)] backdrop-blur-md"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.52, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[126px] w-[92px]">
              <Image src="/brand/gardeners-logo-vector.svg" alt="Gardeners" fill priority className="object-contain" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
