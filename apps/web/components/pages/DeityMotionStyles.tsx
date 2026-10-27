export function DeityMotionStyles() {
  return <style>{`
    .deity-art svg > g[stroke]:first-of-type {
      transform-box: fill-box;
      transform-origin: center;
      animation: deity-awaken 5.8s cubic-bezier(.4,0,.2,1) infinite;
    }
    .deity-art svg > g[stroke]:first-of-type > path:nth-child(-n+5) {
      transform-box: fill-box;
      transform-origin: 50% 100%;
      animation: crown-signal 3.2s ease-in-out infinite alternate;
    }
    .deity-art svg > g[stroke]:first-of-type > path:nth-child(2),
    .deity-art svg > g[stroke]:first-of-type > path:nth-child(5) { animation-delay: -.45s; }
    .deity-art svg > g[stroke]:first-of-type > path:nth-child(3),
    .deity-art svg > g[stroke]:first-of-type > path:nth-child(4) { animation-delay: -.9s; }
    .deity-art .deity-eye { transform-box: fill-box; transform-origin: center; animation: deity-blink 4.4s steps(1,end) infinite; }
    .deity-art .signal-break { animation: gateway-glitch 2.8s steps(2,end) infinite; }
    .deity-art svg > path[stroke="#E2E417"]:not(.signal-break) { animation: signal-wave 1.8s linear infinite; }
    @keyframes deity-awaken { 0%,100%{transform:translateY(4px) scale(.985)} 50%{transform:translateY(-5px) scale(1.012)} }
    @keyframes crown-signal { from{transform:scaleY(.94);opacity:.68} to{transform:scaleY(1.06);opacity:1} }
    @keyframes deity-blink { 0%,42%,48%,100%{transform:scaleY(1);opacity:1} 44%,46%{transform:scaleY(.08);opacity:.25} 72%{opacity:.35} 76%{opacity:1} }
    @keyframes gateway-glitch { 0%,70%,100%{transform:translateX(0);opacity:1} 72%{transform:translateX(-12px);opacity:.25} 76%{transform:translateX(9px);opacity:1} 80%{transform:translateX(-4px);opacity:.45} }
    @keyframes signal-wave { to{stroke-dashoffset:-44} }
    @media (prefers-reduced-motion:reduce) { .deity-art svg > g[stroke]:first-of-type,.deity-art svg > g[stroke]:first-of-type > path,.deity-art .deity-eye,.deity-art .signal-break,.deity-art svg > path[stroke="#E2E417"] { animation:none!important; } }
  `}</style>;
}
