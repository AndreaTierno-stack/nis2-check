# Verifica di lettura: cloud, energia elettrica, override DORA, catalogo (2026-10-28)

> Report della sessione di lettura Claude Code del 2026-10-28, trascritto dalla chat del Project. Le 29 imprecisioni non critiche dell'audit KB (punto 4) non sono conservate: restano nel report solo quelle critiche per il tool. Alcune righe e celle di tabella sono troncate nella copia incollata; il contenuto non è stato ricostruito.

Non ho modificato nessun file nei due repo. Testi estratti con pdftotext -enc UTF-8 dai PDF in raw/. Il riscontro su Normattiva, l'audit dei nodi KB (punto 4) e l'inventario del catalogo (punto 6) li hanno fatti tre subagenti. Ho ricontrollato io sul testo i rilievi su cui poggiano le proposte: Det. categorizzazione riga 66, synthesis 2690 righe 99-101 e 129, DORA-NIS righe 47 e 52, FAQ GEN.6, det. piattaforma art. 11.

In sintesi:
- Il riscontro su Normattiva è no-op e non consuma il credito.
- Ci sono due errori del corpus che cambiano l'esito: l'override Cloud PA sul fornitore cloud e l'override DORA su cloud ed energia. Si reggono su un'inferenza, non sulle citazioni.
- Altre tre lacune incidono sull'esito: soggetti critici di piccola dimensione, prosumer senza domanda, fornitura ristretta ai "clienti finali".
- Nella KB l'omissione dei soggetti critici (art. 3 c. 5 lett. a) dagli elenchi "a prescindere dalla dimensione" ricorre in 7 nodi. È lo stesso schema di DEC-007.

---

## 1. Fonte: riscontro su Normattiva

Fonte: Normattiva, export dell'atto completo "Vigente al: 28-10-2026", codice redazionale 24G00155, con controllo incrociato sulle pagine per articolo. Normalizzati solo spazi, a capo e bordi della tabella.

| Passaggio | Parole | Esito |
|---|---|---|
| Art. 3 cc. 1-5, 8-13 (più cc. 14-15) | 993 (articolo intero) | identico |
| Art. 2 c. 1 lett. bbb), rr), iii), lll) | 39 / 53 / 47 / 27 | identico |
| All. I, titolo | 4 | identico: anche Normattiva legge "Settori ad altra criticità", quindi il refuso è nel testo vigente |
| All. I, 1.a), 7 tipologie con i rinvii (dir. 2019/944 art. 2 punti 57, 12, 29, 35, 38, 18, 20, 59; reg. 2019/943 art. 2 punti 8, 25) | [troncato] | identico |
| All. I, settore 8, 9 tipologie (cloud al 4° trattino) | 94 | identico |

Art. 2, art. 3 e Allegati I-IV sono tutti in versione 1, in vigore dal 2024-10-16; Normattiva non registra modifiche all'atto. Esito no-op: il credito non è consumato (DEC-003), residuo 1.

Il testo di c. 14 e c. 15 serve al punto 5:
- c. 14: "Le disposizioni di cui all'articolo 1[7 e ai capi IV e V del presen]te decreto non si applicano ai soggetti identificati come essenziali o importanti dei settori 3 e 4 di cui all'allegato I, ai quali si applica la disciplina di cui al regolamento (UE) 2022/2554." [riga troncata nella copia]
- c. 15: il decreto non si applica "ai soggetti esentati dall'ambito di applicazione del regolamento (UE) 2022/2554". Il corpus non lo cita.

---

## 2. Energia elettrica

**Tipologia (All. I 1.a): Impresa elettrica di fo[rnitura]**
- Testo ufficiale: impresa ex art. 2 p. 57 dir. 2019/944 "che esercita attività di «fornitura»" (p. 12). FAQ A1.1.a.2: fornitura = "la vendita, compresa la rivendita, di energi[a elettrica ai clienti]"
- Nodo KB (FAQ Settori): r. 23: "vendita a clienti, anche rivendita" ✓
- Corpus: wizard__energia_elettrica.yaml:31,59: "a clienti finali"
- Esito: restrizione nel corpus

**Tipologia (All. I 1.a): DSO (art. 2 p. 29)**
- Testo ufficiale: ✓ · Nodo KB (FAQ Settori): r. 24 ✓ · Corpus: dso ✓ · Esito: coincide

**Tipologia (All. I 1.a): TSO (art. 2 p. 35)**
- Testo ufficiale: ✓ · Nodo KB (FAQ Settori): ✓ · Corpus: tso ✓ · Esito: coincide

**Tipologia (All. I 1.a): Produttori (art. 2 p. 3[8])**
- Testo ufficiale: FAQ A1.1.a.4: esclusi i "clienti attivi" "che non svolgono altre attività riconducibili agli allegati I e II"
- Nodo KB (FAQ Settori): r. 26, 314: esclusione s[enza la condizione]
- Corpus: scoping_note_it (r. 66), ma nessuna domanda la intercetta
- Esito: restrizione nella KB; lacuna di flusso nel corpus

**Tipologia (All. I 1.a): Gestori del mercato designati (reg. 2019/943 p. 8)**
- Testo ufficiale: ✓ · Nodo KB (FAQ Settori): ✓ · Corpus: ✓ · Esito: coincide

**Tipologia (All. I 1.a): Partecipanti che fornis[cono aggregazione, gestione d]ella domanda o stoccaggio (reg. 2019/943 p. 25; dir. p. 18, 20, 59)**
- Testo ufficiale: ✓ · Nodo KB (FAQ Settori): ✓ · Corpus: ✓ · Esito: coincide

**Tipologia (All. I 1.a): Gestori di punti di ricarica**
- Testo ufficiale: il testo non rinvia alla 2019/944 né al PUN; FAQ A1.1.a.3: "solo i soggetti di cui all'art. 5 del dm MASE n. 106" obbligati al PUN
- Nodo KB (FAQ Settori): r. 29, 35: corretta, attribuita alla FAQ
- Corpus: registrato_pun (ADR 0003)
- Esito: restrizione di fonte ACN, attestata; coincide

Le tipologie sono 7 nel testo e 7 nel corpus, s[enza eccedenze].

Rinvii ad altre norme.
- Dir. 2019/944, reg. 2019/943 e DM MASE 106/20[… non sono in raw/].
- Le definizioni sono però riportate alla lettera nella FAQ A1.1.a.1, quindi sono attestate in modo indiretto, tramite la FAQ.
- ADR 0005 e la riga 32 della KB ("nessuna defi[nizione r]iportata") partono dunque da una premessa imprecisa.
- La FAQ contiene due refusi suoi: "articolo 3, punto 57" invece di art. 2, e "(vedi FAQ A1.1.a.2)" invece di A1.1.a.3.
- Non è attestata la definizione di "cliente" (grossista o finale).

Naming. Nel corpus CACER e "soggetti critici (D.Lgs. 134/2024)" non si confondono mai. L'id cer_signal è ammesso, perché il vincolo riguarda il copy. Nella KB invece "CER" [nudo compare in FAQ Ambito (]righe 11, 33, 53, 220-223, 266-272) e Direttiva (riga 72), sempre nel senso di soggetti critici. Le CACER non sono mai nominate.

Altri rilievi sul corpus energia:
- Soggetti critici di piccola dimensione. L'art. [3 c. 5 lett. a), l'art. 6 c.] 1 lett. b) e la FAQ AMB.NO.1 dicono che "tutte le organizzazioni individuate quali soggetti critici … sono soggetti essenziali", a prescindere dalla dimensione. Il corpus invece:
  - assegna likely_out_of_scope alle micro e pi[ccole imprese anche se soggetti critici];
  - qualifica "importante" una media impresa che sia anche soggetto critico;
  - presenta il D.Lgs. 134/2024 come "regime parallelo e distinto dal NIS2" (signals__cumulative_regimes.yaml:56, ADR 0004).
- "Registrazione separata per ciascuna tipologi[a" (wizard__energia_elettrica].yaml:23,49; wizard__cloud_computing.yaml:50; segnali in signals__cross_sector.yaml:45,54,63). Nessuna fonte lo attesta, e le fonti in raw/ dicono il contrario:
  - art. 7 c. 1 lett. d): la registrazione indica "i pertinenti settori, sottosettori e tipologie";
  - det. piattaforma art. 11 c. 2 lett. g): l'u[tente indica "le tipologie di] soggetto … a cui il soggetto è riconducibile";
  - FAQ GEN.6: "selezionare uno o più settori/sottosettori … e la relativa tipologia".
- PSNC. Il copy dell'override (r. 120: "TSO e grandi DSO sono tipicamente in perimetro PSNC") e il commento alla r. 37 ("il TSO nazionale e' in PSNC") non sono attestati.
- Citazione fuori posto. faq_a1_1_a_4 sta nella regola micro/piccola (r. 101), ma la FAQ riguarda medie e grandi imprese.

---

## 3. Cloud computing

**Elemento: Tipologia**
- Testo ufficiale: All. I settore 8, 4° trattino · Nodo KB: FAQ Settori r. 95 ✓ · Corpus: cloud_provider ✓ · Esito: coincide

**Elemento: Definizione**
- Testo ufficiale: art. 2 c. 1 lett. bbb), riport[ata nella FAQ] A1.8.1
- Nodo KB: lett. bbb) mai attestata; Direttiva r. 34 solo "art. 6 – 41 definizioni"; synthesis 2690 righe 99-101 cita male
- Corpus: base_legal_definition: dir_nis2_art_6_30
- Esito: ID senza attestazione a livello di punto

**Elemento: Soglia e qualifica**
- Testo ufficiale: art. 3 c. 2, art. 6 c. 1 lett. a); FAQ A1.8.1 p. 5 · Nodo KB: ✓ · Corpus: ✓ · Esito: coincide

**Elemento: model_2**
- Testo ufficiale: det. 155238 art. 2 c. 3: allegato 2 per chi non rientra nei nn. 1, 2, 5, 6, 7, 10 dell'All. I
- Nodo KB: Det. categ. righe 24-25 ✓, ma la riga 66 dice il contrario (banche e infrastrutture digitali tra i "core")
- Corpus: model_2 (r. 32) senza citazione
- Esito: corretto ma non citato; KB in contraddizione con sé stessa

**Elemento: Reg. 2024/2690**
- Testo ufficiale: art. 1: si applica ai fornitori cloud, come soggetti pertinenti NIS2; art. 7 fissa le soglie
- Nodo KB: ✓ (nodo nis2_tool) · Corpus: cumulative_regulations, reg_ue_2024_269[0] · Esito: coincide

**Elemento: Cloud PA**
- Testo ufficiale: det. art. 4: si applica a chi "ha svolto la classificazione dei dati e dei servizi di cui all'art. 3" DD 21007/24. FAQ CAT.8: quella classificazione la fanno "le pubbliche amministrazioni" sui "propri dati". FAQ A1.8.2: il fornitore qualificato rientra come normale forn[itore cloud, con la soglia ordinar]ia
- Nodo KB: Stratificazione r. 109: manca la condizione
- Corpus: override cloud_pa == yes sul fornitore (r. 61), fixture E05
- Esito: inferenza: l'override non è coperto dall[e citazioni]

**Elemento: Cloud + MSP**
- Testo ufficiale: FAQ A1.9.3: i servizi gestiti richiedono "interconnessione diretta tra la rete del fornitore e quella del cliente"
- Nodo KB: nessun codice FAQ sulla doppia identit[à]
- Corpus: domanda senza il criterio dell'interconnessione; copy "registrazione separata"
- Esito: segnale più largo del testo; copy non attestato (§2)

**Elemento: Pertinenza pubblica → l90_cumulo**
- Testo ufficiale: L. 90 art. 1 c. 1: comprende s[olo le in-house delle PA elen]cate che forniscono servizi informatici, trasporto, acque reflue o rifiuti
- Nodo KB: Perimetro L. 90 ✓
- Corpus: capitale_prevalente (controllata, partecipata di maggioranza) ed ente_pubblico attivano l90_cumulo, con il testo "rientra molto probabilmente" (r. 25)
- Esito: estensione: per l'energia le in-house non sono mai nel perimetro L. 90; per il cloud solo le in-house delle PA elencate

Citation ID senza codice puntuale: faq_settori_cloud (si tratta della A1.8.1), faq_a1_p9/faq_settori_msp (A1.9.1-A1.9.4), dir_nis2_art_6_30. I prefissi della direttiva sono misti (nis2_art_26 e dir_nis2_…). dlgs_175_2016 non è in raw/.

---

## 4. KB: restrizioni ed estensioni nei nodi both e nis2_tool

L'audit ha trovato 53 rilievi: 17 restrizioni, 7 estensioni, 29 imprecisioni. 42 nascono da inferenze, 6 riportano fedelmente una fonte ufficiale, 5 alterano o amplificano u[na fonte. Sotto tutte le re]strizioni e le estensioni; delle imprecisioni riporto solo quelle critiche per il tool.

| Nodo (scope) | Riga | Testo KB | Testo ufficiale | Tipo |
|---|---|---|---|---|
| FAQ Settori (both) | 16 | "DNS/TLD/[registrar] (essenziali)" | [c. 5 lett. d): solo TLD e DNS; il registrar è senza soglia ma non essenziale | estensione |
| FAQ Settori (both) | 16, 295-303 | elenco size-blind | mancano c. 5 lett. a) e c. 9 | restrizione |
| FAQ Settori (both) | 26, 314 | prosumer esclusi | manca la condizione "che non svolgono altre attività" | restrizione |
| FAQ Settori (both) | 33 | A1.1.a.1 con 6 tipologie | A1.1.a.1 p. 3 comprende anche la ricarica | restrizione |
| Settori altamente critici e critici (both) | 16 | "sono soggetti importanti" | art. 6 c. 1 lett. b) e c. 2 | restrizione |
| Settori altamente critici e critici (both) | 55 | "servizi fiduciari qualificati, … unici/critici" | c. 5 lett. c) copre tutti i prestatori; manca la lett. b); "unici" è c. 9 | restrizione |
| Ambito di applicazione NIS2 (both) | 17, 35 | "prestatori … qualificati" | c. 5 lett. c)-e) | restrizione |
| Ambito di applicazione NIS2 (both) | 32-38 | elenco "a prescindere dalla dimensione" | mancano c. 5 lett. a) e c. 10 | restrizione |
| Size-cap rule (both) | 27 | come sopra | c. 5, c. 6, c. 10 | restrizione |
| Identificazione dei soggetti (both) | 24, 63 | "fiduciari qualificati", "unici/critici" | c. 5 | restrizione |
| Identificazione dei soggetti (both) | 62 | "entità finanziarie … solo per All. I p. 3 e 4"; cluster AM[B.SI] | AMB.NO.2 non dice "solo"; AMB.SI non esiste | restrizione |
| FAQ Ambito (both) | 137-143, 192 | eccezioni per micro e piccole so[lo lett. a) (AMB].DI.2, AMB.PU.2) | omissione già presente nella fonte: nota redazionale | restrizione di fonte |
| FAQ Ambito (both) | 261 | "indipendenza dimensionale per 4 settori" | manca c. 5 lett. a) | restrizione |
| FAQ Ambito (both) | 238 | citazione di AMB.NO.2 con "[…]" | l'omissione taglia proprio "medie o grandi … punti 3 e 4" | estensione (verificata da me) |
| FAQ Ambito (both) | 268 | "unico obbligo la registrazi[one …] resto disapplicato" | c. 14: solo art. 17 e Capi [IV-V; la] FAQ è incoerente al suo interno | estensione |
| FAQ Registrazione (both) | 50-51 | casi speci[ali senza] i soggetti critici piccole | [c. 5 lett. a)] | restrizione |
| Coordinamento DORA-NIS (both) | 12, 29 | esoneri per le "entità finanziari[e" in tutti i settori] | testo fedele alla det. [di piattafo]rma, che però va oltre i settori 3-4 | estensione di fonte: da annotare |
| Coordinamento DORA-NIS (both) | 47 | NIS "solo [p. 3 e] p. 4"; "assolti via DORA" | [il c. 14] non lo dice; un'entità DORA può essere NIS per altre tipologie | restrizione ed estensione |
| Stratificazione (both) | 79 | "solo se p. 3 e 4" | come la r. 47 | restrizione |
| Stratificazione (both) | 109 | "PA → il m[odello Cloud PA] sostituisce" | [det. art.] 4: solo chi "ha svolto la classificazione" | estensione |
| Stratificazione (both) | 116 | notifica volontaria per i servizi non DORA | fuori dai settori 3-4 l'art. 25 si applica | estensione |
| Reg. 2024/2690 (nis2_tool) | 37 | det. 379907 applicata alle banche | c. 14: Capo IV escluso per i settori 3-4 | estensione |
| Coordinamento 2690-379907 (nis2_tool) | 37 | "tutti i soggetti NIS" | idem | estensione |

Imprecisioni critiche per il tool:
- Det. categorizzazione r. 66: allocazione dei modelli invertita.
- Synthesis 2690-379907:
  - righe 99-101: definizione cloud non lettera[le];
  - r. 129: copy "non sostitutivi";
  - r. 140: registrazione confusa con l'aggiornamento annuale.
- DORA-NIS r. 52: misure e notifica "NIS" attribuite alle entità dei settori 3-4, in contrasto con il c. 14 e con la r. 47 dello stesso nodo.
- Reg. 2690:
  - r. 23 e 184: "All. I p. 3-4";
  - r. 201: definizione "(33)", che è invece il punto 30.
- D.Lgs. 138/2024: righe 41-47, numeri degli articoli sbagliati (26-28, 30, 32-33).

Il nodo D.Lgs. non attesta né il c. 14 né la lett. bbb).

---

## 5. Override DORA (STATUS 16)

| Fonte citata | A chi si applica | Cosa dispone |
|---|---|---|
| Art. 3 c. 14 | essenziali e im[portanti dei settori 3 e 4] dell'All. I | art. 17 e Capi IV-V non applicabili; si applica DORA |
| FAQ AMB.NO.2 (citata solo nella domanda dora) | soggetti DORA m[edi o grandi] dei punti 3 e 4 | "solamente" l'art. 7 c. 1, poi "in sostanza" il c. 14: incoerente al suo interno |
| Det. piattaforma art. 7 c. 6, art. 16 c. 13, art. 20 c. 6 | "entità finanziarie di cui al Reg. 2022/2554 che rientrano nell'ambito del decreto NIS", senza limite di [settore] | esonero da referente CSIRT, art. 16 c. 3 lett. b) e art. 17 det., categorizzazione |

- Rapporto con il c. 14. Cloud (settore 8) ed e[nergia (settore 1) non entr]ano mai nel c. 14. Per un'entità finanziaria DORA che sia anche fornitore cloud o impresa elettrica, il decreto applica per intero il Capo IV e il Capo V; valgono solo gli esoneri di piattaforma della det. Il testo "disapplicato il regime NIS salvo l'art. 7 c. 1" e la citazione dlgs_138_2024_art_3_c_14 negli override cloud [ed energia sono un'in]ferenza. La fixture E06 (settore cloud) è costruita su questa inferenza.
- Fornitore cloud terza parte TIC ai sensi DORA[: nessuna fonte in raw/ ne tratta l'escala]tazione: non è un'"entità finanziaria" (det.) e non appartiene ai settori 3-4 (c. 14, AMB.NO.2). La domanda chiede "entità finanziaria", quindi il fornitore dovrebbe rispondere "no". Se risponde "sì", l'escalati[on si regge su un'inferenza. Il Reg. 2022/2554] non è in raw/; la r. 30 di Stratificazione e la r. 129 della synthesis 2690 non sono verificabili.
- Obbligo residuo (dora.yaml:32). "Art. 7 c. 1"[viene da AMB.NO.2, non dal c.] 14. Anche per i settori 3-4 la det. (art. 16 c. 13 esonera solo dal c. 3 lett. b) presuppone che resti l'aggiornamento annuale. open_points: [] (r. 42) contrasta con il punto 16 aperto.
- La domanda dora porta come esempio l'"impresa [… che non è] tra le tipologie dei settori 3-4.

---

## 6. Inventario del catalogo

Vecchio conteggio "4 / 8 / 10". Compare in tre [punti]:
- docs/STATUS.md:12: lo presenta come stato del repo e accanto scrive "8 voci", quindi si contraddice;
- docs/ARCHITECTURE.md:172-173 e ADR 0012:63-64[: lo citano come catal]ogo esterno, non presente nel repo.

Il catalogo reale ha 3 voci gestito, 5 segnalat[o, 0 non_gestito].

| # | Limitazione | Dove | In catalogo? | Proposta (id · status · citazioni) |
|---|---|---|---|---|
| 1 | Regimi solo instradati | regimes/*, CLAUDE.md, ADR 0009 | sì (3 voci) | — |
| 2 | DORA: c. 14 limitato ai settori 3-4 | STATUS 16, dora.yaml:32,42 | in parte | rivedere la [voce dora_massive_]disapplication (vedi C-D1) |
| 3 | Soggetti critici (D.Lgs. 134/2024) | energia out_of_scope_mvp, cer_signal, ADR 0004 | no | soggetti_critici_dlgs_134_2024_art_3_c_5_lett_a · segnalato · dlgs_134_2024 + da creare dlgs_138_2024_art_3_c_5_lett_a, dlgs_138_2024_art_6_c_1_lett_b, faq_amb_no_1 · cloud, energia |
| 4 | Art. 3 c. 9 (individuazione ACN, a[nche sotto soglia]) | mai dichiarata nel tool | no | individuazione_acn_art_3_c_9 · segnalato · da creare dlgs_138_2024_art_3_c_9, _c_13 |
| 5 | Art. 3 c. 10 (imprese collegate) | solo indiretta | no | imprese_collegate_art_3_c_10 · segnalato · da creare dlgs_138_2024_art_3_c_10 |
| 6 | Regime transitorio OSE | energia r. 141-144 | no | energia_reg[ime_transitorio_ose · segnalato o non_ges]tito (riguarda le misure, non l'ambito: il verdict_outcome: ambiguous è discutibile) · det_acn_379907_2025 |
| 7 | Stabilimento principale multi-UE | cloud r. 79-84 | no | cloud_stabi[limento_principale_multi_ue · se]gnalato · dlgs_138_2024_art_5, nis2_art_26 |
| 8 | Salvaguardia dimensionale (DPCM 221/2024), segnaposto | signals r. 40-49 | no | safeguard_dimensional_dpcm_221 · non_gestito · dpcm_221_2024, dlgs_138_2024_art_3_c_4, _c_12 |
| 9 | Precedenza PSNC + Cloud PA | disambiguation r. 59-70, STATUS 6 | no | psnc_cloud_pa_precedenza_non_attestata · gestito · det_acn_155238_2026_art_4, _art_5 (serve un campo nuovo nello schema) |
| 10 | PA senza override PSNC e DORA | PA r. 164-169 | no | già decisa (sotto) |
| 11 | Canale Allegato IV | PA, signals | no | allegato_iv_individuazione_art_3_c_8 · segnalato · citazioni esistenti |
| 12-14 | Dimensione autodichiarata; consoli[damento di gruppo; confine 50]/43 M€ | disambiguation r. 82-112, STATUS 9 | no | 3 voci non_[gestito · faq_amb_di_1, racc_]ue_2003_361 |
| 15 | ASL, identità sanitaria | signals r. 45 | no | pa_asl_identita_sanitaria_allegato_i_p5 · segnalato |
| 16 | Copertura settoriale parziale ("[3 settori su 1]4") | CLAUDE.md:118 | no | copertura_s[ettoriale_parziale · non_gestito] |
| 17 | ISTAT S13 presupposto | PA r. 19-49 | no (STATUS 14 copre solo L. 90) | pa_prerequisito_istat_s13 · segnalato · l_196_2009_art_1_c_3 |
| 18 | Art. 3 c. 15 (soggetti esentati da [DORA]) | assente | no | dora_esenta[ti_art_3_c_15 · segnalato ·] da creare dlgs_138_2024_art_3_c_15 |
| 19-21 | Multi-tipologia energia; Cloud + M[SP; …] | wizard | no | priorità bassa, già segnali |

Incoerenze emerse:
- "Segnalato" solo a parole. OSE, soggetti critici, multi-UE, cer_signal e safeguard_dimensional_dpcm_221 non sono attivati da nessun file: oggi equivalgono a non_gestit[o].
- L. 90 e lett. d). ADR 0001:29-30 afferma che la lett. d) "non è nell'elenco"; catalogo e ADR 0011 dicono "non attestato".
- Rimandi agli ADR. CLAUDE.md:12 e lint.ts attr[ibuiscono la sal]vaguardia ad ADR 0004 e 0005, ma lo 0005 tratta la Dir. 2019/944.

---

## 7. Proposte

### KB

| # | Proposta | Effetto sul verdetto |
|---|---|---|
| K1 | Soggetti critici (c. 5 lett. a, art. 6 c. 1 lett. b) negli elenchi size-blind dei 7 nodi: FAQ Settori, Settori critici, Amb[ito, Size-cap rule, Identificazion]e, FAQ Ambito, FAQ Registrazione. Stessa classe di DEC-007 B | nessuno diretto; è il prerequisito di C-E3 |
| K2 | Nodo D.Lgs.: attestare c. 14, c. 15, le[tt. bbb) e c. 5 alla l]ettera; correggere la numerazione delle righe 41-47 | nessuno; sblocca gli ID di C-C2, C-D1, catalogo 3 e 18 |
| K3 | DORA-NIS r. 47 e 52, Stratificazione r. 79 e 116, FAQ Ambito r. 238 e 268, Reg. 2690 r. 37, Coordinamento r. 37: distinguere legge (settori 3-4, art. 17 e Capi IV-V) e det. (entità DORA in ambito NIS, solo a[lcuni esoneri]) | nessuno; fonda C-D1 |
| K4 | Det. categ. r. 66; Stratificazione r. 88 e 109; Categorizzazione r. 70; FAQ Categ. r. 112: condizione dell'art. 4 e sostit[uzione del modello] | nessuno; fonda C-C1 |
| K5 | FAQ Settori r. 26, 314 (condizione sui prosumer), r. 33 (ricarica in A1.1.a.1), r. 32 (definizioni presenti nella FAQ, contrar[iamente a quanto scritto]); ADR 0005 da annotare | nessuno; fonda C-E2 |
| K6 | Synthesis 2690 righe 99-101 (citazione [testuale lett. bbb), R]eg. 2690 r. 23, 184, 201 | nessuno |
| K7 | "CER" nudo in FAQ Ambito e Direttiva → "soggetti critici (D.Lgs. 134/2024)" | nessuno |

### Corpus

Tutte le proposte toccano contenuto normativo, quindi serve la tua conferma.

**C-C1.** Togliere l'override cloud_pa dal settore cloud, oppure limitarlo al soggetto che ha svolto la classificazione ex art. 3. Effetto: E05 da ambiguous a likely_in_scope (essenziale). E08: resta ambiguous per il solo PSNC, regime_routing perde cloud_pa e multi_regime_intersection diver[rà senza effetto per il setto]re cloud. Insieme a "cloud_pa fuori dal flow_order PA" il gate cloud_pa resta senza destinatari: cambia il disegno a 3 gate (ADR 0001), quindi serve l'ADR 0013 [poi numerato 0014].

**C-D1.** Raccomandata: togliere l'override DORA da cloud ed energia. Con dora == yes l'esito segue le regole dimensionali, più un avviso di catalogo "entità DORA fuori dai settori 3-4: esoneri di piattaforma (det. art. 7 c. 6, 16 c. 13, 20 c. 6), Capo IV e V applicabili". dora.yaml: obbligo residuo attribuito ad AMB.NO.2, aggiungere faq_amb_no_2 alle citazioni, compilare open_points. Alternativa prudente: tenere l'escalation, togliere dlgs_138_2024_art_3_c_14 dagli override, residual_nis_obligation: null. Effetto: raccomandata, E06 da ambiguous a likely_in_scope (essenziale); alternativa, esito invariato, cambiano citazioni e testi.

**C-E3.** Domanda comune "soggetto critico identificato (DPCM elenco, D.Lgs. 134/2024)?". Con "sì": categorica, essenziale, [a] prescindere dalla dimensione. Come minimo, un avviso di catalogo sulla regola micro/piccola. Effetto: micro/piccola da likely_out_of_scope a likely_in_scope (essenziale); media da importante a essenziale; fixture nuova.

**C-E2.** Follow-up per produttore: "solo client[e attivo senza altre attivit]à dell'All. I/II?". Effetto: prosumer medio o grande da likely_in_scope a likely_out_of_scope (da decidere se out_of_scope o qualitative_signal_only); fixture nuova.

**C-E1.** Etichetta della fornitura: "Vendita, [compresa la rivendita, di ener]gia elettrica ai clienti". Effetto: stesso id: esito invariato; il rivenditore all'ingrosso trova un'opzione.

**C-E4.** Copy "registrazione separata": diventa "la registrazione indica tutte le tipologie pertinenti" (art. 7 c. 1 lett. d; det. art. 11 c. 2 lett. g; FAQ GEN.6), in 3 domande e 4 segnali. Effetto: nessuno; cambia solo il copy.

**C-E5.** l90_cumulo: togliere l'attivazione da[lle in-house per l'en]ergia; per il cloud solo le in-house delle PA elencate; testo "potrebbe rientrare … da verificare". Effetto: solo segnali; esito invar[iato].

**C-E6.** Togliere i testi PSNC non attestati (r. 37, 120) e spostare faq_a1_1_a_4 (r. 101). Effetto: nessuno.

**C-C2.** base_legal_definition → dlgs_138_2024[_art_2_c_1_lett_bbb; d]et_acn_155238_2026_art_2_c_3 per model_2; ID FAQ puntuali (faq_a1_8_1, faq_a1_9_3…). Effetto: nessuno.

**C-X.** Catalogo: voci 3, 4, 5, 18 come segnalato o non_gestito; correggere STATUS:12. Effetto: nessuno sull'esito; cambi[ano disclaimer e known-limitations].

Stop-and-ingest. DD 21007/24 e Reg. 2022/2554 mancano in raw/, ma C-C1 e C-D1 si possono decidere sui testi già presenti (det. art. 4, FAQ CAT.8 e A1.8.2; c. 14 e det. [piattaforma). Diventano lacune str]utturali solo se vuoi modellare i regimi nel merito (v0.2). Per ora non propongo di spendere il credito.

---

## Modifiche già decise, da includere nella stessa versione del corpus

1. cloud_pa fuori dal flow_order PA. È coerente [con C-C1: insieme s]vuotano il gate (vedi ADR 0013 [poi 0014]).
2. Override PSNC per la PA sul regime esistente, con fixture. Chiude il punto 10 dell'inventario. Da valutare nello stesso passaggio anche il caso DORA per la PA.
3. Invariante citation ID ↔ registro. Oggi il r[egistro copre solo gli 8 ID nuovi di] 0.5.0. Esteso a cloud ed energia, l'invariante fallirà sugli ID senza codice puntuale (faq_settori_cloud, faq_a1_p9, faq_settori_msp, dir_nis2_art_6_30): conviene farlo insieme a C-C2.
4. Art. 40 c. 5 lett. a) nel nodo KB. Conviene nello stesso passaggio di K2 (c. 14, c. 15, lett. bbb, c. 5).

Con C-C1, C-D1, C-E2 o C-E3 cambiano degli esiti: il bump è MINOR (0.6.0), con E05, E06 ed E08 riallineate e fixture nuove per soggetti critici e prosumer.
