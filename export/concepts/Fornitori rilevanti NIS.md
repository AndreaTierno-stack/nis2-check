---
title: Fornitori rilevanti NIS
type: concept
scope: both
tags: [nis2, italia, supply-chain, art-3, fornitori]
sources: ["[[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]", "[[sources/D.Lgs. 138-2024 (Decreto NIS)]]", "[[sources/FAQ NIS - Aggiornamento delle informazioni]]"]
aliases: [Fornitori rilevanti, Fornitori critici NIS]
---

## Definizione

Soggetti che **assicurano la fornitura di servizi o di prodotti a un soggetto NIS** e che soddisfano almeno uno dei criteri di **rilevanza** stabiliti dall'art. 1 c. 1 lett. ll) della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13]]:

1. **Fornitura ICT** — la fornitura è riconducibile alle attività o ai servizi di cui all'**Allegato I, punti 8 e 9**, del decreto NIS (settori dell'infrastruttura digitale e servizi ICT).
2. **Fornitura non fungibile** — l'interruzione o la compromissione della fornitura comporterebbe un **impatto significativo** sulla capacità del soggetto NIS di erogare i propri servizi NIS, anche per effetto della **indisponibilità di fornitori alternativi**.

## Base giuridica

- Art. **3 c. 9 lett. f)** del [[sources/D.Lgs. 138-2024 (Decreto NIS)]] — abilita la richiesta di queste informazioni per individuare gli **elementi sistemici della catena di approvvigionamento, anche digitale**, di uno o più soggetti essenziali o importanti.
- Art. **18** della determinazione piattaforma — disciplina di dettaglio dell'elencazione.

## Cosa si elenca

Ciascun fornitore rilevante NIS è descritto, nel "Servizio NIS/Aggiornamento annuale informazioni", da:

- **denominazione**;
- **codice fiscale**;
- **paese sede legale**;
- **codici CPV** (Common Procurement Vocabulary, Reg. CE n. 2195/2002) relativi alle forniture di cui fruisce il soggetto NIS;
- **criterio di rilevanza utilizzato** (uno dei due sopra).

## Tempi

- Aggiornamento nell'ambito dell'**[[concepts/Aggiornamento annuale informazioni|aggiornamento annuale]]**: dal 15 aprile al 31 maggio di ogni anno (art. 16 c. 3 lett. g)).
- Modifiche sopravvenute: **aggiornamento continuo** entro 14 giorni.

## Funzione

- Permette ad ACN di costruire una **mappatura sistemica della supply chain digitale** dei soggetti NIS, individuando i fornitori chiave nei settori critici.
- *Sintesi dell'agente:* è anche pre-condizione per l'esercizio del potere ex art. 3 c. 9 decreto NIS di **identificare ulteriori soggetti** che, pur non rientrando nelle tipologie automatic, hanno rilevanza sistemica come fornitori. Si profila un **secondo cerchio NIS by induction**.

## Tassonomia CPV (FAQ Aggiornamento `FRN.2`–`FRN.4`)

La FAQ ACN [[sources/FAQ NIS - Aggiornamento delle informazioni]] esplicita le **categorie CPV ammissibili** ai fini dell'identificazione dei fornitori rilevanti:

- **Forniture non-fungibili — energia / connettività**: tabella CPV per servizi essenziali (es. energia elettrica, gas, telecomunicazioni di backbone) la cui interruzione comprometterebbe l'erogazione del servizio NIS.
- **Forniture ICT — infrastrutture digitali (Allegato I p. 8)**: 8 categorie CPV (servizi cloud, data center, CDN, DNS, registri TLD, servizi fiduciari, comunicazioni elettroniche pubbliche, IXP).
- **Forniture ICT — servizi gestiti e di sicurezza gestiti (Allegato I p. 9)**: CPV per i 13 servizi gestiti di sicurezza (NOC, MDR, IDS, IPS, IDR, EDR, XDR, SIEM, SOC, CSOC, CERT, VA/PT, Red Teaming) + servizi gestiti generici.

Riferimento normativo: **art. 18 della [[sources/Determinazione ACN piattaforma e procedure - 2026-04-13|Det. ACN 127437/2026]]** (citato esplicitamente nelle FAQ `FRN.2` e `FRN.3`).

## Collegamenti

- [[concepts/Identificazione dei soggetti NIS]]
- [[concepts/Aggiornamento annuale informazioni]]
- [[concepts/Misure di gestione del rischio cyber]] — la sicurezza della catena di approvvigionamento è uno dei 10 ambiti minimi (art. 24)
- [[concepts/Settori altamente critici e critici]]
