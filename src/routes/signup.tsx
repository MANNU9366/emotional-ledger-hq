import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard, inputCls, primaryBtn } from "@/components/site/AuthCard";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — Emotional Ledger" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ full_name: "", email: "", password: "", role: "buyer" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (values.password.length < 8) return toast.error("Password must be at least 8 characters.");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim().toLowerCase(),
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: values.full_name, role: values.role },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created.");
    // Auto-confirm is on, session may be present.
    if (data.session) {
      navigate({ to: values.role === "author" ? "/dashboard/author" : "/dashboard/buyer" });
    } else {
      navigate({ to: values.role === "author" ? "/login/author" : "/login/buyer" });
    }
  };

  return (
    <AuthCard
      eyebrow="Join the Ledger"
      title="Create your account."
      subtitle="Track your reading, submit reviews for consideration, or sign in as an author or admin. Your details stay private."
    >
      <form onSubmit={onSubmit} className="grid gap-5">
        <div>
          <label className="eyebrow text-[0.65rem]">I am a *</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["buyer", "author"] as const).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setValues((v) => ({ ...v, role: r }))}
                className={`border px-4 py-3 text-[0.72rem] uppercase tracking-[0.18em] transition-colors ${
                  values.role === r ? "border-ink bg-ink text-paper" : "border-border text-ink hover:border-ink"
                }`}
              >
                {r === "buyer" ? "Reader / Buyer" : "Author"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Admin access is granted manually.</p>
        </div>
        <div className="grid gap-2">
          <label className="eyebrow text-[0.65rem]" htmlFor="full_name">Full name *</label>
          <input id="full_name" required className={inputCls} value={values.full_name}
            onChange={(e) => setValues((v) => ({ ...v, full_name: e.target.value }))} />
        </div>
        <div className="grid gap-2">
          <label className="eyebrow text-[0.65rem]" htmlFor="email">Email *</label>
          <input id="email" type="email" required autoComplete="email" className={inputCls}
            value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
        </div>
        <div className="grid gap-2">
          <label className="eyebrow text-[0.65rem]" htmlFor="password">Password *</label>
          <input id="password" type="password" required minLength={8} autoComplete="new-password" className={inputCls}
            value={values.password} onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} />
        </div>
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Create account
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login/buyer" className="border-b border-ink hover:text-gold hover:border-gold">Sign in</Link>
        </p>
      </form>
    </AuthCard>
  );
}