import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Bulk & Corporate — Emotional Ledger" },
      { name: "description", content: "Bulk editions and custom programs for organisations, book clubs, and leadership teams." },
      { property: "og:title", content: "Bulk & Corporate — Emotional Ledger" },
      { property: "og:url", content: "/corporate" },
    ],
    links: [{ rel: "canonical", href: "/corporate" }],
  }),
  component: CorporatePage,
});

const TIERS = [
  { t: "25–99 copies", d: "20% off list price · standard delivery · optional custom bookplate." },
  { t: "100–499 copies", d: "30% off list price · priority delivery · a signed letter from the author." },
  { t: "500+ copies", d: "Custom pricing · dedicated program design · optional custom foreword." },
];

function CorporatePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Bulk & Corporate"
        title="The book, deployed thoughtfully across your organisation."
        lede={<>Bulk editions, custom bookplates, private introductions, and full programs that pair the book with the practice.</>}
      />
      <Section>
        <SectionEyebrow>Pricing Tiers</SectionEyebrow>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <article key={t.t} className="border border-border bg-ivory p-8">
              <h3 className="font-display text-2xl text-ink">{t.t}</h3>
              <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">{t.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Bulk orders ship worldwide from our fulfilment partners. Lead times: 2–4 weeks.</p>
      </Section>
      <Section tone="ivory">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow>Request a proposal</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">Tell us about your organisation.</h2>
            <p className="mt-6 font-serif text-lg text-muted-foreground">We respond to every corporate enquiry within two business days with a tailored proposal.</p>
          </div>
          <EnquiryForm
            kind="corporate"
            cta="Request proposal"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Work email", type: "email", required: true },
              { name: "organization", label: "Organisation", required: true },
              { name: "role", label: "Your role" },
              { name: "copies", label: "Approx. number of copies" },
              { name: "message", label: "How you'd like to use the book", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}