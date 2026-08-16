"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories, products, type CategoryId } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoryId;

export function ShopGrid() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const reduce = useReducedMotion();

  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);
  const activeCategory = categories.find((c) => c.id === filter);

  return (
    <div>
      {/* ---- filters --------------------------------------------------- */}
      <div className="sticky top-16 z-40 -mx-5 border-b-2 border-ink bg-paper/95 px-5 py-4 backdrop-blur-xl sm:top-18 sm:-mx-8 sm:px-8">
        <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            TẤT CẢ
            <span className="ml-1.5 font-mono text-[0.625rem] opacity-60">{products.length}</span>
          </FilterChip>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                {c.label}
                <span className="ml-1.5 font-mono text-[0.625rem] opacity-60">{count}</span>
              </FilterChip>
            );
          })}
        </div>
      </div>

      <p className="mt-6 min-h-6 text-sm text-ink-3">
        {activeCategory ? activeCategory.blurb : "Mười lăm món. Một cái máy in. Món nào cũng làm theo đơn."}
      </p>

      {/* ---- grid ------------------------------------------------------ */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "tactile inline-flex h-10 shrink-0 items-center rounded-full border px-4 font-display text-sm font-bold tracking-tight transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-surface text-ink-2 hover:border-ink/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
