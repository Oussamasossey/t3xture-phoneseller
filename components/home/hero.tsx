"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Star, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { unsplash } from "@/lib/images";
import { formatPrice, formatStorage } from "@/lib/format";
import { EASE } from "@/components/shared/reveal";

export function Hero({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const image = product.images[0];

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            New drop · {product.name}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]"
          >
            Flagship phones,
            <br />
            <span className="text-gradient">without the flagship markup.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            iPhone, Galaxy, Pixel and Xiaomi, new and certified refurbished, each tested across
            42 checkpoints and backed by a 24-month PhoneHub warranty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/shop">
                Shop all phones <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={`/products/${product.slug}`}>View {product.name}</Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-4 grid w-full grid-cols-3 gap-3 border-t border-white/10 pt-6"
          >
            {[
              { icon: Star, value: "4.9/5", label: "12,400 reviews" },
              { icon: Zap, value: "48 h", label: "Dispatch time" },
              { icon: Award, value: "24 mo", label: "Warranty" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  {value}
                </div>
                <dd className="text-xs text-muted">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-sky-500/40 to-indigo-600/30 blur-3xl" aria-hidden="true" />

          <div className="relative overflow-hidden rounded-[36px] glass p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-black/40">
              <Image
                src={unsplash(image, 900)}
                alt={`${product.name} hero shot`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    {product.brand} · {product.released}
                  </p>
                  <p className="text-xl font-semibold text-white">{product.name}</p>
                  <p className="text-xs text-white/70">
                    from {formatStorage(product.storages[0].size)} ·{" "}
                    {product.colors.length} colors
                  </p>
                </div>
                <p className="text-2xl font-semibold text-white">{formatPrice(product.price)}</p>
              </div>
            </div>
          </div>

          <motion.div
            animate={reduce ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 top-10 rounded-2xl border border-white/10 bg-surface/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-8"
          >
            <p className="text-[11px] uppercase tracking-widest text-muted">Rating</p>
            <p className="flex items-center gap-1.5 text-base font-semibold text-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {product.rating}
            </p>
          </motion.div>

          <motion.div
            animate={reduce ? {} : { y: [0, 16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -right-3 bottom-16 rounded-2xl border border-white/10 bg-surface/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-right-6"
          >
            <p className="text-[11px] uppercase tracking-widest text-muted">In stock</p>
            <p className="text-base font-semibold text-emerald-300">{product.stock} units</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
