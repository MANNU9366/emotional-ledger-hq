import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking — Emotional Ledger" },
      { name: "description", content: "Keynotes and fireside conversations on emotional accounting, leadership, and the interior work of clear thinking." },
      { property: "og:title", content: "Speaking — Emotional Ledger" },
      { property: "og:url", content: "/speaking" },
    ],
    links: [{ rel: "canonical", href: "/speaking" }],
  }),
  component: SpeakingPage,
});

const TALKS = [
  { t: "The Hidden Ledger", d: "The signature keynote. Why the emotions we refuse to feel quietly decide the leaders and organisations we become.", meta: "45–60 min · keynote" },
  { t: "Clarity as Currency", d: "A fireside conversation on emotional literacy as the real skill behind good judgement.", meta: "60–90 min · fireside" },
  { t: "The Reconciled Team", d: "A workshop-keynote hybrid for leadership summits and offsites.", meta: "90 min · hybrid" },
];

function SpeakingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Speaking"
        title="A voice for the interior work of leadership."
        lede={<>Keynotes and conversations for conferences, leadership summits, and educational institutions. Booking is selective.</>}
      />
      <Section>
        <SectionEyebrow>Signature Talks</SectionEyebrow>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TALKS.map((t) => (
            <article key={t.t} className="flex h-full flex-col border border-border bg-paper p-8">
              <h3 className="font-display text-2xl text-ink">{t.t}</h3>
              <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-muted-foreground">{t.d}</p>
              <p className="mt-6 eyebrow">{t.meta}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="ivory">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow>Invite the Author</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">Share the event.<br />We'll respond personally.</h2>
            <p className="mt-6 font-serif text-lg text-muted-foreground">Speaking is limited to a small number of engagements per year. Priority is given to leadership summits and academic institutions.</p>
          </div>
          <EnquiryForm
            kind="speaking"
            cta="Send speaking enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "organization", label: "Organisation", required: true },
              { name: "subject", label: "Event name", required: true },
              { name: "date", label: "Event date" },
              { name: "location", label: "Location" },
              { name: "audience", label: "Audience size & profile" },
              { name: "message", label: "About the event", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}