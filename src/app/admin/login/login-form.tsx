"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ next }: { next?: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          const res = await fetch("/api/admin/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({ error: "unknown" }));
            setError(data.error ?? "login failed");
            return;
          }
          router.replace(next ?? "/admin");
          router.refresh();
        });
      }}
      className="space-y-4"
    >
      <input
        type="password"
        autoFocus
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password / 密码"
        className="w-full px-3 py-2 border-3 border-border font-mono text-sm bg-bg focus:outline-none focus:border-accent"
      />
      {error && (
        <p className="text-xs font-mono text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={pending || !password}
        className="w-full px-3 py-2 border-3 border-border bg-border text-bg font-mono text-sm hover:bg-accent hover:border-accent transition-colors disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in / 登录"}
      </button>
    </form>
  );
}
