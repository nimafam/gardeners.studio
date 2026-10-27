import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-svh bg-[var(--g-color-canvas)] px-6 pb-24 pt-32 text-primary md:px-12 md:pt-40">
            <article className="mx-auto max-w-4xl">
                <div className="mb-7 font-body text-[9px] uppercase tracking-[0.28em] text-secondary">Legal / Terms</div>
                <h1 className="font-heading text-[clamp(4rem,9vw,8rem)] leading-[0.8] tracking-[-0.055em]">Terms and conditions.</h1>
                <div className="mt-14 space-y-7 border-l border-primary/15 pl-7 font-body text-sm leading-7 text-primary/65 md:pl-10 md:text-base">
                    <p>Project imagery, identities, writing, and motion presented on this website remain the property of their respective owners and Gardeners where applicable.</p>
                    <p>The complete production terms will be published here before the public release of the website.</p>
                </div>
                <Link href="/" className="mt-14 inline-flex border-b border-primary/25 pb-2 font-body text-[10px] uppercase tracking-[0.22em]">Return to experience ↗</Link>
            </article>
        </main>
    );
}
