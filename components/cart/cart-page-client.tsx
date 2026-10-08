"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartActions, useCartLines, useCartSubtotal } from "@/hooks/use-cart";
import { square } from "@/lib/images";
import { formatPrice, formatStorage } from "@/lib/format";

const shippingThreshold = 99;

export function CartPageClient() {
  const lines = useCartLines();
  const subtotal = useCartSubtotal();
  const { setQuantity, removeLine, clear } = useCartActions();
  const [notice, setNotice] = useState(false);

  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl glass px-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-muted">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Nothing here yet. Browse the line-up and add a phone and we will keep it saved for you.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/shop">
            Shop phones <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section aria-label="Cart items" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            {count} item{count === 1 ? "" : "s"}
          </h2>
          <button
            type="button"
            onClick={clear}
            className="text-xs font-medium text-muted underline-offset-2 transition-colors hover:text-rose-400 hover:underline"
          >
            Empty cart
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {lines.map((line) => (
            <motion.li
              key={line.key}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 rounded-3xl glass p-4 sm:p-5"
            >
              <Link
                href={`/products/${line.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:h-28 sm:w-28"
              >
                <Image
                  src={square(line.image, 240)}
                  alt={line.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {line.brand}
                    </p>
                    <h3 className="truncate text-base font-semibold text-foreground">
                      <Link
                        href={`/products/${line.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {line.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted">
                      {line.color} · {formatStorage(line.storage)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    aria-label={`Remove ${line.name} from cart`}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${line.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-7 text-center text-sm font-medium text-foreground">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, Math.min(99, line.quantity + 1))}
                      aria-label={`Increase quantity of ${line.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted">
                      {formatPrice(line.unitPrice)} each
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatPrice(line.unitPrice * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="w-fit text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← Continue shopping
        </Link>
      </section>

      <aside aria-label="Order summary" className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-3xl glass p-6">
          <h2 className="text-base font-semibold text-foreground">Order summary</h2>

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-foreground">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-medium text-foreground">
                {shipping === 0 ? <span className="text-emerald-300">Free</span> : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Estimated tax</dt>
              <dd className="font-medium text-foreground">{formatPrice(tax)}</dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {formatPrice(total)}
            </span>
          </div>

          {subtotal < shippingThreshold && (
            <p className="mt-3 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-xs text-sky-200">
              Add {formatPrice(shippingThreshold - subtotal)} more for free shipping.
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={() => setNotice(true)}>
              Proceed to checkout
            </Button>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/shop">Keep shopping</Link>
            </Button>
          </div>

          {notice && (
            <p
              role="status"
              className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-200"
            >
              Online checkout is not available yet, so no order has been placed.
            </p>
          )}

          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
            Secure checkout · VISA · Mastercard · Amex · PayPal
          </p>
        </div>
      </aside>
    </div>
  );
}
