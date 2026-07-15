import { createFileRoute } from "@tanstack/react-router";
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

const RETAILERS = [
  { name: "Amazon", href: "#" },
  { name: "Barnes & Noble", href: "#" },
  { name: "Bookshop.org", href: "#" },
  { name: "Waterstones", href: "#" },
  { name: "Apple Books", href: "#" },
  { name: "Kobo", href: "#" },
  { name: "Audible", href: "#" },
  { name: "Spotify Audiobooks", href: "#" },
];

function BuyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Editions"
        title="Order Emotional Ledger."
        lede={<>Available in hardcover, digital, and audio. Pre-orders ship on the publication date.</>}
      />
      <Section>
        <div className="grid items-start gap-16 md:grid-cols-[1fr_1.4fr]">
          <img src={bookCover} alt="Emotional Ledger hardcover" className="mx-auto aspect-[3/4] w-full max-w-sm object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]" />
          <div>
            <SectionEyebrow>Retailers</SectionEyebrow>
            <ul className="mt-8 grid gap-0">
              {RETAILERS.map((r) => (
                <li key={r.name} className="flex items-center justify-between border-t border-border py-5 last:border-b">
                  <span className="font-display text-2xl text-ink">{r.name}</span>
                  <a href={r.href} className="text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:text-gold">Buy →</a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">Retailer links will be activated on the publication date. For bulk orders, please see the <a href="/corporate" className="border-b border-ink pb-0.5 text-ink hover:text-gold hover:border-gold">Bulk & Corporate</a> page.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}