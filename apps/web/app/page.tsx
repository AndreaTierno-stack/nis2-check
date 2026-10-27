import { ClickWrap } from "@/components/click-wrap";

/** Placeholder home: disclaimer + blocking click-wrap. Static shell, no data leaves the browser. */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Pre-screening dell&apos;ambito NIS2 italiano</h1>
        <p className="text-sm text-muted-foreground">Strumento informativo open source · in sviluppo</p>
      </header>

      <section className="space-y-3 rounded-md bg-muted p-6 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Placeholder — testo soggetto a review legale
        </p>
        <p>
          [PLACEHOLDER] Questo strumento offre un esito preliminare e probabilistico sulla possibile
          applicabilità della disciplina NIS2 italiana (D.Lgs. 138/2024), sulla base degli input forniti.
          Non costituisce consulenza legale né attività di compliance, audit o certificazione: la verifica
          con un consulente qualificato è obbligatoria.
        </p>
        <p>
          [PLACEHOLDER] Le risposte restano nel browser: nessun dato viene inviato a server, nessuna
          analisi di utilizzo, nessuna persistenza.
        </p>
      </section>

      <ClickWrap />
    </main>
  );
}
