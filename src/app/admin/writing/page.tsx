import Link from "next/link";
import { listAllForAdmin } from "@/lib/repo/writings";

export default function AdminWritingList() {
  const items = listAllForAdmin().filter((w) => w.type === "writing");
  return <WritingLikeList items={items} type="writing" zh="文章" />;
}

export function WritingLikeList({
  items,
  type,
  zh,
}: {
  items: ReturnType<typeof listAllForAdmin>;
  type: "writing" | "log";
  zh: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="mono-heading text-2xl font-mono font-bold text-border">
            {type === "writing" ? "Writing" : "Build Log"}
          </h1>
          <p className="text-text-secondary font-mono text-sm">/ {zh}</p>
        </div>
        <Link
          href={`/admin/${type}/new`}
          className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="panel divide-y divide-border-light">
        {items.length === 0 && (
          <p className="p-4 text-sm text-text-secondary">
            No {type} entries yet.
          </p>
        )}
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/${type}/${item.slug}`}
            className="block p-4 hover:bg-bg/50 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <span
                className={`text-[10px] font-mono tracking-wider ${
                  item.status === "published"
                    ? "text-accent"
                    : "text-text-muted"
                }`}
              >
                {item.status.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {item.visibility}
              </span>
              {item.publishedAt && (
                <span className="text-[10px] font-mono text-text-muted">
                  {item.publishedAt}
                </span>
              )}
              {item.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-text-muted"
                >
                  #{t}
                </span>
              ))}
            </div>
            <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
              {item.title}
            </p>
            {item.summary && (
              <p className="text-xs text-text-secondary mt-0.5 truncate">
                {item.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
