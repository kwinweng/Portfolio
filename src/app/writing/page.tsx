import type { Metadata } from "next";
import Link from "next/link";
import { listWritings } from "@/lib/repo/writings";
import { estimateReadingMinutes } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Writing / 文章",
  description: "Essays, notes, and field reports.",
};

export default function WritingPage() {
  const articles = listWritings("writing");

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mt-6 mb-2 text-border">
          Writing
        </h1>
        <p className="text-text-secondary mb-8 font-mono text-sm">/ 文章</p>

        {articles.length > 0 ? (
          <div className="space-y-0">
            {articles.map((item, i) => {
              const minutes = estimateReadingMinutes(item.body);
              return (
                <Link
                  key={item.slug}
                  href={`/writing/${item.slug}`}
                  className={`block group py-5 ${
                    i > 0 ? "border-t border-border-light" : ""
                  } hover:bg-bg/50 transition-colors -mx-2 px-2`}
                >
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-[10px] text-accent font-mono tracking-wider">
                      {(item.tags[0] || "note").toUpperCase()}
                    </span>
                    {item.publishedAt && (
                      <span className="text-xs font-mono text-text-muted">
                        {item.publishedAt}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-text-muted">
                      · {minutes} min
                    </span>
                  </div>
                  <h2 className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  {item.summary && (
                    <p className="text-sm text-text-secondary mt-0.5">
                      {item.summary}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-text-secondary">Coming soon.</p>
        )}
      </div>
    </div>
  );
}
