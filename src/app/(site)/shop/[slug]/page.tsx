import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getRelated, products } from "@/data/products";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/structured-data";

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
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} — HLA3D`,
      description: product.tagline,
      type: "website",
      url: absoluteUrl(`/shop/${product.slug}`),
      images: ["/og.png"],
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
      url: absoluteUrl(`/shop/${product.slug}`),
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Cửa hàng", path: "/shop" },
          { name: product.name, path: `/shop/${product.slug}` },
        ])}
      />

      <div className="container-hla py-10 sm:py-14">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-flame"
        >
          <ArrowLeft className="size-4" />
          Về cửa hàng
        </Link>

        <div className="mt-8">
          <ProductDetail product={product} />
        </div>
      </div>

      <section className="border-t border-line bg-paper-2 py-20">
        <div className="container-hla">
          <h2 className="display text-[clamp(1.75rem,4vw,2.5rem)]">MÓN KHÁC TỪ XƯỞNG</h2>
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
