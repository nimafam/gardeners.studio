const team = [
  { name: "Nima Feyzi", role: "Developer", initials: "NF", tone: "from-[#c8d4d2] to-[#879d99]" },
  { name: "Arash Amini", role: "Designer", initials: "AA", tone: "from-[#ddd7d0] to-[#a89f96]" },
  { name: "Nima Feyzi", role: "Project manager", initials: "NF", tone: "from-[#aeb9bd] to-[#64777d]" },
] as const;

export function TeamSection() {
  return (
    <section aria-labelledby="team-title" className="relative overflow-hidden px-[var(--g-gutter)] py-20 md:py-28">
      <div className="mx-auto grid min-h-[430px] max-w-[1440px] gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-0">
        <div className="relative hidden lg:block" aria-hidden="true">
          <div
            className="absolute inset-y-[12%] left-0 right-[13%] opacity-90"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,.98) 0 2px, transparent 2.5px)",
              backgroundSize: "13px 13px",
              clipPath: "polygon(0 0, 48% 0, 48% 52%, 100% 52%, 100% 100%, 0 100%)",
            }}
          />
        </div>

        <div className="border-t border-[var(--g-color-primary)]/55 pt-6 md:pt-8">
          <h2 id="team-title" className="text-3xl font-semibold tracking-[-0.035em] md:text-5xl">Team</h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-5">
            {team.map((member, index) => (
              <article key={`${member.name}-${index}`}>
                <div className={`grid aspect-[1.6/1] place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br ${member.tone}`}>
                  <span className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold tracking-[-0.06em] text-white/55" aria-label="Placeholder portrait">{member.initials}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-none tracking-[-0.02em]">{member.name}</h3>
                <p className="mt-2 text-sm text-[var(--g-color-primary)]/60">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
