"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

import { DotPattern } from "./DotPattern";
import styles from "./Hero.module.css";
import { HeroPreloader } from "./HeroPreloader";

const lines = [
  { text: "Groove", className: "" },
  { text: "Grow", className: "pl-[10vw] text-[var(--g-color-accent)]" },
  { text: "Glow up", className: "" },
] as const;

export function Hero() {
  const [ready, setReady] = useState(false);
  const handleReveal = useCallback(() => setReady(true), []);

  return (
    <section id="home" className={`${styles.hero} relative min-h-svh overflow-hidden bg-[var(--g-color-canvas)]`} aria-labelledby="home-hero-title">
      <HeroPreloader onReveal={handleReveal} />

      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 -z-20 h-auto w-[clamp(21rem,29vw,34.5625rem)]"
        aria-hidden="true"
        initial={{ opacity: 0, x: 70, y: 48, scale: 0.92 }}
        animate={ready ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div animate={ready ? { x: [0, 12, 0], y: [0, 8, 0], scale: [1, 1.025, 1] } : undefined} transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}>
          <Image src="/brand/hero/hero-glow.svg" alt="" width={553} height={874} priority className="h-auto w-full" />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 0.65, delay: 0.1 }}>
        <DotPattern />
      </motion.div>

      <div className="relative flex min-h-svh items-start px-[clamp(4rem,6.6vw,7.875rem)] pb-16 pt-[clamp(13rem,17.3vw,13.875rem)]">
        <h1 id="home-hero-title" className="flex w-full flex-col text-[clamp(5rem,14.1vw,16.875rem)] font-bold uppercase leading-[0.78] tracking-[-0.065em] text-black">
          {lines.map((line, index) => (
            <motion.span
              key={line.text}
              className={`block ${line.className}`}
              initial={{ opacity: 0, y: 64, clipPath: "inset(0 0 100% 0)" }}
              animate={ready ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : undefined}
              transition={{ duration: 0.82, delay: 0.08 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.div className="absolute bottom-[5.5%] right-[2.6%]" initial={{ opacity: 0, y: 18 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, delay: 0.55 }}>
          <motion.div animate={ready ? { y: [0, 7, 0] } : undefined} transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}>
            <Link href="#services" aria-label="Explore Gardeners services" className="flex size-14 items-center justify-center rounded-full">
              <Image src="/brand/hero/arrow-circle.svg" alt="" width={56} height={56} className="size-14" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
