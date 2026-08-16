/**
 * Canonical origin for metadataBase, sitemap, robots and JSON-LD.
 *
 * SERVER ONLY. This deliberately lives outside `@/data/site`, because that
 * module is imported by client components — and the Vercel env vars below are
 * not inlined into the browser bundle, so reading them there would silently
 * resolve to localhost in production.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — set this once the real domain is live.
 *   2. The Vercel domain, so deployments emit correct absolute URLs instead of
 *      pointing at a domain we do not own yet.
 *   3. localhost, for `next dev`.
 */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
