import type { WizardQuestion } from "@nis2-check/engine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { isAnswered, optionsOf, questionNode, type AnswerMap } from "@/lib/wizard";
import { copy } from "@/src/copy.it";

interface Props {
  question: WizardQuestion;
  index: number;
  total: number;
  answers: AnswerMap;
  onAnswer: (value: string | string[]) => void;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
}

/**
 * One question per screen, texts from the corpus: binary and multiple-choice options
 * as selectable pills, single choice as radio rows.
 */
export function QuestionPage({ question, index, total, answers, onAnswer, onBack, onNext, isLast }: Props) {
  const node = questionNode(question);
  const value = answers[question.id];
  const options = optionsOf(question, copy.questions.yes, copy.questions.no);
  const multi = question.kind === "multi_select";
  const pills = multi || question.kind === "binary" || question.kind === "binary_with_conditional_followup";
  const selected = (id: string) => (Array.isArray(value) ? value.includes(id) : value === id);
  const toggle = (id: string) => {
    if (!multi) return onAnswer(id);
    const list = Array.isArray(value) ? value : [];
    onAnswer(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  return (
    <Card className="space-y-6 p-6" data-testid="question" data-question={question.id}>
      <p className="text-sm text-text-muted">{copy.questions.progress(index + 1, total)}</p>
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">{node.label_it}</legend>
        {node.help_text_it && <p className="whitespace-pre-line text-sm text-text-soft">{node.help_text_it.trim()}</p>}
        {question.optional && <p className="text-sm text-text-muted">{copy.questions.optional}</p>}
        {pills ? (
          <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={selected(o.id)}
                data-option={o.id}
                onClick={() => toggle(o.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-left text-sm transition-colors",
                  selected(o.id) ? "border-accent bg-accent text-surface" : "border-border bg-surface hover:bg-accent-soft",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2" role="radiogroup">
            {options.map((o) => (
              <label
                key={o.id}
                data-option={o.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-row border px-4 py-3 text-sm transition-colors",
                  selected(o.id) ? "border-accent bg-accent-soft" : "border-border hover:bg-accent-soft",
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={o.id}
                  checked={selected(o.id)}
                  onChange={() => onAnswer(o.id)}
                  className="mt-0.5 accent-accent"
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>
      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          {copy.questions.back}
        </Button>
        <Button onClick={onNext} disabled={!isAnswered(question, answers)} data-testid="next">
          {isLast ? copy.questions.finish : copy.questions.next}
        </Button>
      </div>
    </Card>
  );
}
