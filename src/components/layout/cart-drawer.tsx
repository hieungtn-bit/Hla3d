"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ProductVisual } from "@/components/products/product-visual";
import { goal } from "@/data/site";
import { Button } from "@/components/ui/button";
import { formatVnd } from "@/lib/utils";

export function CartDrawer() {
  const cart = useCart();
  const router = useRouter();
  const nextCustomer = goal.current + 1;

  function goToOrderForm() {
    cart.close();
    router.push("/dat-hang");
  }

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <div className="fixed inset-0 z-100">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cart.close}
          />
          <motion.aside
            role="dialog"
            aria-label="Your basket"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b-2 border-ink px-6 py-5">
              <div>
                <p className="eyebrow text-ink-3">Giỏ hàng</p>
                <h2 className="display mt-1 text-xl">
                  {cart.count} MÓN
                </h2>
              </div>
              <button
                type="button"
                onClick={cart.close}
                aria-label="Close"
                className="sticker press grid size-10 place-items-center rounded-full bg-surface"
              >
                <X className="size-4" />
              </button>
            </header>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid size-16 place-items-center rounded-2xl bg-surface shadow-[var(--shadow-soft)]">
                  <ShoppingBag className="size-6 text-ink-3" />
                </div>
                <p className="font-display text-xl font-extrabold">Giỏ còn trống</p>
                <p className="text-sm text-ink-2">
                  Mọi món trong shop đều do Hưng, Long và Anh tự thiết kế, tự in và tự kiểm tra.
                </p>
                <Button variant="ink" onClick={cart.close}>
                  XEM TIẾP
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  {cart.lines.map((line) => (
                    <div
                      key={line.key}
                      className="sticker flex gap-4 rounded-2xl bg-surface p-3"
                    >
                      <div
                        className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl p-1"
                        style={{ background: `${line.colorHex}1f` }}
                      >
                        <ProductVisual
                          shape={line.shape}
                          color={line.colorHex}
                          uid={`cart-${line.key}`}
                          label={line.name}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-bold tracking-tight">{line.name}</p>
                        <p className="mt-0.5 text-xs text-ink-3">
                          {line.colorName}
                          {line.customText ? ` · “${line.customText}”` : ""}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
                            <button
                              type="button"
                              aria-label="Giảm số lượng"
                              onClick={() => cart.setQty(line.key, line.qty - 1)}
                              className="tactile grid size-10 place-items-center rounded-full hover:bg-paper-2"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-sm font-bold">{line.qty}</span>
                            <button
                              type="button"
                              aria-label="Tăng số lượng"
                              onClick={() => cart.setQty(line.key, line.qty + 1)}
                              className="tactile grid size-10 place-items-center rounded-full hover:bg-paper-2"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold tracking-tight">
                            {formatVnd(line.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="space-y-4 border-t-2 border-ink bg-surface px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-ink-3">Tạm tính</span>
                    <span className="display text-2xl">{formatVnd(cart.subtotal)}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-3">
                    Làm theo đơn, 3–5 ngày. Chưa thanh toán trên web — mẹ Hiếu sẽ gọi xác nhận và báo phí ship.
                  </p>
                  <Button size="lg" className="w-full" onClick={goToOrderForm}>
                    ĐẶT HÀNG · LÀM KHÁCH SỐ {nextCustomer}
                  </Button>
                  <p className="text-center text-[0.6875rem] text-ink-3">
                    Bước tiếp theo chỉ là điền tên, số điện thoại và địa chỉ.
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
