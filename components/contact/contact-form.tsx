"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const topics = ["Order status", "Trade-in quote", "Warranty claim", "Something else"];

export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email address does not look right.");
      return;
    }
    setError(null);
    setSent(true);
    form.reset();
  };

  if (sent) {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl glass px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <Check className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Message sent</h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Thanks for reaching out. A PhoneHub specialist replies within 4 minutes during opening
            hours.
          </p>
        </div>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5 rounded-3xl glass p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Alex Morgan"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="alex@example.com"
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-foreground">What is it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                topic === item
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-white/12 bg-white/[0.03] text-muted hover:border-white/30 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you need. An order number helps if you have one."
          className="min-h-32 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        <Send className="h-4 w-4" /> Send message
      </Button>
    </form>
  );
}
