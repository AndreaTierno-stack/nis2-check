# ADR 0004 — Collisione dell'acronimo "CER": vincolo di copy

- **Stato:** accettato; descrizione del D.Lgs. 134/2024 superata da ADR 0015 (2026-10-28)
- **Data:** 2026-07-02
- **Ambito:** copy di verdetto e signal (settore energia)

> **Nota di superamento (2026-10-28, corpus 0.6.0).** La descrizione dei soggetti
> critici come "regime parallelo e distinto dal NIS2", il cui rientro lo strumento
> "non valuta", è superata da ADR 0015: l'individuazione come soggetto critico ai sensi
> del D.Lgs. 134/2024 porta il soggetto in ambito NIS come essenziale, a prescindere
> dalla dimensione (art. 3 c. 5 lett. a) e art. 6 c. 1 lett. b) D.Lgs. 138/2024; FAQ
> AMB.NO.1). `out_of_scope_mvp.cer_dlgs_134_2024` è rimosso e `cer_signal` non è più un
> segnaposto. Il vincolo di naming di questo ADR resta in vigore.

## Contesto

Nel settore energia l'acronimo "CER" è ambiguo tra due istituti giuridici
distinti e non correlati:

1. **Critical Entities Resilience** (D.Lgs. 134/2024) — disciplina sui soggetti
   critici, sicurezza **fisica**, regime parallelo e distinto dal NIS2.
2. **Comunità Energetiche Rinnovabili** (CACER) — istituto del settore energetico.

Usare "CER" nudo nel copy del verdetto o dei signal rischia di far confondere
all'utente il regime dei soggetti critici con le comunità energetiche, o entrambi
con il NIS2 (sicurezza cyber).

## Decisione

**Mai usare l'acronimo nudo "CER" nel copy del verdetto o dei signal.** Rese
obbligatorie:

- D.Lgs. 134/2024 → "soggetti critici (D.Lgs. 134/2024)" oppure
  "Critical Entities Resilience".
- Comunità energetiche → "comunità energetiche rinnovabili (CACER)".

Implementazione:
- Riscritto `base_reasoning_trace` di `cer_signal` e la
  `scope_evolution_note` di `out_of_scope_mvp.cer_dlgs_134_2024` in
  `sectors__energia_elettrica.yaml` con le rese estese.
- Aggiunto blocco `copy_constraints` (`id: cer_cacer_disambiguation`) nel settore
  energia, con `applies_to: [cer_signal, "out_of_scope_mvp.cer_dlgs_134_2024"]`.

## Conseguenze

- Il vincolo è dichiarato nel corpus (macchine e revisori lo vedono), non solo
  nel testo.
- `cer_signal` resta `status: placeholder_v0_2`: segnala il regime parallelo per
  non confondere, non valuta il rientro tra i soggetti critici.

## Fonti

- `dlgs_134_2024` (soggetti critici / Critical Entities Resilience)
