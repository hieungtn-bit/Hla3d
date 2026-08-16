"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { nav } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
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
        <Link href="/" aria-label="HLA3D home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
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
          <button
            type="button"
            onClick={cart.open}
            aria-label={`Open basket, ${cart.count} items`}
            className="sticker press relative grid size-10 place-items-center rounded-full bg-surface"
          >
            <ShoppingBag className="size-4" />
            {cart.count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full border-2 border-ink bg-flame font-mono text-[0.625rem] font-bold text-white">
                {cart.count}
              </span>
            )}
          </button>

          <Link
            href="/shop"
            className="sticker press hidden h-10 items-center rounded-full bg-flame px-5 font-display text-sm font-extrabold text-white sm:inline-flex"
          >
            SHOP
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="sticker press grid size-10 place-items-center rounded-full bg-surface md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="overflow-hidden border-t-2 border-ink bg-paper md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
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
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="sticker mt-2 rounded-2xl bg-flame px-4 py-3 text-center font-display text-xl font-extrabold text-white"
              >
                XEM ĐỒ TỤI EM LÀM
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
