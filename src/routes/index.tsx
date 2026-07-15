import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Users, Mic, Building2, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";
import bookCover from "@/assets/book-cover.jpg";
import author from "@/assets/author.jpg";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { CHAPTERS, ENDORSEMENTS, QUOTES, THEMES } from "@/lib/site-content";
import { ReviewsSection } from "@/components/site/ReviewsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emotional Ledger — A Book on the Hidden Cost of Unprocessed Emotions" },
      {
        name: "description",
        content:
          "A premium thought-leadership book on how unprocessed emotions shape decisions, leadership, and relationships. Read a sample chapter, book a workshop, or invite the author.",
      },
      { property: "og:title", content: "Emotional Ledger" },
      { property: "og:type", content: "book" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: "Emotional Ledger",
          bookFormat: "https://schema.org/Hardcover",
          inLanguage: "en",
          description:
            "A thought-leadership book on how unprocessed emotions shape decisions, leadership, and relationships.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <BookShowcase />
      <Themes />
      <Chapters />
      <QuoteWall />
      <AuthorTeaser />
      <Endorsements />
      <ReviewsSection />
      <WorkWith />
      <NewsletterBand />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-28">
        <div className="flex flex-col justify-center fade-up">
          <div className="flex items-center gap-3">
            <span className="gold-rule" aria-hidden />
            <span className="eyebrow">A New Book · 2025</span>
          </div>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] text-ink md:text-[4.75rem]">
            The hidden cost <br />
            of <em className="font-serif italic text-gold">unprocessed</em>
            <br /> emotions.
          </h1>
          <p className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every feeling we refuse to face is quietly recorded — in our bodies,
            in our choices, in the people we lead. <em>Emotional Ledger</em> is a
            book about noticing the account, and learning to balance it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/buy"
              className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold hover:text-ink hover:border-gold"
            >
              Buy the Book <ArrowRight className="size-3.5" />
            </Link>
            <Link
              to="/sample-chapter"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm text-ink transition-colors hover:text-gold hover:border-gold"
            >
              Read a sample chapter
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={hero}
            alt="An open book on warm linen next to a fountain pen, softly lit."
            width={1920}
            height={1280}
            className="aspect-[4/5] w-full object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <Section tone="ivory">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>The Core Idea</SectionEyebrow>
        <p className="mt-8 font-display text-2xl leading-[1.35] text-ink md:text-4xl">
          What we do not <em className="italic text-gold">feel</em>, we do not
          resolve. What we do not resolve, we <em className="italic">pay for</em>
          &nbsp;— in our decisions, our leadership, and our relationships.
        </p>
        <p className="mt-8 font-serif text-lg text-muted-foreground">
          <em>Emotional Ledger</em> is a book about the private accounting we all
          keep, whether we know it or not. It offers frameworks — not
          affirmations — for reading that ledger clearly.
        </p>
      </div>
    </Section>
  );
}

function BookShowcase() {
  return (
    <Section>
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <SectionEyebrow>The Book</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            A quiet, precise book<br />for a noisy time.
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-muted-foreground">
            Written across four years of interviews with executives, coaches,
            clinicians, and readers, <em>Emotional Ledger</em> makes a rigorous
            case for emotional accounting as the missing discipline of modern
            adult life.
          </p>
          <ul className="mt-8 grid gap-3 font-serif text-lg text-ink">
            <li>· 8 chapters, ~240 pages</li>
            <li>· Hardcover, digital & audio editions</li>
            <li>· Foreword by a leading executive coach</li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 border border-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Inside the Book <ArrowRight className="size-3.5" />
            </Link>
            <Link
              to="/sample-chapter"
              className="inline-flex items-center gap-2 border border-transparent bg-transparent px-1 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ink"
            >
              Sample chapter
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={bookCover}
            alt="Hardcover mockup of the book Emotional Ledger."
            width={1200}
            height={1600}
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full max-w-md object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>
    </Section>
  );
}

function Themes() {
  return (
    <Section tone="ink">
      <SectionEyebrow>
        <span className="text-gold-soft">Major Themes</span>
      </SectionEyebrow>
      <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
        Six ideas that quietly reshape how you think about being human.
      </h2>
      <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t) => (
          <article key={t.n} className="border-t border-paper/15 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl text-gold-soft">{t.n}</span>
              <span className="h-px w-8 bg-gold-soft/50" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-2xl text-paper">{t.t}</h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-paper/70">
              {t.d}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Chapters() {
  return (
    <Section tone="ivory">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionEyebrow>Contents</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Eight chapters.<br />One long conversation with yourself.
          </h2>
          <p className="mt-6 max-w-md font-serif text-lg text-muted-foreground">
            Each chapter reads as a stand-alone essay and as part of a single
            arc — from noticing what you owe yourself to closing the ledger.
          </p>
        </div>
        <ol className="grid gap-0">
          {CHAPTERS.map((c) => (
            <li
              key={c.n}
              className="group flex items-baseline justify-between gap-6 border-t border-border py-5 last:border-b"
            >
              <span className="font-display text-xl text-gold w-10 shrink-0">{c.n}.</span>
              <span className="flex-1 font-serif text-xl text-ink group-hover:text-gold transition-colors">
                {c.t}
              </span>
              <span className="eyebrow hidden md:inline">Chapter</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function QuoteWall() {
  return (
    <Section>
      <div className="mx-auto grid max-w-5xl gap-16">
        {QUOTES.map((q, i) => (
          <figure
            key={i}
            className={`max-w-3xl ${i % 2 ? "ml-auto text-right" : "mr-auto text-left"}`}
          >
            <blockquote className="font-display text-3xl leading-[1.2] text-ink md:text-5xl">
              <span className="text-gold">“</span>
              {q.q}
              <span className="text-gold">”</span>
            </blockquote>
            <figcaption className="mt-6 eyebrow">— {q.a}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function AuthorTeaser() {
  return (
    <Section tone="ivory">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <img
          src={author}
          alt="Backlit silhouette of the author at a desk."
          width={1200}
          height={1500}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]"
        />
        <div>
          <SectionEyebrow>About the Author</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Written by someone who took the question seriously.
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-muted-foreground">
            A writer, teacher, and long-time student of emotional life,
            the author has spent the last decade working with leaders,
            teams, educators, and readers on the interior work that quietly
            decides everything else.
          </p>
          <Link
            to="/author"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm text-ink transition-colors hover:text-gold hover:border-gold"
          >
            Read the full biography <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

function Endorsements() {
  return (
    <Section>
      <SectionEyebrow>Endorsements</SectionEyebrow>
      <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
        Read early by coaches, leaders,<br />and editors who don't say things lightly.
      </h2>
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {ENDORSEMENTS.map((e, i) => (
          <figure key={i} className="border-t border-border pt-6">
            <blockquote className="font-serif text-xl leading-relaxed text-ink">
              “{e.q}”
            </blockquote>
            <figcaption className="mt-6 eyebrow">— {e.by}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function WorkWith() {
  const items = [
    { icon: BookOpen, t: "Read the Sample", d: "A generous excerpt, delivered to your inbox.", to: "/sample-chapter" },
    { icon: Users, t: "Workshops", d: "Half-day and multi-day programs for teams and cohorts.", to: "/workshops" },
    { icon: Mic, t: "Speaking", d: "Keynotes for conferences, summits, and institutions.", to: "/speaking" },
    { icon: Building2, t: "Bulk & Corporate", d: "Editions and custom programs for organisations.", to: "/corporate" },
  ];
  return (
    <Section tone="ivory">
      <SectionEyebrow>Work with the Author</SectionEyebrow>
      <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
        Four ways to take the book further<br />into your life or your organisation.
      </h2>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t, d, to }) => (
          <Link
            key={t}
            to={to}
            className="group flex h-full flex-col border border-border bg-paper p-8 transition-all hover:border-gold hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
          >
            <Icon className="size-6 text-gold" strokeWidth={1.4} />
            <h3 className="mt-6 font-display text-2xl text-ink">{t}</h3>
            <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-muted-foreground">
              {d}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink group-hover:text-gold">
              Explore <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function NewsletterBand() {
  return (
    <Section tone="ink">
      <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-gold-soft">
            <Sparkles className="size-4" strokeWidth={1.4} />
            <span className="eyebrow" style={{ color: "inherit" }}>
              The Monthly Ledger
            </span>
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            One reflection, one passage,<br />once a month. No noise.
          </h2>
          <p className="mt-6 max-w-lg font-serif text-lg text-paper/70">
            Join thousands of readers who receive a quiet, thoughtful letter on
            the first Sunday of each month. Unsubscribe anytime.
          </p>
        </div>
        <div className="md:justify-self-end">
          <NewsletterForm source="home" />
        </div>
      </div>
    </Section>
  );
}
