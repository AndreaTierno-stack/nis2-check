# ADR 0004 — Collisione dell'acronimo "CER": vincolo di copy

- **Stato:** accettato
- **Data:** 2026-07-02
- **Ambito:** copy di verdetto e signal (settore energia)

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
