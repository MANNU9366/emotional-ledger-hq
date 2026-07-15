import { Link } from "@tanstack/react-router";
import { FOOTER_NAV, SITE } from "@/lib/site-content";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ivory text-ink">
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-baseline gap-2 font-display">
            <span className="text-xl">Emotional</span>
            <span className="gold-rule mb-1" aria-hidden />
            <span className="text-xl">Ledger</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A book, a practice, and a small community for readers who take their
            inner life seriously. Written for leaders, professionals, and anyone
            learning to think honestly about what they feel.
          </p>
          <div className="mt-8">
            <p className="eyebrow mb-3">The Monthly Ledger</p>
            <NewsletterForm source="footer" compact />
          </div>
        </div>

        {FOOTER_NAV.map((group) => (
          <div key={group.title}>
            <p className="eyebrow mb-4">{group.title}</p>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ink/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-editorial flex flex-col items-start justify-between gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. A quiet
            book for a noisy time.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-ink">Privacy</Link>
            <Link to="/terms" className="hover:text-ink">Terms</Link>
            <Link to="/contact" className="hover:text-ink">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}