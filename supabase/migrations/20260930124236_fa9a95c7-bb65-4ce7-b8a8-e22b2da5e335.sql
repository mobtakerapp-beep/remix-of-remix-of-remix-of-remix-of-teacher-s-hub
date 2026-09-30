CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;

DROP POLICY "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR private.has_role(auth.uid(), 'admin'));

DROP POLICY "user_roles_select_own_or_admin" ON public.user_roles;
CREATE POLICY "user_roles_select_own_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'));

DROP POLICY "files_select_own_or_admin" ON public.files;
CREATE POLICY "files_select_own_or_admin" ON public.files FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'));

DROP POLICY "files_delete_own_or_admin" ON public.files;
CREATE POLICY "files_delete_own_or_admin" ON public.files FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'));

DROP FUNCTION public.has_role(uuid, public.app_role);
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

CREATE POLICY "teacher_files_insert_own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'teacher-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "teacher_files_select_own_or_admin" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'teacher-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR private.has_role(auth.uid(), 'admin')));
CREATE POLICY "teacher_files_delete_own_or_admin" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'teacher-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR private.has_role(auth.uid(), 'admin')));