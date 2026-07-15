import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";

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

  return (
    <DashboardShell role="author" loginPath="/login/author" eyebrow="Author" title="Your reader signals.">
      <div className="grid gap-4 md:grid-cols-4">
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
            {list.length === 0 ? <EmptyState>Nothing here yet.</EmptyState> :
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
    </DashboardShell>
  );
}