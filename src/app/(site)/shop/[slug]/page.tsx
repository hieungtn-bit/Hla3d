import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getRelated, products } from "@/data/products";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: `${product.tagline} ${product.description.slice(0, 120)}…`,
    openGraph: {
      title: `${product.name} — HLA3D`,
      description: product.tagline,
      type: "website",
      url: `${siteUrl()}/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(slug, 4);

  /* Product schema so search engines can read price and availability. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    material: product.material,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: "https://schema.org/MadeToOrder",
      url: `${siteUrl()}/shop/${product.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-hla py-10 sm:py-14">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-flame"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>

        <div className="mt-8">
          <ProductDetail product={product} />
        </div>
      </div>

      <section className="border-t border-line bg-paper-2 py-20">
        <div className="container-hla">
          <h2 className="display text-[clamp(1.75rem,4vw,2.5rem)]">MORE FROM THE LAB</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
