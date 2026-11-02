/**
 * Navigation and structure strings of the web app, in Italian. Every normative text
 * (questions, help, outcomes, notices, trace, sources) comes from the corpus or the
 * citation registry, never from here. Checked by the copy lint of ADR 0012
 * (lintUiCopy of @nis2-check/corpus): no categorical or prescriptive wording, no long dash.
 */
export const copy = {
  meta: {
    title: "Ambito NIS2: pre-screening dell'ambito NIS2 italiano",
    description: "Anteprima di studio open source di pre-screening dell'ambito NIS2 italiano. Non è un parere legale.",
  },
  brand: "Ambito NIS2",
  steps: { sector: "Settore", questions: "Domande", verdict: "Esito" },
  newEvaluation: "Nuova valutazione",
  footer: {
    method: "Fonti e metodo",
    source: "Codice sorgente",
  },
  clickWrap: {
    title: "Prima di iniziare",
    accept: "Ho letto l'avviso e proseguo",
    proceed: "Prosegui",
  },
  sector: {
    title: "Per quale settore vuoi una prima valutazione?",
    subtitle: "Tre settori pilota. Le domande cambiano in base al settore scelto.",
    choose: "Scegli",
  },
  questions: {
    progress: (current: number, total: number) => `Domanda ${current} di ${total}`,
    back: "Indietro",
    next: "Avanti",
    finish: "Calcola l'esito",
    yes: "Sì",
    no: "No",
    optional: "Facoltativa: puoi proseguire senza selezionare nulla.",
    invalidTitle: "Alcune risposte vanno completate",
    invalidText: "L'esito non è stato calcolato. Completa o correggi queste domande:",
    goTo: "Vai alla domanda",
  },
  verdict: {
    banner: "Anteprima di studio: non è un parere legale e non sostituisce la registrazione sulla piattaforma ACN.",
    title: "Esito del pre-screening",
    scale: { likely_out_of_scope: "Probabile esclusione", ambiguous: "Esito incerto", likely_in_scope: "Probabile rientro" },
    advisor: "Verifica obbligatoria con consulente qualificato prima di assumere conclusioni operative.",
    showTrace: "Mostra come è stato calcolato",
    hideTrace: "Nascondi come è stato calcolato",
    facts: { tipologia: "Tipologia", qualifica: "Qualifica suggerita", regimi: "Regimi speciali" },
    qualificaNone: "Non determinata",
    regimiNone: "Nessuno",
    noticesTitle: (n: number) => (n === 1 ? "1 punto da valutare con un consulente" : `${n} punti da valutare con un consulente`),
    status: {
      segnalato: "Segnalato, non valutato dal tool",
      gestito: "Gestito dal tool",
      non_gestito: "Non gestito dal tool",
    },
    traceTitle: "Come è stato calcolato",
    stages: {
      regime_routing: "Regimi speciali",
      type_exclusion: "Esclusioni per tipologia",
      size_blind: "Regole indipendenti dalla dimensione",
      dimensional: "Regole dimensionali",
    },
    reasons: {
      not_matched: "Non applicabile alle risposte date.",
      suspended: "Non valutato: decide un regime speciale.",
      not_evaluated: "Non valutato: un altro passaggio ha deciso prima.",
      dimension_not_evaluated: "Non valutato: le attività dichiarate risultano escluse per tipologia.",
      demoted: "Non decisivo: tra le attività dichiarate ce n'è almeno una senza esclusione.",
      conflict: "Due passaggi danno esiti diversi: decide la regola sui conflitti.",
    },
    sourcesTitle: "Fonti citate in questo esito",
    sourcesSubtitle: "Citate al livello verificato: articolo e comma, o codice FAQ. Ogni voce apre la scheda nella knowledge base.",
    groups: {
      decreto_nis: "Decreto NIS (D.Lgs. 138/2024)",
      faq_acn: "FAQ ACN",
      determinazioni_acn: "Determinazioni ACN",
      altro: "Altre fonti",
    },
    sourceLink: "Apri la scheda",
  },
  sidebar: {
    answersTitle: "Le risposte date",
    edit: "Modifica le risposte",
    editOne: "Modifica",
    pdf: "Scarica PDF",
    pdfHint: "Si apre la finestra di stampa del browser: scegli \"Salva come PDF\".",
    companyLabel: "Nome azienda analizzata (facoltativo)",
    companyHelp: "Compare solo nella copertina del PDF. Non viene salvato e non lascia il browser.",
    limits: "Cosa non gestisce il tool",
    comingSoon: "in arrivo",
    tech: (version: string, catalog: number, hash: string) =>
      `Corpus ${version}, catalogo eccezioni ${catalog} voci. Valutazione ${hash}. Nessun dato lascia il browser.`,
    none: "Nessuna selezione",
  },
  /** Printed Verdict (ADR 0018): cover, repeated header, answers, limits of the path. */
  print: {
    docTitle: "Esito preliminare di verifica dell'ambito NIS2",
    company: "Nome azienda analizzata",
    sector: "Settore",
    evaluatedAt: "Data e ora della valutazione",
    italianTime: "ora italiana",
    corpus: "Versione del corpus",
    corpusRelease: (version: string, date?: string) => (date ? `${version}, rilasciata il ${date}` : version),
    code: "Codice della valutazione",
    header: (hash: string) => `Valutazione ${hash}`,
    summaryPart: "Parte sintetica",
    technicalPart: "Parte tecnica, per il consulente",
    answersSubtitle: (hash: string) =>
      `Input della valutazione ${hash}: con le stesse risposte e la stessa versione del corpus lo strumento restituisce lo stesso esito.`,
    limitsTitle: "Cosa non gestisce il tool",
    limitsIntro:
      "Limiti dichiarati dello strumento, dal catalogo eccezioni: le voci segnalate per il settore valutato e tutte le voci non gestite. Ogni voce resta da valutare con un consulente qualificato.",
    raised: "Emerso da questa valutazione",
    fileTitle: (hash: string) => `Esito preliminare ambito NIS2 ${hash}`,
  },
  /** Names of the acts, for the references of the "Fonti" section (formatted from the citation id). */
  acts: {
    dlgs_138_2024: "D.Lgs. 138/2024",
    dlgs_134_2024: "D.Lgs. 134/2024",
    dlgs_175_2016: "D.Lgs. 175/2016",
    dl_105_2019: "D.L. 105/2019",
    l90_2024: "L. 90/2024",
    l_196_2009: "L. 196/2009",
    dir_nis2: "Dir. (UE) 2022/2555",
    dir_ue_2019_944: "Dir. (UE) 2019/944",
    reg_ue_2022_2554: "Reg. (UE) 2022/2554",
    reg_ue_2024_2690: "Reg. (UE) 2024/2690",
    racc_ue_2003_361: "Racc. 2003/361/CE",
    dm_mase_106_2023: "DM MASE 106/2023",
    dpcm_221_2024: "DPCM 221/2024",
    dd_acn_21007_24: "DD ACN 21007/24",
    det_acn_155238_2026: "Det. ACN 155238/2026",
    det_acn_379907_2025: "Det. ACN 379907/2025",
    det_piattaforma_127437_2026: "Det. ACN 127437/2026",
    faq: "FAQ ACN",
    faq_settori_sottosettori: "FAQ ACN Settori, sottosettori e tipologie di soggetto",
  },
} as const;

/** Every string of `copy`, flattened with its path (functions are called with sample arguments), for the copy lint. */
export function copyStrings(node: unknown = copy, path = "copy"): Record<string, string> {
  if (typeof node === "string") return { [path]: node };
  if (typeof node === "function") return { [path]: String((node as (...a: unknown[]) => unknown)(1, 2, "x")) };
  if (node && typeof node === "object") {
    return Object.assign({}, ...Object.entries(node).map(([k, v]) => copyStrings(v, `${path}.${k}`)));
  }
  return {};
}
