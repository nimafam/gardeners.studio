"use client";

import { ActionButton } from "@/components/ui/button";
import { AztecServerDeity } from "@/components/pages/AztecServerDeity";
import { DeityMotionStyles } from "@/components/pages/DeityMotionStyles";

export function GatewayTimeoutView({ onRetry }: { onRetry?: () => void }) {
  return <main className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--g-color-canvas)] px-[var(--g-gutter)] pb-24 pt-40 text-[var(--g-color-primary)] md:pt-48">
    <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-45 [background-image:linear-gradient(rgba(0,63,63,.075)_1px,transparent_1px),linear-gradient(90deg,rgba(0,63,63,.075)_1px,transparent_1px)] [background-size:72px_72px]"/><div aria-hidden="true" className="absolute -right-[12vw] bottom-[-30vw] -z-10 size-[62vw] rounded-full bg-[radial-gradient(circle,#e2e417_0%,#7b9931_28%,#003f3f_58%,transparent_70%)] opacity-65 blur-3xl"/>
    <section className="mx-auto grid min-h-[calc(100svh-13rem)] max-w-[1440px] items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]"><div className="relative z-10"><p className="text-xs font-medium uppercase tracking-[0.24em] opacity-55">The gateway has waited too long</p><p className="mt-5 text-[clamp(7.5rem,17vw,16rem)] font-semibold leading-[0.7] tracking-[-0.09em] text-black">504</p><h1 className="mt-12 max-w-2xl text-[clamp(2.6rem,4.8vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-black">The server god remains silent.</h1><p className="mt-7 max-w-xl text-base leading-7 opacity-65 md:text-lg md:leading-8">The gateway guardian sent your request to the server oracle, but no answer returned before the ritual timed out. Give it a moment, then summon the route again.</p><div className="mt-9 flex flex-wrap gap-3"><ActionButton href="/" label="Back to the garden"/>{onRetry&&<ActionButton onClick={onRetry} label="Summon again"/>}</div></div><AztecServerDeity/></section><DeityMotionStyles/>
  </main>;
}
