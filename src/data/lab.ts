export type LabKind = "tool" | "prototype" | "experiment" | "template";
export type LabStatus = "active" | "archived" | "tinkering";

export type LabItem = {
  slug: string;
  title: string;
  description: string;
  kind: LabKind;
  status: LabStatus;
  href?: string;
  stack?: string[];
};

export const KIND_LABELS: Record<LabKind, string> = {
  tool: "TOOL / 工具",
  prototype: "PROTOTYPE / 原型",
  experiment: "EXPERIMENT / 实验",
  template: "TEMPLATE / 模板",
};

export const STATUS_LABELS: Record<LabStatus, string> = {
  active: "Active",
  archived: "Archived",
  tinkering: "Tinkering",
};

export const labItems: LabItem[] = [
  {
    slug: "article-to-mindmap",
    title: "Article → Mindmap",
    description:
      "把任意一篇长文喂给 LLM，输出 Markmap 兼容的思维导图。日常读论文/技术文的减负工具。",
    kind: "tool",
    status: "active",
    stack: ["DeepSeek", "Markmap", "Vercel"],
  },
  {
    slug: "reading-inbox",
    title: "Reading Inbox → Note",
    description:
      "Cubox 高亮 + 划线在 24h 内自动归到 Obsidian 知识库，按主题分类、带回链。",
    kind: "experiment",
    status: "active",
    stack: ["Cubox API", "Obsidian", "iCloud"],
  },
  {
    slug: "weekly-review-template",
    title: "Weekly Review Template",
    description:
      "我每周日复盘的 Obsidian 模板：5 分钟扫数据，10 分钟回看决策，5 分钟下周排期。",
    kind: "template",
    status: "active",
  },
  {
    slug: "homepage-pixel-avatar",
    title: "Pixel Avatar Generator",
    description:
      "从一张正脸照生成 64×64 像素头像，保留发型/眼镜/服装特征。本站头像就是它的产物。",
    kind: "prototype",
    status: "tinkering",
    stack: ["GPT Image 2", "Sharp"],
  },
  {
    slug: "b2-design-tokens",
    title: "B2 Design Tokens",
    description:
      "本站使用的 B2 Personal Console 设计令牌库 — 颜色、间距、字体、边框。可以直接克隆复用。",
    kind: "tool",
    status: "active",
    stack: ["Tailwind v4", "CSS Variables"],
  },
  {
    slug: "handoff-doc-template",
    title: "Handoff Doc Template",
    description:
      "多 Agent 接力开发用的 Handoff 文档模板：背景 / 路径 / 风险 / 部署 / 已知问题。",
    kind: "template",
    status: "active",
  },
];
