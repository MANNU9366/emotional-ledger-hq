
CREATE TABLE public.book_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind text not null default 'chapter' check (kind in ('sample','chapter','bonus','other')),
  storage_path text not null unique,
  file_name text not null,
  file_size bigint,
  mime_type text,
  visibility text not null default 'public' check (visibility in ('public','subscribers','private')),
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT ON public.book_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_assets TO authenticated;
GRANT ALL ON public.book_assets TO service_role;

ALTER TABLE public.book_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public assets readable by all"
  ON public.book_assets FOR SELECT TO anon, authenticated
  USING (visibility = 'public');

CREATE POLICY "Subscribers assets readable by signed-in"
  ON public.book_assets FOR SELECT TO authenticated
  USING (visibility in ('public','subscribers'));

CREATE POLICY "Admins read all assets"
  ON public.book_assets FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert assets"
  ON public.book_assets FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update assets"
  ON public.book_assets FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete assets"
  ON public.book_assets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER book_assets_set_updated_at
  BEFORE UPDATE ON public.book_assets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage policies on the book-assets bucket
CREATE POLICY "Admins upload book-assets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update book-assets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete book-assets"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read book-assets"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'book-assets');
