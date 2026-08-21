import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";

/**
 * Shown at the top of the shop grid, for the visitor the grid serves worst:
 * someone who does not already know what they want and is now looking at
 * fifteen things. One tap moves them to three questions instead.
 */
export function GiftFinderLink() {
  return (
    <Link
      href="/chon-qua"
      className="sticker press group mt-10 flex items-center gap-4 rounded-[var(--radius-card)] bg-sun p-4 sm:p-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-surface">
        <Wand2 className="size-5.5 text-ink" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-bold tracking-tight sm:text-lg">
          Chưa biết chọn món nào?
        </span>
        <span className="mt-0.5 block text-sm leading-snug font-semibold text-ink/75">
          Bấm ba lần, tụi em chọn giúp bạn ba món hợp nhất.
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
