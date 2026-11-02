# Voice Guide — NIS2 Tool

Guida estesa alla voce del progetto, con esempi positivi e negativi commentati. Compagno di `SKILL.md`. Tutti gli esempi rispettano i vincoli reali: **copy probabilistico mai categorico**, naming (due salvaguardie, CER/CACER), fatti di prodotto v0.1.0 corretti.

## Principi di voce

### 1. Dichiarativa e impersonale, non eroica

Registro che constata, non che esorta né celebra. La prima persona è ammessa solo in chiave **fattuale**, mai emotiva. L'audience GRC è composta di professionisti pratici: apprezza competenza, non drammaticità.

❌ "Sto trasformando il caos normativo italiano in chiarezza, un settore alla volta."

✅ "Ho modellato in YAML i primi tre settori NIS2. L'engine è una funzione pura; il corpus è validato contro uno schema zod. Niente magia, solo regole esplicite con riferimenti normativi tracciabili a granularità di comma."

### 2. Specificità sopra astrazione

Numeri, articoli, casi concreti **alzano** la credibilità.

❌ "Aiutiamo le aziende a navigare la complessità normativa."

✅ "Il tool distingue i tre gate di regime — PSNC, DORA, Cloud PA — dal cumulo con la L. 90/2024, e per i tre settori pilota restituisce un verdetto motivato con i riferimenti agli articoli in un paio di minuti."

### 3. Onestà sui limiti

Dichiarare cosa il tool **non fa** è marketing più efficace, e scarica il rischio legale.

❌ "Il tool risolve completamente la verifica del rientro NIS2."

✅ "Il MVP copre tre settori pilota. Restano fuori gli altri 14 settori e la risoluzione nel merito dei regimi correlati (il tool li segnala e instrada, non li risolve). Per quelli serve un consulente qualificato."

### 4. Probabilistica, mai categorica

Il tool **suggerisce**, non **dichiara**. Vale nel prodotto e in ogni contenuto che lo descrive.

❌ "Il tool ti dice se sei dentro il perimetro NIS2."

✅ "Il tool indica se, sulla base degli input, l'analisi suggerisce l'inclusione nel perimetro NIS2 — con verifica obbligatoria di un consulente qualificato."

Verbi vietati anche negli esempi: "Rientri", "Sei dentro/escluso", "Sei conforme", "Devi", "Adempi", "Implementa", "audit", "diagnosi", "certificazione".

### 5. Critica costruttiva, non polemica

Si può dire che lo status quo è migliorabile senza attaccare competitor per nome.

❌ "I tool dei Big4 sono closed source, costosi e nessuno sa come funzionano."

✅ "Gli strumenti di pre-screening NIS2 oggi disponibili sono in larga parte chiusi. Un'alternativa open source con corpus normativo pubblico è semplicemente un'altra opzione, complementare."

### 6. Italiano corretto, registro professionale

Errori di sintassi, anglicismi inutili e italiano "da LinkedIn motivazionale" abbassano la credibilità.

❌ "Stiamo lavorando hard per delivery un MVP che ha un grosso impatto nel landscape della compliance."

✅ "Sto lavorando alla prima versione del tool, focalizzata su tre settori pilota."

## Esempi commentati

### Esempio A — Annuncio MVP

**Versione scarsa:**

> 🚀 ATTENZIONE! Sono fierissimo di annunciare il lancio del MVP del nostro tool NIS2! 🎉
>
> ✅ Wizard intuitivo ✅ Verdetto in 2 minuti ✅ PDF scaricabile ✅ Open source
>
> Non perdere l'occasione, prova ora! 👉 [link]
>
> #NIS2 #Cybersecurity #Innovation #DigitalTransformation #ItaliaDigitale

**Cosa non va:** hook con emoji + maiuscolo + "fiero"; bullet con check-mark; urgency falsa; hashtag generici e inglesi; zero contenuto reale.

**Versione buona:**

> Da oggi è online la prima versione del tool open source per un pre-screening dell'ambito NIS2 italiano.
>
> Il MVP copre tre settori pilota — Energia (elettricità), Cloud computing, Pubblica Amministrazione — con un wizard a doppio binario: prima tre domande di disambiguazione di regime (PSNC, DORA, Cloud PA), poi l'identificazione standard. Restituisce un verdetto motivato con riferimenti a D.Lgs. 138/2024, alle FAQ ACN e alle determinazioni, una modalità Esperto che mostra il percorso decisionale, e un "Esito preliminare di verifica dell'ambito NIS2" in PDF.
>
> Cosa esplicitamente non fa: gli altri 14 settori, la risoluzione nel merito dei regimi correlati (li segnala e instrada, non li risolve), gli edge case non ancora modellati. Per quelli serve un consulente qualificato — il tool non sostituisce il parere legale e non è uno strumento di compliance.
>
> Niente raccolta dati: le risposte non lasciano il browser. Corpus normativo in YAML versionato, con riferimenti tracciabili, pubblico nel repo.
>
> Provatelo e segnalatemi i casi che gestisce male.
>
> [link al sito] · [link al repo]
>
> #NIS2 #ComplianceItalia #GRC #OpenSource

**Perché funziona:** hook fattuale; numeri e fatti di prodotto **reali** (doppio binario, non "6 step"); limiti dichiarati; CTA leggera; hashtag italiani.

### Esempio B — Approfondimento normativo

**Versione scarsa:**

> 🤔 Sai cos'è il coordinamento DORA-NIS? Molte aziende non lo sanno e rischiano grosso! Ecco i 5 punti che devi conoscere. Leggi tutto e iscriviti alla newsletter!

**Cosa non va:** domanda retorica; clickbait ("rischiano grosso"); lista di promesse senza contenuto; newsletter non pertinente.

**Versione buona:**

> Un'entità finanziaria regolata da DORA che è anche un soggetto NIS: quale disciplina si applica?
>
> La risposta contro-intuitiva è che il regime NIS viene in larga parte **disapplicato** — DORA prevale come lex specialis — salvo l'obbligo residuo dell'art. 7 c. 1 del D.Lgs. 138/2024. La determinazione ACN sulla piattaforma (127437/2026) elenca gli esoneri puntuali: referente CSIRT (art. 7 c. 6), alcune misure (art. 16 c. 13), l'elencazione e categorizzazione (art. 20 c. 6). Ogni esonero fa comunque salva l'adesione volontaria a quelle previsioni.
>
> Il punto pratico: per un soggetto DORA, presumere di dover applicare l'intero impianto NIS è un errore in eccesso; presumere di essere del tutto fuori è un errore in difetto. È un caso in cui l'autovalutazione manuale sbaglia in entrambe le direzioni.
>
> Nel tool questo è modellato come una "disapplicazione massiva" con l'obbligo residuo esplicitato — il verdetto segnala il coordinamento e rinvia al consulente per la parte DORA, che il tool non risolve nel merito.
>
> [link al repo]
>
> #NIS2 #DORA #GRC #ComplianceItalia

**Perché funziona:** hook contro-intuitivo ma **corretto e attestato** (commi verificati sul testo, corpus v0.2.1); implicazione operativa; riferimento al tool leggero e probabilistico; nessun verbo prescrittivo.

### Esempio C — Lessons learned tecnico

**Versione buona, breve:**

> Modellare la NIS2 in YAML sembra facile finché non arrivi a un'entità DORA che è anche un soggetto NIS.
>
> Il problema: l'esito non è "dentro" o "fuori", è "il regime NIS è disapplicato salvo un obbligo residuo, e i singoli esoneri hanno una granularità di comma". Codificarlo come un boolean avrebbe perso informazione e prodotto un verdetto categorico — vietato per costruzione nel progetto.
>
> L'opzione scartata: far **inferire** l'esito all'engine a partire dal tipo di regime. L'avrei pagata in ambiguità: l'engine avrebbe "deciso" qualcosa che non è meccanica ma normativa.
>
> La soluzione: ogni regola del corpus dichiara il proprio `verdict_outcome`, e l'engine lo **copia** senza inferire. Un'invariante (validata due volte, nello schema zod e come assert nell'engine) impone che un rinvio al consulente produca sempre esito "ambiguo". L'engine esegue; la conoscenza normativa vive nel corpus.
>
> La lezione: in un corpus di questo tipo, ogni volta che l'engine sta per "dedurre" un esito, fermati. La deduzione è il punto in cui un errore di modellazione diventa un verdetto sbagliato con l'aria dell'autorità.
>
> [link al PR]
>
> #NIS2 #SoftwareEngineering #ComplianceItalia

## Vocabolario di riferimento

### Termini accettati

- "soggetto" (non "azienda" generica, soprattutto per la PA)
- "perimetro NIS2" / "ambito" (perimetro è il termine tecnico ACN)
- "essenziale" / "importante" (le due qualifiche ufficiali)
- "rientro" (non "applicabilità", "inclusione" generica)
- "verdetto" (sempre con registro probabilistico — è un pre-screening, non una decisione)
- "consulente qualificato" (non "esperto", "specialista")
- "determinazione" (il termine giusto per gli atti ACN; non "delibera", "regolamento")
- "salvaguardia dimensionale (DPCM 221/2024)" — **mai** "salvaguardia" nuda
- "soggetti critici (D.Lgs. 134/2024)" / "comunità energetiche rinnovabili (configurazioni CACER)" — **mai** "CER" nudo

### Anglicismi da evitare quando esiste l'equivalente

- "compliance" → "conformità" o "adempimento" (ma il tool **non** è di compliance: attento al contesto)
- "leverage" → "sfruttare", "utilizzare"
- "deploy" → "rilascio", "pubblicazione"
- "stakeholder" → "interlocutore" o esplicita la categoria

### Anglicismi accettati in contesto tecnico

- "open source", "MVP", "framework", "API", "repo", "wizard"
- "build in public"
- "release notes", "changelog"

### Termini vietati sul verdetto (registro categorico)

"Rientri", "Sei dentro/escluso", "Sei conforme", "Devi", "Sei tenuto a", "Adempi", "Implementa", "report di compliance", "audit", "diagnosi", "certificazione". Descrivere il tool come uno strumento che "certifica", "attesta la conformità" o "dice se sei dentro" è fuori voce **e** fuori dai vincoli legali del progetto.
