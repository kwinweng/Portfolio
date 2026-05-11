import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Kwin Weng / 阿欢.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>

        <div className="flex flex-col sm:flex-row gap-8 mt-6 mb-8">
          <div className="flex-1">
            <h1 className="mono-heading text-3xl sm:text-4xl font-mono mb-4">
              About
            </h1>
            <p className="text-text-secondary leading-relaxed">
              我是阿欢（Kwin Weng），一个投资人型 builder。我用 AI agent
              和数据系统，把投资、财务、知识和情报工作流产品化。
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              这个网站是我的个人工作台。我把项目、文章、阅读和小实验放在这里，帮助我把分散的想法变成可以回看、可以复用、可以继续推进的系统。
            </p>
          </div>
          <div className="sm:w-40 shrink-0">
            <Image
              src="/kwin-pixel-avatar.png"
              alt="Kwin Weng"
              width={160}
              height={160}
              className="pixel-art border-3 border-border"
            />
          </div>
        </div>

        <div className="panel p-6">
          <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase mb-4">
            Contact
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-4">
              <span className="text-text-muted w-14 font-mono text-xs">
                GitHub
              </span>
              <a
                href="https://github.com/kwinweng"
                className="hover:text-accent transition-colors"
              >
                github.com/kwinweng
              </a>
            </div>
            <div className="flex gap-4">
              <span className="text-text-muted w-14 font-mono text-xs">
                Email
              </span>
              <a
                href="mailto:hello@kwinweng.com"
                className="hover:text-accent transition-colors"
              >
                hello@kwinweng.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
