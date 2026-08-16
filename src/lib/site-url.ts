/**
 * The single source of truth for the canonical origin.
 *
 * Used by metadataBase, every canonical tag, Open Graph, the sitemap, robots
 * and all JSON-LD. Nothing else in the codebase may hard-code a host.
 *
 * SERVER ONLY. This deliberately lives outside `@/data/site`, because that
 * module is imported by client components and `VERCEL_*` env vars are not
 * inlined into the browser bundle — reading them there resolves to localhost
 * in production.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override, if one is ever needed.
 *   2. PRODUCTION_URL — the real domain. Hard-coded on purpose: the project's
 *      auto-assigned *.vercel.app alias must never leak into a canonical tag
 *      or the sitemap, and VERCEL_PROJECT_PRODUCTION_URL returns exactly that
 *      alias. That is what previously published hla3d-site.vercel.app URLs.
 *   3. VERCEL_URL — preview deployments, so a preview links to itself.
 *   4. localhost, for `next dev`.
 */

/** The official production domain. Change this in one place only. */
export const PRODUCTION_URL = "https://hla3d.fun";

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // A preview deployment is also NODE_ENV=production, so let previews point at
  // themselves rather than advertise the live domain.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return PRODUCTION_URL;
  }

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return "http://localhost:3000";
}

/** Absolute URL for a site-relative path. Use this for every public link. */
export function absoluteUrl(path = "/") {
  const base = siteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
