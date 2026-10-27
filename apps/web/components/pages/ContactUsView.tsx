"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

function DotField({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`absolute ${className}`} style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 1.5px, transparent 1.9px)", backgroundSize: "12px 12px" }} />;
}

export function ContactUsView() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0, x = 0) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 38, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="overflow-hidden bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative min-h-[760px] px-[var(--g-gutter)] pb-20 pt-44 md:min-h-[850px] md:pt-56">
        <div aria-hidden="true" className="absolute -right-24 top-[16%] size-[600px] rounded-full bg-[var(--g-color-accent)]/45 blur-[115px]" />
        <DotField className="right-0 top-[31%] h-[330px] w-[40%] opacity-85" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[0.52fr_0.48fr] md:items-center">
          <motion.div {...reveal(0, -30)}>
            <h1 className="text-[clamp(5rem,9vw,9.4rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]"><span className="block text-[var(--g-color-accent)]">Get in</span><span className="mt-5 block border-t border-[var(--g-color-primary)]/60 pt-5">Touch</span></h1>
          </motion.div>
          <motion.p {...reveal(0.12, 30)} className="relative z-10 text-[clamp(1.6rem,2.7vw,3rem)] font-light uppercase leading-[1.15] tracking-[-0.04em] text-black">Contact us for projects</motion.p>
        </div>
      </section>

      <section className="px-[var(--g-gutter)]">
        <motion.div {...reveal()} className="relative mx-auto aspect-[1.82/1] max-w-[1440px] overflow-hidden rounded-[20px] bg-white"><Image src="/brand/contact/contact-map.png" alt="Gardeners studio location map" fill priority sizes="100vw" className="object-cover" /></motion.div>
      </section>

      <section className="relative px-[var(--g-gutter)] py-24 md:py-36">
        <div aria-hidden="true" className="absolute -left-44 top-[-20%] size-[500px] rounded-full bg-[var(--g-color-accent)]/55 blur-[110px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.62fr_0.38fr] lg:gap-24">
          <motion.div {...reveal(0, -24)}>
            <h2 className="max-w-[700px] text-[clamp(3rem,5.2vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-black">We would love to work with You.</h2>
            <div className="mt-14 grid gap-12 sm:grid-cols-2">
              <div><h3 className="text-lg font-semibold text-black">Direct contact</h3><address className="mt-5 space-y-6 text-sm not-italic leading-6 opacity-75"><p>No. 9 – Ghaem Deadend<br />East Ladan Street – South Ladan Street<br />Sanaie Street – Nobonyad<br />Tehran – Iran</p><p>No. 12 – Vakili alley<br />Jordan Street<br />Tehran – Iran</p><p>No. 13 – East Taban alley<br />Jordan Street<br />Tehran – Iran</p></address></div>
              <div className="space-y-12"><div><h3 className="text-lg font-semibold text-black">Administrative Hours</h3><p className="mt-5 text-sm leading-6 opacity-75">Open:<br />Mon–Fri 9–5 / Sat 12–4<br />Closed: Sun and Public Holidays</p></div><div><h3 className="text-lg font-semibold text-black">Email</h3><a href="mailto:hello@gardeners.studio" className="mt-5 block text-sm opacity-75 transition-opacity hover:opacity-100">hello@gardeners.studio</a></div></div>
            </div>
          </motion.div>

          <motion.form {...reveal(0.12, 24)} className="self-start" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-8 flex items-center gap-3"><span className="text-sm uppercase tracking-[0.32em] opacity-65">Let&apos;s grow together</span><span className="size-2 rounded-full bg-[var(--g-color-accent)]" /><span className="h-px flex-1 bg-[var(--g-color-primary)]/45" /></div>
            <div className="grid gap-4"><input aria-label="Full name" placeholder="Full Name:*" className="h-[70px] rounded-[20px] bg-white px-7 text-lg text-black outline-none transition-shadow placeholder:text-black/35 focus:ring-2 focus:ring-[var(--g-color-accent)]" /><input type="email" aria-label="Email" placeholder="Email:*" className="h-[70px] rounded-[20px] bg-white px-7 text-lg text-black outline-none transition-shadow placeholder:text-black/35 focus:ring-2 focus:ring-[var(--g-color-accent)]" /><textarea aria-label="Talent or project details" placeholder="What are you talented at?" rows={5} className="min-h-[180px] resize-none rounded-[20px] bg-white p-7 text-lg text-black outline-none transition-shadow placeholder:text-black/35 focus:ring-2 focus:ring-[var(--g-color-accent)]" /><button type="submit" className="h-[70px] rounded-[20px] bg-[var(--g-color-accent)] text-base font-semibold uppercase tracking-[0.04em] text-black transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0">Send request</button></div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
