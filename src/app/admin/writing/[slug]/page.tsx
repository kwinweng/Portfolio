import { notFound } from "next/navigation";
import { getWriting } from "@/lib/repo/writings";
import WritingEditor from "./editor";
import type { WritingRow } from "@/lib/repo/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WritingEditorPage({ params }: Props) {
  const { slug } = await params;
  return <EditorPageInner slug={slug} type="writing" zh="文章" />;
}

export async function EditorPageInner({
  slug,
  type,
  zh,
}: {
  slug: string;
  type: "writing" | "log";
  zh: string;
}) {
  let item: WritingRow | undefined;
  if (slug === "new") {
    item = undefined;
  } else {
    item = getWriting(type, slug, { includeUnlisted: true, includePrivate: true });
    if (!item) notFound();
  }
  return <WritingEditor type={type} zh={zh} initial={item} />;
}
