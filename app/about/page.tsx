import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "PhoneHub is an independent phone store built around honest pricing, a 42-point diagnostic on every device and a real 24-month warranty.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PhoneHub | How we test and price every phone",
    description:
      "Independent phone store: 42-point diagnostics, honest pricing and a 24-month warranty on every device.",
    url: "/about",
  },
};

const stats = [
  { value: "2016", label: "Founded in Rotterdam" },
  { value: "40k+", label: "phones shipped" },
  { value: "42", label: "checkpoint diagnostic" },
  { value: "4.9", label: "average review score" },
];

const process = [
  {
    step: "01",
    title: "Sourced responsibly",
    body: "We buy from authorised distributors and certified carrier returns only. No grey-market stock, no mystery refurbishers.",
  },
  {
    step: "02",
    title: "Tested across 42 points",
    body: "Cameras, radios, haptics, speakers, battery health and every port. Anything below 90% battery health gets a new cell.",
  },
  {
    step: "03",
    title: "Priced against the market",
    body: "Our pricing engine checks the market daily. If a competitor lists the same device cheaper for seven days, we match it.",
  },
  {
    step: "04",
    title: "Shipped in 48 hours",
    body: "Carbon-neutral delivery, plastic-free packaging and a return label in the box. Changed your mind? Send it back in 30 days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A phone store that reads the spec sheet"
        description="PhoneHub started because buying a phone meant choosing between vague listings and showroom markups. We do neither."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Independent, obsessive, boringly thorough
            </h2>
            <p className="text-base leading-relaxed text-muted">
              We are a 24-person team of technicians and buyers. Every phone that leaves our studio
              has been opened, measured and photographed by a human who signs the checklist. If we
              flag a micro-scratch, it is in the photos you see.
            </p>
            <p className="text-base leading-relaxed text-muted">
              No carrier tie-ins, no activation fees, no surprise restocking charges. The price on
              the card is the price you pay, and the warranty is ours, not the manufacturer&apos;s
              fine print.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <Link href="/shop">Shop the line-up</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Talk to a technician</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-br from-sky-500/25 to-indigo-600/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[32px] glass p-2">
              <Image
                src={unsplash("https://images.unsplash.com/photo-1592890288564-76628a30a657", 1000)}
                alt="A technician holding a smartphone during inspection"
                loading="lazy"
                width={1000}
                height={750}
                className="aspect-[4/3] w-full rounded-[24px] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="flex flex-col gap-1.5 text-center lg:text-left">
                  <span className="text-4xl font-semibold tracking-tight text-gradient">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted">{stat.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            How it works
          </span>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Four steps between a used phone and your doorstep
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {process.map((item) => (
            <StaggerItem key={item.step} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-3xl glass p-7">
                <span className="text-3xl font-semibold text-gradient">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] glass p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" aria-hidden="true" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Ready when you are
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Browse 14 carefully chosen phones, or tell us what you need and we will recommend
                one. No commission, no upsell.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/shop">Browse phones</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Ask a question</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
