import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journal } from "@/data/journal";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function JournalCard({
  post,
  featured = false,
}: {
  post: (typeof journal)[number];
  featured?: boolean;
}) {
  return (
    <Reveal
      as="article"
      className={cn(
        "group relative flex flex-col rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        "shadow-[var(--shadow-soft)]",
        featured && "sm:p-8",
      )}
    >
      <div className="flex items-center gap-3">
        <Badge variant={post.tag === "Thất bại" ? "flame" : "outline"}>{post.tag}</Badge>
        <span className="font-mono text-xs text-ink-3">{post.displayDate}</span>
      </div>

      <h3
        className={cn(
          "display mt-5 text-ink",
          featured ? "text-[clamp(1.75rem,3.4vw,2.5rem)]" : "text-xl",
        )}
      >
        <Link href={`/journal/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h3>

      <p className={cn("mt-4 leading-relaxed text-ink-2", featured ? "text-base sm:text-lg" : "text-sm")}>
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="text-xs text-ink-3">
          {post.author} · {post.readingTime}
        </span>
        <ArrowUpRight className="size-4 text-ink-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-flame" />
      </div>
    </Reveal>
  );
}

export function JournalPreview() {
  const [featured, ...rest] = journal.slice(0, 3);
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-2">
      <JournalCard post={featured} featured />
      <div className="grid gap-6">
        {rest.map((post) => (
          <JournalCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
