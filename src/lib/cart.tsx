"use client";

import * as React from "react";
import type { ProductShape } from "@/data/products";

export type CartLine = {
  /** slug + colour + custom text makes a line unique */
  key: string;
  slug: string;
  name: string;
  price: number;
  colorName: string;
  colorHex: string;
  shape: ProductShape;
  qty: number;
  customText?: string;
};

const STORAGE_KEY = "hla3d.cart.v1";
const EMPTY: CartLine[] = [];

/* --------------------------------------------------------------------------
   External store.
   localStorage is an external system, so the cart lives outside React and is
   read through useSyncExternalStore. That keeps the server snapshot empty
   (no hydration mismatch) without restoring state inside an effect.
   -------------------------------------------------------------------------- */

let lines: CartLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    // A corrupt cart is not worth crashing the shop over.
    return EMPTY;
  }
}

function writeStorage(next: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or quota — the cart simply will not persist.
  }
}

function subscribe(onChange: () => void) {
  // First subscription happens after mount, which is where the restore belongs.
  if (!hydrated) {
    hydrated = true;
    lines = readStorage();
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot() {
  return lines;
}

function getServerSnapshot() {
  return EMPTY;
}

function commit(next: CartLine[]) {
  lines = next;
  writeStorage(next);
  listeners.forEach((l) => l());
}

/* --------------------------------------------------------------------------
   Provider
   -------------------------------------------------------------------------- */

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = React.createContext<CartState | null>(null);

/**
 * Deliberately local-only for the MVP. Swapping in Supabase or a payment
 * gateway later means replacing this provider, not the components using it.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const current = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = React.useMemo<CartState>(() => {
    const count = current.reduce((n, l) => n + l.qty, 0);
    const subtotal = current.reduce((n, l) => n + l.qty * l.price, 0);

    return {
      lines: current,
      isOpen,
      count,
      subtotal,
      add: (line, qty = 1) => {
        const key = `${line.slug}::${line.colorName}::${line.customText ?? ""}`;
        const existing = lines.find((l) => l.key === key);
        commit(
          existing
            ? lines.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
            : [...lines, { ...line, key, qty }],
        );
        setIsOpen(true);
      },
      remove: (key) => commit(lines.filter((l) => l.key !== key)),
      setQty: (key, qty) =>
        commit(
          qty <= 0
            ? lines.filter((l) => l.key !== key)
            : lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        ),
      clear: () => commit(EMPTY),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [current, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
