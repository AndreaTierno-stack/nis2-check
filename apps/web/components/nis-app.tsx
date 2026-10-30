"use client";

import { useEffect, useMemo, useState } from "react";
import { InvalidAnswersError, evaluate, type AnswerIssue, type Verdict } from "@nis2-check/engine";
import { ClickWrap } from "@/components/click-wrap";
import { Columns } from "@/components/shell/columns";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { VerdictMain } from "@/components/verdict/verdict-main";
import { VerdictSide } from "@/components/verdict/verdict-side";
import { InvalidAnswers } from "@/components/wizard/invalid-answers";
import { QuestionPage } from "@/components/wizard/question-page";
import { SectorPage } from "@/components/wizard/sector-page";
import type { WebCorpus } from "@/lib/corpus.server";
import { DISCLAIMER_ENTRY } from "@/lib/links";
import { EMPTY, clearSession, readSession, writeSession, type Session } from "@/lib/session";
import { pruneAnswers, sectorContext, visibleQuestions } from "@/lib/wizard";

type Outcome = { verdict: Verdict } | { issues: readonly AnswerIssue[] };

function run(corpus: WebCorpus, sectorId: string, answers: Session["answers"]): Outcome {
  try {
    return { verdict: evaluate({ sectorId, answers }, corpus) };
  } catch (e) {
    if (e instanceof InvalidAnswersError) return { issues: e.issues };
    throw e;
  }
}

/** The whole tool, client-side: click-wrap, sector, one question per screen, verdict. */
export function NisApp({ corpus }: { corpus: WebCorpus }) {
  const [accepted, setAccepted] = useState(false);
  const [session, setSession] = useState<Session>(EMPTY);
  const disclaimer = Object.values(corpus.exceptions)
    .flatMap((f) => f.exceptions)
    .find((e) => e.id === DISCLAIMER_ENTRY);
  if (!disclaimer) throw new Error(`catalog entry ${DISCLAIMER_ENTRY} missing`);

  useEffect(() => setSession(readSession()), []);
  const update = (next: Session) => {
    setSession(next);
    writeSession(next);
  };
  const restart = () => {
    clearSession();
    setSession(EMPTY);
  };

  const ctx = useMemo(() => (session.sectorId ? sectorContext(corpus, session.sectorId) : undefined), [corpus, session.sectorId]);
  const visible = useMemo(() => (ctx ? visibleQuestions(ctx, session.answers) : []), [ctx, session.answers]);
  const outcome = useMemo(
    () => (ctx && session.step === "verdict" && session.sectorId ? run(corpus, session.sectorId, session.answers) : undefined),
    [corpus, ctx, session.step, session.sectorId, session.answers],
  );

  const goTo = (id: string) => update({ ...session, step: "questions", current: id });
  let main: React.ReactNode = null;
  let side: React.ReactNode = undefined;

  if (!accepted) {
    main = <ClickWrap title={disclaimer.title} text={disclaimer.description} onAccept={() => setAccepted(true)} />;
  } else if (session.step === "sector" || !ctx || !session.sectorId) {
    main = <SectorPage corpus={corpus} onChoose={(sectorId) => update({ step: "questions", sectorId, answers: {} })} />;
  } else if (session.step === "questions") {
    const index = Math.max(0, visible.findIndex((q) => q.id === session.current));
    const question = visible[index];
    if (question) {
      main = (
        <QuestionPage
          key={question.id}
          question={question}
          index={index}
          total={visible.length}
          answers={session.answers}
          isLast={index === visible.length - 1}
          onAnswer={(value) => update({ ...session, current: question.id, answers: pruneAnswers(ctx, { ...session.answers, [question.id]: value }) })}
          onBack={() => (index === 0 ? update({ ...session, step: "sector" }) : update({ ...session, current: visible[index - 1]!.id }))}
          onNext={() => {
            // the list is recomputed with the new answer: the next question may have just appeared
            const next = visibleQuestions(ctx, session.answers);
            const at = next.findIndex((q) => q.id === question.id);
            const following = next[at + 1];
            update(following ? { ...session, current: following.id } : { ...session, step: "verdict" });
          }}
        />
      );
    }
  } else if (outcome && "issues" in outcome) {
    main = <InvalidAnswers ctx={ctx} issues={outcome.issues} onGoTo={goTo} />;
  } else if (outcome) {
    const props = { corpus, ctx, answers: session.answers, verdict: outcome.verdict, onEdit: goTo };
    main = <VerdictMain {...props} />;
    side = <VerdictSide {...props} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header step={accepted ? session.step : null} onRestart={accepted ? restart : undefined} />
      <main className="flex-1">
        <Columns main={main} side={side} />
      </main>
      <Footer disclaimer={disclaimer.description} />
    </div>
  );
}
