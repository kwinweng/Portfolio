import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Development updates and project progress.",
};

export default function LogPage() {
  const logs = getPublicContent("log");

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
          Build Log
        </h1>

        {logs.length > 0 ? (
          <div className="space-y-0">
            {logs.map((item, i) => (
              <div
                key={item.slug}
                className={`flex gap-4 py-4 ${
                  i > 0 ? "border-t border-border-light" : ""
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-text-muted">
                      {item.publishedAt}
                    </span>
                    {item.tags[0] && (
                      <span className="text-[10px] text-accent font-mono tracking-wider">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-sm font-bold">
                    {item.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No logs yet.</p>
        )}
      </div>
    </div>
  );
}
