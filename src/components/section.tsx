import type { ReactNode } from "react";

export function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-ghost-white font-[family-name:var(--font-geist-sans)] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-ash-text mt-2 text-lg">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
