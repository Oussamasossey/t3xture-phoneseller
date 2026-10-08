"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Minus, Plus, ShieldCheck, Truck, Wallet } from "lucide-react";
import type { Product } from "@/data/products";
import { ImageGallery } from "@/components/product/image-gallery";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartActions, useCartLines } from "@/hooks/use-cart";
import { formatPrice, formatStorage } from "@/lib/format";
import { cn } from "@/lib/utils";

const assurances = [
  { icon: Truck, label: "Free 2-day shipping" },
  { icon: ShieldCheck, label: "24-month warranty" },
  { icon: Wallet, label: "Trade-in accepted" },
];

export function ProductDetails({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [storageIndex, setStorageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addLine } = useCartActions();
  const lines = useCartLines();

  const color = product.colors[colorIndex];
  const storage = product.storages[storageIndex];
  const total = product.price + storage.priceDelta;

  const inCart = useMemo(
    () => lines.some((l) => l.productId === product.id && l.color === color.name && l.storage === storage.size),
    [lines, product.id, color.name, storage.size]
  );

  const addToCart = () => {
    addLine(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        color: color.name,
        storage: storage.size,
        unitPrice: total,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <ImageGallery images={product.images} name={product.name} />

      <div className="flex flex-col gap-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link href="/shop" className="transition-colors hover:text-accent">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link href={`/shop?q=${product.brand}`} className="transition-colors hover:text-accent">
            {product.brand}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span aria-current="page" className="text-foreground/80">
            {product.name}
          </span>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={product.condition === "refurbished" ? "warning" : "gradient"}>
            {product.badge ?? (product.condition === "refurbished" ? "Refurbished" : "New")}
          </Badge>
          <span className="text-xs uppercase tracking-[0.18em] text-accent">{product.brand}</span>
          <span className="text-xs text-muted">{product.released}</span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <Rating value={product.rating} reviews={product.reviews} />
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {product.description}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="text-4xl font-semibold tracking-tight text-foreground"
                >
                  {formatPrice(total)}
                </motion.span>
              </AnimatePresence>
              {product.originalPrice && (
                <span className="text-base text-muted line-through">
                  {formatPrice(product.originalPrice + storage.priceDelta)}
                </span>
              )}
              <span className="text-xs text-muted">or {formatPrice(Math.round(total / 12))}/mo</span>
            </div>
            <p className="text-xs text-muted">Taxes included · Free shipping over $99</p>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-foreground">
              Colour: <span className="font-normal text-muted">{color.name}</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((option, index) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColorIndex(index)}
                  aria-pressed={index === colorIndex}
                  aria-label={`Colour ${option.name}`}
                  title={option.name}
                  className={cn(
                    "relative h-10 w-10 rounded-full border-2 transition-all duration-300",
                    index === colorIndex
                      ? "border-accent scale-110 shadow-[0_0_0_4px_rgba(56,189,248,0.16)]"
                      : "border-white/20 hover:border-white/50"
                  )}
                  style={{ backgroundColor: option.hex }}
                >
                  {index === colorIndex && (
                    <Check
                      className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-foreground">Storage</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.storages.map((option, index) => {
                const active = index === storageIndex;
                return (
                  <button
                    key={option.size}
                    type="button"
                    onClick={() => setStorageIndex(index)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded-2xl border px-3 py-3 transition-all duration-300",
                      active
                        ? "border-accent bg-accent/10 text-foreground shadow-[0_0_0_3px_rgba(56,189,248,0.14)]"
                        : "border-white/12 bg-white/[0.03] text-muted hover:border-white/30"
                    )}
                  >
                    <span className="text-sm font-semibold">{formatStorage(option.size)}</span>
                    <span className="text-[11px]">
                      {option.priceDelta === 0 ? "included" : `+${formatPrice(option.priceDelta)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
              className="flex items-center gap-1 self-start rounded-full border border-white/12 bg-white/[0.04] p-1"
              role="group"
              aria-label="Quantity"
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center text-sm font-semibold text-foreground" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button size="lg" className="flex-1" onClick={addToCart} aria-live="polite">
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : inCart ? (
                <>Add another · {formatPrice(total)}</>
              ) : (
                <>Add to cart · {formatPrice(total)}</>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted">
            <span className="text-emerald-300">●</span> In stock · {product.stock} units ready to
            ship today
          </p>

          <ul className="grid gap-3 sm:grid-cols-3">
            {assurances.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-muted"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/80"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
