CREATE TABLE public.thanks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX thanks_teacher_idx ON public.thanks(teacher_id);
GRANT SELECT, INSERT, DELETE ON public.thanks TO authenticated;
GRANT ALL ON public.thanks TO service_role;
ALTER TABLE public.thanks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "thanks_select_own_or_admin" ON public.thanks FOR SELECT TO authenticated
  USING (teacher_id = auth.uid() OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "thanks_insert_admin" ON public.thanks FOR INSERT TO authenticated
  WITH CHECK (admin_id = auth.uid() AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "thanks_delete_admin" ON public.thanks FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));