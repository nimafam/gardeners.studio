export function AztecServerDeity() {
  return <div aria-hidden="true" className="error-art deity-art relative mx-auto w-full max-w-[650px]">
    <svg viewBox="0 0 680 740" className="h-auto w-full overflow-visible" fill="none">
      <defs><filter id="server-deity-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35"/></filter></defs>
      <circle cx="340" cy="390" r="245" fill="#7F9B2C" opacity=".62" filter="url(#server-deity-glow)"/>
      <g stroke="#003F3F" strokeWidth="14" strokeLinejoin="miter"><path fill="#E2E417" d="M340 42 386 132 340 172 294 132Z"/><path fill="#E2E417" d="M244 64 292 145 254 194 186 112Z"/><path fill="#E2E417" d="M436 64 388 145 426 194 494 112Z"/><path fill="#E2E417" d="M154 116 250 182 224 244 108 192Z"/><path fill="#E2E417" d="M526 116 430 182 456 244 572 192Z"/><path fill="#B2B3B6" d="M174 224 258 160H422L506 224 548 486 438 650H242L132 486Z"/><path fill="#EAEAEA" d="M225 255 314 216H366L455 255 476 474 408 568H272L204 474Z"/><path fill="#003F3F" d="M228 324 310 294 294 382 222 370Z"/><path fill="#003F3F" d="M452 324 370 294 386 382 458 370Z"/><path fill="#E2E417" d="M340 326 384 438 340 478 296 438Z"/><path fill="#003F3F" d="M262 492H418L390 548H290Z"/><path d="M148 430H70V514H142M532 430H610V514H538"/></g>
      <path d="M286 519H330M350 519H394" stroke="#E2E417" strokeWidth="10" strokeLinecap="square" className="signal-break"/><path d="M75 390H18M605 390H662" stroke="#E2E417" strokeWidth="8" strokeDasharray="10 12"/><circle cx="268" cy="341" r="10" fill="#E2E417" className="deity-eye"/><circle cx="412" cy="341" r="10" fill="#E2E417" className="deity-eye"/>
    </svg>
    <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[.28em] text-[var(--g-color-primary)]/45">Awaiting the server oracle</span>
  </div>;
}
