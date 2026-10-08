const items = [
  "Free next-day delivery",
  "Trade-in up to $620",
  "Certified refurbished: save 40%",
  "24-month warranty on every phone",
  "42-point diagnostic on all devices",
  "Price-match promise",
];

export function MarqueeBanner() {
  const row = [...items, ...items];

  return (
    <section
      aria-label="Store announcements"
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-blue-700/25 via-sky-600/20 to-indigo-700/25"
    >
      <div className="mask-fade-x overflow-hidden py-4">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10 text-sm font-medium">
              <span className="text-foreground/90">{item}</span>
              <span className="text-accent" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
