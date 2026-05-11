import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← KWIN WENG
          </Link>
        </div>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mb-8">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
