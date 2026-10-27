"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { workProjects } from "@/content/work-projects";

const batchSize = 3;

export function InfiniteWorkGallery() {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(() => Math.min(batchSize, workProjects.length));
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < workProjects.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisibleCount((count) => Math.min(count + batchSize, workProjects.length));
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <section className="px-[var(--g-gutter)] pb-32 pt-8 md:pb-48 md:pt-16">
      <div className="mx-auto max-w-[1660px]">
        {workProjects.slice(0, visibleCount).map((project, index) => {
          const imageFirst = index % 2 === 1;
          const distance = reduceMotion ? 0 : 72;

          return (
            <motion.article
              key={project.slug}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <Link href={`/work/${project.slug}`} className="group grid min-h-[660px] items-center gap-12 py-16 md:min-h-[760px] md:grid-cols-2 md:gap-20 md:py-24 lg:min-h-[880px]">
                <motion.div
                  className={`relative z-10 flex flex-col justify-center text-right ${imageFirst ? "md:order-2" : "md:order-1"}`}
                  variants={{
                    hidden: { opacity: 0, x: imageFirst ? -distance : distance, filter: "blur(8px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 0.75, 0.18, 1] } },
                  }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--g-color-primary)]/45">{String(index + 1).padStart(2, "0")} · Selected project</p>
                  <div className="relative mt-5">
                    <motion.span
                      aria-hidden="true"
                      className={`absolute top-1/2 h-px w-[75vw] -translate-y-1/2 bg-[var(--g-color-primary)]/55 ${imageFirst ? "right-0 origin-right" : "left-0 origin-left"}`}
                      variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: [0.22, 0.75, 0.18, 1] } } }}
                    />
                    <h2 className="relative z-10 ml-auto w-fit bg-[var(--g-color-canvas)] pl-7 text-[clamp(2.8rem,5vw,5.7rem)] font-semibold uppercase leading-none tracking-[-0.055em] text-black">{project.title}</h2>
                  </div>
                  <p className="mt-5 text-[clamp(1.25rem,2vw,2rem)] font-light leading-none tracking-[-0.025em]">{project.services[0] ?? project.industry}</p>
                  <p className="mt-3 text-xs text-[var(--g-color-primary)]/60">Client: {project.client}</p>
                  <span className="mt-8 ml-auto text-xl transition-transform duration-300 group-hover:translate-x-2">↗</span>
                </motion.div>

                <motion.div
                  className={`relative flex min-h-[500px] items-center ${imageFirst ? "justify-center md:order-1 md:justify-start" : "justify-center md:order-2 md:justify-end"}`}
                  variants={{
                    hidden: { opacity: 0, x: imageFirst ? distance : -distance, y: reduceMotion ? 0 : 34, scale: reduceMotion ? 1 : 0.965 },
                    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 0.75, 0.18, 1] } },
                  }}
                >
                  <div className={`relative w-full max-w-[620px] overflow-hidden rounded-[20px] bg-white transition-transform duration-700 group-hover:-translate-y-2 ${index === 3 ? "aspect-[3/4] max-w-[410px]" : "aspect-[4/5]"}`}>
                    <Image src={project.assets.hero} alt={`${project.title} project mockup`} fill sizes="(max-width: 768px) 90vw, 46vw" className="object-contain p-[3%]" />
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          );
        })}

        <div ref={sentinelRef} aria-hidden={!hasMore} className="grid h-28 place-items-center">
          {hasMore && <span className="size-7 animate-spin rounded-full border-2 border-[var(--g-color-primary)]/15 border-t-[var(--g-color-accent)] motion-reduce:animate-none" />}
        </div>
      </div>
    </section>
  );
}
