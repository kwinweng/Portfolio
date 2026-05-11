"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { id: "about", num: "00", label: "ABOUT" },
  { id: "projects", num: "01", label: "PROJECTS" },
  { id: "writing", num: "02", label: "WRITING" },
  { id: "reading", num: "03", label: "READING" },
  { id: "lab", num: "04", label: "LAB" },
  { id: "elsewhere", num: "05", label: "ELSEWHERE" },
];

const projects = [
  {
    name: "AI News Radar",
    desc: "Daily board for AI product and growth signals.",
    tag: "Radar",
    href: "/projects/news-radar",
  },
  {
    name: "Financial Expert",
    desc: "Personal finance diagnosis with clearer monthly views.",
    tag: "Finance",
    href: "/projects/financial-expert",
  },
  {
    name: "LLM Knowledge Vault",
    desc: "Obsidian ingest, taxonomy, and durable notes.",
    tag: "Knowledge",
    href: "/projects/llm-knowledge-base",
  },
];

const writings = [
  { type: "ESSAY", title: "Small systems beat heroic discipline" },
  { type: "NOTE", title: "How AI tools should respect your process" },
  { type: "LOG", title: "Week 19: Build Log — homepage redesign" },
];

const readings = [
  { type: "AI", title: "Agents as personal infrastructure" },
  { type: "DESIGN", title: "Brutalist web design and its return" },
  { type: "WORK", title: "The case for working with the garage door up" },
];

const labItems = [
  { title: "Article → Mindmap" },
  { title: "Reading Inbox → Note" },
  { title: "Weekly Review Template" },
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
              <span className="text-accent text-xs font-mono">
                {item.num}
              </span>
              <span className="font-mono text-xs tracking-wider">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function EmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "hello@kwinweng.com";

  return (
    <a
      href={`mailto:${email}`}
      onClick={async (e) => {
        e.preventDefault();
        setCopied(true);
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          window.location.href = `mailto:${email}`;
        }
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`text-xs font-mono transition-colors cursor-pointer inline-block ${
        copied ? "text-accent font-bold" : "text-text-secondary hover:text-accent"
      }`}
    >
      {copied ? "✓ COPIED!" : "EMAIL →"}
    </a>
  );
}

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto my-3 sm:my-6 panel-thick">
      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Hero / About */}
          <section id="about" className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left: text */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs text-text-secondary font-mono tracking-wider">
                    <span className="inline-block w-2 h-2 bg-accent mr-2 align-middle" />
                    PERSONAL SITE / DIGITAL GARDEN / LAB
                  </p>
                  <span className="text-accent text-sm font-mono">
                    2026
                  </span>
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

              {/* Right: avatar card */}
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
                { num: "06", label: "MODULES" },
                { num: "03", label: "ACTIVE BUILDS" },
                { num: "24+", label: "NOTES QUEUED" },
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
          <section
            id="projects"
            className="border-t border-border-light"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Projects */}
              <div className="flex-1 p-6 sm:p-8 lg:border-r border-border-light">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-lg font-bold">
                    <span className="text-xs text-text-muted mr-2">01</span>
                    Selected Projects
                  </h2>
                  <Link
                    href="/projects"
                    className="text-xs text-accent font-mono hover:underline"
                  >
                    All projects
                  </Link>
                </div>

                <div className="space-y-0">
                  {projects.map((p, i) => (
                    <Link key={p.name} href={p.href} className="group block">
                      <div
                        className={`flex items-start gap-4 py-4 ${
                          i > 0 ? "border-t border-border-light" : ""
                        } hover:bg-bg/50 transition-colors -mx-2 px-2`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm font-bold">
                            {p.name}
                          </p>
                          <p className="text-sm text-text-secondary mt-0.5">
                            {p.desc}
                          </p>
                        </div>
                        <span className="text-xs text-accent font-mono shrink-0 mt-0.5">
                          {p.tag}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="lg:w-80 p-6 sm:p-8 border-t lg:border-t-0 border-border-light">
                <h2 className="font-mono text-lg font-bold mb-4">
                  <span className="text-xs text-text-muted mr-2">NOW</span>
                  Status
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
              {/* Writing */}
              <div
                id="writing"
                className="p-6 sm:p-8 sm:border-r border-border-light border-b sm:border-b-0"
              >
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">02</span>
                  Writing
                </h2>
                <div className="space-y-4">
                  {writings.map((w) => (
                    <div key={w.title}>
                      <span className="text-[10px] text-accent font-mono tracking-wider">
                        {w.type}
                      </span>
                      <p className="text-sm mt-0.5">{w.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading */}
              <div
                id="reading"
                className="p-6 sm:p-8 sm:border-r border-border-light border-b sm:border-b-0"
              >
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">03</span>
                  Reading
                </h2>
                <div className="space-y-4">
                  {readings.map((r) => (
                    <div key={r.title}>
                      <span className="text-[10px] text-accent font-mono tracking-wider">
                        {r.type}
                      </span>
                      <p className="text-sm mt-0.5">{r.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab */}
              <div id="lab" className="p-6 sm:p-8">
                <h2 className="font-mono text-lg font-bold mb-5">
                  <span className="text-xs text-text-muted mr-2">04</span>
                  Lab
                </h2>
                <div className="space-y-3">
                  {labItems.map((l) => (
                    <div key={l.title} className="panel p-3">
                      <p className="text-sm font-mono">
                        {l.title}
                      </p>
                    </div>
                  ))}
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
            <div className="grid grid-cols-3 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 py-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors"
                >
                  <span className="text-accent">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
}
