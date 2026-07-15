import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Users, BookOpen, Headphones, Tablet } from "lucide-react";
import bookCover from "@/assets/book-cover.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy the Book — Emotional Ledger" },
      { name: "description", content: "Order Emotional Ledger in hardcover, digital, or audio — from your preferred retailer." },
      { property: "og:title", content: "Buy — Emotional Ledger" },
      { property: "og:url", content: "/buy" },
    ],
    links: [{ rel: "canonical", href: "/buy" }],
  }),
  component: BuyPage,
});

const EDITIONS = [
  {
    id: "hardcover",
    name: "Hardcover",
    price: 28,
    icon: BookOpen,
    tag: "Signed first edition",
    blurb: "Linen-bound, foil-stamped. Ships worldwide.",
    stats: { buyers: 4820, likes: 3106, comments: 412 },
  },
  {
    id: "digital",
    name: "Digital",
    price: 14,
    icon: Tablet,
    tag: "ePub · Kindle · PDF",
    blurb: "Instant download after checkout. DRM-free.",
    stats: { buyers: 8210, likes: 5940, comments: 780 },
  },
  {
    id: "audio",
    name: "Audiobook",
    price: 22,
    icon: Headphones,
    tag: "Narrated by the author",
    blurb: "8 hrs 40 min. Stream or download.",
    stats: { buyers: 3175, likes: 2408, comments: 296 },
  },
] as const;

function nf(n: number) { return new Intl.NumberFormat("en-US").format(n); }

function BuyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Editions"
        title="Order Emotional Ledger."
        lede={<>Choose your edition. Every purchase includes the first chapter as a free sample and lifetime access to reader notes.</>}
      />
      <Section>
        <SectionEyebrow>Choose your edition</SectionEyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {EDITIONS.map((e) => {
            const Icon = e.icon;
            return (
              <article key={e.id} className="group flex flex-col border border-border/70 bg-paper transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  <img src={bookCover} alt={`Emotional Ledger ${e.name} edition`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-ink/85 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-paper backdrop-blur">
                    <Icon className="size-3.5" /> {e.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-ink">{e.name}</h3>
                    <p className="font-display text-2xl text-ink">${e.price}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{e.blurb}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-border/60 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-gold" /> {nf(e.stats.buyers)} readers</span>
                    <span className="inline-flex items-center gap-1.5"><Heart className="size-3.5 text-gold" /> {nf(e.stats.likes)}</span>
                    <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5 text-gold" /> {nf(e.stats.comments)}</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Link
                      to="/checkout"
                      search={{ edition: e.id }}
                      className="inline-flex flex-1 items-center justify-center border border-ink bg-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink"
                    >
                      Buy · ${e.price}
                    </Link>
                    <Link
                      to="/sample-chapter"
                      className="inline-flex flex-1 items-center justify-center border border-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Free sample
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Buying for a team? Visit{" "}
          <Link to="/corporate" className="border-b border-ink pb-0.5 text-ink hover:border-gold hover:text-gold">Bulk & Corporate</Link>{" "}
          for tiered pricing from 25 copies.
        </p>
      </Section>
    </div>
  );
}