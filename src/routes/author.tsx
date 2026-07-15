import { createFileRoute, Link } from "@tanstack/react-router";
import author from "@/assets/author.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/author")({
  head: () => ({
    meta: [
      { title: "About the Author — Emotional Ledger" },
      { name: "description", content: "The author of Emotional Ledger — biography, mission, and the ten-year practice behind the book." },
      { property: "og:title", content: "About the Author — Emotional Ledger" },
      { property: "og:url", content: "/author" },
    ],
    links: [{ rel: "canonical", href: "/author" }],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Author"
        title="A writer and teacher of emotional life."
        lede={<>Ten years of quiet work with leaders, teams, and readers on the interior discipline that shapes everything else.</>}
      />
      <Section>
        <div className="grid items-start gap-16 md:grid-cols-[1fr_1.2fr]">
          <img src={author} alt="Portrait of the author of Emotional Ledger." className="aspect-[4/5] w-full object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]" />
          <div className="font-serif text-lg leading-relaxed text-ink">
            <SectionEyebrow>Biography</SectionEyebrow>
            <p className="mt-8 drop-cap">
              The author is a writer, teacher, and long-time student of
              emotional life. Trained across psychology, philosophy, and
              organisational practice, they have spent the last decade working
              with executives, founders, educators, and readers on the
              disciplines of self-awareness and reconciliation.
            </p>
            <p className="mt-6">
              Their essays have appeared in leading business and cultural
              publications, and their private practice has quietly shaped the
              interior lives of leaders across five continents.
            </p>
            <p className="mt-6">
              <em>Emotional Ledger</em> is their first book — a distilled record
              of ten years of listening.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/speaking" className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper">Invite to Speak</Link>
              <Link to="/media" className="inline-flex items-center gap-2 border border-transparent px-1 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-ink">Media Enquiries</Link>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="ivory">
        <SectionEyebrow>Mission</SectionEyebrow>
        <p className="mt-8 max-w-3xl font-display text-3xl leading-[1.25] text-ink md:text-5xl">
          To restore emotional accounting to its rightful place — as the quiet
          discipline behind clear thinking, honest leadership, and a life that
          holds together.
        </p>
      </Section>
    </div>
  );
}