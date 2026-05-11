import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProjects, getProject } from "@/lib/repo/projects";

const STATUS_LABELS: Record<string, string> = {
  deployed: "Deployed",
  building: "Building",
  maintained: "Maintained",
  concept: "Concept",
  archived: "Archived",
};

const CATEGORY_LABELS: Record<string, string> = {
  investing: "Investing",
  finance: "Personal Finance",
  knowledge: "Knowledge",
  intelligence: "Intelligence",
  agent: "Agent Workflow",
  design: "Design",
  planning: "Planning",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listProjects({ includeUnlisted: true }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, { includeUnlisted: true });
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug, { includeUnlisted: true });
  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/projects"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← All Projects / 所有项目
        </Link>

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-accent">
              {project.priority}
            </span>
            <span className="text-xs font-mono text-text-muted">
              {STATUS_LABELS[project.status] ?? project.status}
            </span>
          </div>
          <h1 className="mono-heading text-3xl sm:text-4xl font-mono text-border">
            {project.title}
          </h1>
          <p className="text-text-secondary mt-2">{project.subtitle}</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-8">
          {project.description}
        </p>

        {(project.links.demo || project.links.github) && (
          <div className="flex gap-4 mb-8">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:underline"
              >
                Live Demo →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-text-secondary hover:text-accent transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="panel p-4">
            <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mb-2">
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span key={cat} className="text-sm">
                  {CATEGORY_LABELS[cat] ?? cat}
                </span>
              ))}
            </div>
          </div>
          <div className="panel p-4">
            <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 border border-border-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.metrics.length > 0 && (
          <div className="panel p-4 mb-8">
            <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mb-3">
              Metrics
            </p>
            {project.metrics.map((m) => (
              <div key={m.label} className="flex justify-between py-1">
                <span className="text-sm text-text-secondary">{m.label}</span>
                <span className="text-sm font-mono font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {project.roadmap.length > 0 && (
          <div>
            <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mb-3">
              Roadmap
            </p>
            <div className="space-y-2">
              {project.roadmap.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      i === 0 ? "bg-accent" : "bg-border-light"
                    }`}
                  />
                  <p
                    className={`text-sm ${i === 0 ? "text-text" : "text-text-secondary"}`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
