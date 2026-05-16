import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllSettings } from "@/lib/repo/settings";

export const metadata: Metadata = {
  title: "About",
  description: "About Kwin Weng / 阿欢.",
};

export default function AboutPage() {
  const settings = getAllSettings();
  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← {settings.siteName}
        </Link>

        <div className="flex flex-col sm:flex-row gap-8 mt-6 mb-8">
          <div className="flex-1">
            <h1 className="mono-heading text-3xl sm:text-4xl font-mono mb-1 text-border">
              About
            </h1>
            <p className="text-text-secondary mb-4 font-mono text-sm">/ 关于</p>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {settings.aboutIntro}
            </p>
            <p className="text-text-secondary leading-relaxed mt-4 whitespace-pre-line">
              {settings.aboutBody}
            </p>
          </div>
          <div className="sm:w-40 shrink-0">
            <Image
              src="/kwin-pixel-avatar.png"
              alt={settings.siteName}
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
