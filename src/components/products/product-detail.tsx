"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { filaments, type Product } from "@/data/products";
import { ProductVisual } from "@/components/products/product-visual";
import { ColorDots } from "@/components/products/color-dots";
import { MakerRating } from "@/components/products/maker-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatVnd } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = React.useState(product.colors[0]);
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const cart = useCart();
  const reduce = useReducedMotion();
  const filament = filaments[color] ?? filaments.lava;

  function addToCart() {
    cart.add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        colorName: filament.name,
        colorHex: filament.hex,
        shape: product.shape,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* ---- visual ---------------------------------------------------- */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl2)] border border-line bg-paper-2">
          <div className="grid-paper absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0 opacity-20 transition-colors duration-500"
            style={{ background: `radial-gradient(55% 55% at 50% 52%, ${filament.hex}, transparent 72%)` }}
          />
          <motion.div
            key={color}
            className="absolute inset-0 flex items-center justify-center p-10 sm:p-16"
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductVisual
              shape={product.shape}
              color={filament.hex}
              uid={`detail-${product.id}`}
              label={`${product.name} in ${filament.name}`}
            />
          </motion.div>

          {product.badge && (
            <Badge variant="flame" className="absolute left-5 top-5">
              {product.badge}
            </Badge>
          )}
          <div className="absolute bottom-5 left-5 rounded-full border border-line bg-paper/90 px-3 py-1.5 backdrop-blur">
            <span className="eyebrow text-ink-2">{filament.name}</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ink-3">
          Renders show the real shape and the real filament colour. We photograph every order before it ships.
        </p>
      </div>

      {/* ---- info ------------------------------------------------------ */}
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="tint">{product.category.toUpperCase()}</Badge>
          <MakerRating value={product.makerRating} />
        </div>

        <h1 className="display mt-5 text-[clamp(2rem,5vw,3rem)]">{product.name}</h1>
        <p className="mt-2 text-base text-ink-3">{product.nameVi}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{product.tagline}</p>

        <div className="mt-8 flex items-baseline gap-3">
          {product.from && <span className="eyebrow text-ink-3">Từ</span>}
          <span className="display text-4xl">{formatVnd(product.price)}</span>
        </div>

        {/* colours */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink-3">Filament colour</span>
            <span className="text-sm font-medium text-ink">{filament.name}</span>
          </div>
          <ColorDots colors={product.colors} active={color} onSelect={setColor} className="mt-3" />
        </div>

        {/* qty + cart */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex h-14 items-center gap-1 rounded-full border border-line bg-surface px-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="tactile grid size-10 place-items-center rounded-full hover:bg-paper-2"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center font-display font-bold">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="tactile grid size-10 place-items-center rounded-full hover:bg-paper-2"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <Button size="lg" onClick={addToCart} className="flex-1 min-w-48">
            {added ? (
              <>
                <Check className="size-5" />
                ADDED
              </>
            ) : (
              <>ADD TO CART · {formatVnd(product.price * qty)}</>
            )}
          </Button>

          {product.customizable && (
            <Link href={`/custom?product=${product.slug}`} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                <Sparkles className="size-4" />
                CUSTOMIZE
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="size-3.5" /> Made to order · 3–5 ngày
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Broken on arrival? We reprint it.
          </span>
        </div>

        {/* maker note */}
        <blockquote className="mt-9 rounded-[var(--radius-card)] border border-flame/20 bg-flame-tint p-6">
          <span className="eyebrow text-flame-2">Note from the makers</span>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{product.makerNote}</p>
          <footer className="mt-4 text-xs text-ink-2">{product.madeBy}</footer>
        </blockquote>

        {/* description */}
        <div className="mt-9">
          <h2 className="font-display text-lg font-bold tracking-tight">About this print</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{product.description}</p>
          <ul className="mt-5 space-y-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-2">
                <Check className="mt-0.5 size-4 shrink-0 text-flame" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* specs */}
        <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
          {[
            { label: "Material", value: product.material },
            { label: "Print time", value: product.printTime },
            { label: "Size", value: product.size },
            { label: "Weight", value: product.weight },
          ].map((spec) => (
            <div key={spec.label} className="bg-surface p-4">
              <dt className="eyebrow text-ink-3">{spec.label}</dt>
              <dd className="mt-2 text-sm font-medium text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
