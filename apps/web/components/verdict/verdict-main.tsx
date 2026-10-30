import { Card } from "@/components/ui/card";
import { copy } from "@/src/copy.it";
import type { VerdictProps } from "./types";

/** Placeholder of the verdict page (S4.1 block 2); the full page comes with block 3. */
export function VerdictMain({ verdict }: VerdictProps) {
  return (
    <Card className="space-y-2 p-6">
      <h1 className="text-xl font-semibold">{copy.verdict.title}</h1>
      <p>{copy.verdict.scale[verdict.outcome]}</p>
    </Card>
  );
}
