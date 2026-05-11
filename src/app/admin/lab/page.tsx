import Link from "next/link";
import { listLab } from "@/lib/repo/lab";

export default function AdminLabList() {
  const items = listLab({ includeUnlisted: true, includePrivate: true });
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="mono-heading text-2xl font-mono font-bold text-border">
            Lab
          </h1>
          <p className="text-text-secondary font-mono text-sm">/ 实验室</p>
        </div>
        <Link
          href="/admin/lab/new"
          className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="panel divide-y divide-border-light">
        {items.length === 0 && (
          <p className="p-4 text-sm text-text-secondary">No lab items.</p>
        )}
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/lab/${item.slug}`}
            className="block p-4 hover:bg-bg/50 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <span className="text-[10px] font-mono text-accent tracking-wider">
                {item.kind.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {item.status}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {item.visibility}
              </span>
              {item.href && (
                <span className="text-[10px] font-mono text-accent">↗ external</span>
              )}
            </div>
            <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
              {item.title}
            </p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
