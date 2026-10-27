import Image from "next/image";
import { ArrowDown, DraftingCompass, Sprout, Waves } from "lucide-react";

import { ActionButton } from "@/components/ui/button";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { type WorkProject } from "@/content/work-projects";
import { InfiniteWorkGallery } from "@/components/pages/InfiniteWorkGallery";

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="px-[var(--g-gutter)] pb-20 pt-44 md:pb-28 md:pt-56">
      <div className="mx-auto max-w-[1440px] border-b border-[var(--g-color-primary)]/35 pb-14 md:pb-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--g-color-primary)]/55">{eyebrow}</p>
        <h1 className="mt-8 max-w-[1200px] text-[clamp(4.4rem,10vw,10.5rem)] font-semibold leading-[0.78] tracking-[-0.07em]">{title}</h1>
        <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--g-color-primary)]/65 md:text-xl md:leading-8">{description}</p>
      </div>
    </section>
  );
}

export function ProjectsPageContent() {
  return (
    <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
      <section className="relative flex min-h-[760px] items-center overflow-hidden px-[var(--g-gutter)] pb-36 pt-40 md:min-h-[min(1322px,69vw)] md:pb-[16%] md:pt-52">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_77%_17%,rgba(226,228,23,.98)_0%,rgba(187,202,25,.88)_18%,transparent_43%),radial-gradient(circle_at_12%_40%,rgba(0,63,63,.98)_0%,rgba(31,96,64,.92)_25%,transparent_58%),linear-gradient(180deg,#668942_0%,#8fa72f_43%,#eaeaea_92%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-transparent to-[var(--g-color-canvas)]" />
        <div
          aria-hidden="true"
          className="absolute right-0 top-[23%] h-[28%] w-[34%] opacity-90"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 1.8px, transparent 2.25px)",
            backgroundSize: "13px 13px",
            clipPath: "polygon(48% 0,100% 0,100% 100%,0 100%,0 52%,48% 52%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1440px]">
          <h1 className="max-w-[900px] text-[clamp(4.8rem,8.5vw,10rem)] font-semibold uppercase leading-[0.84] tracking-[-0.065em]">
            <span className="block text-[var(--g-color-accent)]">Take a</span>
            <span className="block text-white">Look at</span>
            <span className="block text-[var(--g-color-accent)]">Our work</span>
          </h1>
          <p className="mt-10 max-w-[900px] text-[clamp(1.15rem,1.7vw,2rem)] font-light uppercase leading-[1.25] tracking-[-0.025em] text-white">
            A selection of projects that we were given the<br className="hidden md:block" /> opportunity to work on.
          </p>
        </div>
      </section>
      <InfiniteWorkGallery />\n    </main>
  );
}

const services = [
  { title: "Preparation", icon: DraftingCompass, copy: "Business planning, financial study, brand strategy and pitch-deck development." },
  { title: "Planting", icon: Sprout, copy: "Brand identity, website and application design and development." },
  { title: "Nurturing", icon: Waves, copy: "Marketing planning, content systems and search-engine optimisation." },
] as const;

export function ServicesPageContent() {
  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <PageIntro eyebrow="Services" title="At every step of the growth." description="We connect strategy, identity, digital experiences and communication into one coordinated system." />
    <section className="px-[var(--g-gutter)] pb-32"><div className="mx-auto grid max-w-[1440px] border-y border-[var(--g-color-primary)]/40 md:grid-cols-3">
      {services.map(({ title, icon: Icon, copy }, index) => <article key={title} className={`relative min-h-[420px] px-7 py-12 md:px-10 ${index < 2 ? "border-b border-[var(--g-color-primary)]/40 md:border-b-0 md:border-r" : ""}`}>
        <Icon className="size-14 text-[var(--g-color-primary)]/60" strokeWidth={1.2} /><p className="mt-20 text-xs uppercase tracking-[0.16em] opacity-50">0{index + 1}</p><h2 className="mt-5 text-5xl font-semibold tracking-[-0.055em]">{title}</h2><p className="mt-6 max-w-sm leading-7 opacity-65">{copy}</p><ActionButton href="/contact" label="Dig More" className="mt-9" />
      </article>)}
    </div></section>
  </main>;
}

export function AboutPageContent() {
  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <PageIntro eyebrow="About" title="With you for the growth." description="Gardeners is a team of designers, developers, strategists and consultants who turn complex business challenges into coherent systems." />
    <section className="px-[var(--g-gutter)] pb-24"><div className="mx-auto grid max-w-[1440px] gap-12 border-y border-[var(--g-color-primary)]/35 py-16 lg:grid-cols-2 lg:gap-24">
      <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.06em]"><span className="text-[var(--g-color-accent)]">Gardeners</span> make every piece part of a bigger picture.</h2>
      <div className="space-y-7 text-lg leading-8 opacity-70"><p>We work across strategy, identity, digital products, editorial design and communication. Each discipline is considered in relation to the whole business.</p><p>Our role is to create clarity, useful systems and expressive work that can grow with the people behind it.</p><ActionButton href="/contact" label="Grow with us" className="mt-4" /></div>
    </div></section>
    <TestimonialSection /><TeamSection />
  </main>;
}

export function ContactPageContent() {
  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <PageIntro eyebrow="Contact" title="We would love to work with you." description="Tell us what you are building, changing or growing. We will continue the conversation with the right people around the table." />
    <section className="px-[var(--g-gutter)] pb-32"><div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-12 border-t border-[var(--g-color-primary)]/40 pt-8"><div><p className="text-xs uppercase tracking-[0.18em] opacity-45">Direct contact</p><a href="mailto:hello@gardeners.studio" className="mt-4 block text-2xl font-medium">hello@gardeners.studio</a></div><div><p className="text-xs uppercase tracking-[0.18em] opacity-45">Studio</p><address className="mt-4 text-lg not-italic leading-8">Jordan Street<br />Tehran, Iran</address></div></div>
      <form className="grid gap-4 border-t border-[var(--g-color-primary)]/40 pt-8"><input aria-label="Full name" placeholder="Full Name:*" className="h-[70px] rounded-[20px] bg-white px-7 text-lg outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]" /><input type="email" aria-label="Email" placeholder="Email:*" className="h-[70px] rounded-[20px] bg-white px-7 text-lg outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]" /><textarea aria-label="Message" placeholder="What would you like to grow?" rows={6} className="resize-none rounded-[20px] bg-white p-7 text-lg outline-none focus:ring-2 focus:ring-[var(--g-color-accent)]" /><button type="submit" className="h-[70px] rounded-[20px] bg-[var(--g-color-accent)] text-base font-semibold uppercase tracking-[0.12em]">Send request</button></form>
    </div></section>
  </main>;
}

export function ProjectDetailPage({ project }: { project: WorkProject }) {
  return <main className="bg-[var(--g-color-canvas)] text-[var(--g-color-primary)]">
    <section className="px-[var(--g-gutter)] pb-16 pt-44 md:pt-56"><div className="mx-auto max-w-[1440px]"><p className="text-xs uppercase tracking-[0.18em] opacity-50">{project.services.join(" · ")}</p><h1 className="mt-8 text-[clamp(4.5rem,11vw,11rem)] font-semibold leading-[0.78] tracking-[-0.07em]">{project.title}</h1><div className="mt-12 flex items-center gap-3 text-sm uppercase tracking-[0.15em] opacity-55"><ArrowDown className="size-5" /> Explore the project</div></div></section>
    <section className="px-[var(--g-gutter)]"><div className="relative mx-auto aspect-[16/9] max-w-[1440px] overflow-hidden rounded-[20px] bg-white"><Image src={project.assets.hero} alt={`${project.title} hero`} fill priority sizes="100vw" className="object-cover" /></div></section>
    <section className="px-[var(--g-gutter)] py-24 md:py-36"><div className="mx-auto grid max-w-[1440px] gap-14 border-y border-[var(--g-color-primary)]/35 py-16 lg:grid-cols-[0.7fr_1.3fr]"><dl className="grid grid-cols-2 gap-8 text-sm"><div><dt className="uppercase tracking-[0.16em] opacity-45">Client</dt><dd className="mt-3 text-lg">{project.client}</dd></div><div><dt className="uppercase tracking-[0.16em] opacity-45">Year</dt><dd className="mt-3 text-lg">{project.year}</dd></div><div><dt className="uppercase tracking-[0.16em] opacity-45">Industry</dt><dd className="mt-3 text-lg">{project.industry}</dd></div><div><dt className="uppercase tracking-[0.16em] opacity-45">Country</dt><dd className="mt-3 text-lg">{project.country}</dd></div></dl><div><h2 className="text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">About this project</h2><p className="mt-8 max-w-3xl text-lg leading-8 opacity-68">{project.challenge}</p></div></div></section>
    <section className="px-[var(--g-gutter)] pb-32"><div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-2">{project.gallery.map((item, index) => <figure key={item.id} className={index === 0 ? "md:col-span-2" : ""}><div className={`relative overflow-hidden rounded-[20px] bg-white ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}><Image src={item.src} alt={item.label} fill sizes={index === 0 ? "100vw" : "50vw"} className={item.fit === "cover" ? "object-cover" : "object-contain"} /></div><figcaption className="mt-4 text-xs uppercase tracking-[0.16em] opacity-55">{item.label}</figcaption></figure>)}</div></section>
    <section className="px-[var(--g-gutter)] pb-32"><div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 border-t border-[var(--g-color-primary)]/35 pt-12 md:flex-row md:items-end"><h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">Ready to grow the next project?</h2><ActionButton href="/contact" label="Talk to Gardeners" className="h-[46px] px-7" /></div></section>
  </main>;
}
