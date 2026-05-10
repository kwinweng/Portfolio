import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getPublicProjects } from "@/lib/data";
import { CATEGORY_GROUPS } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI systems for investing, finance, knowledge, and intelligence workflows.",
};

export default function ProjectsPage() {
  const projects = getPublicProjects();

  return (
    <div className="pt-32 pb-32 sm:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] tracking-tight">
            Projects
          </h1>
          <p className="text-ash-text mt-3 text-lg max-w-2xl">
            Building AI-powered systems across investing, personal finance,
            knowledge management, and intelligence workflows.
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORY_GROUPS.map((group) => {
            const groupProjects = projects.filter((p) =>
              p.categories.some((c) => group.categories.includes(c))
            );
            if (groupProjects.length === 0) return null;
            return (
              <div key={group.label}>
                <h2 className="text-sm font-medium text-slate-text uppercase tracking-wider mb-6">
                  {group.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
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
