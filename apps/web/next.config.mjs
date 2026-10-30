/**
 * Static export: the wizard runs entirely client-side (CLAUDE.md, Architettura),
 * so no Next.js server is deployed. This also keeps the server-side attack
 * surface of Next.js (Server Actions, Image Optimization API, RSC endpoints)
 * out of the deployed artifact.
 *
 * The workspace packages ship TypeScript sources: Next transpiles them.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@nis2-check/engine", "@nis2-check/corpus"],
};

export default nextConfig;
