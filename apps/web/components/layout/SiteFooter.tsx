import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/foundation";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-[var(--g-color-primary)]/20 bg-[var(--g-color-accent)] text-[var(--g-color-primary)]">
      <Container className="pt-12 md:pt-16">
        <div className="grid gap-10 border-b border-[var(--g-color-primary)]/25 pb-12 md:grid-cols-12 md:pb-16">
          <div className="md:col-span-4">
            <Image src="/brand/gardeners-mark.svg" alt="Gardeners" width={58} height={100} className="h-[100px] w-auto" />
            <p className="mt-6 max-w-xs text-sm font-medium uppercase leading-5 tracking-[0.04em]">We are with you in every aspect of your journey to flourish.</p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs uppercase tracking-[0.12em] opacity-55">Studio</p>
            <address className="mt-4 text-sm font-medium not-italic leading-6">Jordan Street<br />Tehran, Iran</address>
            <Link className="mt-4 inline-block text-sm underline decoration-1 underline-offset-4" href="mailto:hello@gardeners.studio">hello@gardeners.studio</Link>
          </div>
          <nav className="md:col-span-2 md:col-start-11" aria-label="Footer navigation">
            <p className="text-xs uppercase tracking-[0.12em] opacity-55">Explore</p>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              {footerLinks.map((item) => <li key={item.href}><Link className="hover:underline hover:underline-offset-4" href={item.href}>{item.label}</Link></li>)}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 py-5 text-[0.6875rem] uppercase tracking-[0.08em] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gardeners</p>
          <div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
        <p aria-hidden="true" className="-mb-[0.09em] whitespace-nowrap text-center text-[clamp(4rem,13.3vw,12rem)] font-bold leading-[0.73] tracking-[-0.075em]">GARDENERS</p>
      </Container>
    </footer>
  );
}
