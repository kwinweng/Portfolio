import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { CATEGORY_LABELS } from "@/types/project";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pt-32 pb-32 sm:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-ash-text hover:text-canvas-white transition-colors mb-10"
        >
          &larr; All Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-canvas-white/10 text-ash-text">
              {project.priority}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-4xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] tracking-tight mt-3">
            {project.title}
          </h1>
          <p className="text-xl text-ash-text mt-2">{project.subtitle}</p>
          <p className="text-silver-whisper leading-relaxed mt-6">
            {project.description}
          </p>
        </div>

        {/* Links */}
        {(project.links.demo || project.links.github) && (
          <div className="flex gap-3 mb-12">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-canvas-white text-midnight-base text-sm font-medium hover:bg-ghost-white transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-ghost-white text-ghost-white text-sm font-medium hover:bg-canvas-white/5 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Categories */}
          <div className="card-ghost p-5">
            <h3 className="text-xs font-medium text-slate-text uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-sm text-ghost-white"
                >
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="card-ghost p-5">
            <h3 className="text-xs font-medium text-slate-text uppercase tracking-wider mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full border border-gunmetal text-ash-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="card-ghost p-5">
              <h3 className="text-xs font-medium text-slate-text uppercase tracking-wider mb-3">
                Key Metrics
              </h3>
              <div className="space-y-2">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between">
                    <span className="text-sm text-ash-text">{m.label}</span>
                    <span className="text-sm font-medium text-ghost-white">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Updated */}
          <div className="card-ghost p-5">
            <h3 className="text-xs font-medium text-slate-text uppercase tracking-wider mb-3">
              Last Updated
            </h3>
            <p className="text-sm text-ghost-white">{project.updatedAt}</p>
          </div>
        </div>

        {/* Roadmap */}
        {project.roadmap && project.roadmap.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-ghost-white font-[family-name:var(--font-geist-sans)] mb-6">
              Roadmap
            </h2>
            <div className="space-y-3">
              {project.roadmap.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      i === 0 ? "bg-interactive-glow" : "bg-gunmetal"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      i === 0 ? "text-ghost-white" : "text-ash-text"
                    }`}
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
