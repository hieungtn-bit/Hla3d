"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { NameplatePreview, type PlateSize, type PlateStyle } from "@/components/custom/nameplate-preview";
import { filaments } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { useCart } from "@/lib/cart";
import { cn, formatVnd } from "@/lib/utils";

const PRODUCTS = {
  "custom-name-plate": { label: "Name Plate", base: 129000, maxChars: 14, freeChars: 8 },
  "bag-tag": { label: "Bag Tag", base: 59000, maxChars: 12, freeChars: 8 },
  keychain: { label: "Keychain", base: 45000, maxChars: 10, freeChars: 6 },
} as const;

type ProductKey = keyof typeof PRODUCTS;

const STYLES: Array<{ id: PlateStyle; label: string; note: string }> = [
  { id: "geometric", label: "GEOMETRIC", note: "Bold, technical, our default." },
  { id: "rounded", label: "ROUNDED", note: "Softer corners, friendlier." },
  { id: "mono", label: "MONO", note: "Even spacing, engineer energy." },
];

const SIZES: Array<{ id: PlateSize; label: string; dims: string; multiplier: number }> = [
  { id: "s", label: "SMALL", dims: "35mm cao", multiplier: 0.85 },
  { id: "m", label: "MEDIUM", dims: "45mm cao", multiplier: 1 },
  { id: "l", label: "LARGE", dims: "60mm cao", multiplier: 1.35 },
];

const BASE_COLORS = ["carbon", "cloud", "woodPla", "sky", "lava"];
const TEXT_COLORS = ["lava", "lime", "sun", "cloud", "goldSilk", "sky", "carbon", "rose"];

const STEPS = ["NAME", "COLOR", "STYLE", "PREVIEW"] as const;

export function CustomStudio({ initialProduct }: { initialProduct?: string }) {
  const productKey: ProductKey =
    initialProduct && initialProduct in PRODUCTS ? (initialProduct as ProductKey) : "custom-name-plate";
  const config = PRODUCTS[productKey];

  const [name, setName] = React.useState("");
  const [base, setBase] = React.useState("carbon");
  const [textColor, setTextColor] = React.useState("lava");
  const [style, setStyle] = React.useState<PlateStyle>("geometric");
  const [size, setSize] = React.useState<PlateSize>("m");
  const [added, setAdded] = React.useState(false);
  const cart = useCart();

  const chars = name.trim().length;
  const extraChars = Math.max(0, chars - config.freeChars);
  const sizeMultiplier = SIZES.find((s) => s.id === size)?.multiplier ?? 1;
  const price = Math.round((config.base + extraChars * 9000) * sizeMultiplier);

  const step = chars === 0 ? 0 : 3;

  function reset() {
    setName("");
    setBase("carbon");
    setTextColor("lava");
    setStyle("geometric");
    setSize("m");
  }

  function order() {
    cart.add({
      slug: productKey,
      name: `${config.label} — “${name.trim().toUpperCase()}”`,
      price,
      colorName: `${filaments[base].name} / ${filaments[textColor].name}`,
      colorHex: filaments[textColor].hex,
      shape: "nameplate",
      customText: name.trim().toUpperCase(),
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      {/* ================= CONTROLS ================= */}
      <div className="order-2 lg:order-1">
        {/* step rail */}
        <ol className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "eyebrow rounded-full px-2.5 py-1 transition-colors",
                  i <= step ? "bg-ink text-paper" : "bg-ink/6 text-ink-3",
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="h-px w-4 bg-line" />}
            </li>
          ))}
        </ol>

        {/* 01 — name */}
        <section className="mt-8">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="plate-name">01 · Enter your name</Label>
            <span className="font-mono text-xs text-ink-3">
              {chars}/{config.maxChars}
            </span>
          </div>
          <Input
            id="plate-name"
            value={name}
            maxLength={config.maxChars}
            onChange={(e) => setName(e.target.value)}
            placeholder="PHÚC HƯNG"
            autoComplete="off"
            className="mt-3 uppercase"
          />
          <p className="mt-2 text-xs text-ink-3">
            Tiếng Việt có dấu in được đầy đủ — Ư, Ơ, Đ, Ă, Â đều ổn.
          </p>
        </section>

        {/* 02 — colours */}
        <section className="mt-9">
          <Label>02 · Choose your colours</Label>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2.5 text-xs font-medium text-ink-2">
                Base · <span className="text-ink-3">{filaments[base].name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {BASE_COLORS.map((key) => (
                  <Swatch
                    key={key}
                    hex={filaments[key].hex}
                    name={filaments[key].name}
                    silk={filaments[key].silk}
                    active={base === key}
                    onClick={() => setBase(key)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2.5 text-xs font-medium text-ink-2">
                Letters · <span className="text-ink-3">{filaments[textColor].name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {TEXT_COLORS.map((key) => (
                  <Swatch
                    key={key}
                    hex={filaments[key].hex}
                    name={filaments[key].name}
                    silk={filaments[key].silk}
                    active={textColor === key}
                    onClick={() => setTextColor(key)}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-3">
            Two colours means we pause the printer mid-job and swap the filament by hand. Dad does the
            swapping — the nozzle is at 205°C.
          </p>
        </section>

        {/* 03 — style + size */}
        <section className="mt-9">
          <Label>03 · Choose a style</Label>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                aria-pressed={style === s.id}
                className={cn(
                  "tactile rounded-2xl border p-4 text-left transition-colors",
                  style === s.id
                    ? "border-ink bg-surface shadow-[var(--shadow-soft)]"
                    : "border-line bg-transparent hover:border-ink/30",
                )}
              >
                <span
                  className={cn(
                    "block text-lg text-ink",
                    s.id === "geometric" && "font-display font-bold tracking-tight",
                    s.id === "rounded" && "font-sans font-black",
                    s.id === "mono" && "font-mono font-bold",
                  )}
                >
                  Aa
                </span>
                <span className="mt-2 block font-display text-xs font-bold tracking-tight">{s.label}</span>
                <span className="mt-1 block text-[0.6875rem] leading-snug text-ink-3">{s.note}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                aria-pressed={size === s.id}
                className={cn(
                  "tactile flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors",
                  size === s.id
                    ? "border-ink bg-surface shadow-[var(--shadow-soft)]"
                    : "border-line hover:border-ink/30",
                )}
              >
                <span className="font-display text-xs font-bold tracking-tight">{s.label}</span>
                <span className="font-mono text-[0.6875rem] text-ink-3">{s.dims}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 04 — order */}
        <section className="mt-9 rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow text-ink-3">04 · Your price</span>
              <p className="display mt-2 text-3xl">{formatVnd(price)}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="tactile inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-ink-2 hover:border-ink/30"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          </div>

          <ul className="mt-4 space-y-1.5 text-xs text-ink-3">
            <li className="flex justify-between">
              <span>{config.label} · base ({config.freeChars} ký tự đầu)</span>
              <span className="font-mono">{formatVnd(config.base)}</span>
            </li>
            {extraChars > 0 && (
              <li className="flex justify-between">
                <span>+{extraChars} ký tự thêm</span>
                <span className="font-mono">{formatVnd(extraChars * 9000)}</span>
              </li>
            )}
            {sizeMultiplier !== 1 && (
              <li className="flex justify-between">
                <span>Size {size.toUpperCase()} (×{sizeMultiplier})</span>
                <span className="font-mono">
                  {sizeMultiplier > 1 ? "+" : "−"}
                  {Math.abs(Math.round(config.base * (sizeMultiplier - 1))).toLocaleString("vi-VN")}đ
                </span>
              </li>
            )}
          </ul>

          <Button size="lg" className="mt-5 w-full" onClick={order} disabled={chars === 0}>
            {added ? (
              <>
                <Check className="size-5" /> ADDED TO CART
              </>
            ) : chars === 0 ? (
              "ENTER A NAME FIRST"
            ) : (
              <>
                <Sparkles className="size-4" /> ORDER THIS ONE
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-[0.6875rem] text-ink-3">
            Made to order · 3–5 ngày · We send a photo before it ships.
          </p>
        </section>
      </div>

      {/* ================= PREVIEW ================= */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <NameplatePreview
            text={name}
            baseColor={filaments[base].hex}
            textColor={filaments[textColor].hex}
            style={style}
            size={size}
            className="aspect-4/3 w-full"
          />
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <Spec label="Text" value={name.trim().toUpperCase() || "—"} />
          <Spec label="Style" value={style.toUpperCase()} />
          <Spec label="Size" value={size.toUpperCase()} />
        </div>

        <p className="mt-4 rounded-2xl bg-paper-2 p-4 text-xs leading-relaxed text-ink-2">
          <span className="eyebrow mb-1.5 block text-ink-3">Honest note</span>
          This preview is an accurate mock-up of shape, colour and proportion — not a render of the final
          sliced file. We check every design by hand before it goes on the printer, and we will message you
          if a name needs a tweak to print cleanly.
        </p>
      </div>
    </div>
  );
}

function Swatch({
  hex,
  name,
  silk,
  active,
  onClick,
}: {
  hex: string;
  name: string;
  silk?: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={name}
      aria-label={name}
      aria-pressed={active}
      className={cn(
        "tactile size-9 rounded-xl border border-ink/10 ring-offset-2 ring-offset-paper transition-shadow",
        active && "ring-2 ring-ink",
      )}
      style={{ background: silk ? `linear-gradient(135deg, ${hex}, #ffffff 45%, ${hex})` : hex }}
    />
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-3">
      <p className="eyebrow text-ink-3">{label}</p>
      <p className="mt-1.5 truncate font-display text-sm font-bold tracking-tight">{value}</p>
    </div>
  );
}
