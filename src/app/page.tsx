import Link from "next/link";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import {
  getFeaturedProjects,
  getPublicProjects,
  getPublicContent,
} from "@/lib/data";
import { CATEGORY_GROUPS } from "@/types/project";

export default function Home() {
  const featured = getFeaturedProjects();
  const allProjects = getPublicProjects();
  const logs = getPublicContent("log").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-aura" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-canvas-white font-[family-name:var(--font-geist-sans)] leading-[1.1]">
            Kwin Weng
          </h1>
          <p className="mt-4 text-xl text-ash-text">
            Investor &middot; Product Builder
          </p>
          <p className="mt-6 text-lg text-silver-whisper leading-relaxed max-w-xl mx-auto">
            Building AI systems for investing, finance, knowledge, and
            intelligence workflows.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 rounded-full bg-canvas-white text-midnight-base text-sm font-medium hover:bg-ghost-white transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-full border border-ghost-white text-ghost-white text-sm font-medium hover:bg-canvas-white/5 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* System Map */}
      <Section
        title="Operating System"
        subtitle="Projects organized by capability domain"
      >
        <div className="space-y-8">
          {CATEGORY_GROUPS.map((group) => {
            const groupProjects = allProjects.filter((p) =>
              p.categories.some((c) => group.categories.includes(c))
            );
            if (groupProjects.length === 0) return null;
            return (
              <div key={group.label}>
                <h3 className="text-sm font-medium text-slate-text uppercase tracking-wider mb-4">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section title="Featured" subtitle="Key projects with deeper context">
        <div className="grid grid-cols-1 gap-6">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="card-translucent p-8 transition-all duration-300 hover:bg-[rgba(0,0,0,0.3)] border border-transparent hover:border-gunmetal">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)]">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-canvas-white/10 text-ash-text">
                        {project.priority}
                      </span>
                    </div>
                    <p className="text-ash-text text-sm mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-silver-whisper leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  {project.metrics && (
                    <div className="flex sm:flex-col gap-4 sm:gap-3 sm:text-right shrink-0">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-xs text-slate-text">{m.label}</p>
                          <p className="text-sm font-medium text-ghost-white">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full border border-gunmetal text-slate-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Now Building */}
      <Section
        title="Now Building"
        subtitle="Current progress across active projects"
      >
        <div className="space-y-4">
          {allProjects
            .filter((p) => p.status === "building" || p.status === "deployed")
            .slice(0, 5)
            .map((project) => (
              <div
                key={project.slug}
                className="flex items-start gap-4 py-4 border-b border-gunmetal last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-interactive-glow mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-ghost-white font-medium hover:text-canvas-white transition-colors font-[family-name:var(--font-geist-sans)]"
                    >
                      {project.title}
                    </Link>
                    <span className="text-xs text-slate-text">
                      {project.updatedAt}
                    </span>
                  </div>
                  {project.roadmap && project.roadmap[0] && (
                    <p className="text-sm text-ash-text mt-1">
                      Next: {project.roadmap[0]}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Section>

      {/* Build Log Preview */}
      {logs.length > 0 && (
        <Section title="Build Log" subtitle="Recent updates">
          <div className="space-y-4">
            {logs.map((item) => (
              <div
                key={item.slug}
                className="py-4 border-b border-gunmetal last:border-0"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-slate-text">
                    {item.publishedAt}
                  </span>
                  {item.tags[0] && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-gunmetal text-slate-text">
                      {item.tags[0]}
                    </span>
                  )}
                </div>
                <h3 className="text-ghost-white font-medium">{item.title}</h3>
                <p className="text-sm text-ash-text mt-1">{item.summary}</p>
              </div>
            ))}
          </div>
          <Link
            href="/log"
            className="inline-flex items-center mt-8 text-sm text-ash-text hover:text-canvas-white transition-colors"
          >
            View all logs &rarr;
          </Link>
        </Section>
      )}
    </>
  );
}
