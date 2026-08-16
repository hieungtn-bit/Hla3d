import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { goal, nav, site } from "@/data/site";
import { toPercent } from "@/lib/utils";

const secondary = [
  { href: "/about", label: "Our Story" },
  { href: "/about#safety", label: "Maker Safety" },
  { href: "/lab", label: "The Lab" },
  { href: "/dashboard", label: "Startup Dashboard" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-carbon text-white">
      <div className="container-hla py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-11" />
              <span className="font-display text-2xl leading-none font-bold tracking-[-0.04em]">
                HLA<span className="text-flame">3D</span>
              </span>
            </div>
            <p className="display mt-6 text-2xl text-white">
              Small Ideas.
              <br />
              Real Things.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Ba anh em. Một xưởng sáng tạo. Một chiếc máy in 3D trong nhà.
            </p>
          </div>

          <nav aria-label="Shop">
            <p className="eyebrow text-white/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-flame">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <p className="eyebrow text-white/40">Behind it</p>
            <ul className="mt-5 space-y-3">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-flame">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-white/40">The goal</p>
            <p className="mt-5 font-display text-3xl font-bold tracking-tight">
              {goal.current}
              <span className="text-white/30"> / {goal.target}</span>
            </p>
            <p className="mt-1 text-sm text-white/50">{goal.label}</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-flame"
                style={{ width: `${toPercent(goal.current, goal.target)}%` }}
              />
            </div>
            <Link
              href="/shop"
              className="tactile mt-5 inline-flex h-11 items-center rounded-full bg-flame px-5 font-display text-sm font-bold tracking-tight text-white hover:bg-flame-2"
            >
              BECOME CUSTOMER #{goal.current + 1}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-carbon-line pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed, printed &amp; packed in Vietnam.</p>
          <p className="font-mono">
            © {site.founded}–{new Date().getFullYear()} HLA3D · A family project. Dad supervises every
            machine.
          </p>
        </div>
      </div>
    </footer>
  );
}
