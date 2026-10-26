---
title: Settori altamente critici e critici
type: concept
scope: both
tags: [nis2, settori, allegati, ambito]
sources: ["[[sources/Direttiva (UE) 2022-2555 (NIS2)]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]]"]
aliases: [Settori NIS2, Settori Allegato I, Settori Allegato II]
---

## Definizione

NIS2 distingue gli ambiti settoriali coperti in due gruppi:

- **Settori altamente critici** (Allegato I direttiva / Allegato I D.Lgs. 138): 11 settori la cui perturbazione produce impatti sistemici sull'economia o sulla società. I soggetti grandi qui dentro sono **soggetti essenziali**.
- **Settori critici** (Allegato II direttiva / Allegato II D.Lgs. 138): 7 settori comunque rilevanti ma con impatto sistemico minore. I soggetti rientranti qui dentro sono **soggetti importanti**.

Plus alcuni allegati aggiuntivi del decreto italiano (Allegato III/IV) per le **PA** e altre categorie particolari.

## Allegato I — Settori altamente critici (11)

1. **Energia** — elettricità, gas, petrolio, teleriscaldamento/raffreddamento, idrogeno
2. **Trasporti** — aerei, ferroviari, marittimi, stradali
3. **Settore bancario**
4. **Infrastrutture dei mercati finanziari**
5. **Settore sanitario** — ospedali, laboratori, fornitori di dispositivi medici
6. **Acqua potabile**
7. **Acque reflue**
8. **Infrastrutture digitali** — IXP, DNS, TLD, cloud, data center, CDN, servizi fiduciari, reti e servizi di comunicazione elettronica
9. **Gestione dei servizi TIC (B2B)** — MSP, MSSP
10. **PA** — amministrazioni centrali (regionali secondo identificazione nazionale)
11. **Spazio**

## Allegato II — Settori critici (7)

1. **Servizi postali e di corriere**
2. **Gestione dei rifiuti**
3. **Fabbricazione, produzione e distribuzione di sostanze chimiche**
4. **Produzione, trasformazione e distribuzione di alimenti**
5. **Fabbricazione** — dispositivi medici, computer/elettronica/ottica, apparecchiature elettriche, macchinari, autoveicoli, altri mezzi di trasporto
6. **Fornitori di servizi digitali** — mercati online, motori di ricerca online, piattaforme di social network
7. **Ricerca**

## Sviluppo

- Rispetto a NIS1, NIS2 **espande sensibilmente**: nuovi entranti includono PA, spazio, alimentare, manifattura, ricerca, gestione rifiuti, social network, motori di ricerca.
- Il D.Lgs. 138/2024 può aver aggiunto sotto-categorie italiane specifiche da verificare in Allegato (es. soggetti del Servizio Sanitario Nazionale).

## Chiarimenti operativi (FAQ ACN)

[[sources/FAQ NIS - Settori, sottosettori e tipologie di soggetto]] fornisce ~70 chiarimenti settoriali (codici da `A1.1.a.1` a `A4.3.5`) che precisano:

- **Mappa NACE** delle tipologie del settore Fabbricazione (Allegato II p. 5): NACE Sez. C div. 21/26/27/28/29/30 — divisioni che identificano i sottosettori dei dispositivi medici/IVD, computer ed elettronica/ottica, apparecchiature elettriche, macchinari, autoveicoli, altri mezzi di trasporto.
- **Mappa "size-blind"**: tipologie soggetto incluse a prescindere dalla dimensione (servizi fiduciari qualificati, gestori DNS/TLD/registry, registrar Allegato II, PA, soggetti unici/critici).
- **Mappa eccezioni di prevalenza**: per Acqua potabile, Acque reflue e Gestione rifiuti l'attività deve costituire la **parte essenziale dell'attività generale**.
- **Esclusioni puntuali**: criteri esplicitamente fuori ambito.
- **Allegato III + IV**: identificazione delle PA NIS (art. 3 c. 6), identificazione autoritativa Allegato IV (4 tipologie: trasporto pubblico locale, istruzione con ricerca, attività culturale, in-house/partecipate D.Lgs. 175/2016).
- **13 servizi gestiti di sicurezza** (per Allegato I p. 9): NOC, MDR, IDS, IPS, IDR, EDR, XDR, SIEM, SOC, CSOC, CERT, VA/PT, Red Teaming.
- **Doppia identità delle ASL**: ASL = Allegato III (PA) **+** Allegato I p. 5 (Sanitario); aziende ospedaliere autonome dalle ASL; consigli regionali registrazione separata.

## Collegamenti

- [[concepts/Ambito di applicazione NIS2]]
- [[concepts/Soggetti essenziali e importanti]]
- [[concepts/Size-cap rule]]
- [[concepts/Identificazione dei soggetti NIS]]
