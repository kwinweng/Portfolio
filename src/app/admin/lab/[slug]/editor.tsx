"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LabRow } from "@/lib/repo/types";

type Props = { initial?: LabRow };

const DEFAULT: LabRow = {
  slug: "",
  title: "",
  description: "",
  kind: "tool",
  status: "active",
  href: undefined,
  stack: [],
  visibility: "public",
  orderNum: 100,
};

export default function LabEditor({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [v, setV] = useState<LabRow>(initial ?? DEFAULT);

  function patch<K extends keyof LabRow>(key: K, val: LabRow[K]) {
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
      const res = await fetch("/api/admin/lab", {
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
      if (!initial) router.replace(`/admin/lab/${v.slug}`);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function remove() {
    if (!initial) return;
    if (!confirm(`删除 ${initial.slug}？`)) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/lab", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: initial.slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "delete failed");
        return;
      }
      router.replace("/admin/lab");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <Link
            href="/admin/lab"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Lab / 实验室
          </Link>
          <h1 className="mono-heading text-xl font-mono font-bold text-border mt-2">
            {initial ? `Edit · ${initial.title}` : "New lab item"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
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
        <Field label="description" className="md:col-span-2">
          <textarea
            rows={3}
            value={v.description}
            onChange={(e) => patch("description", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
          />
        </Field>
        <Field label="kind">
          <select
            value={v.kind}
            onChange={(e) => patch("kind", e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            {["tool", "prototype", "experiment", "template"].map((k) => (
              <option key={k} value={k}>
                {k}
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
            {["active", "tinkering", "archived"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="href (外部链接)" className="md:col-span-2">
          <input
            value={v.href ?? ""}
            onChange={(e) => patch("href", e.target.value || undefined)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="stack (逗号分隔)" className="md:col-span-2">
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
        <Field label="visibility">
          <select
            value={v.visibility}
            onChange={(e) =>
              patch("visibility", e.target.value as LabRow["visibility"])
            }
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            <option value="public">public</option>
            <option value="unlisted">unlisted</option>
            <option value="private">private</option>
          </select>
        </Field>
        <Field label="order">
          <input
            type="number"
            value={v.orderNum}
            onChange={(e) => patch("orderNum", Number(e.target.value))}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
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
