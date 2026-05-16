import { getAllSettings } from "@/lib/repo/settings";
import SettingsEditor from "./editor";

export default function AdminSettingsPage() {
  const initial = getAllSettings();
  return <SettingsEditor initial={initial} />;
}
