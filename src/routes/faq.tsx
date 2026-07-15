import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { FAQ } from "@/lib/site-content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Emotional Ledger" },
      { name: "description", content: "Answers to the most common questions about the book, workshops, speaking, and bulk orders." },
      { property: "og:title", content: "FAQ — Emotional Ledger" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div>
      <PageHeader eyebrow="FAQ" title="Questions, answered plainly." />
      <Section>
        <SectionEyebrow>Frequently asked</SectionEyebrow>
        <dl className="mt-12 grid gap-0">
          {FAQ.map((f, i) => (
            <div key={i} className="grid gap-4 border-t border-border py-10 last:border-b md:grid-cols-[1fr_1.5fr] md:gap-12">
              <dt className="font-display text-2xl leading-snug text-ink">{f.q}</dt>
              <dd className="font-serif text-lg leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}