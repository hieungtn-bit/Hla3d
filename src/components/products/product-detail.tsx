"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, MessageCircle, Minus, Package, Phone, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { categories, filaments, type Product } from "@/data/products";
import { ProductVisual } from "@/components/products/product-visual";
import { ColorDots } from "@/components/products/color-dots";
import { MakerRating } from "@/components/products/maker-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { contact } from "@/data/site";
import { formatVnd } from "@/lib/utils";

function categoryLabel(id: Product["category"]) {
  return categories.find((c) => c.id === id)?.label ?? id.toUpperCase();
}

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
          Hình minh hoạ đúng hình dáng và đúng màu nhựa. Tụi em chụp ảnh thật từng đơn trước khi gửi.
        </p>
      </div>

      {/* ---- info ------------------------------------------------------ */}
      <div>
        <div className="flex items-center gap-3">
          <Badge variant="tint">{categoryLabel(product.category)}</Badge>
          <MakerRating value={product.makerRating} />
        </div>

        <h1 className="display mt-5 text-[clamp(2rem,5vw,3rem)]">{product.nameVi}</h1>
        <p className="mt-2 text-base text-ink-3">{product.name}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{product.tagline}</p>

        <div className="mt-8 flex items-baseline gap-3">
          {product.from && <span className="eyebrow text-ink-3">Từ</span>}
          <span className="display text-4xl">{formatVnd(product.price)}</span>
        </div>

        {/* colours */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink-3">Màu nhựa</span>
            <span className="text-sm font-medium text-ink">{filament.name}</span>
          </div>
          <ColorDots colors={product.colors} active={color} onSelect={setColor} className="mt-3" />
        </div>

        {/* qty + cart */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex h-14 items-center gap-1 rounded-full border border-line bg-surface px-2">
            <button
              type="button"
              aria-label="Giảm số lượng"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="tactile grid size-10 place-items-center rounded-full hover:bg-paper-2"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center font-display font-bold">{qty}</span>
            <button
              type="button"
              aria-label="Tăng số lượng"
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
                ĐÃ THÊM
              </>
            ) : (
              <>THÊM VÀO GIỎ · {formatVnd(product.price * qty)}</>
            )}
          </Button>

          {product.customizable && (
            <Link href={`/custom?product=${product.slug}`} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                <Sparkles className="size-4" />
                TỰ THIẾT KẾ
              </Button>
            </Link>
          )}
        </div>

        {/* Zero-typing path: for the buyer who will not fill in a form. */}
        <div className="mt-5 rounded-[var(--radius-card)] border-2 border-dashed border-ink/30 bg-paper-2 p-4">
          <p className="text-sm font-bold text-ink">Ngại điền form? Gọi hoặc nhắn là xong.</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a
              href={contact.tel}
              className="sticker press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-flame font-display text-sm font-extrabold text-white"
            >
              <Phone className="size-4" aria-hidden />
              GỌI {contact.phoneDisplay}
            </a>
            <a
              href={contact.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="sticker press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-sky font-display text-sm font-extrabold text-white"
            >
              <MessageCircle className="size-4" aria-hidden />
              NHẮN ZALO
            </a>
          </div>
          <p className="mt-2.5 text-xs text-ink-2">
            Bạn chỉ cần đọc tên món — {contact.owner} ghi giúp phần còn lại.
          </p>
        </div>

        {/* Order & delivery — the block an adult scans before paying. */}
        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border-2 border-ink bg-ink sm:grid-cols-3">
          <div className="bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-ink-3">
              <Package className="size-3.5" />
              <span className="eyebrow">Làm theo đơn</span>
            </dt>
            <dd className="mt-2 text-sm font-bold text-ink">3–5 ngày</dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-ink-3">
              <Truck className="size-3.5" />
              <span className="eyebrow">Giao hàng</span>
            </dt>
            <dd className="mt-2 text-sm font-bold text-ink">Toàn quốc, phí tính khi đặt</dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-ink-3">
              <ShieldCheck className="size-3.5" />
              <span className="eyebrow">Hỏng khi nhận</span>
            </dt>
            <dd className="mt-2 text-sm font-bold text-ink">Tụi em in lại</dd>
          </div>
        </dl>

        {/* maker note */}
        <blockquote className="mt-9 rounded-[var(--radius-card)] border border-flame/20 bg-flame-tint p-6">
          <span className="eyebrow text-flame-2">Lời nhắn của ba anh em</span>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{product.makerNote}</p>
          <footer className="mt-4 text-xs text-ink-2">{product.madeBy}</footer>
        </blockquote>

        {/* description */}
        <div className="mt-9">
          <h2 className="font-display text-xl font-extrabold">Về món này</h2>
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

        {/* safety — factual cautions, never a certification claim */}
        <section className="mt-9 rounded-[var(--radius-card)] border-2 border-ink bg-sun-tint p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
            <AlertTriangle className="size-5" aria-hidden />
            Trước khi mua, ba mẹ đọc giúp
          </h2>
          <ul className="mt-4 space-y-2.5">
            {product.safety.map((note) => (
              <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/40" />
                {note}
              </li>
            ))}
          </ul>
        </section>

        {/* specs */}
        <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border-2 border-ink bg-ink">
          {[
            { label: "Chất liệu", value: product.material },
            { label: "Thời gian in", value: product.printTime },
            { label: "Kích thước", value: product.size },
            { label: "Cân nặng", value: product.weight },
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
