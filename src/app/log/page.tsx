import type { Metadata } from "next";
import { getPublicContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Development updates and project progress.",
};

export default function LogPage() {
  const logs = getPublicContent("log");

  return (
    <div className="pt-32 pb-32 sm:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] tracking-tight">
            Build Log
          </h1>
          <p className="text-ash-text mt-3 text-lg">
            Development updates, milestones, and project progress.
          </p>
        </div>

        {logs.length > 0 ? (
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gunmetal" />
            <div className="space-y-8">
              {logs.map((item) => (
                <div key={item.slug} className="flex gap-6">
                  <div className="w-4 h-4 rounded-full bg-midnight-base border-2 border-interactive-glow shrink-0 mt-1 relative z-10" />
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-1">
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
                    <h3 className="text-ghost-white font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ash-text mt-1">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-ghost p-12 text-center">
            <p className="text-ash-text">No logs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
