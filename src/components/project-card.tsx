import Link from "next/link";
import type { Project } from "@/types/project";
import { StatusBadge } from "./status-badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="card-ghost p-6 h-full transition-all duration-300 hover:bg-[rgba(212,212,212,0.15)] border border-transparent hover:border-gunmetal">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-canvas-white font-mono group-hover:text-canvas-white transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-ash-text">{project.subtitle}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-silver-whisper leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full border border-gunmetal text-slate-text"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-xs px-2.5 py-1 text-slate-text">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
