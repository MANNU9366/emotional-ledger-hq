import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { inputCls, primaryBtn } from "@/components/site/AuthCard";
import type { AppRole } from "@/lib/auth";

export function LoginForm({ requiredRole: initialRole, redirectTo }: { requiredRole: AppRole; redirectTo: string }) {
  const nav = useNavigate();
  const [requiredRole, setRequiredRole] = useState<AppRole>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (requiredRole === "admin" && email.trim().toLowerCase() !== "emotionalledger@gmail.com") {
      return toast.error("Admin access is restricted to the owner account.");
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error || !data.user) {
      setLoading(false);
      return toast.error(error?.message ?? "Sign in failed.");
    }
    const { data: rr } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const roles = ((rr ?? []) as { role: AppRole }[]).map((r) => r.role);
    setLoading(false);
    if (!roles.includes(requiredRole)) {
      await supabase.auth.signOut();
      return toast.error(`This account is not registered as ${requiredRole}.`);
    }
    toast.success("Welcome back.");
    const dest = requiredRole === "admin" ? "/dashboard/admin" : requiredRole === "author" ? "/dashboard/author" : requiredRole === "buyer" ? "/dashboard/buyer" : redirectTo;
    nav({ to: dest });
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {initialRole !== "admin" ? (
        <div className="grid grid-cols-2 gap-2">
          {([
            { role: "buyer" as AppRole, label: "Sign in by Reader & Buyer" },
            { role: "author" as AppRole, label: "Sign in by Author" },
          ]).map((opt) => (
            <button
              key={opt.role}
              type="button"
              onClick={() => setRequiredRole(opt.role)}
              className={`border px-3 py-3 text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                requiredRole === opt.role ? "border-ink bg-ink text-paper" : "border-border text-ink hover:border-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid gap-2">
        <label className="eyebrow text-[0.65rem]" htmlFor="email">Email</label>
        <input id="email" type="email" required autoComplete="email" className={inputCls}
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <label className="eyebrow text-[0.65rem]" htmlFor="password">Password</label>
        <input id="password" type="password" required autoComplete="current-password" className={inputCls}
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={loading} className={primaryBtn}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : null}
        Sign in
      </button>
      {requiredRole !== "admin" ? (
        <p className="text-center text-xs text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="border-b border-ink hover:text-gold hover:border-gold">Create an account</Link>
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">Admin access is granted manually.</p>
      )}
    </form>
  );
}