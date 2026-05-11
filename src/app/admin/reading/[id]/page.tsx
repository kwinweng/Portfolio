import { notFound } from "next/navigation";
import { getReadingById } from "@/lib/repo/reading";
import ReadingEditor from "./editor";
import type { ReadingRow } from "@/lib/repo/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReadingEditorPage({ params }: Props) {
  const { id } = await params;
  let initial: ReadingRow | undefined;
  if (id !== "new") {
    const numId = Number(id);
    if (!Number.isFinite(numId)) notFound();
    initial = getReadingById(numId);
    if (!initial) notFound();
  }
  return <ReadingEditor initial={initial} />;
}
