import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatReviews } from "@/lib/format";

export function Rating({
  value,
  reviews,
  className,
  showValue = true,
}: {
  value: number;
  reviews?: number;
  className?: string;
  showValue?: boolean;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div
      className={cn("flex items-center gap-1.5 text-xs", className)}
      role="img"
      aria-label={`Rated ${value} out of 5${reviews ? ` from ${reviews} reviews` : ""}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) {
            return <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />;
          }
          if (i === full && hasHalf) {
            return (
              <span key={i} className="relative inline-flex">
                <Star className="h-3.5 w-3.5 text-white/15" />
                <StarHalf className="absolute inset-0 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              </span>
            );
          }
          return <Star key={i} className="h-3.5 w-3.5 text-white/15" />;
        })}
      </div>
      {showValue && <span className="font-medium text-foreground">{value.toFixed(1)}</span>}
      {typeof reviews === "number" && (
        <span className="text-muted">({formatReviews(reviews)})</span>
      )}
    </div>
  );
}
