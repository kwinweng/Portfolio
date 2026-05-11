import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>
        <h1 className="mono-heading text-3xl font-mono mt-6 mb-2 text-border">
          Admin
        </h1>
        <p className="text-text-secondary mb-4 font-mono text-sm">/ 后台</p>
        <p className="text-text-secondary mb-6">Coming in v0.3.</p>
        <div className="space-y-2 text-sm text-text-muted">
          <p>• OAuth login</p>
          <p>• Project CRUD + visibility</p>
          <p>• Writing & Build Log editor</p>
          <p>• Featured / priority controls</p>
        </div>
      </div>
    </div>
  );
}
