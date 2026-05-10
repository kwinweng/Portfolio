import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="card-ghost p-12">
          <h1 className="text-2xl font-semibold text-ghost-white font-[family-name:var(--font-geist-sans)]">
            Admin Panel
          </h1>
          <p className="text-ash-text mt-4">
            Project management, content editing, and visibility controls.
          </p>
          <p className="text-slate-text text-sm mt-2">Coming in v0.3</p>
          <div className="mt-8 space-y-3 text-sm text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-slate-text">
              <span className="w-2 h-2 rounded-full bg-gunmetal" />
              OAuth login (GitHub / Google)
            </div>
            <div className="flex items-center gap-3 text-slate-text">
              <span className="w-2 h-2 rounded-full bg-gunmetal" />
              Project CRUD + visibility management
            </div>
            <div className="flex items-center gap-3 text-slate-text">
              <span className="w-2 h-2 rounded-full bg-gunmetal" />
              Writing & Build Log editor
            </div>
            <div className="flex items-center gap-3 text-slate-text">
              <span className="w-2 h-2 rounded-full bg-gunmetal" />
              Featured / priority / status controls
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
