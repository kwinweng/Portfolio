"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", mobileLabel: "Home" },
  { href: "/projects", label: "Projects", mobileLabel: "Projects" },
  { href: "/writing", label: "Writing", mobileLabel: "Writing" },
  { href: "/log", label: "Build Log", mobileLabel: "Log" },
  { href: "/about", label: "About", mobileLabel: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${
        isHome ? "lg:hidden" : ""
      }`}
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full border border-ghost-white/10"
        style={{
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-canvas-white text-midnight-base"
                  : "text-ghost-white hover:text-canvas-white"
              }`}
            >
              <span className="hidden sm:inline">{link.label}</span>
              <span className="sm:hidden">{link.mobileLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
