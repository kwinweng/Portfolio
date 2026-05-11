import Image from "next/image";
import Link from "next/link";
import { listProjects } from "@/lib/repo/projects";
import { listWritings } from "@/lib/repo/writings";
import { listReading } from "@/lib/repo/reading";
import { listLab } from "@/lib/repo/lab";
import { countProjects } from "@/lib/repo/projects";
import { countWritings } from "@/lib/repo/writings";
import { countReading } from "@/lib/repo/reading";
import { countLab } from "@/lib/repo/lab";
import { EmailButton } from "@/components/email-button";

const navItems = [
  { id: "about", num: "00", label: "ABOUT", zh: "关于" },
  { id: "projects", num: "01", label: "PROJECTS", zh: "项目" },
  { id: "writing", num: "02", label: "WRITING", zh: "文章" },
  { id: "reading", num: "03", label: "READING", zh: "阅读" },
  { id: "lab", num: "04", label: "LAB", zh: "实验室" },
  { id: "elsewhere", num: "05", label: "ELSEWHERE", zh: "其他" },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border-light p-6 sticky top-0 h-screen">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-accent text-accent text-xs font-bold font-mono">
          KW
        </div>
        <div className="mt-3">
          <p className="text-sm font-bold font-mono uppercase tracking-wide">
            Kwin Weng
          </p>
          <p className="text-xs text-text-secondary">阿欢</p>
        </div>
      </div>

      <div className="border-t border-border-light pt-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-3 py-2 text-sm hover:text-accent transition-colors group"
            >
              <span className="text-accent text-xs font-mono">{item.num}</span>
              <span className="font-mono text-xs tracking-wider">
                {item.label}
              </span>
              <span className="text-[10px] text-text-muted ml-auto">
                {item.zh}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-6">
        <Link
          href="/admin"
          aria-label="Admin"
          className="inline-flex items-center justify-center w-6 h-6 text-text-muted hover:text-accent transition-colors text-xs"
          title="Admin"
        >
          🔒
        </Link>
      </div>
    </aside>
  );
}

export default function Home() {
  // Featured first, then most recently updated
  const allProjects = listProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects
    .filter((p) => !p.featured)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const spotlight = [...featuredProjects, ...otherProjects].slice(0, 3);

  const recentWritings = [
    ...listWritings("writing"),
    ...listWritings("log"),
  ]
    .sort((a, b) => {
      const aDate = a.publishedAt ?? a.updatedAt;
      const bDate = b.publishedAt ?? b.updatedAt;
      return bDate.localeCompare(aDate);
    })
    .slice(0, 3);

  const recentReading = listReading().slice(0, 3);
  const recentLab = listLab().slice(0, 3);

  const counts = {
    projects: countProjects(),
    writing: countWritings().writing + countWritings().log,
    reading: countReading(),
    lab: countLab(),
  };
  const activeBuilds = allProjects.filter((p) => p.status === "building").length;

  return (
    <div className="max-w-[1280px] mx-auto my-3 sm:my-6 panel-thick">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0">
          {/* Hero / About */}
          <section id="about" className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs text-text-secondary font-mono tracking-wider">
                    <span className="inline-block w-2 h-2 bg-accent mr-2 align-middle" />
                    PERSONAL SITE / DIGITAL GARDEN / LAB
                  </p>
                  <span className="text-accent text-sm font-mono">2026</span>
                </div>

                <h1 className="mono-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.92] text-border font-mono">
                  KWIN
                  <br />
                  WENG
                </h1>
                <p className="mono-heading text-2xl sm:text-4xl text-border mt-2 font-mono">
                  / 阿欢
                </p>

                <p className="mt-8 text-base text-text-secondary leading-relaxed max-w-lg">
                  我把项目、文章、阅读和小实验放在这里。它像一个开放的工作台，帮助我把分散的想法变成可以回看、可以复用、可以继续推进的系统。
                </p>
              </div>

              <div className="lg:w-72 shrink-0">
                <div className="panel-thick p-0 overflow-hidden">
                  <div className="bg-panel p-4">
                    <Image
                      src="/kwin-pixel-avatar.png"
                      alt="Kwin Weng pixel avatar"
                      width={240}
                      height={240}
                      className="pixel-art w-full max-h-[220px] lg:max-h-none aspect-square object-cover"
                      priority
                    />
                  </div>
                  <div className="p-4 border-t-3 border-border">
                    <span className="inline-block px-2 py-0.5 bg-accent text-white text-[10px] font-bold font-mono tracking-wider mb-3">
                      ONLINE
                    </span>
                    <p className="text-sm font-mono leading-snug">
                      AI workflows,
                      <br />
                      product thinking,
                      <br />
                      knowledge systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics */}
          <section className="border-t border-border-light">
            <div className="grid grid-cols-1 sm:grid-cols-4">
              {[
                { num: String(counts.projects).padStart(2, "0"), label: "PROJECTS" },
                { num: String(activeBuilds).padStart(2, "0"), label: "ACTIVE BUILDS" },
                { num: String(counts.writing + counts.reading).padStart(2, "0"), label: "NOTES" },
                { num: "01", label: "PUBLIC HOME" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`p-5 sm:p-6 ${
                    i > 0
                      ? "border-t sm:border-t-0 sm:border-l border-border-light"
                      : ""
                  }`}
                >
                  <p className="text-2xl sm:text-3xl font-bold font-mono">
                    {m.num}
                  </p>
                  <p className="text-[10px] text-text-muted font-mono tracking-wider mt-1">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects + Status */}
          <section id="projects" className="border-t border-border-light">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 sm:p-8 lg:border-r border-border-light">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-lg font-bold">
                    <span className="text-xs text-text-muted mr-2">01</span>
                    Selected Projects
                    <span className="text-xs text-text-muted font-normal ml-2">
                      / 精选项目
                    </span>
                  </h2>
                  <Link
                    href="/projects"
                    className="text-xs text-accent font-mono hover:underline"
                  >
                    All projects
                  </Link>
                </div>

                <div className="space-y-0">
                  {spotlight.length === 0 && (
                    <p className="text-sm text-text-secondary py-4">
                      No projects yet.
                    </p>
                  )}
                  {spotlight.map((p, i) => (
                    <div
                      key={p.slug}
                      className={`flex items-start gap-4 py-4 ${
                        i > 0 ? "border-t border-border-light" : ""
                      } -mx-2 px-2`}
                    >
                      <div className="flex-1 min-w-0">
                        {p.links.demo ? (
                          <a
                            href={p.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm font-bold hover:text-accent transition-colors"
                          >
                            {p.title}
                            <span className="text-accent ml-1">↗</span>
                          </a>
                        ) : (
                          <Link
                            href={`/projects/${p.slug}`}
                            className="font-mono text-sm font-bold hover:text-accent transition-colors"
                          >
                            {p.title}
                          </Link>
                        )}
                        <p className="text-sm text-text-secondary mt-0.5">
                          {p.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 mt-0.5">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="text-[11px] font-mono text-text-muted hover:text-accent transition-colors"
                        >
                          Details →
                        </Link>
                        <span className="text-xs text-accent font-mono">
                          {p.categories[0] ?? p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-80 p-6 sm:p-8 border-t lg:border-t-0 border-border-light">
                <h2 className="font-mono text-lg font-bold mb-4">
                  <span className="text-xs text-text-muted mr-2">NOW</span>
                  Status
                  <span className="text-xs text-text-muted font-normal ml-2">
                    / 状态
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-text-secondary">
                  正在把个人网站从&ldquo;展示页&rdquo;做成&ldquo;入口页&rdquo;：能看见我在做什么，也能进入更深的内容。
                </p>
              </div>
            </div>
          </section>

          {/* Writing / Reading / Lab */}
          <section className="border-t border-border-light">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div
                id="writing"
                className="p-6 sm:p-8 sm:border-r border-border-light border-b sm:border-b-0"
              >
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">02</span>
                  Writing
                  <span className="text-xs text-text-muted font-normal ml-2">
                    / 文章
                  </span>
                </h2>
                <div className="space-y-4">
                  {recentWritings.length === 0 && (
                    <p className="text-sm text-text-secondary">No writing yet.</p>
                  )}
                  {recentWritings.map((w) => (
                    <Link
                      key={`${w.type}/${w.slug}`}
                      href={`/${w.type}/${w.slug}`}
                      className="block group"
                    >
                      <span className="text-[10px] text-accent font-mono tracking-wider">
                        {(w.tags[0] ?? w.type).toUpperCase()}
                      </span>
                      <p className="text-sm mt-0.5 group-hover:text-accent transition-colors">
                        {w.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div
                id="reading"
                className="p-6 sm:p-8 sm:border-r border-border-light border-b sm:border-b-0"
              >
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">03</span>
                  Reading
                  <span className="text-xs text-text-muted font-normal ml-2">
                    / 阅读
                  </span>
                </h2>
                <div className="space-y-4">
                  {recentReading.length === 0 && (
                    <p className="text-sm text-text-secondary">No reading yet.</p>
                  )}
                  {recentReading.map((r) => {
                    const inner = (
                      <>
                        <span className="text-[10px] text-accent font-mono tracking-wider">
                          {r.topic.toUpperCase()}
                        </span>
                        <p className="text-sm mt-0.5">{r.title}</p>
                      </>
                    );
                    return r.url ? (
                      <a
                        key={r.id}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-accent transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={r.id}>{inner}</div>
                    );
                  })}
                </div>
              </div>

              <div id="lab" className="p-6 sm:p-8">
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">04</span>
                  Lab
                  <span className="text-xs text-text-muted font-normal ml-2">
                    / 实验室
                  </span>
                </h2>
                <div className="space-y-3">
                  {recentLab.length === 0 && (
                    <p className="text-sm text-text-secondary">No lab items.</p>
                  )}
                  {recentLab.map((l) => {
                    const inner = (
                      <p className="text-sm font-mono">{l.title}</p>
                    );
                    return l.href ? (
                      <a
                        key={l.slug}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="panel p-3 block hover:border-accent transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={l.slug} className="panel p-3">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Elsewhere */}
          <section
            id="elsewhere"
            className="border-t border-border-light p-6 sm:p-8"
          >
            <h2 className="font-mono text-lg font-bold mb-5">
              <span className="text-xs text-text-muted mr-2">05</span>
              Elsewhere
              <span className="text-xs text-text-muted font-normal ml-2">
                / 其他
              </span>
            </h2>
            <div className="flex flex-wrap gap-6 items-center">
              <a
                href="https://github.com/kwinweng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-text-secondary hover:text-accent transition-colors"
              >
                GitHub →
              </a>
              <Link
                href="/writing"
                className="text-sm font-mono text-text-secondary hover:text-accent transition-colors"
              >
                Blog →
              </Link>
              <a
                href="https://x.com/kwinweng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-text-secondary hover:text-accent transition-colors"
              >
                X →
              </a>
              <EmailButton />
            </div>
          </section>

          {/* Mobile navigation — appears after content */}
          <nav className="lg:hidden border-t border-border-light p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center justify-center w-6 h-6 border-2 border-accent text-accent text-[10px] font-bold font-mono">
                KW
              </div>
              <span className="text-xs font-bold font-mono uppercase">
                Kwin Weng / 阿欢
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 py-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors"
                >
                  <span className="text-accent">{item.num}</span>
                  <span>{item.label}</span>
                  <span className="text-[10px] text-text-muted">
                    / {item.zh}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
}
