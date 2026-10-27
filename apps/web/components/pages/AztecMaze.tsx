export function AztecMaze() {
  return <div aria-hidden="true" className="relative mx-auto w-full max-w-[720px] animate-[mazeFloat_7s_ease-in-out_infinite]">
    <svg viewBox="0 0 760 720" className="h-auto w-full overflow-visible" fill="none">
      <defs><filter id="mazeGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="32" /></filter><pattern id="mazeDots" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#fff" /></pattern><path id="lostRoute" d="M20 364H102V128H248V214H170V294H326V132H478V212H404V292H568V132H650V364H570V448H650V594H494V512H568V430H408V594H250V514H328V430H170V594H102V448H250V366H404V448H488V366H326V294H248" /></defs>
      <ellipse cx="420" cy="385" rx="275" ry="250" fill="#7d9a31" opacity=".55" filter="url(#mazeGlow)"/><rect x="390" y="390" width="280" height="250" fill="url(#mazeDots)" opacity=".5"/>
      <g stroke="#003F3F" strokeWidth="20" strokeLinecap="square" strokeLinejoin="miter"><path d="M20 320V64H696V292M696 430V656H64V448M64 284V64"/><path d="M102 284V126H246V206H170V284"/><path d="M326 248V126H486V206H404V286H566V126H648V286"/><path d="M102 448V594H250V514H328V430H170V366H326V286H248"/><path d="M408 594V430H488V366H326"/><path d="M488 514H568V430H648V594H488"/><path d="M170 206V286H248V366H102"/><path d="M566 286V366H648"/><path d="M404 206V286H326"/></g>
      <g stroke="#E2E417" strokeWidth="5" strokeDasharray="5 15" strokeLinecap="round" opacity=".9"><path d="M20 364H102V128H248V214H170V294H326V132H478"/><path d="M696 364H570V448H650V594H494"/></g>
      <path d="M20 364H248V366H404V448H488V366H570V292" stroke="#E2E417" strokeWidth="6" strokeDasharray="14 15" className="maze-route" opacity=".95"/><circle cx="20" cy="364" r="13" fill="#E2E417"/><path d="M696 314 738 364 696 414" stroke="#E2E417" strokeWidth="14" strokeLinejoin="miter"/>
      <circle r="14" fill="#EAEAEA" stroke="#003F3F" strokeWidth="8"><animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#lostRoute"/></animateMotion></circle>
      <g fill="#E2E417" stroke="#003F3F" strokeWidth="8"><rect x="282" y="326" width="44" height="44" transform="rotate(45 304 348)"/><rect x="546" y="270" width="34" height="34" transform="rotate(45 563 287)"/></g>
    </svg>
    <div className="absolute bottom-[2%] left-[8%] flex items-center gap-4 text-[10px] uppercase tracking-[.25em] text-[var(--g-color-primary)]/45"><span className="h-px w-12 bg-[var(--g-color-primary)]/35"/>Every turn looks familiar</div>
    <style>{`@keyframes mazeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes mazeDash{to{stroke-dashoffset:-58}}.maze-route{animation:mazeDash 2.4s linear infinite}@media(prefers-reduced-motion:reduce){.maze-route{animation:none}}`}</style>
  </div>;
}
