import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  listWritings,
  getWriting,
  getAdjacentWritings,
} from "@/lib/repo/writings";
import { MDXBody } from "@/components/mdx-body";
import { estimateReadingMinutes } from "@/lib/reading-time";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listWritings("log", { includeUnlisted: true }).map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWriting("log", slug, { includeUnlisted: true });
  if (!item) return { title: "Not Found" };
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function LogDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getWriting("log", slug, { includeUnlisted: true });
  if (!item) notFound();

  const { prev, next } = getAdjacentWritings("log", slug);
  const readingMinutes = estimateReadingMinutes(item.body);

  return (
    <article className="max-w-2xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/log"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← Build Log / 开发日志
        </Link>

        <header className="mt-6 mb-8 pb-6 border-b border-border-light">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-accent" />
            {item.publishedAt && (
              <span className="text-xs font-mono text-text-muted">
                {item.publishedAt}
              </span>
            )}
            {item.tags[0] && (
              <span className="text-[10px] text-accent font-mono tracking-wider">
                {item.tags[0].toUpperCase()}
              </span>
            )}
            <span className="text-xs font-mono text-text-muted">
              · {readingMinutes} min read
            </span>
          </div>
          <h1 className="mono-heading text-2xl sm:text-3xl font-mono font-bold text-border">
            {item.title}
          </h1>
          {item.summary && (
            <p className="text-text-secondary mt-3 leading-relaxed text-sm">
              {item.summary}
            </p>
          )}
        </header>

        <div className="prose-content">
          <MDXBody source={item.body} />
        </div>

        {(prev || next) && (
          <nav className="mt-12 pt-6 border-t border-border-light grid grid-cols-2 gap-4">
            <div>
              {prev && (
                <Link href={`/log/${prev.slug}`} className="block group">
                  <p className="text-[10px] font-mono text-text-muted tracking-wider mb-1">
                    ← PREV / 上一条
                  </p>
                  <p className="text-sm font-mono font-bold group-hover:text-accent transition-colors">
                    {prev.title}
                  </p>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/log/${next.slug}`} className="block group">
                  <p className="text-[10px] font-mono text-text-muted tracking-wider mb-1">
                    NEXT / 下一条 →
                  </p>
                  <p className="text-sm font-mono font-bold group-hover:text-accent transition-colors">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </article>
  );
}
