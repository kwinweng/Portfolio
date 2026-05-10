import Link from "next/link";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import {
  getFeaturedProjects,
  getPublicProjects,
  getPublicContent,
} from "@/lib/data";
import { CATEGORY_GROUPS } from "@/types/project";

const projectIcons = [
  { label: "Warp", char: "W", color: "#6b62f2", badge: "3.2", href: "/projects/warp" },
  { label: "Finance", char: "F", color: "#4867af", badge: "v2", href: "/projects/financial-expert" },
  { label: "Wiki", char: "K", color: "#9cabba", href: "/projects/llm-knowledge-base" },
  { label: "Radar", char: "R", color: "#c49577", badge: "36", href: "/projects/news-radar" },
  { label: "Pet", char: "P", color: "#686868", href: "/projects/pet-hatch" },
];

function ProjectDock() {
  return (
    <div className="relative">
      {/* Main showcase panel */}
      <div
        className="rounded-[28px] relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8">
          <p className="text-[11px] text-ash-text uppercase tracking-[0.2em] mb-6">
            Kwin AI OS &mdash; Operating Briefing
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] leading-tight">
            Today&apos;s Projects
          </h3>
          <p className="text-sm text-silver-whisper mt-2 leading-relaxed max-w-sm">
            AI-powered systems for investing, finance, knowledge, and intelligence — all running in parallel.
          </p>
        </div>

        {/* Icon dock */}
        <div className="px-6 sm:px-8 py-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {projectIcons.map((icon) => (
              <Link key={icon.label} href={icon.href} className="group relative">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${icon.color}40, ${icon.color}20)`,
                    border: `1px solid ${icon.color}30`,
                    color: icon.color,
                  }}
                >
                  {icon.char}
                </div>
                {icon.badge && (
                  <span
                    className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: "#ef4444", color: "#fff" }}
                  >
                    {icon.badge}
                  </span>
                )}
                <p className="text-[10px] text-ash-text text-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {icon.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Status pill */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div
            className="flex items-center gap-3 p-3 rounded-full mx-auto max-w-md"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-canvas-white font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-interactive-glow animate-pulse" />
              Kwin AI OS
            </div>
            <span className="text-xs text-ash-text truncate">
              Reviewing project signals...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityList() {
  const capabilities = [
    { label: "Quant Research", num: "01" },
    { label: "Wealth Dashboard", num: "02" },
    { label: "Knowledge Wiki", num: "03" },
    { label: "AI News Radar", num: "04" },
    { label: "Agent Workflow", num: "05" },
    { label: "Build Log", num: "06" },
    { label: "Weekly Planning", num: "07" },
  ];

  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-sm font-medium text-ash-text uppercase tracking-wider mb-5">
        What I&apos;m building
      </h2>
      <div className="space-y-0">
        {capabilities.map((cap, i) => (
          <div
            key={cap.num}
            className={`flex items-center justify-between py-2.5 border-b border-white/5 ${
              i === 0 ? "border-t border-white/5" : ""
            }`}
          >
            <span className="flex items-center gap-0 text-sm">
              {i === 0 && (
                <span className="inline-block w-[3px] h-4 bg-interactive-glow rounded-full mr-3" />
              )}
              <span className={i === 0 ? "text-canvas-white" : "text-silver-whisper"}>
                {cap.label}
              </span>
            </span>
            <span className="text-xs text-slate-text">{cap.num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/log", label: "Log" },
    { href: "/about", label: "About" },
  ];
  return (
    <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="flex items-center gap-2 px-3 text-sm font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)]">
          <span className="w-5 h-5 rounded-md bg-interactive-glow/30 flex items-center justify-center text-[10px] text-interactive-glow font-bold">
            K
          </span>
          Kwin
        </div>
        <div className="w-px h-4 bg-white/10 mx-1" />
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 text-sm text-ash-text hover:text-canvas-white rounded-full transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/projects"
          className="ml-1 px-4 py-1.5 text-sm font-medium rounded-full bg-canvas-white text-midnight-base hover:bg-ghost-white transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = getFeaturedProjects();
  const allProjects = getPublicProjects();
  const logs = getPublicContent("log").slice(0, 3);

  return (
    <>
      {/* Hero Shell — black outer */}
      <section className="bg-midnight-base px-3 sm:px-4 pt-3 sm:pt-4 pb-0">
        {/* Hero Stage — framed rounded container */}
        <div
          className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden"
          style={{
            minHeight: "calc(100vh - 24px)",
            background:
              "linear-gradient(180deg, rgb(72, 103, 175) 0%, rgb(110, 140, 180) 25%, rgb(156, 175, 184) 45%, rgb(196, 165, 135) 65%, rgb(180, 140, 110) 80%, rgb(30, 25, 22) 100%)",
            boxShadow:
              "0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10, 10, 10, 0.5) 0%, rgba(10, 10, 10, 0.3) 40%, rgba(10, 10, 10, 0.5) 100%)",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 65% 35%, rgba(107, 98, 242, 0.06) 0%, transparent 55%)",
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-24 sm:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left — Narrative */}
              <div className="pt-4 lg:pt-8">
                <p className="text-[11px] text-ash-text uppercase tracking-[0.2em] mb-5">
                  Personal AI Lab
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] leading-[1.15] tracking-tight">
                  The investor-type
                  <br />
                  builder building
                  <br />
                  personal AI systems.
                </h1>
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-silver-whisper">
                    <span className="text-ash-text/60 mt-0.5 text-xs">&#10022;</span>
                    Building AI systems for investing & finance
                  </div>
                  <div className="flex items-start gap-3 text-sm text-silver-whisper">
                    <span className="text-ash-text/60 mt-0.5 text-xs">&#10022;</span>
                    Knowledge management & intelligence workflows
                  </div>
                  <div className="flex items-start gap-3 text-sm text-silver-whisper">
                    <span className="text-ash-text/60 mt-0.5 text-xs">&#10022;</span>
                    Multi-agent relay development
                  </div>
                  <div className="flex items-start gap-3 text-sm text-silver-whisper">
                    <span className="text-ash-text/60 mt-0.5 text-xs">&#10022;</span>
                    Real data, real deployment, real workflows
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-ghost-white/60 text-ghost-white text-sm font-medium hover:bg-canvas-white hover:text-midnight-base hover:border-canvas-white transition-all duration-200"
                  >
                    Get Started <span>&rarr;</span>
                  </Link>
                </div>

                <CapabilityList />
              </div>

              {/* Right — Project Dock (desktop only; mobile sees it after scroll) */}
              <div className="hidden lg:block lg:pt-4">
                <ProjectDock />
              </div>
            </div>
          </div>

          {/* In-stage navigation — desktop only */}
          <HeroNav />
        </div>
      </section>

      {/* Mobile Project Dock — shown below hero stage on small screens */}
      <section className="lg:hidden px-3 pt-4 pb-0 bg-midnight-base">
        <div className="max-w-lg mx-auto">
          <ProjectDock />
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
              <div
                className="p-8 rounded-3xl transition-all duration-300 border border-white/5 hover:border-white/10"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                }}
              >
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
                        className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-slate-text"
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
                className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0"
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
                className="py-4 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-slate-text">
                    {item.publishedAt}
                  </span>
                  {item.tags[0] && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-slate-text">
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
