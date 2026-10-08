"use client";

import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl glass px-6 py-16 text-center">
        <span className="text-4xl" aria-hidden="true">
          🔎
        </span>
        <h3 className="text-xl font-semibold text-foreground">No phones match those filters</h3>
        <p className="max-w-md text-sm text-muted">
          Try clearing a filter, widening the price range or searching for a different model.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
      aria-label={`${products.length} products`}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
