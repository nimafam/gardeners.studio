"use client";

import { ActionButton } from "@/components/ui/button";

type Props = {
  code: "404" | "502";
  eyebrow: string;
  title: string;
  description: string;
  onRetry?: () => void;
};

function LostGardenMaze() {
  return (
    <div aria-hidden="true" className="error-art relative mx-auto w-full max-w-[700px]">
      <svg viewBox="0 0 720 720" className="h-auto w-full overflow-visible" fill="none">
        <defs>
          <filter id="maze-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="24" /></filter>
          <pattern id="maze-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.7" fill="#fff" /></pattern>
        </defs>
        <circle cx="360" cy="360" r="260" fill="#78972f" opacity=".42" filter="url(#maze-glow)" />
        <path d="M32 360H94V94H626V626H94V438H174V546H546V174H174V360H254V254H466V466H254V360H334V334H386V386H334" stroke="#003F3F" strokeWidth="26" strokeLinejoin="miter" />
        <path d="M120 120H600V600H120V464M200 200H520V520H200V414M280 280H440V440H280V386" stroke="#E2E417" strokeWidth="9" strokeDasharray="3 20" strokeLinecap="round" opacity=".95" />
        <path d="M32 360H334" stroke="#E2E417" strokeWidth="5" strokeDasharray="12 13" className="maze-route" />
        <circle cx="44" cy="360" r="13" fill="#E2E417" />
        <circle cx="334" cy="360" r="14" fill="#EAEAEA" stroke="#003F3F" strokeWidth="8" className="maze-wanderer" />
        <path d="M626 286H690V434H626" stroke="#003F3F" strokeWidth="26" />
        <rect x="487" y="487" width="90" height="90" fill="url(#maze-dots)" opacity=".72" />
      </svg>
      <span className="absolute bottom-[7%] right-[6%] text-[10px] uppercase tracking-[.28em] text-[var(--g-color-primary)]/45">No single way out</span>
    </div>
  );
}

function AztecSignalDeity() {
  return (
    <div aria-hidden="true" className="error-art deity-art relative mx-auto w-full max-w-[650px]">
      <svg viewBox="0 0 680 740" className="h-auto w-full overflow-visible" fill="none">
        <defs><filter id="deity-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter></defs>
        <circle cx="340" cy="390" r="245" fill="#7F9B2C" opacity=".62" filter="url(#deity-glow)" />
        <g stroke="#003F3F" strokeWidth="14" strokeLinejoin="miter">
          <path fill="#E2E417" d="M340 42 386 132 340 172 294 132Z" />
          <path fill="#E2E417" d="M244 64 292 145 254 194 186 112Z" />
          <path fill="#E2E417" d="M436 64 388 145 426 194 494 112Z" />
          <path fill="#E2E417" d="M154 116 250 182 224 244 108 192Z" />
          <path fill="#E2E417" d="M526 116 430 182 456 244 572 192Z" />
          <path fill="#B2B3B6" d="M174 224 258 160H422L506 224 548 486 438 650H242L132 486Z" />
          <path fill="#EAEAEA" d="M225 255 314 216H366L455 255 476 474 408 568H272L204 474Z" />
          <path fill="#003F3F" d="M228 324 310 294 294 382 222 370Z" />
          <path fill="#003F3F" d="M452 324 370 294 386 382 458 370Z" />
          <path fill="#E2E417" d="M340 326 384 438 340 478 296 438Z" />
          <path fill="#003F3F" d="M262 492H418L390 548H290Z" />
          <path d="M148 430H70V514H142M532 430H610V514H538" />
        </g>
        <path d="M286 519H330M350 519H394" stroke="#E2E417" strokeWidth="10" strokeLinecap="square" className="signal-break" />
        <path d="M75 390H18M605 390H662" stroke="#E2E417" strokeWidth="8" strokeDasharray="10 12" />
        <circle cx="268" cy="341" r="10" fill="#E2E417" className="deity-eye" /><circle cx="412" cy="341" r="10" fill="#E2E417" className="deity-eye" />
      </svg>
      <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[.28em] text-[var(--g-color-primary)]/45">Gateway spirit offline</span>
    </div>
  );
}

export function SystemErrorView({ code, eyebrow, title, description, onRetry }: Props) {
  const isGateway = code === "502";
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--g-color-canvas)] px-[var(--g-gutter)] pb-24 pt-40 text-[var(--g-color-primary)] md:pt-48">
      <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-45 [background-image:linear-gradient(rgba(0,63,63,.075)_1px,transparent_1px),linear-gradient(90deg,rgba(0,63,63,.075)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden="true" className="absolute -right-[12vw] bottom-[-30vw] -z-10 size-[62vw] rounded-full bg-[radial-gradient(circle,#e2e417_0%,#7b9931_28%,#003f3f_58%,transparent_70%)] opacity-65 blur-3xl" />
      <section className="mx-auto grid min-h-[calc(100svh-13rem)] max-w-[1440px] items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-[0.24em] opacity-55">{eyebrow}</p>
          <p className="mt-5 text-[clamp(7.5rem,17vw,16rem)] font-semibold leading-[0.7] tracking-[-0.09em] text-black">{code}</p>
          <h1 className="mt-12 max-w-2xl text-[clamp(2.6rem,4.8vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-black">{title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 opacity-65 md:text-lg md:leading-8">{description}</p>
          <div className="mt-9 flex flex-wrap gap-3"><ActionButton href="/" label="Back to the garden" />{onRetry && <ActionButton onClick={onRetry} label="Try this path again" />}</div>
        </div>
        {isGateway ? <AztecSignalDeity /> : <LostGardenMaze />}
      </section>
      <style>{`
        .error-art { animation: error-float 7s ease-in-out infinite; }
        .maze-wanderer { animation: maze-lost 5s steps(1,end) infinite; transform-box: fill-box; transform-origin:center; }
        .maze-route { animation: route-pulse 2.4s linear infinite; }
        .deity-eye { animation: deity-signal 2.6s ease-in-out infinite; }
        .signal-break { animation: route-pulse 1.2s steps(2,end) infinite; }
        @keyframes error-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes maze-lost { 0%,24%{transform:translate(0,0)} 25%,49%{transform:translate(-80px,0)} 50%,74%{transform:translate(-80px,-80px)} 75%,100%{transform:translate(0,-80px)} }
        @keyframes route-pulse { to { stroke-dashoffset:-50; } }
        @keyframes deity-signal { 0%,100%{opacity:.3} 42%,58%{opacity:1} }
        @media (prefers-reduced-motion:reduce){.error-art,.maze-wanderer,.maze-route,.deity-eye,.signal-break{animation:none}}
      `}</style>
    </main>
  );
}
