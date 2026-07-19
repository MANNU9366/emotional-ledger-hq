import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Users, BookOpen, Headphones, Tablet } from "lucide-react";
import onePartWoman from "@/assets/one-part-woman.png.asset.json";
import interpreterOfMaladies from "@/assets/interpreter-of-maladies.png.asset.json";
import aLifeLessOrdinary from "@/assets/a-life-less-ordinary.png.asset.json";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionEyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy Books — Emotional Ledger" },
      { name: "description", content: "A curated shelf: One Part Woman, Interpreter of Maladies, and A Life Less Ordinary." },
      { property: "og:title", content: "Buy Books — Emotional Ledger" },
      { property: "og:url", content: "/buy" },
    ],
    links: [{ rel: "canonical", href: "/buy" }],
  }),
  component: BuyPage,
});

const BOOKS = [
  {
    id: "one-part-woman",
    title: "One Part Woman",
    author: "Perumal Murugan",
    translator: "Aniruddhan Vasudevan",
    cover: onePartWoman.url,
    price: 250,
    currency: "₹",
    icon: BookOpen,
    tag: "Fiction · Tamil in translation",
    blurb:
      "Originally published in Tamil as Madhorubhagan (2010). Set in rural colonial-era Tamil Nadu, it examines the social pressures around childlessness, marriage, caste, and tradition through an intimate, character-driven story.",
    stats: { buyers: 4820, likes: 3106, comments: 412 },
  },
  {
    id: "interpreter-of-maladies",
    title: "Interpreter of Maladies",
    author: "Jhumpa Lahiri",
    cover: interpreterOfMaladies.url,
    price: 350,
    currency: "₹",
    icon: Tablet,
    tag: "Short stories · Pulitzer Prize",
    blurb:
      "A short story collection (1999) exploring the lives of Indian and Indian American characters navigating identity, family, migration, and belonging. Lahiri's acclaimed debut, winner of the Pulitzer Prize for Fiction.",
    stats: { buyers: 8210, likes: 5940, comments: 780 },
  },
  {
    id: "a-life-less-ordinary",
    title: "A Life Less Ordinary",
    author: "Baby Halder",
    translator: "Urvashi Butalia",
    cover: aLifeLessOrdinary.url,
    price: 299,
    currency: "₹",
    icon: Headphones,
    tag: "Memoir · Translated from Bengali",
    blurb:
      "Originally written as Aalo Aandhari, this autobiographical work recounts Halder's journey from a childhood of poverty, abandonment, and abuse to becoming a published writer — bringing the experiences of domestic workers and marginalized women into mainstream literature.",
    stats: { buyers: 3175, likes: 2408, comments: 296 },
  },
] as const;

function nf(n: number) { return new Intl.NumberFormat("en-IN").format(n); }

function BuyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Shelf"
        title="Books worth carrying home."
        lede={<>A curated shelf of literary works we return to. Each title includes a free sample chapter and secure checkout.</>}
      />
      <Section>
        <SectionEyebrow>Choose your book</SectionEyebrow>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {BOOKS.map((b) => {
            const Icon = b.icon;
            return (
              <article key={b.id} className="group flex flex-col border border-border/70 bg-paper transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
                <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-ivory p-6">
                  <img src={b.cover} alt={`${b.title} by ${b.author} — book cover`} className="h-full w-auto max-w-full object-contain shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-ink/85 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-paper backdrop-blur">
                    <Icon className="size-3.5" /> {b.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight text-ink">{b.title}</h3>
                    <p className="whitespace-nowrap font-display text-2xl text-ink">{b.currency}{nf(b.price)}</p>
                  </div>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-gold">
                    {b.author}
                    {"translator" in b && b.translator ? <span className="text-muted-foreground normal-case tracking-normal"> · tr. {b.translator}</span> : null}
                  </p>
                  <p className="mt-3 font-serif text-[0.95rem] leading-relaxed text-muted-foreground">{b.blurb}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-border/60 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-gold" /> {nf(b.stats.buyers)} readers</span>
                    <span className="inline-flex items-center gap-1.5"><Heart className="size-3.5 text-gold" /> {nf(b.stats.likes)}</span>
                    <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5 text-gold" /> {nf(b.stats.comments)}</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Link
                      to="/checkout"
                      search={{ edition: b.id }}
                      className="inline-flex flex-1 items-center justify-center border border-ink bg-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink"
                    >
                      Buy · {b.currency}{nf(b.price)}
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