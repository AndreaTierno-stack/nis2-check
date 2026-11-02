/**
 * Release stage of the build (S4.2, block 3), read at build time from NIS2_RELEASE_STAGE.
 * Default "preview": until the v0.1.0 tag every page carries <meta name="robots"
 * content="noindex, nofollow"> and robots.txt disallows everything. Only the value "public"
 * lifts both. Since the release act of v0.1.0 (2026-11-02) the Vercel project sets
 * NIS2_RELEASE_STAGE=public for the Production environment only: previews stay noindex
 * (docs/RELEASE_CHECKLIST.md).
 */
export type ReleaseStage = "preview" | "public";

export const RELEASE_STAGE: ReleaseStage = process.env.NIS2_RELEASE_STAGE === "public" ? "public" : "preview";

export const isIndexable = (stage: ReleaseStage = RELEASE_STAGE): boolean => stage === "public";

/**
 * Definitive public URL of the tool, for the README and the links of its notice block.
 * Set at the release act of v0.1.0 (2026-11-02, docs/RELEASE_CHECKLIST.md): Vercel alias of the
 * production deployment.
 */
export const PUBLIC_URL: string | undefined = "https://ambito-nis2.vercel.app";
