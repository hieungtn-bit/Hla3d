"use client";

import { motion, useReducedMotion } from "framer-motion";
import { makerSkills, makerXp, xpRules } from "@/data/makers";
import { toPercent } from "@/lib/utils";

const SKILL_STEPS = 6;

export function SkillBars() {
  return (
    <ul className="space-y-4">
      {makerSkills.map((s) => (
        <li key={s.skill}>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-sm font-bold tracking-tight text-white">{s.skill}</span>
            <span className="font-mono text-xs text-white/40">
              {s.level}/{SKILL_STEPS}
            </span>
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {Array.from({ length: SKILL_STEPS }, (_, i) => (
              <span
                key={i}
                className={
                  i < s.level ? "h-2.5 flex-1 rounded-[3px] bg-flame" : "h-2.5 flex-1 rounded-[3px] bg-white/10"
                }
              />
            ))}
          </div>
          <span className="sr-only">
            {s.skill}: level {s.level} of {SKILL_STEPS}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function MakerXpCards() {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {makerXp.map((m, i) => {
        const pct = toPercent(m.xp, m.nextLevelXp);
        return (
          <div
            key={m.maker}
            className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-sm font-bold tracking-tight text-white">{m.maker}</p>
                <p className="mt-0.5 text-xs text-white/40">{m.role}</p>
              </div>
              <span className="eyebrow rounded-full bg-flame px-2.5 py-1 text-white">LVL {m.level}</span>
            </div>

            <p className="mt-5 font-mono text-2xl text-white">
              {m.xp}
              <span className="text-sm text-white/30"> / {m.nextLevelXp} XP</span>
            </p>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-lime"
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/45">{m.recent}</p>
          </div>
        );
      })}
    </div>
  );
}

export function XpRules() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {xpRules.map((rule) => (
        <li
          key={rule.action}
          className="flex items-center justify-between gap-4 rounded-xl border border-carbon-line bg-carbon-2 px-4 py-3"
        >
          <span className="text-xs leading-snug text-white/60">{rule.action}</span>
          <span className="shrink-0 font-mono text-xs text-lime">+{rule.xp}</span>
        </li>
      ))}
    </ul>
  );
}
