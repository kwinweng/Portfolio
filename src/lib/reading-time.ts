export function estimateReadingMinutes(body: string): number {
  const stripped = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[.*?\]\(.*?\)/g, " ")
    .replace(/[#>*_~\-]/g, " ");

  const ascii = stripped.match(/[A-Za-z0-9]+/g) ?? [];
  const cjk = stripped.match(/[一-鿿]/g) ?? [];
  const words = ascii.length + Math.ceil(cjk.length / 2);
  return Math.max(1, Math.round(words / 250));
}
