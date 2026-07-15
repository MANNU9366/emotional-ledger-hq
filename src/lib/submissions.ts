import { supabase } from "@/integrations/supabase/client";

export type EnquiryKind =
  | "contact"
  | "workshop"
  | "speaking"
  | "corporate"
  | "bulk"
  | "media"
  | "sample"
  | "general";

export async function subscribe(email: string, source: string) {
  const clean = email.trim().toLowerCase();
  const { error } = await supabase.from("subscribers").insert({ email: clean, source });
  if (error && !/duplicate|unique/i.test(error.message)) throw error;
}

export type EnquiryInput = {
  kind: EnquiryKind;
  name?: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
  meta?: Record<string, unknown>;
};

export async function submitEnquiry(input: EnquiryInput) {
  const { error } = await supabase.from("enquiries").insert({
    kind: input.kind,
    name: input.name?.trim() || null,
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    organization: input.organization?.trim() || null,
    subject: input.subject?.trim() || null,
    message: input.message?.trim() || null,
    meta: (input.meta ?? {}) as never,
  });
  if (error) throw error;
}