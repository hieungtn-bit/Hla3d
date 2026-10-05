"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav, navPrimary } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-90 transition-colors duration-300",
        scrolled ? "border-b-2 border-ink bg-paper/90 backdrop-blur-xl" : "border-b-2 border-transparent",
      )}
    >
      <div className="container-hla flex h-16 items-center justify-between gap-6 sm:h-18">
        <Link href="/" aria-label="HLA3D — trang chủ" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navPrimary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-display text-sm font-bold transition-colors",
                  active ? "border-2 border-ink bg-sun text-ink" : "border-2 border-transparent text-ink-2 hover:bg-ink/6 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/hom-nay"
            className="sticker press inline-flex h-10 items-center rounded-full bg-flame px-4 font-display text-xs font-extrabold whitespace-nowrap text-white sm:px-5 sm:text-sm"
          >
            HÔM NAY HỌC GÌ
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="sticker press grid size-10 place-items-center rounded-full bg-surface lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t-2 border-ink bg-paper lg:hidden">
          <nav className="container-hla flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-xl font-extrabold hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/hom-nay"
              onClick={() => setMenuOpen(false)}
              className="sticker mt-2 rounded-2xl bg-flame px-4 py-3 text-center font-display text-xl font-extrabold text-white"
            >
              HÔM NAY HỌC GÌ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
