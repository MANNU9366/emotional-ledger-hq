import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthCard, inputCls, primaryBtn } from "@/components/site/AuthCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — Emotional Ledger" }, { name: "robots", content: "noindex" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase recovery link puts type=recovery in the URL hash and
    // fires a PASSWORD_RECOVERY event once the session is established.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Use at least 8 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. Please sign in.");
    await supabase.auth.signOut();
    nav({ to: "/login/buyer" });
  };

  return (
    <AuthCard eyebrow="Account" title="Set a new password." subtitle="Choose a fresh password for your reader or author account.">
      {!ready ? (
        <p className="text-sm text-muted-foreground">
          Open this page from the reset link in your email. If you arrived here directly, request a new link from the sign-in page.
        </p>
      ) : (
        <form onSubmit={submit} className="grid gap-5">
          <div className="grid gap-2">
            <label className="eyebrow text-[0.65rem]" htmlFor="pw">New password</label>
            <input id="pw" type="password" required autoComplete="new-password" minLength={8} className={inputCls}
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <label className="eyebrow text-[0.65rem]" htmlFor="pw2">Confirm password</label>
            <input id="pw2" type="password" required autoComplete="new-password" minLength={8} className={inputCls}
              value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : null} Update password
          </button>
        </form>
      )}
    </AuthCard>
  );
}