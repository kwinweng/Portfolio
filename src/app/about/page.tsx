import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Kwin Weng — Investor & Product Builder.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32 sm:pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold text-canvas-white font-[family-name:var(--font-geist-sans)] tracking-tight">
            About
          </h1>
        </div>

        <div className="space-y-8 text-silver-whisper leading-relaxed">
          <p className="text-lg">
            I&apos;m Kwin Weng — an investor-type builder using AI agents and data
            systems to productize my investing, finance, knowledge, and
            intelligence workflows.
          </p>

          <p>
            I don&apos;t just use AI tools — I build them. From quantitative factor
            research (Warp) to personal financial dashboards (Financial Expert
            v2), from knowledge management systems (LLM Knowledge Base) to
            intelligence radars (News Radar), each project solves a real problem
            in my daily workflow.
          </p>

          <p>
            My approach: start with a real need, build a working system, iterate
            in public, and share what I learn along the way.
          </p>

          <div className="card-ghost p-8 mt-12">
            <h2 className="text-xl font-semibold text-ghost-white font-[family-name:var(--font-geist-sans)] mb-6">
              Get in Touch
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-slate-text w-16">GitHub</span>
                <a
                  href="https://github.com/kwinweng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ghost-white hover:text-canvas-white transition-colors"
                >
                  github.com/kwinweng
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-text w-16">Email</span>
                <a
                  href="mailto:hello@kwinweng.com"
                  className="text-ghost-white hover:text-canvas-white transition-colors"
                >
                  hello@kwinweng.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
