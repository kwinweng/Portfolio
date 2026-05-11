import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small tools, prototypes, and workflow experiments.",
};

export default function LabPage() {
  return (
    <div className="max-w-3xl mx-auto my-8 panel-thick p-6 sm:p-10">
      <Link
        href="/"
        className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
      >
        ← Back
      </Link>
      <h1 className="mono-heading text-3xl font-mono mt-6 mb-4">
        Lab
      </h1>
      <p className="text-text-secondary">
        Small tools, prototypes, and workflow experiments. Coming soon.
      </p>
    </div>
  );
}
