import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Step } from "@/lib/session";
import { copy } from "@/src/copy.it";

const STEPS: Step[] = ["sector", "questions", "verdict"];
const LABEL: Record<Step, string> = { sector: copy.steps.sector, questions: copy.steps.questions, verdict: copy.steps.verdict };

export function Header({ step, onRestart, backHref }: { step: Step | null; onRestart?: () => void; backHref?: string }) {
  return (
    <header className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-7 w-7 rounded-full bg-accent" />
          <span className="text-base font-bold">{copy.brand}</span>
        </div>
        {step && (
          <ol className="flex flex-1 flex-wrap justify-center gap-2" aria-label={copy.steps.questions}>
            {STEPS.map((s, i) => {
              const current = s === step;
              return (
                <li
                  key={s}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-1 text-sm",
                    current ? "bg-accent-soft font-semibold text-accent" : "text-text-muted",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                      current ? "bg-accent text-surface" : "border border-border",
                    )}
                  >
                    {i + 1}
                  </span>
                  {LABEL[s]}
                </li>
              );
            })}
          </ol>
        )}
        {backHref && (
          <Button asChild variant="outline" size="bar" className="ml-auto">
            <a href={backHref}>{copy.limits.back}</a>
          </Button>
        )}
        {onRestart && (
          <Button variant="outline" size="bar" className="ml-auto" onClick={onRestart}>
            {copy.newEvaluation}
          </Button>
        )}
      </div>
    </header>
  );
}
