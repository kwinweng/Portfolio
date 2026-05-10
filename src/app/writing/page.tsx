import type { Metadata } from "next";
import { getPublicContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles on AI, product building, and investment workflows.",
};

export default function WritingPage() {
  const articles = getPublicContent("article");

  return (
    <div className="pt-32 pb-32 sm:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] tracking-tight">
            Writing
          </h1>
          <p className="text-ash-text mt-3 text-lg">
            Articles on AI systems, product building, and investment workflows.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((item) => (
              <article
                key={item.slug}
                className="py-6 border-b border-gunmetal last:border-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-text">
                    {item.publishedAt}
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-gunmetal text-slate-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-medium text-ghost-white">
                  {item.title}
                </h2>
                <p className="text-sm text-ash-text mt-2">{item.summary}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-ghost p-12 text-center">
            <p className="text-ash-text">Coming soon.</p>
            <p className="text-sm text-slate-text mt-2">
              Articles on AI agent development, relay workflows, and building
              personal AI systems.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
