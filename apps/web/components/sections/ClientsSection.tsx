import Image from "next/image";
import { ActionButton } from "@/components/ui/button";

const clients = [
  { name: "Taliapharmed", logo: "/brand/clients/taliapharmed-logo.svg", className: "h-[54%] w-[58%]" },
  { name: "Nexel", logo: "/brand/clients/nexel-logo.png", className: "h-[56%] w-[62%]" },
  { name: "Shimojco", logo: "/brand/clients/shimojco-logo.svg", className: "h-[48%] w-[58%]" },
  { name: "Sweet Life", logo: "/brand/clients/sweet-life-logo.svg", className: "h-[52%] w-[48%]" },
  { name: "DanaDay", logo: "/brand/clients/danaday-logo.svg", className: "h-[50%] w-[50%]" },
] as const;

const dots = {
  backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 1.65px, transparent 2px)",
  backgroundSize: "13px 13px",
};

function ClientLogo({ client }: { client: (typeof clients)[number] }) {
  return (
    <div className="relative grid min-h-36 place-items-center overflow-hidden md:min-h-48 lg:min-h-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90" style={dots} />
      <div className={`relative z-10 ${client.className}`}>
        <Image src={client.logo} alt={`${client.name} logo`} fill sizes="(min-width: 1024px) 370px, 50vw" className="object-contain" />
      </div>
    </div>
  );
}

function SegmentedGridLines() {
  const vertical = ["left-1/3", "left-2/3"];
  const horizontal = ["top-1/3", "top-2/3"];
  const vSegments = ["top-0 h-[30%]", "top-[36.5%] h-[27%]", "bottom-0 h-[30%]"];
  const hSegments = ["left-0 w-[30%]", "left-[36.5%] w-[27%]", "right-0 w-[30%]"];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
      {vertical.flatMap((x) => vSegments.map((segment) => (
        <span key={`${x}-${segment}`} className={`absolute ${x} ${segment} w-[2px] -translate-x-1/2 bg-[var(--g-color-primary)]`} />
      )))}
      {horizontal.flatMap((y) => (y === "top-2/3" ? hSegments.slice(0, 2) : hSegments).map((segment) => (
        <span key={`${y}-${segment}`} className={`absolute ${y} ${segment} h-[2px] -translate-y-1/2 bg-[var(--g-color-primary)]`} />
      )))}
    </div>
  );
}

export function ClientsSection() {
  return (
    <section aria-labelledby="clients-title" className="relative overflow-hidden px-[var(--g-gutter)] py-20 md:py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1440px]">
        <Image aria-hidden="true" alt="" src="/brand/clients/clients-gradient.svg" width={955} height={955} className="pointer-events-none absolute -bottom-[25%] -right-[10%] z-0 h-auto w-[78%] max-w-none" />

        <div className="relative z-20 grid grid-cols-2 lg:aspect-[1214/743] lg:grid-cols-3 lg:grid-rows-3">
          {clients.map((client) => <ClientLogo key={client.name} client={client} />)}
          <div aria-hidden="true" className="relative hidden overflow-hidden lg:block"><div className="absolute inset-0 opacity-90" style={dots} /></div>
          <div aria-hidden="true" className="relative hidden overflow-hidden lg:block"><div className="absolute inset-0 opacity-90" style={dots} /></div>

          <div className="relative col-span-2 flex min-h-[390px] flex-col justify-center px-8 py-14 text-white sm:px-12 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:min-h-0 lg:justify-end lg:px-[11%] lg:pb-[13%]">
            <h2 id="clients-title" className="text-[clamp(3.8rem,6.8vw,6.35rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[var(--g-color-accent)]">CLIENTS</h2>
            <p className="mt-6 text-[clamp(1.5rem,2.4vw,2.25rem)] font-light uppercase leading-[1.18] tracking-[-0.025em]">Some gardens<br />that trusted us</p>
            <ActionButton href="/contact" label="Talk to Gardeners" className="mt-10 h-[46px] min-w-[221px] px-7 text-[11px]" />
          </div>
          <SegmentedGridLines />
        </div>
      </div>
    </section>
  );
}
