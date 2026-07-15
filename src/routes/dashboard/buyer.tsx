import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";
import { useAuth } from "@/lib/auth";
import { inputCls, primaryBtn } from "@/components/site/AuthCard";

export const Route = createFileRoute("/dashboard/buyer")({
  head: () => ({ meta: [{ title: "My library — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: BuyerDashboard,
});

type Order = { id: string; retailer: string; order_number: string | null; quantity: number; purchase_date: string | null; status: string; notes: string | null };
type MyReview = { id: string; author_name: string; body: string; rating: number | null; approved: boolean; created_at: string };

function BuyerDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ retailer: "Amazon", order_number: "", quantity: 1, purchase_date: "", notes: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [o, r] = await Promise.all([
      supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]);
    setOrders((o.data as Order[]) ?? []);
    setReviews((r.data as MyReview[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, [user?.id]);

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.retailer.trim()) return toast.error("Retailer is required.");
    setBusy(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      retailer: form.retailer.trim(),
      order_number: form.order_number.trim() || null,
      quantity: Number(form.quantity) || 1,
      purchase_date: form.purchase_date || null,
      notes: form.notes.trim() || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Order logged.");
    setShowForm(false);
    setForm({ retailer: "Amazon", order_number: "", quantity: 1, purchase_date: "", notes: "" });
    void load();
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Remove this order?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removed.");
    void load();
  };

  return (
    <DashboardShell role="buyer" loginPath="/login/buyer" eyebrow="Reader" title="Your library.">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { key: "orders", label: "My Orders", count: orders.length },
          { key: "reviews", label: "My Reviews", count: reviews.length },
        ]}
      />
      <div className="mt-8 grid gap-4">
        {tab === "orders" && (
          <>
            <div className="flex justify-end">
              <button onClick={() => setShowForm((v) => !v)} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">
                <Plus className="size-3.5" /> Log a purchase
              </button>
            </div>
            {showForm && (
              <Card>
                <form onSubmit={submitOrder} className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="eyebrow text-[0.65rem]">Retailer *</label>
                    <select className={inputCls} value={form.retailer} onChange={(e) => setForm({ ...form, retailer: e.target.value })}>
                      {["Amazon", "Barnes & Noble", "Waterstones", "Blackwell's", "Independent bookshop", "Publisher direct", "Other"].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="eyebrow text-[0.65rem]">Order number</label>
                    <input className={inputCls} value={form.order_number} onChange={(e) => setForm({ ...form, order_number: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <label className="eyebrow text-[0.65rem]">Quantity</label>
                    <input type="number" min={1} className={inputCls} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
                  </div>
                  <div className="grid gap-2">
                    <label className="eyebrow text-[0.65rem]">Purchase date</label>
                    <input type="date" className={inputCls} value={form.purchase_date} onChange={(e) => setForm({ ...form, purchase_date: e.target.value })} />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <label className="eyebrow text-[0.65rem]">Notes</label>
                    <textarea rows={3} className={inputCls + " resize-y"} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" disabled={busy} className={primaryBtn}>
                      {busy ? <Loader2 className="size-4 animate-spin" /> : null} Save order
                    </button>
                  </div>
                </form>
              </Card>
            )}
            {loading ? (
              <div className="flex items-center justify-center py-10"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
            ) : orders.length === 0 ? (
              <EmptyState>No orders yet. Log your first purchase above.</EmptyState>
            ) : (
              orders.map((o) => (
                <Card key={o.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-ink">{o.retailer} <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink">{o.status}</span></p>
                      <p className="text-xs text-muted-foreground">Qty {o.quantity}{o.order_number ? ` · #${o.order_number}` : ""}{o.purchase_date ? ` · ${o.purchase_date}` : ""}</p>
                    </div>
                    <button onClick={() => deleteOrder(o.id)} className="text-muted-foreground hover:text-ink"><Trash2 className="size-4" /></button>
                  </div>
                  {o.notes ? <p className="mt-3 text-sm text-muted-foreground">{o.notes}</p> : null}
                </Card>
              ))
            )}
          </>
        )}
        {tab === "reviews" && (
          reviews.length === 0 ? (
            <EmptyState>You haven't submitted a review yet. Use the "Leave a review" form on the home page.</EmptyState>
          ) : (
            reviews.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-ink">{r.author_name}</p>
                    {r.rating ? (
                      <div className="mt-1 flex gap-0.5 text-gold">
                        {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-gold" />)}
                      </div>
                    ) : null}
                  </div>
                  <span className={`px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] ${r.approved ? "bg-gold/20 text-ink" : "bg-ink/10 text-muted-foreground"}`}>
                    {r.approved ? "Published" : "Awaiting review"}
                  </span>
                </div>
                <p className="mt-3 font-serif text-ink">"{r.body}"</p>
              </Card>
            ))
          )
        )}
      </div>
    </DashboardShell>
  );
}