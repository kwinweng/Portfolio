import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";

function isInternal(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("/") || href.startsWith("#");
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mono-heading font-mono text-3xl sm:text-4xl font-bold mt-10 mb-6 text-border">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="font-mono text-xl sm:text-2xl font-bold mt-10 mb-4 text-border scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="font-mono text-base sm:text-lg font-bold mt-8 mb-3 text-border scroll-mt-24"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed text-text-secondary my-4">
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) => {
    if (isInternal(href)) {
      return (
        <Link
          href={href ?? "#"}
          className="text-accent underline underline-offset-2 hover:no-underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:no-underline"
        {...rest}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-1 text-text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4 space-y-1 text-text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-3 border-accent pl-4 my-6 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    // inline code (no language class)
    if (!className) {
      return (
        <code className="font-mono text-sm bg-panel px-1.5 py-0.5 border border-border-light rounded-sm">
          {children}
        </code>
      );
    }
    // block code — rehype-pretty-code wraps in <pre><code>
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="font-mono text-sm my-6 p-4 bg-panel border-3 border-border overflow-x-auto leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-t border-border-light" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border border-border-light font-mono text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left border-b border-border bg-panel font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-border-light">{children}</td>
  ),
  strong: ({ children }) => (
    <strong className="text-border font-bold">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
