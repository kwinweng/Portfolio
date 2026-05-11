import { EditorPageInner } from "../../writing/[slug]/page";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function LogEditorPage({ params }: Props) {
  const { slug } = await params;
  return <EditorPageInner slug={slug} type="log" zh="开发日志" />;
}
