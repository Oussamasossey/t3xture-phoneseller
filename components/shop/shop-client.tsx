"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import {
  activeFilterCount,
  applyFilters,
  defaultFilters,
  type ShopFilters,
} from "@/lib/catalog";
import { useDebounce } from "@/hooks/use-debounce";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { ProductGrid } from "@/components/product/product-grid";
import { formatStorage } from "@/lib/format";
import { cn } from "@/lib/utils";

const sortOptions: { value: ShopFilters["sort"]; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

export function ShopClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [filters, setFilters] = useState<ShopFilters>({ ...defaultFilters, q: initialQuery });
  const debouncedQuery = useDebounce(filters.q, 250);

  const results = useMemo(
    () => applyFilters({ ...filters, q: debouncedQuery }),
    [filters, debouncedQuery]
  );

  const counts = useMemo(() => {
    const brands: Record<string, number> = {};
    const conditions: Record<string, number> = {};
    for (const product of products) {
      brands[product.brand] = (brands[product.brand] ?? 0) + 1;
      conditions[product.condition] = (conditions[product.condition] ?? 0) + 1;
    }
    return { brands, conditions };
  }, []);

  const count = activeFilterCount(filters);
  const signature = results.map((r) => r.id).join(",");

  const patch = (value: Partial<ShopFilters>) => setFilters((prev) => ({ ...prev, ...value }));
  const reset = () => setFilters({ ...defaultFilters });

  const chips = [
    ...filters.brands.map((b) => ({ label: b, clear: () => patch({ brands: filters.brands.filter((x) => x !== b) }) })),
    ...filters.conditions.map((c) => ({
      label: c === "new" ? "Brand new" : "Refurbished",
      clear: () => patch({ conditions: filters.conditions.filter((x) => x !== c) }),
    })),
    ...filters.storages.map((s) => ({
      label: formatStorage(s),
      clear: () => patch({ storages: filters.storages.filter((x) => x !== s) }),
    })),
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside aria-label="Product filters">
        <FilterSidebar
          filters={filters}
          onChange={patch}
          onReset={reset}
          counts={counts}
          activeCount={count}
        />
      </aside>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <label htmlFor="shop-search" className="sr-only">
                Search phones
              </label>
              <input
                id="shop-search"
                type="search"
                value={filters.q}
                onChange={(e) => patch({ q: e.target.value })}
                placeholder="Search by model, brand or feature…"
                className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) => patch({ sort: e.target.value as ShopFilters["sort"] })}
                className={cn(
                  "h-11 w-full cursor-pointer appearance-none rounded-full border border-white/10 bg-white/[0.04] px-5 pr-9 text-sm text-foreground",
                  "focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none",
                  "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239aa3b8%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat sm:w-52"
                )}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-surface text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "phone" : "phones"} found
            </p>

            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={chip.clear}
                    className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors hover:border-accent/60"
                  >
                    {chip.label}
                    <X className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">Remove filter</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-medium text-muted underline-offset-2 hover:text-accent hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <div key={signature} className="animate-[fade-in_0.35s_ease-out]">
          <ProductGrid products={results} />
        </div>
      </div>
    </div>
  );
}
