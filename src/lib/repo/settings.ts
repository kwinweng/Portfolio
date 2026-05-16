import { getDb } from "@/lib/db";

export type SettingKey =
  | "siteName"
  | "siteNameZh"
  | "siteEyebrow"
  | "siteEyebrowZh"
  | "heroTagline"
  | "avatarBlurbEn"
  | "avatarBlurbZh"
  | "statusNote"
  | "aboutIntro"
  | "aboutBody";

export const SETTING_DEFAULTS: Record<SettingKey, string> = {
  siteName: "KWIN WENG",
  siteNameZh: "阿欢",
  siteEyebrow: "PERSONAL SITE / DIGITAL GARDEN / LAB",
  siteEyebrowZh: "个人主页 · 数字花园 · 实验室",
  heroTagline:
    "我把项目、文章、阅读和小实验放在这里。它像一个开放的工作台，帮助我把分散的想法变成可以回看、可以复用、可以继续推进的系统。",
  avatarBlurbEn: "AI workflows · product thinking · knowledge systems",
  avatarBlurbZh: "AI 工作流 · 产品思考 · 知识系统",
  statusNote:
    "正在把个人网站从“展示页”做成“入口页”：能看见我在做什么，也能进入更深的内容。",
  aboutIntro:
    "我是阿欢（Kwin Weng），一个投资人型 builder。我用 AI agent 和数据系统，把投资、财务、知识和情报工作流产品化。",
  aboutBody:
    "这个网站是我的个人工作台。我把项目、文章、阅读和小实验放在这里，帮助我把分散的想法变成可以回看、可以复用、可以继续推进的系统。",
};

type SettingDbRow = { key: string; value: string };

export type SiteSettings = Record<SettingKey, string>;

export function getAllSettings(): SiteSettings {
  const db = getDb();
  const rows = db
    .prepare<[], SettingDbRow>("SELECT key, value FROM site_settings")
    .all();
  const result = { ...SETTING_DEFAULTS };
  for (const r of rows) {
    if (r.key in result) {
      result[r.key as SettingKey] = r.value;
    }
  }
  return result;
}

export function getSetting(key: SettingKey): string {
  const db = getDb();
  const row = db
    .prepare<[string], SettingDbRow>(
      "SELECT key, value FROM site_settings WHERE key = ? LIMIT 1"
    )
    .get(key);
  return row?.value ?? SETTING_DEFAULTS[key];
}

export function setSettings(patch: Partial<SiteSettings>): void {
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO site_settings (key, value, updated_at)
     VALUES (@key, @value, @updated_at)
     ON CONFLICT(key) DO UPDATE SET
       value=excluded.value,
       updated_at=excluded.updated_at`
  );
  const tx = db.transaction((entries: { key: string; value: string }[]) => {
    for (const e of entries) stmt.run({ ...e, updated_at: now });
  });
  const entries = Object.entries(patch)
    .filter(([k]) => k in SETTING_DEFAULTS)
    .map(([key, value]) => ({ key, value: value ?? "" }));
  if (entries.length === 0) return;
  tx(entries);
}
