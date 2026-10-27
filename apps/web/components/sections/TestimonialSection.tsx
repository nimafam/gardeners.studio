"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const testimonials = [
  {
    quote: "Your work should be nominated for service of the year. It fits our needs perfectly.",
    name: "Client Name",
    role: "Founder · Placeholder Company",
    initials: "CN",
  },
  {
    quote: "Gardeners turned a complex challenge into a clear brand system our whole team can use.",
    name: "Client Name",
    role: "Marketing Director · Placeholder Brand",
    initials: "CP",
  },
  {
    quote: "The process felt thoughtful, collaborative and focused from the first conversation to launch.",
    name: "Client Name",
    role: "Managing Partner · Placeholder Studio",
    initials: "CS",
  },
] as const;

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  return (
    <section aria-labelledby="testimonial-title" className="relative overflow-hidden px-[var(--g-gutter)] py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-[clamp(13rem,22vw,23rem)] w-[clamp(10rem,18vw,18rem)] -translate-y-1/2 bg-[url('/brand/testimonial/quote-down.svg')] bg-contain bg-left-center bg-no-repeat" />

      <div className="relative mx-auto grid min-h-[430px] max-w-[1440px] gap-16 border-y border-[var(--g-color-primary)]/15 py-14 md:grid-cols-[0.86fr_1.14fr] md:items-center md:py-20 lg:gap-24">
        <h2 id="testimonial-title" className="text-[clamp(3.8rem,6.4vw,7rem)] font-medium uppercase leading-[0.82] tracking-[-0.065em] text-[var(--g-color-primary)]">
          <span className="block">Heart</span>
          <span className="block">from</span>
          <strong className="block font-extrabold text-[var(--g-color-accent)]">Garden</strong>
          <span className="block">owners</span>
        </h2>

        <div className="min-h-[260px] md:pl-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <blockquote className="max-w-3xl text-[clamp(1.35rem,2vw,2rem)] font-semibold leading-[1.22] tracking-[-0.025em] text-black">
                {testimonial.quote}
              </blockquote>
              <div className="mt-9">
                <p className="text-sm font-medium uppercase tracking-[0.04em] text-[var(--g-color-primary)]/75">{testimonial.name}</p>
                <p className="mt-1 text-xs text-[var(--g-color-primary)]/45">{testimonial.role}</p>
                <div className="mt-7 grid size-14 place-items-center rounded-full bg-[var(--g-color-secondary)]/45 text-xs font-bold text-[var(--g-color-primary)]" aria-label="Placeholder client portrait">
                  {testimonial.initials}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex items-center gap-4" aria-label="Choose testimonial">
            {testimonials.map((item, index) => (
              <button
                key={`${item.initials}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`size-2 rounded-full border border-[var(--g-color-primary)] transition-colors ${activeIndex === index ? "bg-[var(--g-color-primary)]" : "bg-transparent hover:bg-[var(--g-color-accent)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
