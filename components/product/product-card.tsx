"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { square } from "@/lib/images";
import { formatPrice, formatStorage } from "@/lib/format";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { useCartActions, useCartLines } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addLine } = useCartActions();
  const lines = useCartLines();

  const defaultStorage = product.storages[0];
  const alreadyInCart = lines.some(
    (l) =>
      l.productId === product.id &&
      l.color === product.colors[0].name &&
      l.storage === defaultStorage.size
  );

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      color: product.colors[0].name,
      storage: defaultStorage.size,
      unitPrice: product.price + defaultStorage.priceDelta,
    });
  };

  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass glass-hover"
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/[0.06] to-transparent">
          <Image
            src={square(product.images[0], 640)}
            alt={`${product.name} in ${product.colors[0].name}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={square(product.images[1], 640)}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <Badge variant={product.condition === "refurbished" ? "warning" : "gradient"}>
                {product.badge}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <Rating value={product.rating} reviews={product.reviews} />
            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
              {product.colors.length} colors
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {product.brand}
            </span>
            <span className="text-[11px] text-muted">{product.released}</span>
          </div>

          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold tracking-tight text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-muted">
                from {formatStorage(defaultStorage.size)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={quickAdd}
          className={cn(
            "flex h-10 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
            alreadyInCart
              ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border border-white/12 bg-white/[0.05] text-foreground hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
          )}
          aria-label={alreadyInCart ? `${product.name} is in your cart` : `Quick add ${product.name} to cart`}
        >
          {alreadyInCart ? (
            <>
              <Check className="h-4 w-4" /> In cart
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Quick add
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
