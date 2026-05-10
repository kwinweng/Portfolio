export type Category =
  | "investing"
  | "finance"
  | "knowledge"
  | "intelligence"
  | "agent"
  | "design"
  | "planning";

export type Priority = "S" | "A" | "B" | "C";

export type ProjectStatus =
  | "deployed"
  | "building"
  | "maintained"
  | "concept"
  | "archived";

export type Visibility = "public" | "unlisted" | "private";

export type ContentStatus = "draft" | "published" | "archived";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categories: Category[];
  priority: Priority;
  status: ProjectStatus;
  visibility: Visibility;
  featured: boolean;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
    notes?: string;
  };
  image?: string;
  images?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  roadmap?: string[];
  order: number;
  updatedAt: string;
};

export type ContentItem = {
  slug: string;
  type: "article" | "log";
  title: string;
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  tags: string[];
  publishedAt?: string;
  projectSlug?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  investing: "Investing",
  finance: "Personal Finance",
  knowledge: "Knowledge",
  intelligence: "Intelligence",
  agent: "Agent Workflow",
  design: "Design",
  planning: "Planning",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  deployed: "Deployed",
  building: "Building",
  maintained: "Maintained",
  concept: "Concept",
  archived: "Archived",
};

export const CATEGORY_GROUPS: {
  label: string;
  categories: Category[];
}[] = [
  { label: "Investing", categories: ["investing"] },
  { label: "Personal Finance", categories: ["finance"] },
  { label: "Knowledge & Intelligence", categories: ["knowledge", "intelligence"] },
  { label: "Agent & Creative", categories: ["agent"] },
  { label: "Design & Planning", categories: ["design", "planning"] },
];
