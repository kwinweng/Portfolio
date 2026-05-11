import type { Metadata } from "next";
import Link from "next/link";
import { listProjects } from "@/lib/repo/projects";

export const metadata: Metadata = {
  title: "Projects / 项目",
  description: "AI systems for investing, finance, knowledge, and intelligence.",
};

type Category = string;

const CATEGORY_GROUPS: { label: string; categories: Category[] }[] = [
  { label: "Investing / 投资", categories: ["investing"] },
  { label: "Personal Finance / 个人财务", categories: ["finance"] },
  {
    label: "Knowledge & Intelligence / 知识与情报",
    categories: ["knowledge", "intelligence"],
  },
  { label: "Agent & Creative / Agent 与创意", categories: ["agent"] },
  { label: "Design & Planning / 设计与规划", categories: ["design", "planning"] },
];

export default function ProjectsPage() {
  const projects = listProjects();

  return (
    <div className="max-w-4xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mt-6 mb-2 text-border">
          All Projects
        </h1>
        <p className="text-text-secondary mb-8 font-mono text-sm">/ 所有项目</p>

        <div className="space-y-10">
          {CATEGORY_GROUPS.map((group) => {
            const groupProjects = projects.filter((p) =>
              p.categories.some((c) => group.categories.includes(c))
            );
            if (groupProjects.length === 0) return null;
            return (
              <div key={group.label}>
                <h2 className="text-xs font-mono text-text-muted tracking-wider uppercase mb-4">
                  {group.label}
                </h2>
                <div className="space-y-0">
                  {groupProjects.map((project, i) => (
                    <div
                      key={project.slug}
                      className={`flex items-start justify-between gap-4 py-4 -mx-2 px-2 ${
                        i > 0 ? "border-t border-border-light" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        {project.links.demo ? (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm font-bold hover:text-accent transition-colors"
                          >
                            {project.title}
                            <span className="text-accent ml-1">↗</span>
                          </a>
                        ) : (
                          <span className="font-mono text-sm font-bold">
                            {project.title}
                          </span>
                        )}
                        <p className="text-sm text-text-secondary mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
                        >
                          Details →
                        </Link>
                        <span className="text-xs text-accent font-mono">
                          {project.status === "deployed" ? "Live" : project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
