import type { ReactNode } from "react";

export function AuthCard({ eyebrow, title, subtitle, children, aside }: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-ivory">
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div className="hidden flex-col justify-between border-r border-border/60 pr-12 md:flex">
          <div>
            <div className="flex items-center gap-3">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink">{title}</h1>
            {subtitle ? (
              <p className="mt-5 max-w-md font-serif text-lg text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {aside ? <div className="text-sm text-muted-foreground">{aside}</div> : null}
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="md:hidden mb-8">
            <div className="flex items-center gap-3">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl text-ink">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export const inputCls =
  "w-full border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-ink";

export const primaryBtn =
  "inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-70";