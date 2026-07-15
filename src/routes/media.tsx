import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — Emotional Ledger" },
      { name: "description", content: "Press kit, review copies, and interview requests for Emotional Ledger." },
      { property: "og:title", content: "Media — Emotional Ledger" },
      { property: "og:url", content: "/media" },
    ],
    links: [{ rel: "canonical", href: "/media" }],
  }),
  component: MediaPage,
});

function MediaPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Media"
        title="For editors, journalists, and podcasters."
        lede={<>Request a review copy, download the press kit, or book an interview with the author.</>}
      />
      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow>Press Kit</SectionEyebrow>
            <ul className="mt-8 grid gap-4 font-serif text-lg text-ink">
              <li>· Author biography (short and long)</li>
              <li>· Book synopsis and chapter list</li>
              <li>· High-resolution jacket and author images</li>
              <li>· Suggested interview questions</li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">The full press kit is available on request.</p>
          </div>
          <EnquiryForm
            kind="media"
            cta="Send media enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "organization", label: "Publication / outlet", required: true },
              { name: "subject", label: "Subject", required: true },
              { name: "kindOfRequest", label: "Type of request", type: "select", options: ["Review copy", "Interview", "Feature / profile", "Press kit", "Other"] },
              { name: "message", label: "Details", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}