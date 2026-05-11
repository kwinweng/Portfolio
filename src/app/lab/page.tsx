import type { Metadata } from "next";
import Link from "next/link";
import { listLab } from "@/lib/repo/lab";

export const metadata: Metadata = {
  title: "Lab / 实验室",
  description: "Small tools, prototypes, templates and ongoing experiments.",
};

const KIND_LABELS: Record<string, string> = {
  tool: "TOOL / 工具",
  prototype: "PROTOTYPE / 原型",
  experiment: "EXPERIMENT / 实验",
  template: "TEMPLATE / 模板",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  archived: "Archived",
  tinkering: "Tinkering",
};

const KIND_ORDER = ["tool", "experiment", "prototype", "template"];

export default function LabPage() {
  const items = listLab();
  const groups = KIND_ORDER.map((kind) => ({
    kind,
    items: items.filter((l) => l.kind === kind),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 panel-thick">
      <div className="p-6 sm:p-10">
        <Link
          href="/"
          className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          ← KWIN WENG
        </Link>
        <h1 className="mono-heading text-3xl sm:text-4xl font-mono mt-6 mb-2 text-border">
          Lab
        </h1>
        <p className="text-text-secondary mb-2 font-mono text-sm">/ 实验室</p>
        <p className="text-text-secondary text-sm mb-10 max-w-xl leading-relaxed">
          小工具、模板和日常拼装出来的实验品。多数不会成为正式项目 —
          它们存在的意义是让一个 idea 在 30 分钟内变成&ldquo;能跑&rdquo;的东西。
        </p>

        <div className="space-y-10">
          {groups.map(({ kind, items }) => (
            <section key={kind}>
              <h2 className="text-[10px] font-mono text-accent tracking-wider mb-4">
                {KIND_LABELS[kind] ?? kind.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((item) => {
                  const cardInner = (
                    <>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <p className="font-mono text-sm font-bold">
                          {item.title}
                          {item.href && <span className="text-accent ml-1">↗</span>}
                        </p>
                        <span className="text-[10px] font-mono text-text-muted shrink-0">
                          {STATUS_LABELS[item.status] ?? item.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                      {item.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.stack.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-mono px-1.5 py-0.5 border border-border-light text-text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.slug}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel p-4 block hover:border-accent transition-colors"
                    >
                      {cardInner}
                    </a>
                  ) : (
                    <div key={item.slug} className="panel p-4">
                      {cardInner}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
