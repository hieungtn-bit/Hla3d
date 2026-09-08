"use client";

import { learners, setLearner, useVocab, type LearnerId } from "@/lib/vocab-store";
import { cn } from "@/lib/utils";

/**
 * Who is sitting at the phone.
 *
 * Four buttons and nothing else — no name field, no age field, no account.
 * Three of them are the brothers whose shop this is; the fourth is for a
 * visiting child, so a customer's kid can use the whole thing without the
 * site learning anything about them.
 */
export function LearnerPicker() {
  const state = useVocab();

  return (
    <div>
      <p className="eyebrow text-ink-3">Hôm nay ai học?</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {learners.map((l) => {
          const active = state.learner === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setLearner(l.id as LearnerId)}
              aria-pressed={active}
              className={cn(
                "sticker press rounded-[var(--radius-card)] px-3 py-4 text-left transition-colors",
                active ? l.colour : "bg-surface hover:bg-paper-2",
              )}
            >
              <span className="block font-display text-lg font-bold tracking-tight">{l.name}</span>
              <span className="mt-0.5 block text-xs font-semibold text-ink-2">{l.age}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
