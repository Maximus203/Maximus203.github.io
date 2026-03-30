-- ============================================
-- Portfolio Supabase Schema (schema: api)
-- ============================================

-- Nettoyer les anciennes tables si elles existent dans public
DROP TABLE IF EXISTS public.project_requests CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;

-- 1. Table des demandes de projets (formulaire public)
CREATE TABLE IF NOT EXISTS api.project_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  details TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table des projets portfolio (contenu dynamique)
CREATE TABLE IF NOT EXISTS api.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT,
  title_ja TEXT,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_zh TEXT,
  description_ja TEXT,
  tags TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- project_requests : INSERT public, lecture admin uniquement
ALTER TABLE api.project_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on project_requests"
  ON api.project_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on project_requests"
  ON api.project_requests FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates on project_requests"
  ON api.project_requests FOR UPDATE
  USING (auth.role() = 'authenticated');

-- projects : lecture publique, ecriture admin
ALTER TABLE api.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public reads on projects"
  ON api.projects FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated writes on projects"
  ON api.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates on projects"
  ON api.projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes on projects"
  ON api.projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- Triggers updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_project_requests
  BEFORE UPDATE ON api.project_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON api.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Storage bucket : a creer manuellement
-- ============================================
-- Bucket name: project-files
-- Public: true
-- Allowed MIME types: image/*, application/pdf, application/zip
