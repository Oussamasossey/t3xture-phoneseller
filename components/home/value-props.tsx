import Link from "next/link";
import { ArrowRight, Headphones, PackageCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";

const values = [
  {
    icon: PackageCheck,
    title: "42-point diagnostic",
    body: "Every device, new or refurbished, is tested on cameras, radios, battery health and ports before it is listed.",
  },
  {
    icon: Wallet,
    title: "Honest pricing",
    body: "One price, no hidden activation fees. If the same phone is cheaper elsewhere we match it for seven days.",
  },
  {
    icon: Headphones,
    title: "Humans on support",
    body: "Talk to a technician, not a script. Average first response time is under 4 minutes, seven days a week.",
  },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Why PhoneHub
        </span>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Built around the boring parts, done properly
        </h2>
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <StaggerItem key={value.title} className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-3xl glass p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/25 to-indigo-600/25 text-accent">
                <value.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{value.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10 flex justify-center">
        <Button size="lg" variant="outline" asChild>
          <Link href="/about">
            More about how we work <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
