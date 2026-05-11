import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, notes, and build logs.",
};

export default function WritingPage() {
  const articles = getPublicContent("article");

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mt-6 mb-8">
          Writing
        </h1>

        {articles.length > 0 ? (
          <div className="space-y-0">
            {articles.map((item, i) => (
              <article
                key={item.slug}
                className={`py-5 ${i > 0 ? "border-t border-border-light" : ""}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] text-accent font-mono tracking-wider">
                    {item.tags[0] || "NOTE"}
                  </span>
                  {item.publishedAt && (
                    <span className="text-xs text-text-muted">
                      {item.publishedAt}
                    </span>
                  )}
                </div>
                <h2 className="font-mono text-sm font-bold">
                  {item.title}
                </h2>
                <p className="text-sm text-text-secondary mt-0.5">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">Coming soon.</p>
        )}
      </div>
    </div>
  );
}
