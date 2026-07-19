import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Heart, MessageCircle, Users, TrendingUp, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";
import bookCoverAsset from "@/assets/emotional-ledger-cover.png.asset.json";
const bookCover = bookCoverAsset.url;
import author from "@/assets/author.jpg";

export const Route = createFileRoute("/dashboard/author")({
  head: () => ({ meta: [{ title: "Author dashboard — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: AuthorDashboard,
});

type Enquiry = { id: string; kind: string; name: string | null; email: string; organization: string | null; subject: string | null; message: string | null; created_at: string };

function AuthorDashboard() {
  const [tab, setTab] = useState("workshop");
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    (async () => {
      const [e, s] = await Promise.all([
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("subscribers").select("id", { count: "exact", head: true }),
      ]);
      setEnquiries((e.data as Enquiry[]) ?? []);
      setSubCount(s.count ?? 0);
      setLoading(false);
    })();
  }, []);

  const kinds = ["workshop", "speaking", "corporate", "media", "sample", "contact", "general", "bulk"];
  const counts = Object.fromEntries(kinds.map((k) => [k, enquiries.filter((e) => e.kind === k).length])) as Record<string, number>;
  const list = enquiries.filter((e) => e.kind === tab);

  const nf = (n: number) => new Intl.NumberFormat("en-US").format(n);
  const activity = [
    { label: "Copies sold this week", value: 428, delta: "+12%" },
    { label: "Reader likes", value: 11540, delta: "+3.4%" },
    { label: "Reviews (avg 4.8★)", value: 1488, delta: "+22 new" },
    { label: "Comments in journal", value: 782, delta: "+18 today" },
  ];

  return (
    <DashboardShell role="author" loginPath="/login/author" eyebrow="Author" title="Your reader signals.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden border border-border/70 bg-ivory p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <img src={bookCover} alt="Book cover" className="h-40 w-32 flex-shrink-0 object-cover shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]" />
            <div>
              <p className="eyebrow">Now in market</p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">Emotional Ledger</h2>
              <p className="mt-2 text-sm text-muted-foreground">Ranked <span className="text-ink">#4 in Leadership</span> · read in <span className="text-ink">37 countries</span> this month.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-gold" /> 16.2k readers</span>
                <span className="inline-flex items-center gap-1.5"><Heart className="size-3.5 text-gold" /> 11.5k likes</span>
                <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5 text-gold" /> 780 comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 border border-border/70 bg-paper p-6 md:p-8">
          <img src={author} alt="Author" className="h-20 w-20 flex-shrink-0 rounded-full object-cover grayscale" />
          <div>
            <p className="eyebrow">Signed in as author</p>
            <p className="mt-1 font-display text-xl text-ink">Good to see you.</p>
            <p className="mt-1 text-sm text-muted-foreground">You have <span className="text-ink">{enquiries.length}</span> open enquiries and <span className="text-ink">{subCount}</span> subscribers on the list.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activity.map((a) => (
          <Card key={a.label}>
            <p className="eyebrow">{a.label}</p>
            <p className="mt-2 font-display text-3xl text-ink">{nf(a.value)}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.16em] text-gold"><TrendingUp className="size-3" /> {a.delta}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card><p className="eyebrow">Subscribers</p><p className="mt-2 font-display text-3xl text-ink">{subCount}</p></Card>
        <Card><p className="eyebrow">Workshops</p><p className="mt-2 font-display text-3xl text-ink">{counts.workshop ?? 0}</p></Card>
        <Card><p className="eyebrow">Speaking</p><p className="mt-2 font-display text-3xl text-ink">{counts.speaking ?? 0}</p></Card>
        <Card><p className="eyebrow">Corporate</p><p className="mt-2 font-display text-3xl text-ink">{counts.corporate ?? 0}</p></Card>
      </div>
      <div className="mt-10">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={kinds.filter((k) => counts[k] > 0).map((k) => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1), count: counts[k] }))}
        />
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="mt-8 grid gap-4">
            {list.length === 0 ? <EmptyState>
              <p>No {tab} enquiries yet.</p>
              <p className="mt-2 text-xs">When readers submit the form on the site, they will appear here.</p>
            </EmptyState> :
              list.map((e) => (
                <Card key={e.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-ink">{e.name ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">{e.email}{e.organization ? ` · ${e.organization}` : ""} · {new Date(e.created_at).toLocaleDateString()}</p>
                    </div>
                    <a href={`mailto:${e.email}`} className="text-[0.7rem] uppercase tracking-[0.18em] text-ink underline-offset-4 hover:text-gold hover:underline">Reply</a>
                  </div>
                  {e.subject ? <p className="mt-3 text-sm font-medium text-ink">{e.subject}</p> : null}
                  {e.message ? <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{e.message}</p> : null}
                </Card>
              ))}
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { q: "Every chapter has felt like a mirror I didn't know I needed.", by: "Marta, London", rating: 5 },
          { q: "The audiobook is haunting — in the best possible way.", by: "Dev, Toronto", rating: 5 },
          { q: "Required reading for anyone leading a team through change.", by: "Anika, Berlin", rating: 5 },
        ].map((r) => (
          <Card key={r.by}>
            <div className="flex gap-0.5 text-gold">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-gold" />)}</div>
            <p className="mt-3 font-serif text-ink">"{r.q}"</p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">— {r.by}</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}