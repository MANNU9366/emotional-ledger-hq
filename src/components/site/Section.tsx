import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  tone = "paper",
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: "paper" | "ivory" | "ink";
  className?: string;
  as?: ElementType;
}) {
  const bg =
    tone === "ink"
      ? "bg-ink text-paper"
      : tone === "ivory"
        ? "bg-ivory text-ink"
        : "bg-paper text-ink";
  return (
    <Tag className={cn(bg, className)}>
      <div className="container-editorial py-20 md:py-28">{children}</div>
    </Tag>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="gold-rule" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}