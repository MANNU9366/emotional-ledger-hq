import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { PRIMARY_NAV, SITE } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useAuth, signOut } from "@/lib/auth";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, roles } = useAuth();
  const nav = useNavigate();

  const dashboardPath = roles.includes("admin")
    ? "/dashboard/admin"
    : roles.includes("author")
      ? "/dashboard/author"
      : "/dashboard/buyer";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent backdrop-blur transition-all",
        scrolled
          ? "bg-paper/85 border-border/70"
          : "bg-paper/60",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          to="/"
          className="group flex items-baseline gap-2 font-display text-ink"
          aria-label={`${SITE.name} — home`}
        >
          <span className="text-lg md:text-xl tracking-tight">Emotional</span>
          <span className="gold-rule mb-1" aria-hidden />
          <span className="text-lg md:text-xl tracking-tight">Ledger</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.82rem] tracking-wide text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {session ? (
            <div className="relative inline-block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper"
              >
                <User className="size-3.5" /> Account
              </button>
              {menuOpen ? (
                <div className="absolute right-0 mt-2 w-52 border border-border bg-paper shadow-lg" onMouseLeave={() => setMenuOpen(false)}>
                  <Link to={dashboardPath} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-ink hover:bg-ivory">Dashboard</Link>
                  <Link to="/buy" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-ink hover:bg-ivory">Buy the Book</Link>
                  <button
                    onClick={async () => { setMenuOpen(false); await signOut(); nav({ to: "/" }); }}
                    className="block w-full border-t border-border px-4 py-3 text-left text-sm text-muted-foreground hover:bg-ivory hover:text-ink"
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login/buyer" className="text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-ink">Sign in</Link>
              <Link to="/login/admin" className="text-[0.75rem] uppercase tracking-[0.18em] text-gold hover:text-ink">Admin</Link>
          <Link
            to="/buy"
            className="inline-flex items-center justify-center border border-ink bg-ink px-4 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Buy the Book
          </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden">
          <nav className="container-editorial flex flex-col gap-1 border-t border-border py-4">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-ink py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/buy"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center border border-ink bg-ink px-4 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-paper"
            >
              Buy the Book
            </Link>
            {session ? (
              <>
                <Link to={dashboardPath} onClick={() => setOpen(false)} className="mt-2 border border-ink px-4 py-3 text-center text-[0.75rem] uppercase tracking-[0.18em] text-ink">Dashboard</Link>
                <button
                  onClick={async () => { setOpen(false); await signOut(); nav({ to: "/" }); }}
                  className="mt-2 px-4 py-3 text-center text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground"
                >Sign out</button>
              </>
            ) : (
              <Link to="/login/buyer" onClick={() => setOpen(false)} className="mt-2 px-4 py-3 text-center text-[0.75rem] uppercase tracking-[0.18em] text-ink">Sign in</Link>
            )}
            <Link to="/login/admin" onClick={() => setOpen(false)} className="mt-1 px-4 py-3 text-center text-[0.72rem] uppercase tracking-[0.18em] text-gold">Admin login</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}