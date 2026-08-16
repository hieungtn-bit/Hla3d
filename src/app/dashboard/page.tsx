import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { MakerXpCards, SkillBars, XpRules } from "@/components/dashboard/maker-xp";
import { MoneyBreakdown } from "@/components/money-breakdown";
import { Reveal } from "@/components/motion/reveal";
import { dashboardNotes, lastMonth, thisMonth, topProducts } from "@/data/dashboard";
import { goal } from "@/data/site";
import { formatVnd, toPercent } from "@/lib/utils";

function delta(now: number, before: number) {
  if (before === 0) return "—";
  const pct = Math.round(((now - before) / before) * 100);
  return `${pct >= 0 ? "+" : ""}${pct}%`;
}

export default function DashboardPage() {
  const goalPct = toPercent(goal.current, goal.target);
  const margin = Math.round((thisMonth.profit / thisMonth.revenue) * 100);

  return (
    <div className="container-hla py-10 sm:py-14">
      {/* ---- header ---------------------------------------------------- */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-flame">This month</p>
            <h1 className="display mt-3 text-[clamp(2rem,5vw,3rem)] text-white">{thisMonth.label}</h1>
          </div>
          <p className="font-mono text-xs text-white/35">
            {thisMonth.orders} orders · {thisMonth.productsSold} products · {thisMonth.newCustomers} new
            customers
          </p>
        </div>
      </Reveal>

      {/* ---- headline stats -------------------------------------------- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Reveal delay={0.02}>
          <StatCard
            label="Revenue"
            value={formatVnd(thisMonth.revenue)}
            delta={delta(thisMonth.revenue, lastMonth.revenue)}
            deltaGood
            sub="vs tháng 7"
            accent="#ff4a17"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <StatCard
            label="Material cost"
            value={formatVnd(thisMonth.materialCost)}
            sub={`${Math.round((thisMonth.materialCost / thisMonth.revenue) * 100)}% of revenue`}
            accent="#2f8fd8"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard
            label="Profit"
            value={formatVnd(thisMonth.profit)}
            delta={delta(thisMonth.profit, lastMonth.profit)}
            deltaGood
            sub={`${margin}% margin`}
            accent="#c6f24e"
          />
        </Reveal>
        <Reveal delay={0.14}>
          <StatCard
            label="Failed prints"
            value={String(thisMonth.failedPrints)}
            delta={delta(thisMonth.failedPrints, lastMonth.failedPrints)}
            deltaGood
            sub="fewer is better"
            accent="#ffc93c"
          />
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Reveal delay={0.02}>
          <StatCard label="PLA used" value={`${thisMonth.plaUsed} kg`} sub="≈ 2.4 spools" />
        </Reveal>
        <Reveal delay={0.06}>
          <StatCard
            label="Print hours"
            value={`${thisMonth.printHours}h`}
            delta={delta(thisMonth.printHours, lastMonth.printHours)}
            deltaGood
            sub="one machine"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard label="Products sold" value={String(thisMonth.productsSold)} sub="across 19 orders" />
        </Reveal>
        <Reveal delay={0.14}>
          <StatCard
            label="Avg order value"
            value={formatVnd(Math.round(thisMonth.revenue / thisMonth.orders))}
            sub="mostly name plates"
          />
        </Reveal>
      </div>

      {/* ---- chart + goal ---------------------------------------------- */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold tracking-tight text-white">
              Revenue &amp; profit
            </h2>
            <span className="font-mono text-xs text-white/35">T3 – T8 2025</span>
          </div>
          <div className="mt-6">
            <RevenueChart />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-flame" />
            <h2 className="font-display text-lg font-bold tracking-tight text-white">Our goal</h2>
          </div>
          <p className="mt-1 text-sm text-white/40">{goal.label}</p>

          <p className="display mt-8 text-[clamp(3rem,8vw,4.5rem)] text-white">
            {goal.current}
            <span className="text-white/25">/{goal.target}</span>
          </p>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-flame" style={{ width: `${goalPct}%` }} />
          </div>
          <p className="mt-3 font-mono text-xs text-white/35">{goalPct}% · {goal.target - goal.current} to go</p>

          <div className="mt-8 border-t border-carbon-line pt-6">
            <h3 className="eyebrow text-white/35">Top products</h3>
            <ul className="mt-4 space-y-3">
              {topProducts.map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-3">
                  <Link
                    href={`/shop/${p.slug}`}
                    className="truncate text-sm text-white/70 transition-colors hover:text-flame"
                  >
                    {p.name}
                  </Link>
                  <span className="shrink-0 font-mono text-xs text-white/40">
                    ×{p.units} · {formatVnd(p.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ---- notes ------------------------------------------------------ */}
      <Reveal className="mt-6 rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-sun" />
          <h2 className="font-display text-lg font-bold tracking-tight text-white">
            What we noticed this month
          </h2>
        </div>
        <ul className="mt-5 space-y-3">
          {dashboardNotes.map((note) => (
            <li key={note} className="flex gap-3 text-sm leading-relaxed text-white/65">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sun" />
              {note}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ---- learning system --------------------------------------------- */}
      <section className="mt-14">
        <Reveal>
          <p className="eyebrow text-flame">Learning system</p>
          <h2 className="display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-white">MAKER SKILLS</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
            HLA3D is a business, but it is a school first. Levels move when a maker demonstrates
            something — not when they ask.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
            <h3 className="eyebrow text-white/35">Team skills</h3>
            <div className="mt-5">
              <SkillBars />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.06}>
              <MakerXpCards />
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="eyebrow mb-3 text-white/35">How XP is earned</h3>
              <XpRules />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- money ------------------------------------------------------- */}
      <section className="mt-14">
        <Reveal>
          <p className="eyebrow text-flame">Money lesson</p>
          <h2 className="display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-white">
            WHERE DOES THE MONEY GO?
          </h2>
        </Reveal>
        <div className="mt-8">
          <MoneyBreakdown tone="dark" />
        </div>
      </section>
    </div>
  );
}
