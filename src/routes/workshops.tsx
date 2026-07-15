import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops — Emotional Ledger" },
      { name: "description", content: "Half-day and multi-day workshops on emotional accounting for leaders, teams, and cohorts." },
      { property: "og:title", content: "Workshops — Emotional Ledger" },
      { property: "og:url", content: "/workshops" },
    ],
    links: [{ rel: "canonical", href: "/workshops" }],
  }),
  component: WorkshopsPage,
});

const PROGRAMS = [
  { t: "The Half-Day Reading", d: "A three-hour, in-room session for teams of up to 24. Introduces the ledger frameworks through readings and paired reflection.", meta: "3 hours · in-person · from $6,000" },
  { t: "The One-Day Intensive", d: "A full day for leadership teams to work through their own ledgers. Case studies, structured dialogue, private worksheets.", meta: "1 day · in-person · from $12,000" },
  { t: "The Cohort Program", d: "A six-week program for cross-organisation cohorts. Weekly readings, live sessions, and small-group practice.", meta: "6 weeks · online · from $2,400 / seat" },
];

function WorkshopsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Workshops"
        title="Three programs. One quiet, rigorous practice."
        lede={<>Each format translates the book's frameworks into applied work — for leadership teams, whole organisations, and open cohorts.</>}
      />
      <Section>
        <SectionEyebrow>Programs</SectionEyebrow>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((p) => (
            <article key={p.t} className="flex h-full flex-col border border-border bg-ivory p-8">
              <h3 className="font-display text-2xl text-ink">{p.t}</h3>
              <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-muted-foreground">{p.d}</p>
              <p className="mt-6 eyebrow">{p.meta}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="ivory">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow>Enquire</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">Bring a program<br />to your team.</h2>
            <p className="mt-6 font-serif text-lg text-muted-foreground">Most engagements are booked 6–8 weeks in advance. Share a few details and we'll respond within two business days.</p>
          </div>
          <EnquiryForm
            kind="workshop"
            cta="Send workshop enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "organization", label: "Organisation", required: true },
              { name: "phone", label: "Phone (optional)", type: "tel" },
              { name: "format", label: "Preferred program", type: "select", required: true, options: PROGRAMS.map((p) => p.t) },
              { name: "message", label: "Tell us about your team and goals", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}