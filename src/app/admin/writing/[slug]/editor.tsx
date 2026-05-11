"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { WritingRow } from "@/lib/repo/types";

type Props = {
  type: "writing" | "log";
  zh: string;
  initial?: WritingRow;
};

export default function WritingEditor({ type, zh, initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [tagsRaw, setTagsRaw] = useState(initial?.tags.join(", ") ?? "");
  const [projectSlug, setProjectSlug] = useState(initial?.projectSlug ?? "");
  const [visibility, setVisibility] = useState<WritingRow["visibility"]>(
    initial?.visibility ?? "public"
  );
  const [status, setStatus] = useState<WritingRow["status"]>(
    initial?.status ?? "draft"
  );
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? "");

  // Live preview
  const [previewHtml, setPreviewHtml] = useState("");
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/admin/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markdown: body }),
        });
        const data = await res.json();
        if (data.html !== undefined) setPreviewHtml(data.html);
      } catch {
        // ignore preview errors
      }
    }, 500);
    return () => {
      if (previewTimer.current) clearTimeout(previewTimer.current);
    };
  }, [body]);

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const tags = tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const payload = {
        type,
        slug: slug.trim(),
        title: title.trim(),
        summary: summary.trim(),
        body,
        tags,
        projectSlug: projectSlug.trim() || null,
        visibility,
        status,
        publishedAt: publishedAt.trim() || null,
      };
      if (!payload.slug || !payload.title) {
        setError("slug 和 title 必填");
        return;
      }
      const isNew = !initial;
      const res = await fetch("/api/admin/writing", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "save failed");
        return;
      }
      setSaved(true);
      if (isNew) {
        router.replace(`/admin/${type}/${payload.slug}`);
      }
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function remove() {
    if (!initial) return;
    if (!confirm(`删除 ${initial.slug}？此操作不可撤销。`)) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/writing", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, slug: initial.slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "delete failed");
        return;
      }
      router.replace(`/admin/${type}`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <Link
            href={`/admin/${type}`}
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← {type === "writing" ? "Writing" : "Build Log"} / {zh}
          </Link>
          <h1 className="mono-heading text-xl font-mono font-bold text-border mt-2">
            {initial ? `Edit · ${initial.title}` : `New ${type}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {initial && (
            <Link
              href={`/${type}/${initial.slug}`}
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

      {/* Frontmatter form */}
      <div className="panel p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="slug">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={!!initial}
            placeholder="my-article"
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg disabled:bg-panel disabled:text-text-muted"
          />
        </Field>
        <Field label="title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="summary" className="md:col-span-2">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
          />
        </Field>
        <Field label="tags (逗号分隔)">
          <input
            value={tagsRaw}
            onChange={(e) => setTagsRaw(e.target.value)}
            placeholder="ai, infra"
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="projectSlug">
          <input
            value={projectSlug}
            onChange={(e) => setProjectSlug(e.target.value)}
            placeholder="warp"
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
        <Field label="visibility">
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as WritingRow["visibility"])
            }
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            <option value="public">public</option>
            <option value="unlisted">unlisted</option>
            <option value="private">private</option>
          </select>
        </Field>
        <Field label="status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WritingRow["status"])}
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </Field>
        <Field label="publishedAt (YYYY-MM-DD)">
          <input
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            placeholder="2026-05-12"
            className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
          />
        </Field>
      </div>

      {/* Body editor + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-mono text-text-muted tracking-wider mb-2">
            BODY / MARKDOWN
          </p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-[60vh] px-3 py-2 border-3 border-border font-mono text-sm bg-bg leading-relaxed focus:outline-none focus:border-accent resize-y"
            spellCheck={false}
            placeholder="# Hello&#10;Write markdown here..."
          />
        </div>
        <div>
          <p className="text-[10px] font-mono text-text-muted tracking-wider mb-2">
            PREVIEW / 预览
          </p>
          <div
            className="prose-content border-3 border-border bg-panel p-4 h-[60vh] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
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
