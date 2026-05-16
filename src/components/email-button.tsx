"use client";

import { useState } from "react";

export function EmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "hello@kwinweng.com";

  return (
    <a
      href={`mailto:${email}`}
      onClick={async (e) => {
        e.preventDefault();
        setCopied(true);
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          window.location.href = `mailto:${email}`;
        }
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`text-sm font-mono transition-colors cursor-pointer inline-flex items-center min-h-11 -my-2.5 ${
        copied ? "text-accent font-bold" : "text-text-secondary hover:text-accent"
      }`}
    >
      {copied ? "✓ COPIED!" : "EMAIL →"}
    </a>
  );
}
