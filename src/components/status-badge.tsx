import type { ProjectStatus } from "@/types/project";
import { STATUS_LABELS } from "@/types/project";

const statusColors: Record<ProjectStatus, string> = {
  deployed: "border-green-500/30 text-green-400",
  building: "border-interactive-glow/30 text-interactive-glow",
  maintained: "border-ghost-white/20 text-ash-text",
  concept: "border-slate-text/20 text-slate-text",
  archived: "border-slate-text/10 text-slate-text/50",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full border ${statusColors[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
