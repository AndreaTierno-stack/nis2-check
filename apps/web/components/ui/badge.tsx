import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Pill badge, normal lowercase text: never small caps.
const badgeVariants = cva("inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-accent-soft text-accent",
      warn: "bg-warn-soft text-warn-text",
      muted: "bg-ground text-text-soft",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
