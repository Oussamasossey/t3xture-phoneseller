import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-32 text-center">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Error 404</p>
        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          This page went <span className="text-gradient">off sale</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
          The link may be out of date, or the product you were looking at has sold out and been
          retired.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">Back home</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/shop">Browse phones</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
