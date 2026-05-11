import type { Metadata } from "next";
import Link from "next/link";
import { readingItems, TOPIC_LABELS, type ReadingTopic } from "@/data/reading";

export const metadata: Metadata = {
  title: "Reading / 阅读",
  description: "Curated reading on AI, craft, design, and work.",
};

const TOPIC_ORDER: ReadingTopic[] = ["ai", "craft", "design", "work", "philosophy"];

export default function ReadingPage() {
  const byTopic = TOPIC_ORDER.map((topic) => ({
    topic,
    items: readingItems.filter((r) => r.topic === topic),
  })).filter((g) => g.items.length > 0);

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
          Reading
        </h1>
        <p className="text-text-secondary mb-2 font-mono text-sm">/ 阅读</p>
        <p className="text-text-secondary text-sm mb-10 max-w-xl leading-relaxed">
          我读过且愿意推荐的书与文章。每条都附一句自己的解读 —
          因为读了什么不重要，读完之后多了什么角度才重要。
        </p>

        <div className="space-y-10">
          {byTopic.map(({ topic, items }) => (
            <section key={topic}>
              <h2 className="text-[10px] font-mono text-accent tracking-wider mb-4">
                {TOPIC_LABELS[topic]}
              </h2>
              <div className="space-y-0">
                {items.map((item, i) => (
                  <article
                    key={item.title}
                    className={`py-4 ${
                      i > 0 ? "border-t border-border-light" : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm font-bold hover:text-accent transition-colors"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        <span className="font-mono text-sm font-bold">
                          {item.title}
                        </span>
                      )}
                      <span className="text-xs text-text-muted">
                        {item.author}
                      </span>
                      {item.finishedAt && (
                        <span className="text-[10px] font-mono text-text-muted">
                          {item.finishedAt}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
