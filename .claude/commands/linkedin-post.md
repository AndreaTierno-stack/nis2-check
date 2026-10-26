---
description: Genera una bozza di articolo LinkedIn in stile build-in-public coerente con la voce del progetto NIS2 Tool
---

# /linkedin-post

Workflow per scrivere una bozza di articolo LinkedIn legato al NIS2 Tool, mantenendo coerenza di voce, audience e calendario editoriale.

## Quando usare questo comando

- Quando l'utente sta per rilasciare una milestone (MVP, nuovo settore, regime correlato).
- Quando l'utente vuole scrivere un approfondimento normativo che funge da magnete per il tool.
- Quando l'utente vuole ricapitolare l'avanzamento del progetto come contenuto build-in-public.

## Procedura

1. **Identifica il tipo di post.** Chiedi all'utente:
   - **Annuncio** (lancio MVP, nuova feature, nuovo settore).
   - **Approfondimento normativo** (analisi di un'eccezione, di un regime correlato, di un caso ambiguo).
   - **Lessons learned tecnico** (come abbiamo modellato il decision tree, come gestiamo l'aggiornamento del corpus).
   - **Riflessione strategica** (sul mercato GRC italiano, sul ruolo dell'open source nella compliance).

2. **Consulta la skill `nis2-content-author`** per la voice guide, il pattern strutturale per ogni tipo di post, e la lista delle "trappole stilistiche" da evitare.

3. **Raccogli gli ingredienti.** A seconda del tipo:
   - Per annunci: link al rilascio (commit, tag, PR), screenshot, demo, numeri raggiunti (stelle, issue chiuse).
   - Per approfondimenti: riferimenti normativi precisi dalla LLM Wiki o dalla Project Knowledge.
   - Per lessons learned: il problema concreto affrontato, la soluzione adottata, le alternative scartate e perché.
   - Per riflessioni: il dato o l'osservazione di partenza, la tesi, le implicazioni.

4. **Genera la bozza.** Lunghezza tipica: 350-700 parole per LinkedIn (oltre LinkedIn tronca). Struttura:
   - **Hook (prime 1-2 righe)**: l'unico testo visibile prima del "vedi altro". Deve incuriosire o disturbare. No clickbait.
   - **Contesto (1 paragrafo)**: cosa stai costruendo, perché.
   - **Cuore del post (2-4 paragrafi)**: la sostanza.
   - **CTA leggera (1-2 righe)**: link al repo, invito a commentare, domanda aperta. Non vendere.
   - **Hashtag (massimo 5)**: italiani, settoriali. Es. `#NIS2 #Cybersecurity #GRC #OpenSource #ComplianceItalia`.

5. **Verifica i vincoli legali.** Se il post descrive il tool, deve essere chiaro che:
   - Il tool non costituisce parere legale.
   - I verdetti non sono categorici.
   - L'utente è responsabile della verifica con consulente qualificato.

6. **Proponi due varianti di hook** all'utente, così può scegliere quello più efficace.

7. **Suggerisci timing.** Mai pubblicare il giorno stesso del rilascio se non hai prima testato la milestone con almeno una persona reale. Best practice: pubblica il giorno dopo, così hai tempo di sistemare bug emersi all'ultimo.

## Vincoli stilistici

- **No emoji** o massimo uno strategico nel hook.
- **No "exciting", "thrilled", "I'm proud"** in italiano traducibili come "fiero di annunciare", "emozionato di condividere". Sono i tic dell'audience che vuoi evitare.
- **No "tree" di emoji o icone all'inizio dei paragrafi** (✅ ❌ 🚀). Riducono la credibilità tecnica.
- **Tono diretto, asciutto, leggermente critico**. L'audience target apprezza chi non si vende.
- **Riferimenti normativi inseriti in modo naturale**, non come citazione legale fuori contesto.

## Calendario editoriale di riferimento

| # | Periodo | Tipo | Tema |
|---|---------|------|------|
| 1 | Settimana 1-2 | Annuncio | "Sto costruendo un tool open source per la verifica del rientro NIS2" |
| 2 | Settimana 5-9 | Annuncio | Rilascio MVP v0.1.0 con 3 settori pilota |
| 3 | Settimana 8-10 | Approfondimento | "Le 5 eccezioni size-blind di NIS2 che le PMI italiane sottovalutano" |
| 4 | Settimana 11-14 | Lessons learned tecnico | "Come abbiamo modellato i 17 settori NIS2 in YAML" |
| 5+ | post-MVP | Variabile | A seconda della trazione e dei feedback ricevuti |

Frequenza: **1 articolo ogni 2-3 settimane**, mai più frequente. L'audience GRC italiana è piccola e qualificata: meglio 1 post sostanzioso che 5 post leggeri.

## Cosa NON fare

- Non ricopiare bullet point dal README. Il post LinkedIn è prosa, non documentazione.
- Non promettere feature che non sono state ancora implementate.
- Non citare numeri di stelle, follower, download se non hai dati reali.
- Non parlare male di competitor per nome (Big4, vendor cyber italiani). Posizionati per quello che fai, non contro qualcuno.
- Non confondere il post con un articolo lungo. Se vuoi scrivere un articolo lungo, usa il formato "Articolo" di LinkedIn (URL diversa, formattazione diversa) e in quel caso vale tutta un'altra struttura.
