
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE r public.app_role;
BEGIN
  INSERT INTO public.profiles(id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);

  r := CASE lower(coalesce(NEW.raw_user_meta_data->>'role',''))
         WHEN 'author' THEN 'author'::public.app_role
         WHEN 'admin'  THEN 'admin'::public.app_role
         ELSE 'buyer'::public.app_role
       END;
  INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, r) ON CONFLICT DO NOTHING;

  -- Site owner: auto-grant admin
  IF lower(NEW.email) = 'emotionalledger@gmail.com' THEN
    INSERT INTO public.user_roles(user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Backfill: if the owner account already exists, grant admin now.
INSERT INTO public.user_roles(user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) = 'emotionalledger@gmail.com'
ON CONFLICT DO NOTHING;
