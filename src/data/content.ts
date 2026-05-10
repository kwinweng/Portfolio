import type { ContentItem } from "@/types/project";

export const contentItems: ContentItem[] = [
  {
    slug: "building-ai-quant-copilot",
    type: "article",
    title: "Building an AI Quant Copilot from Scratch",
    summary:
      "How I built Warp: from factor research to automated backtesting, with DeepSeek as the AI backbone.",
    status: "draft",
    visibility: "public",
    tags: ["AI", "Quant", "Warp"],
    projectSlug: "warp",
  },
  {
    slug: "claude-code-relay-development",
    type: "article",
    title: "Claude Code Relay Development",
    summary:
      "Multi-agent handoff workflow: Claude → Codex → Kimi, with structured handoff documents.",
    status: "draft",
    visibility: "public",
    tags: ["Claude Code", "Workflow", "Agent"],
  },
  {
    slug: "warp-phase-3-2-started",
    type: "log",
    title: "Warp: Phase 3.2 Experiment Management Started",
    summary: "Starting experiment search, filter, and comparison panel.",
    status: "published",
    visibility: "public",
    tags: ["Warp"],
    publishedAt: "2026-05-10",
    projectSlug: "warp",
  },
  {
    slug: "financial-expert-v2-handoff",
    type: "log",
    title: "Financial Expert v2: Handoff to Claude Code",
    summary:
      "Complete handoff document prepared for relay development. Focus: data governance and year switching.",
    status: "published",
    visibility: "public",
    tags: ["Financial Expert"],
    publishedAt: "2026-05-06",
    projectSlug: "financial-expert",
  },
  {
    slug: "news-radar-rss-optimization",
    type: "log",
    title: "News Radar: RSS Source Optimization",
    summary:
      "Removed dead sources, added high-quality feeds. Business classifier completed.",
    status: "published",
    visibility: "public",
    tags: ["News Radar"],
    publishedAt: "2026-05-04",
    projectSlug: "news-radar",
  },
];
