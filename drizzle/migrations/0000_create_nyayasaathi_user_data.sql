CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  preferred_language text NOT NULL DEFAULT 'English' CHECK (preferred_language IN ('English', 'Hindi', 'Hinglish')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  storage_path text NOT NULL UNIQUE,
  mime_type text NOT NULL DEFAULT 'application/pdf',
  file_size bigint NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'uploaded',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own documents" ON public.documents FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own documents" ON public.documents FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own documents" ON public.documents FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.document_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_analysis TO authenticated;
GRANT ALL ON public.document_analysis TO service_role;
ALTER TABLE public.document_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own document analysis" ON public.document_analysis FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add analysis for their own documents" ON public.document_analysis FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid()));
CREATE POLICY "Users can update their own document analysis" ON public.document_analysis FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid()));
CREATE POLICY "Users can delete their own document analysis" ON public.document_analysis FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.document_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  document_a_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  document_b_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT document_comparisons_distinct_documents CHECK (document_a_id <> document_b_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_comparisons TO authenticated;
GRANT ALL ON public.document_comparisons TO service_role;
ALTER TABLE public.document_comparisons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own comparisons" ON public.document_comparisons FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create comparisons for their own documents" ON public.document_comparisons FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.documents a WHERE a.id = document_a_id AND a.user_id = auth.uid()) AND EXISTS (SELECT 1 FROM public.documents b WHERE b.id = document_b_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update their own comparisons" ON public.document_comparisons FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.documents a WHERE a.id = document_a_id AND a.user_id = auth.uid()) AND EXISTS (SELECT 1 FROM public.documents b WHERE b.id = document_b_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete their own comparisons" ON public.document_comparisons FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  document_id uuid REFERENCES public.documents(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  source_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own chat messages" ON public.chat_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own chat messages" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND (document_id IS NULL OR EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid())));
CREATE POLICY "Users can update their own chat messages" ON public.chat_messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND (document_id IS NULL OR EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid())));
CREATE POLICY "Users can delete their own chat messages" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.lawyer_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  document_id uuid REFERENCES public.documents(id) ON DELETE SET NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lawyer_briefs TO authenticated;
GRANT ALL ON public.lawyer_briefs TO service_role;
ALTER TABLE public.lawyer_briefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own lawyer briefs" ON public.lawyer_briefs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own lawyer briefs" ON public.lawyer_briefs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND (document_id IS NULL OR EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid())));
CREATE POLICY "Users can update their own lawyer briefs" ON public.lawyer_briefs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND (document_id IS NULL OR EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid())));
CREATE POLICY "Users can delete their own lawyer briefs" ON public.lawyer_briefs FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can read files in their own folder" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'legal-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can upload files to their own folder" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'legal-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can update files in their own folder" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'legal-documents' AND (storage.foldername(name))[1] = auth.uid()::text) WITH CHECK (bucket_id = 'legal-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete files in their own folder" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'legal-documents' AND (storage.foldername(name))[1] = auth.uid()::text);