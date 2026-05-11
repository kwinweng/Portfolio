"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await fetch("/api/admin/auth/logout", { method: "POST" });
          router.replace("/admin/login");
          router.refresh();
        })
      }
      className="text-xs font-mono text-text-muted hover:text-accent transition-colors disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "..." : "Logout"}
    </button>
  );
}
