import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth, signOut, type AppRole } from "@/lib/auth";
import { toast } from "sonner";

export function DashboardShell({
  role,
  loginPath,
  eyebrow,
  title,
  children,
}: {
  role: AppRole;
  loginPath: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const { loading, session, roles, user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) nav({ to: loginPath });
    else if (!roles.includes(role)) {
      toast.error(`You are not signed in as ${role}.`);
      nav({ to: loginPath });
    }
  }, [loading, session, roles, role, loginPath, nav]);

  const handleSignOut = async () => {
    await signOut();
    nav({ to: loginPath });
  };

  if (loading || !session || !roles.includes(role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-ivory">
      <div className="container-editorial py-10 md:py-16">
        <div className="flex flex-col gap-6 border-b border-border/60 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-ink md:text-5xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Signed in as {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 self-start border border-ink px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: {
  tabs: { key: string; label: string; count?: number }[];
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border/60">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`relative px-4 py-3 text-[0.72rem] uppercase tracking-[0.18em] transition-colors ${
            active === t.key ? "text-ink" : "text-muted-foreground hover:text-ink"
          }`}
        >
          {t.label}
          {typeof t.count === "number" ? (
            <span className="ml-2 rounded-full bg-ink/10 px-2 py-0.5 text-[0.65rem] text-ink">{t.count}</span>
          ) : null}
          {active === t.key ? <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-gold" /> : null}
        </button>
      ))}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-border/70 bg-paper p-5 md:p-6 ${className}`}>{children}</div>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-none border border-dashed border-border/70 bg-paper/50 p-10 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}