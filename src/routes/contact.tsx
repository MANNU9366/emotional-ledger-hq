import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Emotional Ledger" },
      { name: "description", content: "Get in touch with the Emotional Ledger team — for general, media, and reader enquiries." },
      { property: "og:title", content: "Contact — Emotional Ledger" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Write to us."
        lede={<>For readers, journalists, and organisations. We respond to every message personally, usually within two business days.</>}
      />
      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionEyebrow>Direct</SectionEyebrow>
            <p className="mt-8 font-serif text-2xl text-ink">
              <a href={`mailto:${SITE.email}`} className="border-b border-ink pb-1 hover:text-gold hover:border-gold">{SITE.email}</a>
            </p>
            <p className="mt-4 font-serif text-lg text-ink">
              <a href={`tel:${SITE.phoneHref}`} className="border-b border-ink pb-1 hover:text-gold hover:border-gold">{SITE.phone}</a>
            </p>
            <div className="mt-12 grid gap-6 text-sm text-muted-foreground">
              <div>
                <p className="eyebrow">Workshops</p>
                <p className="mt-2 font-serif text-lg text-ink">Use the <a href="/workshops" className="border-b border-ink hover:text-gold hover:border-gold">Workshops</a> enquiry form.</p>
              </div>
              <div>
                <p className="eyebrow">Speaking</p>
                <p className="mt-2 font-serif text-lg text-ink">Use the <a href="/speaking" className="border-b border-ink hover:text-gold hover:border-gold">Speaking</a> enquiry form.</p>
              </div>
              <div>
                <p className="eyebrow">Media</p>
                <p className="mt-2 font-serif text-lg text-ink">See the <a href="/media" className="border-b border-ink hover:text-gold hover:border-gold">Media</a> page.</p>
              </div>
            </div>
          </div>
          <EnquiryForm
            kind="contact"
            cta="Send message"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", placeholder: "Include country code" },
              { name: "country", label: "Country" },
              { name: "source", label: "Where did you hear about the book?", type: "select", options: ["A friend or colleague", "Search / Google", "Instagram", "LinkedIn", "Podcast or interview", "Workshop or event", "Other"] },
              { name: "subject", label: "Subject", required: true },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}