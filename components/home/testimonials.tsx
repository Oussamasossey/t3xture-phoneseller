import { Quote } from "lucide-react";
import { Rating } from "@/components/shared/rating";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Product designer · London",
    initials: "AO",
    tint: "from-sky-500 to-blue-700",
    rating: 5,
    quote:
      "Ordered a refurbished 15 Pro on Tuesday, it arrived Thursday with a battery at 100%. Packaging was better than the original box and the warranty card actually meant something.",
  },
  {
    name: "Daniel Fischer",
    role: "Software engineer · Berlin",
    initials: "DF",
    tint: "from-indigo-500 to-violet-700",
    rating: 5,
    quote:
      "The trade-in took four minutes and the credit landed before the new Galaxy shipped. I have bought three phones here and the support chat has never made me wait.",
  },
  {
    name: "Mei Lin",
    role: "Photographer · Singapore",
    initials: "ML",
    tint: "from-cyan-500 to-teal-700",
    rating: 4.5,
    quote:
      "Their spec tables are honest: real battery numbers, real weight. The Pixel 9 Pro I picked is exactly what was described, down to the micro-scratch they flagged.",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by 40,000+ phone buyers"
          description="Real reviews from verified orders in the last 12 months."
        />

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col gap-5 rounded-3xl glass p-7">
                <Quote className="h-7 w-7 text-accent/70" aria-hidden="true" />
                <blockquote className="text-sm leading-relaxed text-foreground/85 sm:text-[15px]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.tint} text-sm font-semibold text-white`}
                  >
                    {t.initials}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="text-xs text-muted">{t.role}</span>
                  </div>
                  <Rating value={t.rating} showValue={false} className="ml-auto" />
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
