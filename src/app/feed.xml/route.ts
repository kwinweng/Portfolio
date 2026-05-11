import { listWritings } from "@/lib/repo/writings";
import type { WritingRow, ContentType } from "@/lib/repo/types";

const SITE_URL = "https://kwinweng.com";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export const dynamic = "force-static";

export function GET() {
  const writings = listWritings("writing");
  const logs = listWritings("log");
  const items: WritingRow[] = [...writings, ...logs].sort((a, b) => {
    const aDate = a.publishedAt ?? a.updatedAt;
    const bDate = b.publishedAt ?? b.updatedAt;
    return bDate.localeCompare(aDate);
  });

  const updatedAt = items[0]?.publishedAt ?? new Date().toISOString();

  const itemsXml = items
    .map((item) => {
      const type: ContentType = item.type;
      const url = `${SITE_URL}/${type}/${item.slug}`;
      const pubDate = new Date(item.publishedAt ?? item.updatedAt).toUTCString();
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(item.summary)}</description>
      <category>${item.type}</category>${item.tags
        .map((t) => `\n      <category>${escapeXml(t)}</category>`)
        .join("")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KWIN WENG / 阿欢</title>
    <link>${SITE_URL}</link>
    <description>Writing and build logs from kwinweng.com.</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date(updatedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
