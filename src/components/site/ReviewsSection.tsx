import { useEffect, useState, type FormEvent } from "react";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { useAuth } from "@/lib/auth";
import { inputCls, primaryBtn } from "@/components/site/AuthCard";

type Review = { id: string; author_name: string; role_title: string | null; rating: number | null; body: string };

export function ReviewsSection() {
  const { user, session } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, author_name, role_title, rating, body")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(9);
      setReviews((data as Review[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (body.trim().length < 20) return toast.error("Please write at least 20 characters.");
    if (!name.trim()) return toast.error("Your name is required.");
    setBusy(true);
    const { error } = await supabase.from("testimonials").insert({
      user_id: user.id,
      author_name: name.trim(),
      role_title: roleTitle.trim() || null,
      rating,
      body: body.trim(),
      approved: false,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Thank you. Your review is awaiting approval.");
    setName(""); setRoleTitle(""); setBody(""); setRating(5);
  };

  return (
    <Section tone="ivory">
      <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionEyebrow>Reader Reviews</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            What readers say<br />after they close the book.
          </h2>
          <div className="mt-12 grid gap-8">
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading reviews…</div>
            ) : reviews.length === 0 ? (
              <p className="font-serif text-lg text-muted-foreground">Be the first to leave a review.</p>
            ) : (
              reviews.map((r) => (
                <figure key={r.id} className="border-t border-border pt-6">
                  {r.rating ? (
                    <div className="flex gap-0.5 text-gold" aria-label={`${r.rating} stars`}>
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-gold" />)}
                    </div>
                  ) : null}
                  <blockquote className="mt-3 font-serif text-lg leading-relaxed text-ink">"{r.body}"</blockquote>
                  <figcaption className="mt-3 eyebrow">— {r.author_name}{r.role_title ? `, ${r.role_title}` : ""}</figcaption>
                </figure>
              ))
            )}
          </div>
        </div>
        <div className="border border-border bg-paper p-8">
          <SectionEyebrow>Leave a Review</SectionEyebrow>
          <h3 className="mt-4 font-display text-2xl text-ink">Share your response.</h3>
          {!session ? (
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Please <Link to="/login/buyer" className="border-b border-ink text-ink hover:text-gold hover:border-gold">sign in</Link> as a reader to leave a review. New here? <Link to="/signup" className="border-b border-ink text-ink hover:text-gold hover:border-gold">Create an account</Link>.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="eyebrow text-[0.65rem]">Name *</label>
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <label className="eyebrow text-[0.65rem]">Role / title</label>
                <input className={inputCls} value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} placeholder="Optional" />
              </div>
              <div className="grid gap-2">
                <label className="eyebrow text-[0.65rem]">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                      <Star className={`size-6 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label className="eyebrow text-[0.65rem]">Your review *</label>
                <textarea rows={5} className={inputCls + " resize-y"} value={body} onChange={(e) => setBody(e.target.value)} required minLength={20} maxLength={1000} />
              </div>
              <button type="submit" disabled={busy} className={primaryBtn}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : null} Submit review
              </button>
              <p className="text-xs text-muted-foreground">Reviews appear after editorial approval.</p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}