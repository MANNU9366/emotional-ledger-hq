import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Emotional Ledger" },
      { name: "description", content: "How Emotional Ledger collects, uses, and safeguards your information." },
      { property: "og:title", content: "Privacy — Emotional Ledger" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <div>
      <PageHeader eyebrow="Legal" title="Privacy." />
      <Section>
        <div className="mx-auto max-w-2xl font-serif text-lg leading-relaxed text-ink space-y-6">
          <p>We collect only the information you give us — your email if you subscribe, and the details you provide when you send us an enquiry. We do not sell, rent, or share that information with third parties.</p>
          <p>Our newsletter is sent monthly. You can unsubscribe with one click at any time.</p>
          <p>For any questions or requests to access, correct, or delete your data, write to <a href="mailto:hello@emotionalledger.com" className="border-b border-ink hover:text-gold hover:border-gold">hello@emotionalledger.com</a>.</p>
        </div>
      </Section>
    </div>
  ),
});