"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
      }}
      className="flex w-full flex-col gap-2.5 sm:flex-row"
      aria-label="Newsletter signup"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setDone(false);
        }}
        placeholder="you@example.com"
        className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
      />
      <button
        type="submit"
        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        {done ? (
          <>
            <Check className="h-4 w-4" /> Subscribed
          </>
        ) : (
          <>
            Subscribe <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="sr-only" role="status">
        {done ? "Thanks, you are on the list." : ""}
      </p>
    </form>
  );
}
