"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Project", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const activeHref = pathname.startsWith("/work") ? "/work" : pathname.startsWith("/blog") ? "/blog" : pathname;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);


  return (
    <header className={cn(
      "fixed left-[var(--g-gutter)] right-[var(--g-gutter)] top-4 z-50 h-[118px] rounded-[var(--g-radius-md)] border border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--g-duration-base)]",
      scrolled && "border-white/40 bg-white/55 shadow-[0_10px_35px_rgb(0_63_63_/_10%)] backdrop-blur-xl",
    )}>
      <div className="flex h-full w-full items-start justify-between px-4 py-2">
        <Link href="/" aria-label="Gardeners home" className="block h-[105px] w-[77px] shrink-0">
          <Image src="/brand/gardeners-logo-vector.svg" alt="" width={77} height={105} priority className="size-full object-contain" />
        </Link>

        <nav className="hidden h-full md:block" aria-label="Primary navigation">
          <ul className="flex h-full items-start gap-14 pt-7 text-2xl font-medium text-black">
            {navigation.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href} className={cn("relative", active && "after:absolute after:inset-x-0 after:-bottom-4 after:h-0.5 after:bg-[var(--g-color-accent)]")}>
                  <Link aria-current={active ? "page" : undefined} className={cn("transition-colors duration-[var(--g-duration-fast)] hover:text-[var(--g-color-primary)]", active && "text-[var(--g-color-accent)]")} href={item.href}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <details className="group relative mt-4 md:hidden">
          <summary className="flex h-11 cursor-pointer list-none items-center rounded-[var(--g-radius-control)] border border-black/20 bg-white/35 px-5 text-sm font-medium backdrop-blur-md marker:hidden">Menu</summary>
          <nav className="absolute right-0 top-[calc(100%+0.5rem)] min-w-52 overflow-hidden rounded-[var(--g-radius-md)] border border-white/50 bg-white/70 p-2 shadow-[var(--g-shadow-soft)] backdrop-blur-xl" aria-label="Mobile navigation">
            <ul>{navigation.map((item) => <li key={item.href}><Link className={cn("block rounded-xl px-4 py-3 text-base hover:bg-[var(--g-color-accent)]", activeHref === item.href && "bg-[var(--g-color-accent)] text-[var(--g-color-primary)]")} href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
