"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buildSources, type Sources } from "@/lib/sources";
import { cn } from "@/lib/utils";
import { SCALE, facts, notices, resolutionStep, scalePosition, signalItems, tone, traceRows } from "@/lib/verdict";
import { copy } from "@/src/copy.it";
import { Cite } from "./cite";
import { SourcesPanel } from "./sources-panel";
import { PrintAnswers, PrintCover, PrintFrame, PrintLimits, PrintTechnicalHeading } from "./print";
import type { VerdictProps } from "./types";

const TONE = {
  accent: "bg-accent text-surface",
  warn: "bg-warn text-text",
  muted: "bg-text-muted text-surface",
} as const;

const STATUS_BADGE = { segnalato: "warn", gestito: "default", non_gestito: "muted" } as const;

/** Outcome phrase from the corpus, with the qualification in bold green. */
function Phrase({ text, qualifica }: { text: string; qualifica?: string }) {
  if (!qualifica) return <>{text}</>;
  const parts = text.split(new RegExp(`(\\b${qualifica}\\b)`, "i"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === qualifica.toLowerCase() ? (
          <strong key={i} className="font-semibold text-accent">
            {p}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

function OutcomePanel({ props, sources, open, onToggle }: { props: VerdictProps; sources: Sources; open: boolean; onToggle: () => void }) {
  const { verdict, ctx, answers, corpus } = props;
  const resolution = resolutionStep(verdict);
  const f = facts(verdict, ctx, answers, corpus);
  const position = scalePosition(verdict);
  return (
    <Card className="overflow-hidden" data-testid="outcome" data-outcome={verdict.outcome} data-mode={verdict.assessmentMode}>
      <div className={cn("space-y-4 p-6", TONE[tone(verdict)])}>
        <h1 className="text-xl font-semibold">{copy.verdict.title}</h1>
        <ol className="flex flex-wrap gap-2" aria-label={copy.verdict.title}>
          {SCALE.map((s, i) => (
            <li
              key={s}
              aria-current={i === position ? "true" : undefined}
              className={cn("rounded-full px-4 py-1 text-sm", i === position ? "bg-surface font-semibold text-text" : "opacity-80")}
            >
              {copy.verdict.scale[s]}
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-4 p-6">
        {resolution.corpusText && (
          <p className="text-lg leading-relaxed">
            <Phrase text={resolution.corpusText} {...(verdict.qualifica ? { qualifica: verdict.qualifica.value } : {})} />{" "}
            <Cite ids={resolution.citations} sources={sources} />
          </p>
        )}
        <p className="font-semibold">{copy.verdict.advisor}</p>
        <Separator />
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <dt className="text-sm text-text-muted">{copy.verdict.facts.tipologia}</dt>
            <dd className="font-semibold">{f.tipologia}</dd>
          </div>
          <div>
            <dt className="text-sm text-text-muted">{copy.verdict.facts.qualifica}</dt>
            <dd className="font-semibold" data-testid="qualifica">
              {f.qualifica}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-text-muted">{copy.verdict.facts.regimi}</dt>
            <dd className="font-semibold" data-testid="regimi">
              {f.regimi.join("; ")}
            </dd>
          </div>
        </dl>
        <Button variant="link" className="h-auto px-0 print:hidden" onClick={onToggle} aria-expanded={open} aria-controls="come-calcolato">
          {open ? copy.verdict.hideTrace : copy.verdict.showTrace}
        </Button>
      </div>
    </Card>
  );
}

function NoticesPanel({ props, sources }: { props: VerdictProps; sources: Sources }) {
  const list = notices(props.verdict, props.corpus);
  if (!list.length) return null;
  return (
    <section className="space-y-3" aria-labelledby="punti-title">
      <h2 id="punti-title" className="text-lg font-semibold">
        {copy.verdict.noticesTitle(list.length)}
      </h2>
      <Card className="divide-y divide-border">
        {list.map((n) => (
          <div key={n.id} className="print-avoid-break space-y-2 p-5" data-testid="notice" data-notice={n.id}>
            <div className="flex flex-wrap items-center gap-3">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-warn" />
              <h3 className="font-semibold">{n.title}</h3>
              <Badge variant={STATUS_BADGE[n.status]}>{copy.verdict.status[n.status]}</Badge>
            </div>
            <p className="text-sm text-text-soft">
              {n.description} <Cite ids={n.citations} sources={sources} />
            </p>
          </div>
        ))}
      </Card>
    </section>
  );
}

/** Signals of the Verdict, with their corpus text: shown on screen and printed (review 2026-11-02, F04). */
function SignalsPanel({ props, sources }: { props: VerdictProps; sources: Sources }) {
  const list = signalItems(props.verdict, props.corpus, props.ctx.sectorId);
  if (!list.length) return null;
  return (
    <section className="space-y-3" aria-labelledby="segnalazioni-title">
      <div className="print-keep-with-next space-y-1">
        <h2 id="segnalazioni-title" className="text-lg font-semibold">
          {copy.verdict.signalsTitle}
        </h2>
        <p className="text-sm text-text-soft">{copy.verdict.signalsSubtitle}</p>
      </div>
      <Card className="divide-y divide-border">
        {list.map((s) => (
          <p key={s.id} className="print-avoid-break p-5 text-sm text-text-soft" data-testid="signal" data-signal={s.id}>
            {s.text} <Cite ids={s.citations} sources={sources} />
          </p>
        ))}
      </Card>
    </section>
  );
}

function TracePanel({ props, sources, className }: { props: VerdictProps; sources: Sources; className?: string }) {
  const rows = traceRows(props.verdict);
  const resolution = resolutionStep(props.verdict);
  const conflict = resolution.result === "conflict";
  return (
    <section id="come-calcolato" className={cn("space-y-3", className)} aria-labelledby="trace-title">
      <h2 id="trace-title" className="text-lg font-semibold">
        {copy.verdict.traceTitle}
      </h2>
      <Card className="space-y-2 p-3">
        {rows.map((r) =>
          r.decided ? (
            <div key={r.stage} className="print-avoid-break space-y-2 rounded-row bg-accent-soft p-4" data-testid="trace-decided" data-stage={r.stage}>
              <h3 className="font-semibold">{copy.verdict.stages[r.stage]}</h3>
              {r.texts.map((t, i) => (
                <p key={i} className="text-sm">
                  {t.text} <Cite ids={t.citations} sources={sources} onSoft />
                </p>
              ))}
            </div>
          ) : (
            <p key={r.stage} className="rounded-row px-4 py-3 text-sm" data-stage={r.stage}>
              <span className="font-semibold">{copy.verdict.stages[r.stage]}:</span> <span className="text-text-soft">{r.reason}</span>
            </p>
          ),
        )}
        {conflict && resolution.corpusText && (
          <div className="space-y-2 rounded-row bg-accent-soft p-4" data-testid="trace-conflict">
            <p className="text-sm font-semibold">{copy.verdict.reasons.conflict}</p>
            <p className="text-sm">
              {resolution.corpusText} <Cite ids={resolution.citations} sources={sources} onSoft />
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}

/**
 * Main column of the verdict page: banner, outcome, notices, trace (folded), sources. In print
 * (ADR 0018) the same panels, framed by the repeated header and foot, with the cover, the
 * answers given, the trace unfolded and the limits of the path.
 */
export function VerdictMain(props: VerdictProps) {
  const [open, setOpen] = useState(false);
  const sources = buildSources(props.verdict.citations, props.corpus);
  return (
    <PrintFrame props={props}>
      <PrintCover props={props} />
      <p className="rounded-full bg-warn-soft px-5 py-3 text-sm font-medium text-warn-text">{copy.verdict.banner}</p>
      <OutcomePanel props={props} sources={sources} open={open} onToggle={() => setOpen((o) => !o)} />
      <NoticesPanel props={props} sources={sources} />
      <SignalsPanel props={props} sources={sources} />
      <PrintAnswers props={props} />
      <PrintTechnicalHeading />
      <TracePanel props={props} sources={sources} className={open ? undefined : "hidden print:block"} />
      <SourcesPanel sources={sources} title={copy.verdict.sourcesTitle} />
      <PrintLimits props={props} sources={sources} />
    </PrintFrame>
  );
}

export { TracePanel };
