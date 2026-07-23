import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Star, BookOpen, Heart, MessageCircle, Bookmark, Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";
import { useAuth } from "@/lib/auth";
import { inputCls, primaryBtn } from "@/components/site/AuthCard";
import { Link } from "@tanstack/react-router";
import bookCoverAsset from "@/assets/emotional-ledger-cover.png.asset.json";
const bookCover = bookCoverAsset.url;
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/dashboard/buyer")({
  head: () => ({ meta: [{ title: "My library — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: BuyerDashboard,
});

type Order = { id: string; retailer: string; order_number: string | null; quantity: number; purchase_date: string | null; status: string; notes: string | null };
type MyReview = { id: string; author_name: string; body: string; rating: number | null; approved: boolean; created_at: string };
type Delivery = { id: string; asset_id: string; sent_at: string; note: string | null };
type AssetLite = { id: string; title: string; description: string | null; kind: string; storage_path: string; file_name: string };

function BuyerDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [deliveries, setDeliveries] = useState<(Delivery & { asset: AssetLite | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ retailer: "Amazon", order_number: "", quantity: 1, purchase_date: "", notes: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [o, r, d] = await Promise.all([
      supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("sample_deliveries").select("id, asset_id, sent_at, note").order("sent_at", { ascending: false }),
    ]);
    setOrders((o.data as Order[]) ?? []);
    setReviews((r.data as MyReview[]) ?? []);
    const drows = (d.data as Delivery[]) ?? [];
    if (drows.length > 0) {
      const ids = Array.from(new Set(drows.map((x) => x.asset_id)));
      const { data: a } = await supabase.from("book_assets").select("id, title, description, kind, storage_path, file_name").in("id", ids);
      const map = new Map<string, AssetLite>(((a as AssetLite[]) ?? []).map((x) => [x.id, x]));
      setDeliveries(drows.map((x) => ({ ...x, asset: map.get(x.asset_id) ?? null })));
    } else {
      setDeliveries([]);
    }
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
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative overflow-hidden border border-border/70 bg-ivory">
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center md:p-8">
            <img src={bookCover} alt="Emotional Ledger" className="h-40 w-32 flex-shrink-0 object-cover shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]" />
            <div>
              <p className="eyebrow">Currently reading</p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">Emotional Ledger</h2>
              <div className="mt-3 h-1.5 w-full max-w-xs bg-ink/10">
                <div className="h-full bg-gold" style={{ width: "42%" }} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Chapter IV · 42% complete</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/sample-chapter" className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper"><BookOpen className="size-3.5" /> Continue reading</Link>
                <Link to="/buy" className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">Buy another edition</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card><p className="eyebrow flex items-center gap-1.5"><Bookmark className="size-3 text-gold" /> Orders</p><p className="mt-2 font-display text-3xl text-ink">{orders.length}</p></Card>
          <Card><p className="eyebrow flex items-center gap-1.5"><Star className="size-3 text-gold" /> Reviews</p><p className="mt-2 font-display text-3xl text-ink">{reviews.length}</p></Card>
          <Card><p className="eyebrow flex items-center gap-1.5"><Heart className="size-3 text-gold" /> Published</p><p className="mt-2 font-display text-3xl text-ink">{reviews.filter((r) => r.approved).length}</p></Card>
          <Card><p className="eyebrow flex items-center gap-1.5"><MessageCircle className="size-3 text-gold" /> Files</p><p className="mt-2 font-display text-3xl text-ink">{deliveries.length}</p></Card>
        </div>
      </div>

      <div className="mt-8">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { key: "orders", label: "My Orders", count: orders.length },
          { key: "reviews", label: "My Reviews", count: reviews.length },
          { key: "files", label: "Files from author", count: deliveries.length },
        ]}
      />
      </div>
      <div className="mt-8 grid gap-4">
        {tab === "files" && (
          deliveries.length === 0 ? (
            <EmptyState>No files delivered yet. When you request a sample chapter, it will appear here once the author sends it.</EmptyState>
          ) : (
            deliveries.map((d) => {
              const openDelivery = async () => {
                if (!d.asset) return;
                const { data, error } = await supabase.storage.from("book-assets").createSignedUrl(d.asset.storage_path, 3600);
                if (error || !data?.signedUrl) return toast.error(error?.message ?? "Could not open file");
                window.open(data.signedUrl, "_blank", "noopener");
              };
              return (
                <Card key={d.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-1 size-5 text-gold" />
                      <div>
                        <p className="font-display text-lg text-ink">{d.asset?.title ?? "File"}
                          {d.asset ? <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink">{d.asset.kind}</span> : null}
                        </p>
                        <p className="text-xs text-muted-foreground">Sent {new Date(d.sent_at).toLocaleDateString()}</p>
                        {d.asset?.description ? <p className="mt-2 text-sm text-muted-foreground">{d.asset.description}</p> : null}
                      </div>
                    </div>
                    {d.asset ? (
                      <button onClick={openDelivery} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">
                        <Download className="size-3.5" /> Download
                      </button>
                    ) : null}
                  </div>
                </Card>
              );
            })
          )
        )}
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