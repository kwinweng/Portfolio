import { notFound } from "next/navigation";
import { getProject } from "@/lib/repo/projects";
import ProjectEditor from "./editor";
import type { ProjectRow } from "@/lib/repo/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectEditorPage({ params }: Props) {
  const { slug } = await params;
  let initial: ProjectRow | undefined;
  if (slug !== "new") {
    initial = getProject(slug, { includeUnlisted: true, includePrivate: true });
    if (!initial) notFound();
  }
  return <ProjectEditor initial={initial} />;
}
