/**
 * Release stage of the build (S4.2, block 3), read at build time from NIS2_RELEASE_STAGE.
 * Default "preview": until the v0.1.0 tag every page carries <meta name="robots"
 * content="noindex, nofollow"> and robots.txt disallows everything. Only the value "public"
 * lifts both; it is set at release time (docs/RELEASE_CHECKLIST.md). No environment variable
 * is configured on Vercel, so every deploy is a preview until that decision.
 */
export type ReleaseStage = "preview" | "public";

export const RELEASE_STAGE: ReleaseStage = process.env.NIS2_RELEASE_STAGE === "public" ? "public" : "preview";

export const isIndexable = (stage: ReleaseStage = RELEASE_STAGE): boolean => stage === "public";

/**
 * Definitive public URL of the tool, for the README and the links of its notice block.
 * Undefined until the release act (docs/RELEASE_CHECKLIST.md): the README carries a marked placeholder.
 */
export const PUBLIC_URL: string | undefined = undefined;
