"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ProjectRow } from "@/lib/repo/types";

type Props = { initial?: ProjectRow };

const DEFAULT: ProjectRow = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  categories: [],
  priority: "B",
  status: "building",
  visibility: "public",
  featured: false,
  stack: [],
  links: {},
  metrics: [],
  roadmap: [],
  orderNum: 100,
  updatedAt: "",
};

export default function ProjectEditor({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [v, setV] = useState<ProjectRow>(initial ?? DEFAULT);

  function patch<K extends keyof ProjectRow>(key: K, val: ProjectRow[K]) {
    setV((prev) => ({ ...prev, [key]: val }));
  }

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      if (!v.slug || !v.title) {
        setError("slug 和 title 必填");
        return;
      }
      const res = await fetch("/api/admin/projects", {
        method: initial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "save failed");
        return;
      }
      setSaved(true);
      if (!initial) router.replace(`/admin/projects/${v.slug}`);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function remove() {
    if (!initial) return;
    if (!confirm(`删除项目 ${initial.slug}？此操作不可撤销。`)) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: initial.slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "delete failed");
        return;
      }
      router.replace("/admin/projects");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Projects / 项目
          </Link>
          <h1 className="mono-heading text-xl font-mono font-bold text-border mt-2">
            {initial ? `Edit · ${initial.title}` : "New project"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link
              href={`/projects/${initial.slug}`}
              target="_blank"
              className="px-3 py-2 border-3 border-border font-mono text-xs hover:border-accent transition-colors"
            >
              View ↗
            </Link>
          )}
          {initial && (
            <button
              type="button"
              onClick={remove}
              disabled={pending}
              className="px-3 py-2 border-3 border-border font-mono text-xs hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="px-3 py-2 border-3 border-border bg-border text-bg font-mono text-xs hover:bg-accent hover:border-accent transition-colors disabled:opacity-50"
          >
            {pending ? "Saving..." : saved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="panel p-3 border-red-600">
          <p className="text-xs font-mono text-red-600">{error}</p>
        </div>
      )}

      <div className="panel p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="slug">
          <input
            value={v.slug}
            onChange={(e) => patch("slug", e.target.value)}
            disabled={!!initial}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg disabled:bg-panel disabled:text-text-muted"
          />
        </Field>
        <Field label="title">
          <input
            value={v.title}
            onChange={(e) => patch("title", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="subtitle" className="md:col-span-2">
          <input
            value={v.subtitle}
            onChange={(e) => patch("subtitle", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="description" className="md:col-span-2">
          <textarea
            rows={3}
            value={v.description}
            onChange={(e) => patch("description", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
          />
        </Field>
        <Field label="categories (逗号分隔)">
          <input
            value={v.categories.join(", ")}
            onChange={(e) =>
              patch(
                "categories",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            placeholder="investing, finance"
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="stack (逗号分隔)">
          <input
            value={v.stack.join(", ")}
            onChange={(e) =>
              patch(
                "stack",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="priority">
          <select
            value={v.priority}
            onChange={(e) => patch("priority", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            {["S", "A", "B", "C"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="status">
          <select
            value={v.status}
            onChange={(e) => patch("status", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            {["deployed", "building", "maintained", "concept", "archived"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              )
            )}
          </select>
        </Field>
        <Field label="visibility">
          <select
            value={v.visibility}
            onChange={(e) =>
              patch("visibility", e.target.value as ProjectRow["visibility"])
            }
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            <option value="public">public</option>
            <option value="unlisted">unlisted</option>
            <option value="private">private</option>
          </select>
        </Field>
        <Field label="order (smaller = first)">
          <input
            type="number"
            value={v.orderNum}
            onChange={(e) => patch("orderNum", Number(e.target.value))}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            checked={v.featured}
            onChange={(e) => patch("featured", e.target.checked)}
          />
          <span className="text-xs font-mono">Featured</span>
        </label>

        <Field label="links.demo">
          <input
            value={v.links.demo ?? ""}
            onChange={(e) => patch("links", { ...v.links, demo: e.target.value })}
            placeholder="https://..."
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="links.github">
          <input
            value={v.links.github ?? ""}
            onChange={(e) => patch("links", { ...v.links, github: e.target.value })}
            placeholder="https://github.com/..."
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
      </div>

      <div className="panel p-4">
        <p className="text-[10px] font-mono text-text-muted tracking-wider mb-2">
          METRICS (label: value, 每行一条)
        </p>
        <textarea
          rows={3}
          value={v.metrics.map((m) => `${m.label}: ${m.value}`).join("\n")}
          onChange={(e) =>
            patch(
              "metrics",
              e.target.value
                .split("\n")
                .map((line) => {
                  const idx = line.indexOf(":");
                  if (idx < 0) return null;
                  return {
                    label: line.slice(0, idx).trim(),
                    value: line.slice(idx + 1).trim(),
                  };
                })
                .filter((m): m is { label: string; value: string } =>
                  m !== null && m.label.length > 0
                )
            )
          }
          placeholder="Phase: 3.2&#10;Status: Deployed"
          className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
        />
      </div>

      <div className="panel p-4">
        <p className="text-[10px] font-mono text-text-muted tracking-wider mb-2">
          ROADMAP (每行一条)
        </p>
        <textarea
          rows={4}
          value={v.roadmap.join("\n")}
          onChange={(e) =>
            patch(
              "roadmap",
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-[10px] font-mono text-text-muted tracking-wider block mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
