import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { submitEnquiry, type EnquiryKind } from "@/lib/submissions";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export function EnquiryForm({
  kind,
  fields,
  cta = "Send enquiry",
  successMessage = "Thank you. We'll be in touch within 2 business days.",
  extraMeta,
}: {
  kind: EnquiryKind;
  fields: Field[];
  cta?: string;
  successMessage?: string;
  extraMeta?: Record<string, unknown>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const known = ["name", "email", "phone", "organization", "subject", "message"];
      const meta: Record<string, unknown> = { ...(extraMeta ?? {}) };
      for (const [k, v] of Object.entries(values)) {
        if (!known.includes(k) && v) meta[k] = v;
      }
      meta.submitted_at = new Date().toISOString();
      if (typeof window !== "undefined") {
        meta.page = window.location.pathname;
      }
      await submitEnquiry({
        kind,
        name: values.name,
        email: values.email,
        phone: values.phone,
        organization: values.organization,
        subject: values.subject,
        message: values.message,
        meta,
      });
      toast.success(successMessage);
      setValues({});
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again in a moment.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {fields.map((f) => {
        const id = `field-${kind}-${f.name}`;
        const base =
          "w-full border-b border-border bg-transparent px-0 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-ink";
        return (
          <div key={f.name} className="grid gap-2">
            <label htmlFor={id} className="eyebrow text-[0.65rem]">
              {f.label}
              {f.required ? " *" : ""}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={id}
                required={f.required}
                rows={4}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={base + " resize-y"}
              />
            ) : f.type === "select" ? (
              <select
                id={id}
                required={f.required}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={base}
              >
                <option value="">Please choose…</option>
                {f.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={base}
                autoComplete={
                  f.type === "email" ? "email" : f.type === "tel" ? "tel" : "off"
                }
              />
            )}
          </div>
        );
      })}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {cta}
        </button>
      </div>
    </form>
  );
}