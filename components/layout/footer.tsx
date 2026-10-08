import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons/brand-icons";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All phones" },
      { href: "/shop?q=iphone", label: "iPhone" },
      { href: "/shop?q=galaxy", label: "Galaxy" },
      { href: "/shop?q=pixel", label: "Pixel" },
      { href: "/shop?q=xiaomi", label: "Xiaomi" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/about", label: "Shipping & returns" },
      { href: "/about", label: "Warranty" },
      { href: "/about", label: "Trade-in programme" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about", label: "Sustainability" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Press" },
    ],
  },
];

const socials = [
  { href: "https://twitter.com", label: "X (Twitter)", Icon: XIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://youtube.com", label: "YouTube", Icon: YouTubeIcon },
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
];

const assurances = [
  { Icon: Truck, label: "Free 2-day shipping" },
  { Icon: RotateCcw, label: "30-day returns" },
  { Icon: ShieldCheck, label: "24-month warranty" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-surface/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="PhoneHub home">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 font-bold text-white">
                P
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-300" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Phone<span className="text-gradient">Hub</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Premium smartphones, rigorously tested and fairly priced. New flagships and certified
              refurbished devices with a real warranty, shipped in 48 hours.
            </p>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Get launch-day deals
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          {assurances.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} PhoneHub. All rights reserved. · Demo Website · Made by T3xture</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="transition-colors hover:text-accent">
              Privacy
            </Link>
            <Link href="/about" className="transition-colors hover:text-accent">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-accent">
              Cookies
            </Link>
            <span className="rounded-md border border-white/10 px-2 py-1 font-medium text-foreground/70">
              VISA · MC · AMEX · PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
