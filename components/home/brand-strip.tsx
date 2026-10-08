import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";

const brands = [
  { name: "Apple", href: "/shop?q=iphone", mark: "" },
  { name: "Samsung", href: "/shop?q=galaxy", mark: "◈" },
  { name: "Google", href: "/shop?q=pixel", mark: "G" },
  { name: "Xiaomi", href: "/shop?q=xiaomi", mark: "⚡" },
];

const stats = [
  { value: "40k+", label: "phones shipped" },
  { value: "4.9", label: "average rating" },
  { value: "98%", label: "would recommend" },
];

export function BrandStrip() {
  return (
    <section aria-label="Brands we carry" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          Authorised partner for the brands you trust
        </p>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand) => (
            <li key={brand.name}>
              <Link
                href={brand.href}
                className="group flex h-24 flex-col items-center justify-center gap-1 rounded-2xl glass glass-hover"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl text-white/70 transition-colors group-hover:text-accent"
                >
                  {brand.mark}
                </span>
                <span className="text-lg font-semibold tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
                  {brand.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
