"use client";

import * as React from "react";
import Link from "next/link";
import {
  Baby, Blocks, Briefcase, Coins, Dices, Gift, Lamp, Puzzle,
  RotateCcw, Sparkles, Tag, Wallet, ArrowLeft, Phone,
} from "lucide-react";
import { questions, findGifts, type Answers, type Match } from "@/data/gift-finder";
import { filaments } from "@/data/products";
import { ProductVisual } from "@/components/products/product-visual";
import { MakerRating } from "@/components/products/maker-rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { contact } from "@/data/site";
import { cn, formatVnd } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  baby: Baby, blocks: Blocks, puzzle: Puzzle, briefcase: Briefcase,
  coin: Wallet, coins: Coins, gift: Gift,
  sparkles: Sparkles, tag: Tag, lamp: Lamp, dice: Dices,
};

export function GiftFinder() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partial<Answers>>({});
  const [results, setResults] = React.useState<Match[] | null>(null);
  const cart = useCart();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  /**
   * Move both the caret and the viewport to the new question.
   *
   * focus() alone scrolls too, but its implicit scroll ignores scroll-margin,
   * so the sticky header ate the heading. Doing the two jobs separately keeps
   * screen-reader focus correct AND leaves room for the header.
   */
  function announce() {
    window.setTimeout(() => {
      const h = headingRef.current;
      if (!h) return;
      h.focus({ preventScroll: true });
      h.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 60);
  }

  function choose(value: string) {
    const q = questions[step];
    const next = { ...answers, [q.id]: value } as Partial<Answers>;
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
      announce();
      return;
    }

    const complete = next as Answers;
    const found = findGifts(complete);
    setResults(found);
    track.giftFinderDone(complete, found.map((m) => m.product.slug));
    announce();
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  /* ---------------- results ---------------- */
  if (results) {
    return (
      <div>
        <div className="text-center">
          <h2 ref={headingRef} tabIndex={-1} className="display scroll-mt-28 text-[clamp(1.75rem,5vw,2.75rem)] outline-none">
            TỤI EM CHỌN 3 MÓN NÀY
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2">
            Không chắc thì bạn gọi cho mẹ Hiếu, nhà em tư vấn giúp — nhanh hơn tự chọn nhiều.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((m, i) => {
            const f = filaments[m.product.colors[0]];
            return (
              <article
                key={m.product.slug}
                className={cn(
                  "sticker press flex flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-surface",
                  i === 0 && "md:-translate-y-2",
                )}
              >
                <div className="relative aspect-square border-b-2 border-ink bg-paper-2">
                  <div className="grid-paper absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <ProductVisual
                      shape={m.product.shape}
                      color={f.hex}
                      uid={`gf-${m.product.id}`}
                      label={m.product.nameVi}
                    />
                  </div>
                  {i === 0 && (
                    <Badge variant="flame" className="absolute left-3 top-3 -rotate-3">
                      HỢP NHẤT
                    </Badge>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-tight font-extrabold">
                    <Link href={`/shop/${m.product.slug}`}>{m.product.nameVi}</Link>
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-ink-2">Vì {m.reason}</p>
                  <div className="mt-3">
                    <MakerRating value={m.product.makerRating} />
                  </div>

                  <div className="mt-auto pt-5">
                    <p className="display text-2xl">{formatVnd(m.product.price)}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      <Button
                        size="md"
                        className="w-full"
                        onClick={() => {
                          cart.add({
                            slug: m.product.slug,
                            name: m.product.name,
                            price: m.product.price,
                            colorName: f.name,
                            colorHex: f.hex,
                            shape: m.product.shape,
                          });
                          track.addToCart({
                            slug: m.product.slug,
                            name: m.product.name,
                            price: m.product.price,
                            color: f.name,
                            qty: 1,
                          });
                        }}
                      >
                        CHỌN MÓN NÀY
                      </Button>
                      <Link href={`/shop/${m.product.slug}`} className="w-full">
                        <Button variant="outline" size="md" className="w-full">
                          XEM KỸ HƠN
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={restart}
            className="sticker press inline-flex h-12 items-center gap-2 rounded-full bg-surface px-6 font-display text-sm font-extrabold text-ink"
          >
            <RotateCcw className="size-4" />
            CHỌN LẠI
          </button>
          <a
            href={contact.tel}
            onClick={() => track.contactTapped("phone", "gift-finder")}
            className="sticker press inline-flex h-12 items-center gap-2 rounded-full bg-flame px-6 font-display text-sm font-extrabold text-white"
          >
            <Phone className="size-4" />
            GỌI {contact.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  /* ---------------- questions ---------------- */
  const q = questions[step];

  return (
    <div>
      {/* progress: three dots, nothing to read */}
      <div className="flex items-center justify-center gap-2" aria-hidden>
        {questions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 rounded-full border-2 border-ink transition-all",
              i < step ? "w-3 bg-ink" : i === step ? "w-10 bg-flame" : "w-3 bg-surface",
            )}
          />
        ))}
      </div>
      <p className="sr-only">
        Câu {step + 1} trên {questions.length}
      </p>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="display mt-7 scroll-mt-28 text-center text-[clamp(1.75rem,5.5vw,3rem)] outline-none"
      >
        {q.title}
      </h2>
      <p className="mt-2 text-center text-sm font-semibold text-ink-3">{q.hint}</p>

      <div
        className={cn(
          "mx-auto mt-9 grid max-w-3xl gap-4",
          q.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {q.options.map((opt) => {
          const Icon = ICONS[opt.icon] ?? Sparkles;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt.value)}
              className={cn(
                "sticker press flex min-h-32 flex-col items-center justify-center gap-3 rounded-[var(--radius-xl2)] p-6 text-center",
                opt.tone,
              )}
            >
              <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-surface">
                <Icon className="size-7 text-ink" />
              </span>
              <span className="font-display text-lg leading-tight font-extrabold text-ink">{opt.label}</span>
              <span className="text-xs leading-snug font-semibold text-ink-2">{opt.sub}</span>
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-ink-2 hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Quay lại câu trước
          </button>
        </div>
      )}
    </div>
  );
}
