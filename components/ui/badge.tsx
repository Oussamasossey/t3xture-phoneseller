import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-accent/40 bg-accent/10 text-sky-300",
        success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
        neutral: "border-white/15 bg-white/[0.06] text-muted",
        gradient:
          "border-transparent bg-gradient-to-r from-sky-500/25 to-indigo-500/25 text-sky-200",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
