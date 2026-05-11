import Link from "next/link";
import { listAllProjectsForAdmin } from "@/lib/repo/projects";

export default function AdminProjectsList() {
  const projects = listAllProjectsForAdmin();
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="mono-heading text-2xl font-mono font-bold text-border">
            Projects
          </h1>
          <p className="text-text-secondary font-mono text-sm">/ 项目</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="panel divide-y divide-border-light">
        {projects.length === 0 && (
          <p className="p-4 text-sm text-text-secondary">No projects yet.</p>
        )}
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/projects/${p.slug}`}
            className="block p-4 hover:bg-bg/50 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <span className="text-[10px] font-mono text-accent tracking-wider">
                {p.priority}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {p.status}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {p.visibility}
              </span>
              {p.featured && (
                <span className="text-[10px] font-mono text-accent">★ featured</span>
              )}
            </div>
            <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
              {p.title}
            </p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">
              {p.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
