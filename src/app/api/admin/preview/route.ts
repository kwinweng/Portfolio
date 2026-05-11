import { NextResponse } from "next/server";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export const dynamic = "force-dynamic";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: { light: "github-light", dark: "github-dark" },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function POST(req: Request) {
  let body: { markdown?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const md = String(body.markdown ?? "");
  try {
    const file = await processor.process(md);
    return NextResponse.json({ html: String(file) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "render failed" },
      { status: 500 }
    );
  }
}
