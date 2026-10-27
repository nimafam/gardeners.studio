import Image from "next/image";

import { ActionButton } from "@/components/ui/button";
import { PortfolioSlider } from "@/components/sections/PortfolioSlider";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TalentSection } from "@/components/sections/TalentSection";
import { ClientsSection } from "@/components/sections/ClientsSection";

const services = [
  { number: "01", title: "Preparation", text: "Business plan & financial study · Brand strategy · Pitch deck design & development", icon: "◇" },
  { number: "02", title: "Planting", text: "Brand design & development · Website design & development · App design & development", icon: "♧" },
  { number: "03", title: "Nurturing", text: "Marketing planning & execution · Content strategy & development · Search engine optimisation", icon: "♨" },
] as const;

const workTiles = [
  { src: "/brand/portfolio/shimojco-catalogue-card.png", label: "Shimojco", type: "Catalogue Design", fit: "cover", surface: "#d8d3c8" },
  { src: "/work/taliapharmed-branding/packaging/jar-mockup-01.png", label: "Taliapharmed", type: "Packaging & Branding", fit: "contain", surface: "#ffffff" },
  { src: "/work/danaday-branding/concept-mockups/promotional-tote-in-hand-concept-01.png", label: "Danaday", type: "Promotional Design", fit: "cover", surface: "#d9d3c8" },
  { src: "/brand/portfolio/nexel-logo-design-card.png", label: "Nexel", type: "Logo Design", fit: "cover", surface: "#e1e9e7" },
] as const;

const reasons = [
  ["Friendly", "Our perspective is to play as a team partner and provide exceptional service."],
  ["Flexible", "Every need you might encounter in your business journey has a solution here."],
  ["Economical", "Customised packages and an extensive expert network make effective solutions possible."],
] as const;

export function HomeSections() {
  return (
    <div className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section id="services" className="scroll-mt-32 px-[var(--g-gutter)] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="grid gap-10 sm:grid-cols-3">
            {services.map((item) => (
              <article key={item.title} className="max-w-xs">
                <div className="mb-7 text-6xl font-light leading-none text-[var(--g-color-primary)]/55" aria-hidden="true">{item.icon}</div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-xs leading-5 text-[var(--g-color-primary)]/65">{item.text}</p>
                <ActionButton className="mt-5" aria-label={`Dig more about ${item.title}`} />
              </article>
            ))}
          </div>
          <div>
            <p className="text-3xl font-semibold text-[var(--g-color-accent)]">Services</p>
            <p className="mt-3 text-2xl uppercase leading-[1.05] text-[var(--g-color-primary)]/65">At every step<br />of the<br />growth</p>
          </div>
        </div>
      </section>

      <PortfolioSlider />

      <section className="px-[var(--g-gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="border-b border-[var(--g-color-primary)]/30 pb-5 text-right text-2xl text-[var(--g-color-accent)]">Why us?</h2>
          <div className="mt-7">
            {reasons.map(([title, text]) => (
              <div key={title} className="grid gap-4 border-b border-[var(--g-color-primary)]/25 py-5 md:grid-cols-[180px_1fr]">
                <h3 className="font-semibold before:mr-1 before:text-[var(--g-color-accent)] before:content-['•']">{title}</h3>
                <p className="text-sm text-[var(--g-color-primary)]/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-32 px-[var(--g-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] border-t border-[var(--g-color-primary)]/30 pt-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <p className="max-w-3xl text-2xl font-semibold leading-[1.05] md:text-4xl">We are <span className="text-[var(--g-color-accent)]">Gardeners</span>, a team of designers, developers, marketers and consultants who made a business development studio to help others grow their business.<br /><br />We are that piece of a puzzle that can complete your dream picture.</p>
            <div className="lg:text-right">
              <p className="text-lg uppercase text-[var(--g-color-primary)]/40">With you for the growth</p>
              <h2 className="text-[clamp(4rem,9vw,9rem)] font-semibold leading-[0.8] text-[var(--g-color-accent)]">ABOUT</h2>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
            {workTiles.map((tile) => (
              <article key={tile.label}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]" style={{ backgroundColor: tile.surface }}><Image src={tile.src} alt={tile.label} fill className={tile.fit === "cover" ? "object-cover" : "object-contain p-4"} sizes="(max-width: 768px) 50vw, 25vw" /></div>
                <h3 className="mt-3 text-sm font-semibold">{tile.label}</h3><p className="text-xs text-[var(--g-color-primary)]/50">{tile.type}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

            <TestimonialSection />

      <TeamSection />

      <TalentSection />

      <ClientsSection />
    </div>
  );
}
