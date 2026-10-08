import { products, type Brand, type Condition, type Product } from "@/data/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface ShopFilters {
  q: string;
  brands: Brand[];
  conditions: Condition[];
  storages: number[];
  minPrice: number;
  maxPrice: number;
  sort: SortKey;
}

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

export const defaultFilters: ShopFilters = {
  q: "",
  brands: [],
  conditions: [],
  storages: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  sort: "featured",
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProduct(): Product {
  return products.find((p) => p.featured) ?? products[0];
}

export function bestSellers(limit = 6): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameBrand = products.filter((p) => p.brand === product.brand && p.id !== product.id);
  const others = products.filter((p) => p.brand !== product.brand && p.id !== product.id);
  return [...sameBrand, ...others].slice(0, limit);
}

export function parseReleased(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function matchesQuery(product: Product, q: string): boolean {
  if (!q) return true;
  const haystack = [
    product.name,
    product.brand,
    product.shortDescription,
    product.description,
    product.condition,
    ...product.features,
    ...product.specs.map((s) => `${s.label} ${s.value}`),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function applyFilters(filters: ShopFilters): Product[] {
  const filtered = products.filter((p) => {
    if (!matchesQuery(p, filters.q)) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (filters.conditions.length && !filters.conditions.includes(p.condition)) return false;
    if (filters.storages.length && !p.storages.some((s) => filters.storages.includes(s.size)))
      return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    case "newest":
      sorted.sort((a, b) => parseReleased(b.released) - parseReleased(a.released));
      break;
    default:
      sorted.sort((a, b) => Number(b.bestSeller ?? 0) - Number(a.bestSeller ?? 0));
  }
  return sorted;
}

export function activeFilterCount(filters: ShopFilters): number {
  return (
    filters.brands.length +
    filters.conditions.length +
    filters.storages.length +
    (filters.q ? 1 : 0) +
    (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max ? 1 : 0)
  );
}
