"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { brands, storageOptions, type Brand, type Condition } from "@/data/products";
import { priceBounds, type ShopFilters } from "@/lib/catalog";
import { formatPrice, formatStorage } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  filters: ShopFilters;
  onChange: (patch: Partial<ShopFilters>) => void;
  onReset: () => void;
  counts: { brands: Record<string, number>; conditions: Record<string, number> };
  activeCount: number;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="py-5">
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 text-left">
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
          {title}
        </span>
        <ChevronDown className="h-4 w-4 text-muted transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsible-content overflow-hidden">
        <div className="pt-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CheckRow({
  id,
  label,
  count,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        aria-label={label}
      />
      <Label htmlFor={id} className="flex flex-1 cursor-pointer items-center justify-between gap-2 text-sm font-normal text-muted">
        <span className="transition-colors group-hover:text-foreground">{label}</span>
        {typeof count === "number" && <span className="text-xs text-muted/70">{count}</span>}
      </Label>
    </div>
  );
}

export function FilterSidebar({ filters, onChange, onReset, counts, activeCount }: Props) {
  const [open, setOpen] = useState(false);

  const toggleIn = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const body = useMemo(
    () => (
      <div className="flex flex-col divide-y divide-white/10">
        <Section title="Brand">
          <div className="flex flex-col">
            {brands.map((brand) => (
              <CheckRow
                key={brand}
                id={`brand-${brand}`}
                label={brand}
                count={counts.brands[brand] ?? 0}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() =>
                  onChange({ brands: toggleIn<Brand>(filters.brands, brand) })
                }
              />
            ))}
          </div>
        </Section>

        <Section title="Condition">
          <div className="flex flex-col">
            {(["new", "refurbished"] as Condition[]).map((condition) => (
              <CheckRow
                key={condition}
                id={`condition-${condition}`}
                label={condition === "new" ? "Brand new" : "Refurbished"}
                count={counts.conditions[condition] ?? 0}
                checked={filters.conditions.includes(condition)}
                onCheckedChange={() =>
                  onChange({ conditions: toggleIn<Condition>(filters.conditions, condition) })
                }
              />
            ))}
          </div>
        </Section>

        <Section title="Price">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-foreground">
                {formatPrice(filters.minPrice)}
              </span>
              <span className="text-muted">to</span>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-foreground">
                {formatPrice(filters.maxPrice)}
              </span>
            </div>
            <Slider
              min={priceBounds.min}
              max={priceBounds.max}
              step={10}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) =>
                onChange({ minPrice: min ?? priceBounds.min, maxPrice: max ?? priceBounds.max })
              }
              aria-label="Price range"
            />
            <p className="text-xs text-muted">
              {formatPrice(priceBounds.min)} – {formatPrice(priceBounds.max)} across the catalogue
            </p>
          </div>
        </Section>

        <Section title="Storage">
          <div className="flex flex-wrap gap-2">
            {storageOptions.map((size) => {
              const active = filters.storages.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ storages: toggleIn<number>(filters.storages, size) })}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-white/12 bg-white/[0.03] text-muted hover:border-white/30 hover:text-foreground"
                  )}
                >
                  {formatStorage(size)}
                </button>
              );
            })}
          </div>
        </Section>
      </div>
    ),
    [filters, onChange, counts]
  );

  return (
    <div className="lg:sticky lg:top-24">
      <div className="hidden rounded-3xl glass p-5 lg:block">
        <div className="flex items-center justify-between gap-3 pb-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-accent" /> Filters
          </span>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            >
              Clear all <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <Separator />
        {body}
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-filters"
          className="flex w-full items-center justify-between rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-foreground"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-accent" /> Filters
            {activeCount > 0 && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] text-accent">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", open && "rotate-180")}
          />
        </button>

        {open && (
          <div
            id="mobile-filters"
            className="mt-3 max-h-[70vh] overflow-y-auto rounded-3xl glass p-5"
          >
            {body}
            <div className="flex gap-2 pt-4">
              <Button className="flex-1" onClick={() => setOpen(false)}>
                Show results
              </Button>
              <Button variant="ghost" onClick={onReset}>
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
