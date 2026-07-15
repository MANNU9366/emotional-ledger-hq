import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Testimonial = { id: string; author_name: string; role_title: string | null; rating: number | null; body: string; approved: boolean; created_at: string };
type Subscriber = { id: string; email: string; source: string | null; created_at: string };
type Enquiry = { id: string; kind: string; name: string | null; email: string; organization: string | null; subject: string | null; message: string | null; created_at: string };
type Order = { id: string; retailer: string; order_number: string | null; quantity: number; status: string; purchase_date: string | null; created_at: string; user_id: string };

function AdminDashboard() {
  const [tab, setTab] = useState("testimonials");
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [kindFilter, setKindFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const [t, s, e, o] = await Promise.all([
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    setTestimonials((t.data as Testimonial[]) ?? []);
    setSubscribers((s.data as Subscriber[]) ?? []);
    setEnquiries((e.data as Enquiry[]) ?? []);
    setOrders((o.data as Order[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const pending = testimonials.filter((t) => !t.approved).length;

  const moderate = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(approved ? "Approved." : "Rejected.");
    void load();
  };

  const removeTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted.");
    void load();
  };

  const filteredEnquiries = kindFilter === "all" ? enquiries : enquiries.filter((e) => e.kind === kindFilter);
  const kinds = Array.from(new Set(enquiries.map((e) => e.kind)));

  return (
    <DashboardShell role="admin" loginPath="/login/admin" eyebrow="Admin" title="Editorial control room.">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { key: "testimonials", label: "Testimonials", count: pending },
          { key: "enquiries", label: "Enquiries", count: enquiries.length },
          { key: "subscribers", label: "Subscribers", count: subscribers.length },
          { key: "orders", label: "Orders", count: orders.length },
        ]}
      />
      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="mt-8 grid gap-4">
          {tab === "testimonials" && (
            testimonials.length === 0 ? <EmptyState>No testimonials yet.</EmptyState> :
            testimonials.map((t) => (
              <Card key={t.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-ink">{t.author_name}</p>
                    <p className="text-xs text-muted-foreground">{t.role_title ?? ""} · {new Date(t.created_at).toLocaleDateString()}</p>
                    {t.rating ? (
                      <div className="mt-1 flex gap-0.5 text-gold">
                        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-gold" />)}
                      </div>
                    ) : null}
                  </div>
                  <span className={`px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] ${t.approved ? "bg-gold/20 text-ink" : "bg-ink/10 text-muted-foreground"}`}>
                    {t.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="mt-4 font-serif text-ink">"{t.body}"</p>
                <div className="mt-4 flex gap-2">
                  {!t.approved && (
                    <button onClick={() => moderate(t.id, true)} className="inline-flex items-center gap-1 border border-ink bg-ink px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">
                      <Check className="size-3.5" /> Approve
                    </button>
                  )}
                  {t.approved && (
                    <button onClick={() => moderate(t.id, false)} className="inline-flex items-center gap-1 border border-ink px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper">
                      Unapprove
                    </button>
                  )}
                  <button onClick={() => removeTestimonial(t.id)} className="inline-flex items-center gap-1 border border-border px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:border-ink hover:text-ink">
                    <X className="size-3.5" /> Delete
                  </button>
                </div>
              </Card>
            ))
          )}
          {tab === "enquiries" && (
            <>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setKindFilter("all")} className={`border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] ${kindFilter === "all" ? "border-ink bg-ink text-paper" : "border-border text-muted-foreground hover:border-ink hover:text-ink"}`}>All</button>
                {kinds.map((k) => (
                  <button key={k} onClick={() => setKindFilter(k)} className={`border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] ${kindFilter === k ? "border-ink bg-ink text-paper" : "border-border text-muted-foreground hover:border-ink hover:text-ink"}`}>{k}</button>
                ))}
              </div>
              {filteredEnquiries.length === 0 ? <EmptyState>No enquiries.</EmptyState> :
                filteredEnquiries.map((e) => (
                  <Card key={e.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg text-ink">{e.name ?? "—"} <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink">{e.kind}</span></p>
                        <p className="text-xs text-muted-foreground">{e.email}{e.organization ? ` · ${e.organization}` : ""} · {new Date(e.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {e.subject ? <p className="mt-3 text-sm font-medium text-ink">{e.subject}</p> : null}
                    {e.message ? <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{e.message}</p> : null}
                  </Card>
                ))}
            </>
          )}
          {tab === "subscribers" && (
            subscribers.length === 0 ? <EmptyState>No subscribers yet.</EmptyState> :
            <Card className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">When</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 text-ink">{s.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.source ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
          {tab === "orders" && (
            orders.length === 0 ? <EmptyState>No buyer orders logged yet.</EmptyState> :
            <Card className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <th className="px-4 py-3">Retailer</th>
                    <th className="px-4 py-3">Order #</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Purchased</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 text-ink">{o.retailer}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.order_number ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.quantity}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.status}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.purchase_date ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      )}
    </DashboardShell>
  );
}