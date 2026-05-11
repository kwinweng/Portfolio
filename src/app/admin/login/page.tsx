import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await getCurrentSession();
  const { next } = await searchParams;
  if (session) redirect(next ?? "/admin");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm panel-thick">
        <div className="p-8">
          <p className="text-[10px] font-mono text-text-muted tracking-wider mb-2">
            ADMIN / 后台
          </p>
          <h1 className="mono-heading text-2xl font-mono mb-6 text-border">
            Login
          </h1>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
