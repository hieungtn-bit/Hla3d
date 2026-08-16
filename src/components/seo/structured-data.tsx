import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { site } from "@/data/site";

/**
 * Structured data, server-rendered.
 *
 * Only facts we actually hold go in here. No aggregateRating, no review, no
 * SKU, no shippingDetails, no telephone or postal address — inventing any of
 * them to satisfy a schema validator is exactly the kind of spam that gets a
 * small site penalised, and two of those fields would also publish private
 * family information.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: site.name,
    url: siteUrl(),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/og.png"),
    description: site.descriptionVi,
    foundingDate: String(site.founded),
    areaServed: "VN",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: site.name,
    url: siteUrl(),
    inLanguage: "vi-VN",
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
