import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, RefreshCw, Repeat } from "lucide-react";
import { unsplash } from "@/lib/images";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";

const promos = [
  {
    title: "Trade in. Trade up.",
    body: "Get up to $620 for your old phone and put it straight towards a new flagship. Valuation takes 2 minutes, shipping is free.",
    cta: "Start a trade-in",
    href: "/contact",
    icon: Repeat,
    image: "https://images.unsplash.com/photo-1707438095902-cc23b01ac7a2",
    alt: "Three smartphones grouped together on a desk",
    tint: "from-sky-500/30 to-indigo-600/10",
  },
  {
    title: "Refurbished, re-verified",
    body: "Certified pre-owned flagships at up to 40% off. New battery, 42-point diagnostic, 12-month warranty. No compromises.",
    cta: "Shop refurbished",
    href: "/shop?condition=refurbished",
    icon: RefreshCw,
    image: "https://images.unsplash.com/photo-1753108431859-19eb29905bbb",
    alt: "Several modern smartphones laid out on a surface",
    tint: "from-violet-500/30 to-fuchsia-600/10",
  },
];

export function PromoSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <StaggerGroup className="grid gap-6 lg:grid-cols-2">
        {promos.map((promo) => (
          <StaggerItem key={promo.title} className="h-full">
            <Reveal className="h-full">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl glass p-8">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${promo.tint} opacity-70 transition-opacity group-hover:opacity-100`}
                  aria-hidden="true"
                />
                <Image
                  src={unsplash(promo.image, 600)}
                  alt={promo.alt}
                  width={224}
                  height={224}
                  loading="lazy"
                  className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full object-cover opacity-25 blur-[2px] transition-transform duration-700 group-hover:scale-110"
                />

                <div className="relative flex flex-col gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-accent">
                    <promo.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {promo.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {promo.body}
                  </p>
                </div>

                <Link
                  href={promo.href}
                  className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                >
                  {promo.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            </Reveal>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
