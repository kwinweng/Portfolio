"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SettingKey, SiteSettings } from "@/lib/repo/settings";

type Props = { initial: SiteSettings };

type FieldDef = {
  key: SettingKey;
  label: string;
  hint?: string;
  type: "input" | "textarea";
  rows?: number;
  fullWidth?: boolean;
};

const FIELDS: FieldDef[] = [
  {
    key: "siteName",
    label: "Site name (英文)",
    hint: "首页大标题 + 侧栏",
    type: "input",
  },
  {
    key: "siteNameZh",
    label: "Site name (中文)",
    hint: '例："阿欢"',
    type: "input",
  },
  {
    key: "siteEyebrow",
    label: "Hero eyebrow (英文)",
    hint: "Hero 顶部小字（绿点后）",
    type: "input",
    fullWidth: true,
  },
  {
    key: "siteEyebrowZh",
    label: "Hero eyebrow (中文)",
    type: "input",
    fullWidth: true,
  },
  {
    key: "heroTagline",
    label: "Hero tagline",
    hint: "首页 Hero 主介绍段",
    type: "textarea",
    rows: 4,
    fullWidth: true,
  },
  {
    key: "avatarBlurbEn",
    label: "Avatar blurb (英文)",
    hint: "头像下英文标签",
    type: "input",
    fullWidth: true,
  },
  {
    key: "avatarBlurbZh",
    label: "Avatar blurb (中文)",
    type: "input",
    fullWidth: true,
  },
  {
    key: "statusNote",
    label: "Status 文案",
    hint: '首页 NOW Status 板块',
    type: "textarea",
    rows: 3,
    fullWidth: true,
  },
  {
    key: "aboutIntro",
    label: "About 第一段",
    hint: "/about 页面第一段",
    type: "textarea",
    rows: 3,
    fullWidth: true,
  },
  {
    key: "aboutBody",
    label: "About 第二段",
    type: "textarea",
    rows: 3,
    fullWidth: true,
  },
];

export default function SettingsEditor({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [v, setV] = useState<SiteSettings>(initial);

  function patch(key: SettingKey, value: string) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        setError(data.error ?? "save failed");
        return;
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <Link
            href="/admin"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Dashboard
          </Link>
          <h1 className="mono-heading text-2xl font-mono font-bold text-border mt-2">
            Site settings
          </h1>
          <p className="text-text-secondary font-mono text-sm">
            / 个人资料 · 首页文案
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="px-3 py-2 border-3 border-border bg-border text-bg font-mono text-xs hover:bg-accent hover:border-accent transition-colors disabled:opacity-50"
        >
          {pending ? "Saving..." : saved ? "✓ Saved" : "Save"}
        </button>
      </div>

      {error && (
        <div className="panel p-3 border-red-600">
          <p className="text-xs font-mono text-red-600">{error}</p>
        </div>
      )}

      <div className="panel p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <label
            key={f.key}
            className={`block ${f.fullWidth ? "md:col-span-2" : ""}`}
          >
            <span className="text-[10px] font-mono text-text-muted tracking-wider block mb-1">
              {f.label}
              {f.hint && (
                <span className="ml-2 normal-case tracking-normal text-text-muted/70">
                  · {f.hint}
                </span>
              )}
            </span>
            {f.type === "textarea" ? (
              <textarea
                rows={f.rows ?? 3}
                value={v[f.key]}
                onChange={(e) => patch(f.key, e.target.value)}
                className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg resize-y"
              />
            ) : (
              <input
                value={v[f.key]}
                onChange={(e) => patch(f.key, e.target.value)}
                className="w-full px-2 py-1 border border-border-light font-mono text-sm bg-bg"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
