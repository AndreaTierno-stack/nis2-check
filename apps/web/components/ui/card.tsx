import * as React from "react";

import { cn } from "@/lib/utils";

/** White panel, 20px radius, no shadow. Never nested in another panel. */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-panel border border-border bg-surface text-text", className)} {...props} />
));
Card.displayName = "Card";

export { Card };
