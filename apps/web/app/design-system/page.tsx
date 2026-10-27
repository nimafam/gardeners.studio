import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container, Divider, Eyebrow, Section, Tag } from "@/components/ui/foundation";
import { Input, Textarea } from "@/components/ui/form";
import "../../styles/gardeners-tokens.css";

export const metadata: Metadata = { title: "Design System" };

const colors = [
  ["Primary", "--g-color-primary", "#003F3F"],
  ["Secondary", "--g-color-secondary", "#B2B3B6"],
  ["Accent", "--g-color-accent", "#E2E417"],
  ["Control", "--g-color-control", "#F8F8F8"],
  ["Canvas", "--g-color-canvas", "#EAEAEA"],
] as const;

const spaces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const fontWeights = [
  ["Light", "300"],
  ["Regular", "400"],
  ["Medium", "500"],
  ["SemiBold", "600"],
  ["Bold", "700"],
] as const;

export default function DesignSystemPage() {
  return (
    <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-ink)]">
      <section className="bg-[var(--g-color-primary)] py-20 text-white md:py-28">
        <Container>
          <Eyebrow className="text-[var(--g-color-accent)]">Gardeners / Foundations v0.4</Eyebrow>
          <h1 className="mt-10 max-w-6xl text-[var(--g-text-display)] font-semibold leading-[0.78] tracking-[-0.075em]">Design System</h1>
          <p className="mt-10 max-w-2xl text-[var(--g-text-body)] leading-7 text-white/65">
            Figma-aligned foundations: Raleway typography, brand color ratios, 20px control radius and lightweight interaction states.
          </p>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <Eyebrow>01 / Color</Eyebrow>
          <div className="mt-10 grid gap-[var(--g-grid-gap)] sm:grid-cols-2 lg:grid-cols-5">
            {colors.map(([name, token, value]) => (
              <article key={token} className="overflow-hidden rounded-[var(--g-radius-md)] border border-black/10">
                <div className="aspect-square" style={{ background: `var(${token})` }} />
                <div className="border-t border-black/10 p-4 text-sm">
                  <strong className="block">{name}</strong>
                  <span className="mt-1 block text-black/45">{value}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>02 / Typography / Raleway</Eyebrow>
          <div className="mt-12 divide-y divide-black/15 border-y border-black/15">
            <div className="py-10">
              <span className="text-xs text-black/45">Hero / Bold 700</span>
              <p className="mt-4 text-[var(--g-text-hero)] font-bold leading-[0.76] tracking-[-0.075em] text-black">GROW</p>
            </div>
            <div className="py-10">
              <span className="text-xs text-black/45">Display / SemiBold 600</span>
              <p className="mt-4 text-[var(--g-text-display)] font-semibold leading-[0.8] tracking-[-0.07em]">Glow up.</p>
            </div>
            <div className="py-10">
              <span className="text-xs text-black/45">Lead / Light 300</span>
              <p className="mt-4 max-w-5xl text-[var(--g-text-lead)] font-light uppercase leading-[1.05] tracking-[-0.02em]">We are with you in every aspect of your journey to flourish.</p>
            </div>
            <div className="grid py-10 sm:grid-cols-5">
              {fontWeights.map(([name, weight]) => (
                <div key={weight} className="border-black/15 py-4 sm:border-l sm:px-5 sm:first:border-l-0">
                  <span className="text-xs text-black/45">{name} / {weight}</span>
                  <p className="mt-3 text-3xl" style={{ fontWeight: Number(weight) }}>Gardeners</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Eyebrow>03 / Spacing</Eyebrow>
          <div className="mt-12 space-y-4">
            {spaces.map((space) => (
              <div key={space} className="flex items-center gap-5 text-xs text-black/50">
                <span className="w-8">{space}</span>
                <div className="h-5 bg-[var(--g-color-accent)]" style={{ width: `var(--g-space-${space})` }} />
                <code>--g-space-{space}</code>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--g-color-primary)] text-white">
        <Container>
          <Eyebrow className="text-[var(--g-color-accent)]">04 / Actions + Labels</Eyebrow>
          <div className="mt-12 grid overflow-hidden rounded-[var(--g-radius-md)] border border-white/20 md:grid-cols-2">
            <article className="p-8 md:border-r md:border-white/20">
              <h2 className="text-3xl tracking-[-0.04em]">Actions</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="accent">Talk to Gardeners</Button>
                <Button variant="outline" className="border-white/40 text-white">View project</Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">Read more</Button>
              </div>
            </article>
            <article className="border-t border-white/20 p-8 md:border-t-0">
              <h2 className="text-3xl tracking-[-0.04em]">Labels + rules</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Tag className="border-white/30 text-white">Branding</Tag>
                <Tag className="border-white/30 text-white">Digital</Tag>
                <Tag className="border-[var(--g-color-accent)] text-[var(--g-color-accent)]">Featured</Tag>
              </div>
              <Divider className="mt-8 border-white/25" />
              <p className="mt-5 max-w-md leading-7 text-white/60">The shared 20px radius is reserved for controls and contained surfaces.</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>05 / Form Controls</Eyebrow>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="max-w-lg text-[var(--g-text-lead)] font-medium leading-[1.02] tracking-[-0.04em]">Form surfaces based on the supplied Gardeners references.</h2>
              <dl className="mt-10 space-y-3 text-sm">
                <div className="flex justify-between border-b border-black/15 pb-3"><dt>Radius</dt><dd>20px</dd></div>
                <div className="flex justify-between border-b border-black/15 pb-3"><dt>Input / CTA</dt><dd>70px</dd></div>
                <div className="flex justify-between border-b border-black/15 pb-3"><dt>Textarea</dt><dd>178px</dd></div>
                <div className="flex justify-between border-b border-black/15 pb-3"><dt>Surface</dt><dd>#F8F8F8</dd></div>
              </dl>
            </div>
            <form className="space-y-4">
              <Input aria-label="Full name" placeholder="Full name" />
              <Input aria-label="Email address" type="email" placeholder="Email address" />
              <Textarea aria-label="Project details" placeholder="Tell us about your project" />
              <Button type="button" variant="accent" size="form" className="w-full">Send request</Button>
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}
