"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartActions, useCartLines, useCartOpen, useCartSubtotal } from "@/hooks/use-cart";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "@/hooks/use-overlay";
import { square } from "@/lib/images";
import { formatPrice, formatStorage } from "@/lib/format";

export function CartDrawer() {
  const isOpen = useCartOpen();
  const lines = useCartLines();
  const subtotal = useCartSubtotal();
  const { close, setQuantity, removeLine } = useCartActions();
  const [notice, setNotice] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);
  useFocusTrap(panelRef, isOpen);

  // Reset the checkout notice whenever the drawer is dismissed.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setNotice(false);
  }

  const handleCheckout = useCallback(() => setNotice(true), []);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" role="presentation">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-surface/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-foreground">Your cart</h2>
                  <p className="text-xs text-muted">
                    {count} item{count === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <Separator />

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-muted">
                    <ShoppingBag className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Your cart is empty</p>
                    <p className="mt-1 text-sm text-muted">
                      Add a phone and it will show up right here.
                    </p>
                  </div>
                  <Button onClick={close} asChild>
                    <Link href="/shop">Browse phones</Link>
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                      >
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={close}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5"
                        >
                          <Image
                            src={square(line.image, 160)}
                            alt={line.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {line.name}
                              </p>
                              <p className="truncate text-xs text-muted">
                                {line.color} · {formatStorage(line.storage)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLine(line.key)}
                              aria-label={`Remove ${line.name} from cart`}
                              className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5">
                              <button
                                type="button"
                                onClick={() => setQuantity(line.key, line.quantity - 1)}
                                aria-label={`Decrease quantity of ${line.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span
                                className="min-w-6 text-center text-sm font-medium text-foreground"
                                aria-live="polite"
                              >
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQuantity(line.key, Math.min(line.quantity + 1, 99))}
                                aria-label={`Increase quantity of ${line.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(line.unitPrice * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-white/10 bg-background/60 px-5 py-5">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span className="text-base font-semibold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Shipping and taxes calculated at checkout · Free 2-day delivery
                </p>

                <AnimatePresence>
                  {notice && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      role="status"
                      className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200"
                    >
                      Online checkout is not available yet.
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-col gap-2.5">
                  <Button size="lg" onClick={handleCheckout} className="w-full">
                    Checkout · {formatPrice(subtotal)}
                  </Button>
                  <div className="flex gap-2.5">
                    <Button variant="secondary" className="flex-1" onClick={close} asChild>
                      <Link href="/cart">View cart</Link>
                    </Button>
                    <Button variant="ghost" className="flex-1" onClick={close}>
                      Continue shopping
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
