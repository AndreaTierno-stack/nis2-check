---
title: Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT
type: synthesis
question: "L'ENISA Technical Implementation Guidance v1.0 risolve le open question (Q1-Q4) della synthesis di coordinamento Reg. UE 2024/2690 ↔ Det. ACN 379907/2025?"
tags: [nis2, enisa-tig, coordinamento-normativo, q-open, follow-up-coordinamento, soft-law, cloud-pilot]
sources: ["[[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26]]", "[[sources/ENISA Mapping Table v1.0 - 2025-06-26]]", "[[sources/Regolamento di esecuzione UE 2024-2690]]", "[[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]", "[[sources/Guida lettura specifiche di base]]"]
scope: nis2_tool
aliases: [Risposta TIG Q1-Q4, TIG vs coordinamento UE-IT]
---

## Premessa

Questo nodo è **follow-up** della [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]]. Esamina le sue 4 open question (Q1-Q4) alla luce della **[[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26|TIG ENISA v1.0]]** del 26/06/2025, guidance interpretativa del [[sources/Regolamento di esecuzione UE 2024-2690|Reg. UE 2024/2690]].

**Vincolo di scope**: il framework giuridico della synthesis di coordinamento (3a + 3c, scarto 3b, primato UE sui conflitti puntuali) **resta valido e non modificato**. Questo nodo **affina o restringe** le open question senza riaprire la tesi normativa.

**Natura della TIG**: documento di **soft-law** (*"not legally binding and is only of an advisory character"*). Le sue indicazioni rispondono operativamente alle Q ma non costituiscono atto vincolante. La conclusione finale resta del consulente GRC e dell'autorità nazionale competente ([[entities/ACN]]).

**Citazioni TIG**: in inglese in blockquote, sotto-15-parole, una per sezione, sempre con paraphrasi italiana accanto.

---

## Q1 — Misure aggiuntive ACN: cumulabili o il Reg. UE pone un *floor* armonizzato?

### [a] Tratta la materia?

**Sì, esplicitamente** — nell'introduzione + disclaimer (TIG pp. 3, 10).

### [b] Cosa dice

Il disclaimer della TIG (p. 3) chiarisce che il documento **non sostituisce** i framework, le guide e gli strumenti forniti dagli Stati membri a livello nazionale, e che gli Stati membri **mantengono la libertà** di determinare il proprio approccio alla vigilanza. Le entità sono tenute a seguire le indicazioni delle autorità nazionali competenti.

> *"Member States retain the freedom to determine their approach to the supervision."* (TIG p. 3 — 12 parole)

Nell'introduzione "Mapping to standards and frameworks" (p. 10), la TIG aggiunge che le entità pertinenti possono usare framework nazionali equivalenti ai requisiti del regolamento per dimostrare la propria compliance — riconoscimento esplicito della coesistenza UE / nazionale.

### [c] Effetto sulla Q1

**Q1 ristretta — sostanza chiusa a favore della tesi 3a (applicazione cumulativa); dettaglio operativo 3c resta sul tavolo per i conflitti puntuali**.

La TIG riconosce esplicitamente:

1. La **coesistenza** tra Reg. UE (livello UE) e framework nazionali (in Italia: [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19|det. ACN 379907/2025]] + [[entities/Framework Nazionale per la Cybersecurity|FNCDP]]).
2. La possibilità per i soggetti di **usare framework nazionali come strumento di compliance equivalente** al Reg. UE.
3. La **libertà degli Stati membri** sulla supervisione.

Questo è il **floor armonizzato** previsto dalla tesi 3a: il Reg. UE pone una soglia minima; gli Stati membri possono integrare con requisiti aggiuntivi e con propri frameworks. La det. ACN 379907/2025 è uno di questi frameworks nazionali.

**Conflitti puntuali (3c)**: la TIG non discute esplicitamente il caso in cui un requisito nazionale entri in conflitto puntuale con il Reg. UE. Per quel caso il principio del primato UE opera *ex lege* (cfr. callout della synthesis di coordinamento, razionale (iv) CGUE Costa/ENEL e Simmenthal). La TIG non lo contraddice; tace.

---

## Q2 — Approvazione del board: regime UE vs IT

### [a] Tratta la materia?

**Sì, esplicitamente** — sezione "Topic-specific policies" (TIG pp. 10-11) + sezione 1.1 GUIDANCE (TIG p. 13).

### [b] Cosa dice

La TIG distingue **nettamente** due categorie di documenti:

1. **Master policy** "on the security of network and information systems" (overarching corporate policy) — punto 1.1 Allegato Reg.: dev'essere approvata dai *management bodies* delle entità (paraphrasi p. 10 + punto 1.1.1 lett. k Allegato Reg.).

2. **Topic-specific policies** (10 elencate dalla TIG: risk management, incident handling, supply chain, security testing, effectiveness assessment, cryptography, access control, privileged accounts, handling of information and assets, removable media) — punto 1.1 GUIDANCE TIG:

   > *"Topic-specific policies are approved by an appropriate level of management."* (TIG § 1.1 GUIDANCE — 11 parole)

"Appropriate level of management" è **inferiore o uguale** ai management bodies — non necessariamente il board.

### Confronto con il regime IT

L'**Appendice C** della [[sources/Guida lettura specifiche di base|guida ACN settembre 2025]] elenca **11 documenti specifici** che richiedono approvazione degli **organi di amministrazione e direttivi** (cfr. [[concepts/Responsabilità degli organi di gestione]]):

| # | Documento (regime IT) | Approvazione UE (TIG) |
|---|---|---|
| 1 | Organizzazione per la sicurezza informatica | (non c'è equivalente diretto — è parte della master policy 1.1, quindi board) |
| 2 | Politiche di sicurezza informatica | **board** sia UE sia IT (master policy) |
| 3 | Valutazione del rischio | UE (TIG 2.1.1 p. 21): accettazione da parte dei management bodies oppure di persone responsabili con autorità di gestire i rischi — possibile delega; IT: **board** obbligatorio |
| 4 | Piano di trattamento del rischio | UE: idem 2.1.1 — possibile delega; IT: board obbligatorio |
| 5 | Piano di gestione delle vulnerabilità | UE: parte topic-specific (appropriate level of mgmt); IT: board |
| 6 | Piano di adeguamento | UE: idem; IT: board |
| 7 | Piano di continuità operativa | UE: parte topic-specific 4.1; IT: board |
| 8 | Piano di ripristino in caso di disastro | UE: idem; IT: board |
| 9 | Piano di gestione delle crisi | UE (TIG 4.3): i management bodies dovrebbero approvare il processo di gestione delle crisi — paraphrasi; IT: board obbligatorio |
| 10 | Piano di formazione | UE: topic-specific (appropriate level of mgmt); IT: board |
| 11 | Piano per la gestione degli incidenti | UE: topic-specific 3.1 (appropriate level of mgmt); IT: board |

**Asimmetria**: il regime IT è **più stringente** del regime UE su 7-8 documenti su 11. Per i soggetti cloud italiani che applicano entrambi i regimi (tesi 3a), si applica il regime più stringente: **board obbligatorio sui 11 documenti come da regime IT**.

### [c] Effetto sulla Q2

**Q2 ristretta — la TIG conferma che il regime UE delega più discrezionalità, ma il regime IT è cumulabile e più stringente; il fornitore cloud italiano applica il regime IT su questi 11 documenti**.

Nessun conflitto: il regime IT impone *più* approvazioni del board rispetto al Reg. UE → non viola il floor UE. Tesi 3a confermata.

---

## Q3 — Clausola "sistemi rilevanti": esiste un equivalente UE?

### [a] Tratta la materia?

**Parzialmente** — la TIG non ha un concetto formale di "sistemi rilevanti" come la det. ACN, ma usa un meccanismo equivalente basato su **risk-based asset classification**.

### [b] Cosa dice

La TIG non definisce una clausola unica di scoping (come la `per almeno i sistemi informativi e di rete rilevanti` IT). Però:

1. **Asset classification** (cap. 12.1 TIG): ogni soggetto classifica i propri asset per sensibilità, criticità, valore commerciale; le misure si applicano proporzionalmente.

   > *"Associate all assets to a defined classification level."* (TIG § 12.1 — 8 parole)

2. **Risk treatment plan** (cap. 2.1.1 GUIDANCE TIG p. 21): le misure di mitigazione sono associate agli asset identificati nella valutazione del rischio. Sistemi a bassa criticità possono avere misure più leggere.

3. **TIG cap. 2.1.2 lett. d) — all-hazards approach**: la valutazione del rischio identifica i rischi sui sistemi informativi e di rete in generale, ma il trattamento è proporzionato.

4. Uso ricorrente nella TIG di **`critical systems`** e **`critical assets`** come categorizzazione interna — non come termine giuridico definito.

### Confronto con il regime IT

Il concetto IT di **[[concepts/Sistemi informativi e di rete rilevanti|sistemi informativi e di rete rilevanti]]** è una **formalizzazione esplicita** (art. 1 det. ACN 379907/2025; processo a 3 step nella [[sources/Guida lettura specifiche di base|guida ACN]] § 2.3.1). Funziona come **clausola di scoping** dichiarata in molti requisiti delle misure (`per almeno i sistemi informativi e di rete rilevanti`, 13 requisiti SI / 22 SE — cfr. [[concepts/Clausole basate sul rischio]] clausola C1).

Il meccanismo UE (asset classification + risk-based scoping) raggiunge **lo stesso obiettivo** ma con linguaggio diverso e meno formalizzato.

### [c] Effetto sulla Q3

**Q3 ristretta — la TIG conferma uno scoping risk-based equivalente nei principi, ma non formalizza un concetto unico come "sistemi rilevanti". Il regime IT può quindi usare la clausola C1 senza violare il Reg. UE; il regime UE permette al soggetto di applicare lo stesso principio anche dove non c'è clausola esplicita**.

Per un fornitore cloud italiano: applica la clausola IT "sistemi rilevanti" (con il processo a 3 step formalizzato) per i requisiti della det. ACN; applica l'asset classification + risk-based scoping per i requisiti Reg. UE non specificatamente attaccati alla clausola. **Sono compatibili e tendenzialmente convergenti nella pratica**: l'elenco `GV.OC-04` dei sistemi rilevanti coincide largamente con l'inventario asset critici di classificazione 12.1 TIG.

---

## Q4 — Misure compensative: regime UE vs IT cumulabili?

### [a] Tratta la materia?

**Sì, esplicitamente** — TIG cap. 2.2 (Compliance monitoring, Examples of evidence) + esempi sparsi (cap. 11.3, ecc.).

### [b] Cosa dice

La TIG riconosce il meccanismo delle **compensating controls** in più punti:

1. **TIG 2.2 Examples of evidence** (p. 26): tra le eccezioni di policy elenca le situazioni del secondo paragrafo dell'art. 2(2) Reg. e del cons. 5 Reg. (paraphrasi). Esempi di evidenza richiesta: registrazione della richiesta di eccezione, dell'approvazione, e dei controlli compensativi implementati.

2. **Microsoggetti** (cons. 5 Reg., richiamato dalla TIG): possibile difficoltà nel separare funzioni e settori di responsabilità → ammesse misure compensative quali maggiore sorveglianza da parte del management o aumento delle attività di monitoraggio/logging (paraphrasi).

3. **Account privilegiati** (TIG cap. 11.3, nota 92): se la separazione delle identità privilegiate non è praticabile, sono ammesse misure compensative concrete:

   > *"compensating measures are in place e.g. MFA, just-in-time"* (TIG § 11.3 nota 92 — 10 parole)

### Confronto con il regime IT

Il regime IT ha il proprio meccanismo:

- **Clausola C3** della det. ACN ([[concepts/Clausole basate sul rischio|Clausole basate sul rischio]]): *"fatte salve motivate e documentate ragioni normative o tecniche"*.
- **Misura `ID.RA-06` p.2**: in caso di deroga, il soggetto deve adottare **misure di mitigazione compensative** + inserire la descrizione delle misure e del rischio residuo nel piano di trattamento del rischio.
- Applicabile a un **sottoinsieme** di requisiti elencati nella Tabella 2 di [[concepts/Misure di sicurezza di base]] (6 requisiti SI + 7 SE, requisiti "non derogabili" se non con compensative).

### Confronto puntuale dei due meccanismi

| Aspetto | Reg. UE 2024/2690 | Det. ACN 379907/2025 |
|---|---|---|
| Base normativa | Art. 2(2) Reg. + cons. 5 (microsoggetti) | Clausola C3 + `ID.RA-06` p.2 |
| Trigger | *"if appropriate, applicable, possible"* — clausole vaghe | *"motivate e documentate ragioni normative o tecniche"* |
| Categoria di applicazione | Generale (qualsiasi requisito con clausola di flessibilità) + specifica (microsoggetti) | Specifica (requisiti elencati in Tabella 2 + altri requisiti con C3) |
| Documentazione richiesta | Eccezione + approvazione + dettagli compensative | Motivazione documentata + misure compensative + piano di trattamento del rischio |
| Approvazione | Implicita nella governance del soggetto | `ID.RA-06` p.3 → piano di trattamento del rischio approvato dal board |

### [c] Effetto sulla Q4

**Q4 ristretta — i due meccanismi sono coerenti nei principi ma non identici nei perimetri e nella documentazione richiesta. Sono cumulabili con pratica operativa di doppia documentazione separata**.

Per un fornitore cloud italiano che vuole derogare un requisito:

1. **Se il requisito è solo nel Reg. UE** (es. una sotto-clausola dell'allegato che non ha equivalente IT) → applica meccanismo UE (art. 2(2) + cons. 5): eccezione, approvazione, compensative documentate.
2. **Se il requisito è solo nella det. ACN** (es. uno dei requisiti aggiuntivi IT) → applica clausola C3: motivazione documentata, compensative, piano di trattamento del rischio approvato dal board.
3. **Se il requisito è in entrambi** (la maggioranza) → applica il **regime più stringente** (IT): documentazione completa secondo C3 + `ID.RA-06` p.2, che soddisfa anche i requisiti UE.

Operativamente, il **piano di trattamento del rischio** (board-approved sotto il regime IT) può fungere da repository unificato per entrambi i meccanismi di deroga.

---

## Sintesi

| Q | Stato pre-TIG | Stato post-TIG | Note |
|---|---|---|---|
| **Q1** | Open (cumulabilità vs floor) | **Ristretta — chiusa a favore di 3a (cumulazione)** | TIG riconosce esplicitamente i framework nazionali come strumento di compliance equivalente; conflitti puntuali (3c) restano gestiti dal primato UE *ex lege* |
| **Q2** | Open (regime UE vs IT su board approval) | **Ristretta — regimi compatibili; IT più stringente prevale (3a)** | TIG: master policy al board, topic-specific a "appropriate level of management"; IT richiede 11 documenti al board; il fornitore IT applica il regime IT |
| **Q3** | Open (equivalente UE di "sistemi rilevanti") | **Ristretta — meccanismi convergenti (asset classification + risk-based scoping vs clausola C1 + GV.OC-04)** | TIG usa "critical assets" / "asset classification"; il regime IT formalizza con clausola dichiarata; **convergenza pratica** dell'elenco |
| **Q4** | Open (compensative UE vs IT) | **Ristretta — meccanismi coerenti, perimetri diversi, cumulabili con doppia documentazione**; **il piano di trattamento del rischio IT può unificare** | TIG richiede record di exception + compensatory controls; IT richiede motivazione + compensative + piano di trattamento; piano IT unifica |

**Conclusione macroscopica**: la TIG ENISA v1.0 **non chiude completamente nessuna delle 4 open question** (resta sempre il caveat che il documento è soft-law e che la decisione finale è dell'autorità nazionale), ma **restringe tutte e 4 in modo significativo**, riducendo l'incertezza interpretativa e confermando la tesi 3a + 3c della synthesis di coordinamento.

## Conseguenze per la synthesis di coordinamento

- **Tesi 3a + 3c**: confermata. Nessuna modifica al callout.
- **Scarto 3b**: confermato. La TIG non sostiene una "lex specialis UE esclusiva per i DSP" — al contrario, riconosce esplicitamente i framework nazionali.
- **Avvertenza testuale pilot Cloud**: nessun aggiornamento necessario in questa sessione. Una possibile semplificazione futura (rimuovere "open question normativa" dalla copy) sarà valutabile **dopo** la review del consulente GRC esterno, perché la TIG riduce ma non azzera l'incertezza.
- **Action item**: aggiornare le Q1-Q4 della synthesis di coordinamento con la nota *"Risposta TIG ENISA: cfr. [[synthesis/Risposta TIG ENISA alle Q1-Q4 della coordinamento UE-IT]] § QN"*.

## Aspetti residui non risolti dalla TIG

- **Vincolo di soft-law**: la TIG resta non vincolante. In caso di contenzioso, il giudice/autorità non è tenuto a seguirla. Per l'autorità nazionale, è ragionevole assumerla come riferimento interpretativo de facto.
- **Documentazione operativa unificata**: la TIG suggerisce esempi di evidenza, ma non un **template comune** UE+IT. Il fornitore cloud italiano deve costruire la propria documentazione bilingue (linguaggio Reg. UE + linguaggio det. ACN). *Operational gap rilevante per la consulenza GRC*.
- **Cosa fanno gli altri Stati membri DSP-pesanti** (Irlanda, Olanda, Lussemburgo): non risolto dalla TIG. La consultazione di Annex I TIG (national frameworks) potrebbe aiutare ma è out-of-scope di questa sessione.

## Action items prodotti

| Per chi | Action | Priorità |
|---|---|---|
| Autore — NIS2 Tool | Mantenere l'avvertenza testuale pilot Cloud come è (review post consulente GRC) | Alta |
| Autore — wiki | Aggiornare Q1-Q4 in [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]] con nota di rinvio a questo nodo | Alta (eseguito in questa sessione) |
| Autore — GRC personale | Per il proprio percorso GRC: dimestichezza con la TIG = vantaggio competitivo (è il documento operativo più recente di interpretazione art. 21 NIS2 a livello UE) | Media |
| Wiki | Monitorare versioni future della TIG (v1.x, v2.0) — l'introduzione la dichiara *living document* | Media |
| Wiki | Considerare ingest del **Compendium of Risk-Management Frameworks ENISA** (citato dalla TIG cap. 2.1, nota 14) — outlook GRC | Bassa |

## Collegamenti

- [[synthesis/Coordinamento Reg UE 2024-2690 e Det ACN 379907-2025]]
- [[sources/ENISA Technical Implementation Guidance v1.0 - 2025-06-26]]
- [[sources/ENISA Mapping Table v1.0 - 2025-06-26]]
- [[sources/Regolamento di esecuzione UE 2024-2690]]
- [[sources/Determinazione ACN specifiche di base - 379907-2025-12-19]]
- [[sources/Guida lettura specifiche di base]]
- [[concepts/Misure di gestione del rischio cyber]]
- [[concepts/Misure di sicurezza di base]]
- [[concepts/Sistemi informativi e di rete rilevanti]]
- [[concepts/Clausole basate sul rischio]]
- [[concepts/Responsabilità degli organi di gestione]]
- [[concepts/Evidenze documentali NIS]]

## Note dell'agente

- *Sintesi dell'agente:* questo nodo dimostra il **valore del workflow iterativo** della wiki: una synthesis (Coordinamento UE-IT) pone 4 open question esplicite, un successivo ingest mirato (TIG ENISA) le restringe sistematicamente, e il risultato è una posizione interpretativa **più solida da portare al consulente GRC esterno** per la review pre-launch del NIS2 Tool. La domanda al consulente non è più "Cosa fare di Q1-Q4?", è "*Confermi le risposte ristrette? Hai precedenti applicativi italiani che chiudano i punti residui?*". È una domanda di livello superiore.
- *Sintesi dell'agente:* la **lezione architetturale** è che gli ingest "reattivi" (su domande aperte di synthesis precedenti) producono valore superiore rispetto agli ingest "esaustivi" (lettura del documento intero senza una domanda di guida). La TIG ENISA letta in modo orientato a Q1-Q4 produce questo nodo in poche ore; letta in modo esaustivo richiederebbe giorni.
- *Sintesi dell'agente:* per una transizione da software engineering a GRC, questo nodo è **anche un asset didattico**: dimostra come si conduce un'analisi di coordinamento UE/IT su norma cyber. È riusabile come case study in materiale di studio per ISO 27001 LA + per contributi pubblici (LinkedIn, blog, articoli) sulla materia NIS2.
