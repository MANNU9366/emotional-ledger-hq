import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { subscribe } from "@/lib/submissions";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  source,
  compact = false,
}: {
  source: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await subscribe(email, source);
      toast.success("You're on the list. A quiet note will find you monthly.");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full items-stretch border border-ink/70 bg-paper",
        compact ? "max-w-sm" : "max-w-md",
      )}
    >
      <label htmlFor={`newsletter-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${source}`}
        type="email"
        autoComplete="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-ink px-4 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold hover:text-ink disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="size-3.5" />
          </>
        )}
      </button>
    </form>
  );
}