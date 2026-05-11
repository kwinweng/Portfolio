import { listAllForAdmin } from "@/lib/repo/writings";
import { WritingLikeList } from "../writing/page";

export default function AdminLogList() {
  const items = listAllForAdmin().filter((w) => w.type === "log");
  return <WritingLikeList items={items} type="log" zh="开发日志" />;
}
