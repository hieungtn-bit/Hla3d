import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPost, journal } from "@/data/journal";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/structured-data";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — HLA3D`,
      description: post.excerpt,
      publishedTime: post.date,
      url: absoluteUrl(`/journal/${post.slug}`),
      images: ["/og.png"],
    },
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = journal.findIndex((p) => p.slug === slug);
  const next = journal[(index + 1) % journal.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: `${site.name} — ${post.author}` },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Nhật ký", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />

      <article className="container-hla max-w-3xl py-12 sm:py-16">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-flame"
        >
          <ArrowLeft className="size-4" />
          Nhật ký
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={post.tag === "Thất bại" ? "flame" : "tint"}>{post.tag}</Badge>
            <span className="font-mono text-xs text-ink-3">{post.displayDate}</span>
            <span className="text-xs text-ink-3">· {post.readingTime}</span>
          </div>
          <p className="eyebrow mt-6 text-flame">{post.kicker}</p>
          <h1 className="display mt-3 text-[clamp(2.25rem,6vw,3.75rem)]">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>
          <p className="mt-6 border-t border-line pt-5 text-sm text-ink-3">{post.author} viết</p>
        </header>

        <div className="mt-10 space-y-6">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <Reveal key={i}>
                  <h2 className="display mt-10 text-2xl sm:text-3xl">{block.text}</h2>
                </Reveal>
              );
            }
            if (block.type === "quote") {
              return (
                <Reveal key={i}>
                  <blockquote className="my-8 rounded-[var(--radius-card)] border-l-4 border-flame bg-paper-2 p-6">
                    <p className="font-display text-lg leading-snug font-bold tracking-tight text-ink">
                      {block.text}
                    </p>
                  </blockquote>
                </Reveal>
              );
            }
            if (block.type === "list") {
              return (
                <Reveal key={i}>
                  <ul className="space-y-3 rounded-[var(--radius-card)] border border-line-soft bg-surface p-6">
                    {block.items?.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-flame" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <p className="text-[1.0625rem] leading-[1.75] text-ink-2">{block.text}</p>
              </Reveal>
            );
          })}
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <span className="eyebrow text-ink-3">Đọc tiếp</span>
          <Link href={`/journal/${next.slug}`} className="group mt-4 flex items-center justify-between gap-6">
            <span className="display text-2xl transition-colors group-hover:text-flame sm:text-3xl">
              {next.title}
            </span>
            <ArrowRight className="size-6 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-flame" />
          </Link>
        </footer>
      </article>
    </>
  );
}
