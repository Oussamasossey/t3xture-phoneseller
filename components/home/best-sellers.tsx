"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export function BestSellers({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Best sellers"
          title="The phones everyone is buying"
          description="Ranked by real sales over the last 30 days, restocked weekly and covered by our 24-month warranty."
          align="left"
        />

        <div className="flex items-center justify-between gap-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/shop">
              <Sparkles className="h-4 w-4" /> View all
            </Link>
          </Button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll best sellers backwards"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll best sellers forwards"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-1 sm:-mx-6 sm:px-6"
          role="region"
          aria-label="Best selling products carousel"
          tabIndex={0}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="w-[85vw] shrink-0 snap-start sm:w-[340px]"
              style={{ minWidth: 0 }}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
