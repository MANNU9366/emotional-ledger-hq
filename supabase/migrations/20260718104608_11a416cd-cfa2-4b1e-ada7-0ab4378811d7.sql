
CREATE POLICY "book-assets public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-assets');

CREATE POLICY "book-assets admin insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "book-assets admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "book-assets admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'book-assets' AND public.has_role(auth.uid(), 'admin'));
