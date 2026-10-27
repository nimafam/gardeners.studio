import { Hero } from "@/components/sections/Hero";
import { HomeSections } from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <main className="bg-[var(--g-color-canvas)]">
      <Hero />
      <HomeSections />
    </main>
  );
}
