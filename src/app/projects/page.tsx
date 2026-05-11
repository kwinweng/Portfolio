import type { Metadata } from "next";
import Link from "next/link";
import { getPublicProjects } from "@/lib/data";
import { CATEGORY_GROUPS } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI systems for investing, finance, knowledge, and intelligence.",
};

export default function ProjectsPage() {
  const projects = getPublicProjects();

  return (
    <div className="max-w-4xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← KWIN WENG
          </Link>
        </div>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mb-8">
          All Projects
        </h1>

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
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group block"
                    >
                      <div
                        className={`flex items-start justify-between py-4 hover:bg-bg/50 -mx-2 px-2 transition-colors ${
                          i > 0 ? "border-t border-border-light" : ""
                        }`}
                      >
                        <div>
                          <p className="font-mono text-sm font-bold group-hover:text-accent transition-colors">
                            {project.title}
                          </p>
                          <p className="text-sm text-text-secondary mt-0.5">
                            {project.subtitle}
                          </p>
                        </div>
                        <span className="text-xs text-accent font-mono shrink-0">
                          {project.status === "deployed" ? "Live" : project.status}
                        </span>
                      </div>
                    </Link>
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
