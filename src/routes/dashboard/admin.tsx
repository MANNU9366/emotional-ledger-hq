import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Check, X, Star, Loader2, Upload, FileText, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { DashboardShell, Tabs, Card, EmptyState } from "@/components/site/DashboardShell";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Testimonial = { id: string; author_name: string; role_title: string | null; rating: number | null; body: string; approved: boolean; created_at: string };
type Subscriber = { id: string; email: string; source: string | null; created_at: string };
type Enquiry = { id: string; kind: string; name: string | null; email: string; organization: string | null; subject: string | null; message: string | null; created_at: string };
type Order = { id: string; retailer: string; order_number: string | null; quantity: number; status: string; purchase_date: string | null; created_at: string; user_id: string };
type BookAsset = { id: string; title: string; description: string | null; kind: string; storage_path: string; file_name: string; file_size: number | null; mime_type: string | null; visibility: string; created_at: string };

function AdminDashboard() {
  const [tab, setTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [assets, setAssets] = useState<BookAsset[]>([]);
  const { user } = useAuth();

  const load = async () => {
    setLoading(true);
    const [t, s, e, o, a] = await Promise.all([
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("book_assets").select("*").order("created_at", { ascending: false }),
    ]);
    setTestimonials((t.data as Testimonial[]) ?? []);
    setSubscribers((s.data as Subscriber[]) ?? []);
    setEnquiries((e.data as Enquiry[]) ?? []);
    setOrders((o.data as Order[]) ?? []);
    setAssets((a.data as BookAsset[]) ?? []);
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
          { key: "analytics", label: "Analytics" },
          { key: "testimonials", label: "Testimonials", count: pending },
          { key: "enquiries", label: "Enquiries", count: enquiries.length },
          { key: "subscribers", label: "Subscribers", count: subscribers.length },
          { key: "orders", label: "Orders", count: orders.length },
          { key: "assets", label: "Files", count: assets.length },
        ]}
      />
      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="mt-8 grid gap-4">
          {tab === "analytics" && (
            <AnalyticsPanel
              testimonials={testimonials}
              subscribers={subscribers}
              enquiries={enquiries}
              orders={orders}
              assets={assets}
            />
          )}
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
          {tab === "assets" && (
            <AssetsPanel assets={assets} userId={user?.id ?? null} onChanged={load} />
          )}
        </div>
      )}
    </DashboardShell>
  );
}

function AssetsPanel({ assets, userId, onChanged }: { assets: BookAsset[]; userId: string | null; onChanged: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState("chapter");
  const [visibility, setVisibility] = useState("public");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!file) return toast.error("Choose a file to upload.");
    if (!title.trim()) return toast.error("Give the file a title.");
    setBusy(true);
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const path = `${kind}/${Date.now()}-${safe}`;
      const up = await supabase.storage.from("book-assets").upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
      if (up.error) throw up.error;
      const ins = await supabase.from("book_assets").insert({
        title: title.trim(),
        description: description.trim() || null,
        kind,
        visibility,
        storage_path: path,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type || null,
        uploaded_by: userId,
      });
      if (ins.error) throw ins.error;
      toast.success("File uploaded.");
      setTitle(""); setDescription(""); setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      onChanged();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (a: BookAsset) => {
    if (!confirm(`Delete "${a.title}"?`)) return;
    const s = await supabase.storage.from("book-assets").remove([a.storage_path]);
    if (s.error) return toast.error(s.error.message);
    const d = await supabase.from("book_assets").delete().eq("id", a.id);
    if (d.error) return toast.error(d.error.message);
    toast.success("Deleted.");
    onChanged();
  };

  const publicUrl = (path: string) => supabase.storage.from("book-assets").getPublicUrl(path).data.publicUrl;

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex items-center gap-2">
          <Upload className="size-4 text-gold" />
          <p className="font-display text-lg text-ink">Upload a new file</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Chapter PDFs, sample chapters, bonus material.</p>
        <form onSubmit={upload} className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="border border-border bg-paper px-3 py-2 font-serif text-base text-ink outline-none focus:border-ink" />
          </label>
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Kind
            <select value={kind} onChange={(e) => setKind(e.target.value)} className="border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink">
              <option value="chapter">Chapter</option>
              <option value="sample">Sample</option>
              <option value="bonus">Bonus</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground md:col-span-2">
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
          </label>
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Access
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="border border-border bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-ink">
              <option value="public">Public — anyone with link</option>
              <option value="subscribers">Subscribers — signed-in readers</option>
              <option value="private">Private — admin only</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            File
            <input ref={inputRef} type="file" accept="application/pdf,application/epub+zip,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required className="border border-border bg-paper px-3 py-2 text-sm text-ink file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-1 file:text-paper" />
          </label>
          <div className="md:col-span-2">
            <button disabled={busy} type="submit" className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-60">
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />} {busy ? "Uploading…" : "Upload file"}
            </button>
          </div>
        </form>
      </Card>

      {assets.length === 0 ? <EmptyState>No files uploaded yet.</EmptyState> : (
        <div className="grid gap-3">
          {assets.map((a) => (
            <Card key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 size-5 text-gold" />
                  <div>
                    <p className="font-display text-lg text-ink">{a.title}
                      <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink">{a.kind}</span>
                      <span className="ml-2 rounded-full bg-ink/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">{a.visibility}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{a.file_name}{a.file_size ? ` · ${(a.file_size/1024).toFixed(0)} KB` : ""} · {new Date(a.created_at).toLocaleDateString()}</p>
                    {a.description ? <p className="mt-2 text-sm text-muted-foreground">{a.description}</p> : null}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={publicUrl(a.storage_path)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 border border-border px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:border-ink hover:text-ink">
                    <ExternalLink className="size-3.5" /> Open
                  </a>
                  <button onClick={() => remove(a)} className="inline-flex items-center gap-1 border border-border px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:border-ink hover:text-ink">
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}