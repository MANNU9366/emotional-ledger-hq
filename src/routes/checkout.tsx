import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import bookCoverAsset from "@/assets/emotional-ledger-cover.png.asset.json";
const bookCover = bookCoverAsset.url;
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { inputCls, primaryBtn } from "@/components/site/AuthCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const EDITIONS = {
  hardcover: { name: "Hardcover", price: 28, tag: "Signed first edition" },
  digital: { name: "Digital", price: 14, tag: "ePub · Kindle · PDF" },
  audio: { name: "Audiobook", price: 22, tag: "Narrated by the author" },
} as const;

type EditionKey = keyof typeof EDITIONS;

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): { edition: EditionKey } => {
    const raw = typeof s.edition === "string" ? s.edition : "";
    const edition: EditionKey = raw === "digital" || raw === "audio" ? raw : "hardcover";
    return { edition };
  },
  head: () => ({
    meta: [
      { title: "Checkout — Emotional Ledger" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { edition } = Route.useSearch() as { edition: EditionKey };
  const item = EDITIONS[edition];
  const nav = useNavigate();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: user?.email ?? "",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    card: "4242 4242 4242 4242",
    exp: "12/28",
    cvc: "123",
  });

  const subtotal = item.price;
  const shipping = edition === "hardcover" ? 5 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (user) {
      await supabase.from("orders").insert({
        user_id: user.id,
        retailer: "Emotional Ledger Store",
        order_number: `EL-${Date.now().toString(36).toUpperCase()}`,
        quantity: 1,
        purchase_date: new Date().toISOString().slice(0, 10),
        status: "paid",
        notes: `${item.name} edition · mock checkout`,
      });
    }
    setBusy(false);
    setDone(true);
    toast.success("Order confirmed (demo).");
  };

  if (done) {
    return (
      <div>
        <PageHeader eyebrow="Order confirmed" title="Thank you." lede={<>A demo confirmation has been recorded. In production, a real receipt would land in your inbox.</>} />
        <Section>
          <div className="mx-auto max-w-xl border border-border/70 bg-paper p-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-gold" />
            <p className="mt-4 font-display text-2xl text-ink">{item.name} · ${item.price}</p>
            <p className="mt-1 text-sm text-muted-foreground">Confirmation sent to {form.email || "your email"}.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {user ? (
                <Link to="/dashboard/buyer" className="border border-ink bg-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">View my library</Link>
              ) : (
                <Link to="/signup" className="border border-ink bg-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-paper hover:bg-transparent hover:text-ink">Create a reader account</Link>
              )}
              <Link to="/sample-chapter" className="border border-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper">Read the sample</Link>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Secure checkout"
        title="Complete your order."
        lede={<>This is a demonstration checkout. No card is charged.</>}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} className="border border-border/70 bg-paper p-6 md:p-8">
            <p className="eyebrow">Contact</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="eyebrow text-[0.65rem]">Email</label>
                <input required type="email" className={inputCls + " mt-2"} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <p className="eyebrow mt-8">Shipping</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="eyebrow text-[0.65rem]">Full name</label>
                <input required className={inputCls + " mt-2"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="eyebrow text-[0.65rem]">Address</label>
                <input required className={inputCls + " mt-2"} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">City</label>
                <input required className={inputCls + " mt-2"} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">Postal code</label>
                <input required className={inputCls + " mt-2"} value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="eyebrow text-[0.65rem]">Country</label>
                <input required className={inputCls + " mt-2"} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </div>
            </div>
            <p className="eyebrow mt-8 flex items-center gap-2"><Lock className="size-3" /> Payment (demo)</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="eyebrow text-[0.65rem]">Card number</label>
                <input className={inputCls + " mt-2 tracking-widest"} value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} />
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">Expiry</label>
                <input className={inputCls + " mt-2"} value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} />
              </div>
              <div>
                <label className="eyebrow text-[0.65rem]">CVC</label>
                <input className={inputCls + " mt-2"} value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={busy} className={primaryBtn + " mt-8 w-full"}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-3.5" />} Pay ${total.toFixed(2)}
            </button>
            <button type="button" onClick={() => nav({ to: "/buy" })} className="mt-3 w-full text-center text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-ink">← Back to editions</button>
          </form>

          <aside className="border border-border/70 bg-ivory p-6 md:p-8">
            <p className="eyebrow">Order summary</p>
            <div className="mt-6 flex gap-4">
              <img src={bookCover} alt="" className="h-24 w-20 object-cover" />
              <div>
                <p className="font-display text-xl text-ink">Emotional Ledger</p>
                <p className="text-xs text-muted-foreground">{item.name} · {item.tag}</p>
              </div>
            </div>
            <dl className="mt-6 space-y-2 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-ink">${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-ink">{shipping ? `$${shipping.toFixed(2)}` : "Free"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax (est.)</dt><dd className="text-ink">${tax.toFixed(2)}</dd></div>
              <div className="flex justify-between border-t border-border/60 pt-3 font-display text-lg"><dt className="text-ink">Total</dt><dd className="text-ink">${total.toFixed(2)}</dd></div>
            </dl>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">Demo checkout — no card is charged.</p>
          </aside>
        </div>
      </Section>
    </div>
  );
}