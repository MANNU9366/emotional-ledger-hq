
CREATE TABLE public.sample_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid REFERENCES public.enquiries(id) ON DELETE SET NULL,
  asset_id uuid NOT NULL REFERENCES public.book_assets(id) ON DELETE CASCADE,
  recipient_email text NOT NULL,
  note text,
  sent_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sample_deliveries_recipient_idx ON public.sample_deliveries (lower(recipient_email));
CREATE INDEX sample_deliveries_enquiry_idx ON public.sample_deliveries (enquiry_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sample_deliveries TO authenticated;
GRANT ALL ON public.sample_deliveries TO service_role;

ALTER TABLE public.sample_deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage sample deliveries"
  ON public.sample_deliveries FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Recipients read their deliveries"
  ON public.sample_deliveries FOR SELECT
  TO authenticated
  USING (lower(recipient_email) = lower((auth.jwt() ->> 'email')));
