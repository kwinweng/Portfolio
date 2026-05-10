export function Footer() {
  return (
    <footer className="border-t border-gunmetal py-12 pb-32 sm:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-ghost-white font-medium font-[family-name:var(--font-geist-sans)]">
              Kwin Weng
            </p>
            <p className="text-slate-text text-sm mt-1">
              Investor & Product Builder
            </p>
          </div>
          <div className="flex gap-6 text-sm text-ash-text">
            <a
              href="https://github.com/kwinweng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-canvas-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@kwinweng.com"
              className="hover:text-canvas-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        <p className="text-slate-text text-xs mt-8">
          &copy; {new Date().getFullYear()} Kwin Weng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
