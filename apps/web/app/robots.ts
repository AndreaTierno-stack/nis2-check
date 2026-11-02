import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/release";

// static export: robots.txt is written at build time
export const dynamic = "force-static";

/** robots.txt: disallow everything until the release stage is "public" (lib/release.ts). */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(isIndexable() ? { allow: "/" } : { disallow: "/" }) } };
}
