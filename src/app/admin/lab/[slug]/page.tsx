import { notFound } from "next/navigation";
import { getLab } from "@/lib/repo/lab";
import LabEditor from "./editor";
import type { LabRow } from "@/lib/repo/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LabEditorPage({ params }: Props) {
  const { slug } = await params;
  let initial: LabRow | undefined;
  if (slug !== "new") {
    initial = getLab(slug);
    if (!initial) notFound();
  }
  return <LabEditor initial={initial} />;
}
