import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form";

export function TalentSection() {
  return (
    <section id="contact" aria-labelledby="talent-title" className="scroll-mt-32 px-[var(--g-gutter)] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.46fr_0.54fr] lg:gap-12">
        <form className="border-t border-[var(--g-color-primary)]/60 pt-14 md:pt-[54px]" aria-label="Talent request form">
          <div className="ml-auto w-full max-w-[560px] space-y-4">
            <Input name="fullName" autoComplete="name" placeholder="Full Name:*" className="h-16 bg-white/75 px-7 text-lg placeholder:text-[var(--g-color-primary)]/40" />
            <Input name="email" type="email" autoComplete="email" placeholder="Email:*" className="h-16 bg-white/75 px-7 text-lg placeholder:text-[var(--g-color-primary)]/40" />
            <Textarea name="talent" placeholder="What are you talented at?" className="min-h-[164px] resize-none bg-white/75 px-7 py-6 text-lg placeholder:text-[var(--g-color-primary)]/40" />
            <Button type="button" variant="accent" className="h-16 w-full text-base tracking-normal">Send request</Button>
          </div>
        </form>

        <div>
          <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-[var(--g-color-primary)]/60 md:text-base">
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-[var(--g-color-accent)]" />
            Let&apos;s grow together
          </p>

          <h2 id="talent-title" className="mt-14 text-[clamp(3.4rem,5.7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-black">
            <span className="text-[var(--g-color-accent)]">Gardeners</span> is always
            <span className="block">on the lookout for</span>
            <span className="block">great talent.</span>
            <span className="mt-[0.34em] block text-[var(--g-color-primary)]">Join us.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
