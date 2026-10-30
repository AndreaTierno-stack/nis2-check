import * as React from "react";

import { cn } from "@/lib/utils";

/** Horizontal rule with the border token (shadcn Separator without the radix dependency). */
function Separator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("h-px w-full shrink-0 border-0 bg-border", className)} {...props} />;
}

export { Separator };
