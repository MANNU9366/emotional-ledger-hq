import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Emotional Ledger" },
      { name: "description", content: "Terms of use for the Emotional Ledger website." },
      { property: "og:title", content: "Terms — Emotional Ledger" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <div>
      <PageHeader eyebrow="Legal" title="Terms of use." />
      <Section>
        <div className="mx-auto max-w-2xl font-serif text-lg leading-relaxed text-ink space-y-6">
          <p>All content on this website — writing, imagery, and design — is the property of the author and Ledger House unless otherwise noted.</p>
          <p>Excerpts may be quoted for review or commentary with proper attribution. Reproduction of full essays or chapters requires written permission.</p>
          <p>By using this website you agree to these terms and to our <a href="/privacy" className="border-b border-ink hover:text-gold hover:border-gold">privacy policy</a>.</p>
        </div>
      </Section>
    </div>
  ),
});