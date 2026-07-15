import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import bookCover from "@/assets/book-cover.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { CHAPTERS, THEMES } from "@/lib/site-content";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "The Book — Emotional Ledger" },
      { name: "description", content: "Inside Emotional Ledger — chapters, themes, editions, and what readers can expect." },
      { property: "og:title", content: "The Book — Emotional Ledger" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Book"
        title="A quiet, precise book for a noisy time."
        lede={<>Eight chapters on the interior work that decides everything else — the choices we make, the leaders we become, the relationships we can hold.</>}
      />
      <Section>
        <div className="grid items-start gap-16 md:grid-cols-[1fr_1.2fr]">
          <img
            src={bookCover}
            alt="Hardcover mockup of the book Emotional Ledger."
            className="mx-auto aspect-[3/4] w-full max-w-md object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]"
          />
          <div className="font-serif text-lg leading-relaxed text-ink">
            <SectionEyebrow>Synopsis</SectionEyebrow>
            <p className="mt-8 drop-cap">
              We do not think our way into wisdom. We feel our way there — and
              then we account for it. <em>Emotional Ledger</em> is a rigorous,
              literary book about the private accounting we all keep, whether we
              know it or not.
            </p>
            <p className="mt-6">
              Drawing on four years of interviews with executives, coaches, and
              clinicians, and shaped by the author's own decade of practice, the
              book makes an unfashionable but urgent case: that emotional
              literacy is not a soft skill but the missing discipline of modern
              adult life.
            </p>
            <p className="mt-6">
              This is not a self-help book. It offers frameworks, not
              affirmations. It is written for readers who want a book that
              respects their intelligence — and unsettles it.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-y-4 text-sm">
              <dt className="eyebrow">Length</dt><dd className="text-ink">240 pages</dd>
              <dt className="eyebrow">Editions</dt><dd className="text-ink">Hardcover · eBook · Audio</dd>
              <dt className="eyebrow">Publisher</dt><dd className="text-ink">Ledger House</dd>
              <dt className="eyebrow">Publication</dt><dd className="text-ink">2025</dd>
            </dl>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/buy" className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold hover:text-ink hover:border-gold">
                Buy the Book <ArrowRight className="size-3.5" />
              </Link>
              <Link to="/sample-chapter" className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper">
                Read the sample chapter
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="ivory">
        <SectionEyebrow>Contents</SectionEyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
          Eight chapters. One long conversation with yourself.
        </h2>
        <ol className="mt-16 grid gap-0">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-6 border-t border-border py-6 last:border-b">
              <span className="font-display text-2xl text-gold">{c.n}.</span>
              <span className="font-serif text-2xl text-ink">{c.t}</span>
              <span className="eyebrow hidden md:inline">Chapter</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="ink">
        <SectionEyebrow><span className="text-gold-soft">Themes</span></SectionEyebrow>
        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((t) => (
            <article key={t.n} className="border-t border-paper/15 pt-6">
              <span className="font-display text-xl text-gold-soft">{t.n}</span>
              <h3 className="mt-4 font-display text-2xl text-paper">{t.t}</h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-paper/70">{t.d}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}