import type { Metadata } from "next";
import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PhoneHub by email, phone or live chat. Average first reply in under 4 minutes, seven days a week.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact PhoneHub",
    description: "Email, phone or live chat. Average first reply in under 4 minutes.",
    url: "/contact",
  },
};

const channels = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@phonehub.demo",
    detail: "Replies within 4 minutes, 7 days a week",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+31 (0)10 555 0184",
    detail: "Mon–Sat, 09:00–19:00 CET",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    value: "Bottom-right bubble",
    detail: "Instant, staffed by technicians",
  },
  {
    icon: MapPin,
    title: "Studio",
    value: "Scheepmakershaven 12, Rotterdam",
    detail: "Collection by appointment",
  },
  {
    icon: Clock,
    title: "Opening hours",
    value: "Mon–Sat · 09:00–19:00",
    detail: "Sunday: chat only",
  },
];

const faqs = [
  {
    q: "Do you ship outside the EU?",
    a: "We ship to the EU and UK. Duties are pre-paid for UK orders, so nothing is owed on delivery.",
  },
  {
    q: "What does “certified refurbished” include?",
    a: "A 42-point diagnostic, a battery at 90% health or better, cosmetic grade A or B, and our own 12-month warranty.",
  },
  {
    q: "Can I collect an order in person?",
    a: "Yes, pick “studio collection” at checkout and we will have it boxed and tested within 2 hours.",
  },
  {
    q: "How does trade-in work?",
    a: "Send us the model and condition, get a binding quote in 2 minutes, and we ship a prepaid label. Credit is applied when your device passes inspection.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a human"
        description="Questions about a spec sheet, a trade-in or an order? Our technicians answer in under 4 minutes."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-5">
            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((channel) => (
                <StaggerItem key={channel.title}>
                  <div className="flex items-start gap-4 rounded-3xl glass p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <channel.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {channel.title}
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-foreground">
                        {channel.value}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{channel.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Response promise
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Median first reply last week: <span className="font-medium text-foreground">3m 42s</span>.
                Complex warranty claims are resolved within one business day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <Reveal className="flex flex-col gap-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Frequently asked
          </h2>
          <p className="text-sm text-muted">Quick answers before you write in.</p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <Collapsible className="rounded-2xl glass px-5 py-4">
                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
                  <span className="text-sm font-medium text-foreground sm:text-base">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="collapsible-content overflow-hidden">
                  <p className="pt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
                </CollapsibleContent>
              </Collapsible>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
