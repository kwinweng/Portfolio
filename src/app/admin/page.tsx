import Link from "next/link";
import { countWritings } from "@/lib/repo/writings";
import { countProjects } from "@/lib/repo/projects";
import { countReading } from "@/lib/repo/reading";
import { countLab } from "@/lib/repo/lab";
import { listAllForAdmin } from "@/lib/repo/writings";

export default function AdminDashboard() {
  const writings = countWritings();
  const projects = countProjects();
  const reading = countReading();
  const lab = countLab();
  const recent = listAllForAdmin().slice(0, 6);
  const drafts = listAllForAdmin().filter((w) => w.status === "draft");

  const stats = [
    { label: "Writing", value: writings.writing, href: "/admin/writing" },
    { label: "Log", value: writings.log, href: "/admin/log" },
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Reading", value: reading, href: "/admin/reading" },
    { label: "Lab", value: lab, href: "/admin/lab" },
    { label: "Drafts", value: drafts.length, href: "/admin/writing?status=draft" },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mono-heading text-2xl font-mono font-bold text-border mb-1">
          Dashboard
        </h1>
        <p className="text-text-secondary font-mono text-sm">/ 仪表盘</p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="panel p-4 hover:border-accent transition-colors"
          >
            <p className="text-2xl font-bold font-mono">{s.value}</p>
            <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mt-1">
              {s.label}
            </p>
          </Link>
        ))}
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-mono text-sm font-bold">
            Recent
            <span className="text-xs text-text-muted font-normal ml-2">
              / 最近
            </span>
          </h2>
        </div>
        <div className="panel divide-y divide-border-light">
          {recent.length === 0 && (
            <p className="p-4 text-sm text-text-secondary">
              No entries yet. Create your first one →{" "}
              <Link href="/admin/writing" className="text-accent underline">
                Writing
              </Link>
            </p>
          )}
          {recent.map((item) => (
            <Link
              key={`${item.type}/${item.slug}`}
              href={`/admin/${item.type}/${item.slug}`}
              className="block p-4 hover:bg-bg/50 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="text-[10px] font-mono text-accent tracking-wider">
                  {item.type.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-text-muted">
                  {item.status}
                </span>
                <span className="text-[10px] font-mono text-text-muted">
                  {item.visibility}
                </span>
                {item.publishedAt && (
                  <span className="text-[10px] font-mono text-text-muted">
                    {item.publishedAt}
                  </span>
                )}
              </div>
              <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-mono text-sm font-bold mb-3">
          Quick actions
          <span className="text-xs text-text-muted font-normal ml-2">
            / 快捷入口
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/writing/new"
            className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
          >
            + New writing
          </Link>
          <Link
            href="/admin/log/new"
            className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
          >
            + New log
          </Link>
          <Link
            href="/admin/projects/new"
            className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
          >
            + New project
          </Link>
          <Link
            href="/admin/reading/new"
            className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
          >
            + New reading item
          </Link>
          <Link
            href="/admin/lab/new"
            className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-accent hover:border-accent hover:text-bg transition-colors"
          >
            + New lab item
          </Link>
        </div>
      </section>
    </div>
  );
}