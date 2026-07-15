import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <section className="border-b border-border bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className={`flex flex-col gap-6 ${alignCls}`}>
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow">{eyebrow}</span>
            </div>
          ) : null}
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-ink md:text-6xl">
            {title}
          </h1>
          {lede ? (
            <div className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground md:text-xl">
              {lede}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}