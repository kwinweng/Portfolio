import type { Metadata } from "next";
import Link from "next/link";
import { listWritings } from "@/lib/repo/writings";
import { estimateReadingMinutes } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Build Log / 开发日志",
  description: "Development updates and project progress.",
};

export default function LogPage() {
  const logs = listWritings("log");

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
          Build Log
        </h1>
        <p className="text-text-secondary mb-8 font-mono text-sm">/ 开发日志</p>

        {logs.length > 0 ? (
          <div className="space-y-0">
            {logs.map((item, i) => {
              const minutes = estimateReadingMinutes(item.body);
              return (
                <Link
                  key={item.slug}
                  href={`/log/${item.slug}`}
                  className={`flex gap-4 py-4 group ${
                    i > 0 ? "border-t border-border-light" : ""
                  } hover:bg-bg/50 transition-colors -mx-2 px-2`}
                >
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-text-muted">
                        {item.publishedAt}
                      </span>
                      {item.tags[0] && (
                        <span className="text-[10px] text-accent font-mono tracking-wider">
                          {item.tags[0].toUpperCase()}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-text-muted">
                        · {minutes} min
                      </span>
                    </div>
                    <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
                      {item.title}
                    </p>
                    {item.summary && (
                      <p className="text-sm text-text-secondary mt-0.5">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-text-secondary">No logs yet.</p>
        )}
      </div>
    </div>
  );
}
