import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Journal — Emotional Ledger" },
      { name: "description", content: "Essays and reflections from the author of Emotional Ledger." },
      { property: "og:title", content: "Journal — Emotional Ledger" },
      { property: "og:url", content: "/articles" },
    ],
    links: [{ rel: "canonical", href: "/articles" }],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Journal"
        title="A slow journal of essays and reflections."
        lede={<>The Journal opens with the book. Until then, subscribe to receive the first essays as they are published.</>}
      />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Coming soon</SectionEyebrow>
          <p className="mt-8 font-display text-3xl leading-tight text-ink md:text-4xl">
            The first essays land alongside the book. One a month, no more.
          </p>
          <div className="mt-10 flex justify-center">
            <NewsletterForm source="articles" />
          </div>
        </div>
      </Section>
    </div>
  );
}