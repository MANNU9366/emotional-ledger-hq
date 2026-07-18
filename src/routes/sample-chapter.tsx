import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/sample-chapter")({
  head: () => ({
    meta: [
      { title: "Sample Chapter — Emotional Ledger" },
      { name: "description", content: "Read the opening chapter of Emotional Ledger, delivered privately to your inbox." },
      { property: "og:title", content: "Sample Chapter — Emotional Ledger" },
      { property: "og:url", content: "/sample-chapter" },
    ],
    links: [{ rel: "canonical", href: "/sample-chapter" }],
  }),
  component: SamplePage,
});

function SamplePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Sample Chapter"
        title="Read the first chapter, quietly."
        lede={<>A generous excerpt from <em>The Debts We Don't See</em> — delivered as a beautifully typeset PDF to your inbox.</>}
      />
      <Section>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <SectionEyebrow>What you'll receive</SectionEyebrow>
            <ul className="mt-8 grid gap-5 font-serif text-lg text-ink">
              <li>· The opening chapter in full (~28 pages)</li>
              <li>· A hand-set PDF designed for slow reading</li>
              <li>· A private reflection prompt from the author</li>
              <li>· Optional inclusion in the Monthly Ledger newsletter</li>
            </ul>
            <p className="mt-8 font-serif text-base text-muted-foreground">
              We only email you what you asked for. Unsubscribe with a click.
            </p>
            <p className="mt-6">
              <a
                href={SITE.sampleUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-paper hover:bg-transparent hover:text-ink"
              >
                Download the sample PDF
              </a>
            </p>
          </div>
          <div>
            <EnquiryForm
              kind="sample"
              cta="Send me the chapter"
              successMessage="Thank you. The chapter is on its way — check your inbox in the next few minutes."
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "subject", label: "Where did you hear about the book?" },
              ]}
              extraMeta={{ optIn: true }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}