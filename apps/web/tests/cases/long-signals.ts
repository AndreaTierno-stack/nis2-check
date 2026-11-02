/**
 * Case with long signals for the pagination of the printed verdict (PDF checked on Firefox by the
 * author, 2026-11-02): cloud, critical entity, DORA yes, managed services, in-house company of a
 * L. 90/2024 subject. Four signals and three notices. Not a golden fixture: the outcome is
 * covered by the engine; here it only feeds the print tests (unit and e2e).
 */
export const LONG_SIGNALS = {
  sector: "cloud_computing",
  inputs: {
    psnc: "no",
    dora: "yes",
    cloud_pa: "no",
    pertinenza_pubblica_cloud: "yes",
    tipo_partecipazione_pubblica: "inhouse_soggetto_l90",
    fornisce_servizi_gestiti_b2b: "yes",
    dimension: "media",
    soggetto_critico: "yes",
  } as Record<string, string>,
};
