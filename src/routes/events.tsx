import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Emotional Ledger" },
      { name: "description", content: "Upcoming readings, launches, and conversations with the author of Emotional Ledger." },
      { property: "og:title", content: "Events — Emotional Ledger" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Events"
        title="Readings, launches, and quiet conversations."
        lede={<>The launch tour is being confirmed. Subscribe to be first to hear about dates in your city.</>}
      />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Tour dates</SectionEyebrow>
          <p className="mt-8 font-serif text-lg text-muted-foreground">The 2025 launch tour will be announced in the Monthly Ledger. All events are ticketed and intentionally small.</p>
          <div className="mt-10 flex justify-center">
            <NewsletterForm source="events" />
          </div>
        </div>
      </Section>
    </div>
  );
}