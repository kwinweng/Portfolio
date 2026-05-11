import type { DbVisibility, DbContentStatus } from "@/lib/db";

export type ContentType = "writing" | "log";

export type WritingRow = {
  slug: string;
  type: ContentType;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  projectSlug?: string;
  visibility: DbVisibility;
  status: DbContentStatus;
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
};

export type ProjectRow = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  priority: string;
  status: string;
  visibility: DbVisibility;
  featured: boolean;
  stack: string[];
  links: { demo?: string; github?: string; notes?: string };
  metrics: { label: string; value: string }[];
  roadmap: string[];
  orderNum: number;
  updatedAt: string;
};

export type ReadingRow = {
  id: number;
  title: string;
  author: string;
  type: "book" | "essay" | "paper";
  topic: string;
  url?: string;
  note: string;
  finishedAt?: string;
  visibility: DbVisibility;
  orderNum: number;
};

export type LabRow = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  status: string;
  href?: string;
  stack: string[];
  visibility: DbVisibility;
  orderNum: number;
};

export type ListOpts = {
  includeUnlisted?: boolean;
  includePrivate?: boolean;
  includeDrafts?: boolean;
};
