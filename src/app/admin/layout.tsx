import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import LogoutButton from "./logout-button";

export const metadata: Metadata = {
  title: { default: "Admin / 后台", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    // login page is the only unauthed admin entry, it has its own layout via this same shell
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b-3 border-border bg-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-mono text-sm font-bold hover:text-accent transition-colors"
            >
              🔒 ADMIN
            </Link>
            <nav className="flex items-center gap-4 text-xs font-mono">
              <Link
                href="/admin/writing"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Writing
              </Link>
              <Link
                href="/admin/log"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Log
              </Link>
              <Link
                href="/admin/projects"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/admin/reading"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Reading
              </Link>
              <Link
                href="/admin/lab"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Lab
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
            >
              ← Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
