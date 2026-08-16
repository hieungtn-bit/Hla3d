"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { filaments, priceLabel, type Product } from "@/data/products";
import { ProductVisual } from "@/components/products/product-visual";
import { MakerRating } from "@/components/products/maker-rating";
import { ColorDots } from "@/components/products/color-dots";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const MAX_SWATCHES = 4;

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [color, setColor] = React.useState(product.colors[0]);
  const filament = filaments[color] ?? filaments.lava;
  const cart = useCart();
  const reduce = useReducedMotion();

  return (
    <article
      className={cn(
        "sticker press group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface",
        className,
      )}
    >
      {/* ---- visual ---------------------------------------------------- */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-4/3 overflow-hidden border-b-2 border-ink bg-paper-2 focus-visible:outline-offset-[-4px]"
      >
        <div className="grid-paper absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0 opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: `radial-gradient(60% 60% at 50% 55%, ${filament.hex}, transparent 70%)` }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
          whileHover={reduce ? undefined : { rotate: 4, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <ProductVisual
            shape={product.shape}
            color={filament.hex}
            uid={`card-${product.id}`}
            label={`${product.name} in ${filament.name}`}
            className="max-h-full w-auto drop-shadow-sm"
          />
        </motion.div>

        {product.badge && (
          <Badge variant={product.badge === "BEST SELLER" ? "flame" : "ink"} className="absolute left-3 top-3 -rotate-3">
            {product.badge}
          </Badge>
        )}
        {product.customizable && (
          <Badge variant="lime" className="absolute right-3 top-3 rotate-3">
            <Sparkles className="size-3" />
            CUSTOM
          </Badge>
        )}
      </Link>

      {/* ---- body ------------------------------------------------------ */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight font-extrabold text-ink">
              <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-[0.8125rem] leading-snug text-ink-3">{product.nameVi}</p>
          </div>
          <div className="shrink-0 text-right">
            {product.from && <span className="eyebrow block text-ink-3">Từ</span>}
            <span className="font-display text-lg font-extrabold text-ink">
              {product.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed font-semibold text-ink-2">{product.tagline}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <MakerRating value={product.makerRating} />
          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Cap the swatch row so cards keep an even height across the grid. */}
            <div className="flex items-center gap-1.5">
              <ColorDots
                colors={product.colors.slice(0, MAX_SWATCHES)}
                active={color}
                onSelect={setColor}
                size="sm"
                className="flex-nowrap"
              />
              {product.colors.length > MAX_SWATCHES && (
                <span className="font-mono text-[0.625rem] text-ink-3">
                  +{product.colors.length - MAX_SWATCHES}
                </span>
              )}
            </div>

            {product.customizable ? (
              <Link
                href={`/custom?product=${product.slug}`}
                className="sticker press inline-flex h-9 items-center gap-1.5 rounded-full bg-sun px-4 font-display text-[0.8125rem] font-extrabold text-ink"
              >
                TỰ THIẾT KẾ
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  cart.add({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    colorName: filament.name,
                    colorHex: filament.hex,
                    shape: product.shape,
                  })
                }
                aria-label={`Add ${product.name} to cart`}
                className="sticker press inline-flex h-9 items-center gap-1.5 rounded-full bg-sun px-4 font-display text-[0.8125rem] font-extrabold text-ink"
              >
                <Plus className="size-3.5" />
                THÊM
              </button>
            )}
          </div>
        </div>
      </div>
      <span className="sr-only">{priceLabel(product)}</span>
    </article>
  );
}
