-- =============================================
-- Serendinails Database Schema
-- Supabase PostgreSQL
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  price DECIMAL(10,2),
  duration INTEGER,  -- Duration in minutes
  image_url TEXT,
  category TEXT CHECK (category IN ('nails', 'body', 'facial', 'other')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);

-- =============================================
-- COURSES TABLE
-- =============================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  price DECIMAL(10,2),
  duration_hours INTEGER,
  pdf_url TEXT,
  flyer_url TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_active ON courses(is_active);

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB,  -- TipTap JSON content
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- =============================================
-- GALLERY ITEMS TABLE
-- =============================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('nails', 'body', 'before_after', 'other')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_order ON gallery_items(order_index);

-- =============================================
-- COMMENTS / TESTIMONIALS TABLE
-- =============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_approved ON comments(approved);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Public read access for active/published content
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active courses"
  ON courses FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view gallery items"
  ON gallery_items FOR SELECT
  USING (true);

CREATE POLICY "Public can view approved comments"
  ON comments FOR SELECT
  USING (approved = true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage courses"
  ON courses FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery_items FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage comments"
  ON comments FOR ALL
  USING (auth.role() = 'authenticated');

-- Public can insert comments (for testimonials)
CREATE POLICY "Public can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- =============================================
-- STORAGE BUCKETS
-- =============================================
-- Run these in the Supabase Storage UI or via SQL:

-- Service images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true);

-- Course materials bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-materials', 'course-materials', true);

-- Blog images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Gallery bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true);

-- Storage policies (allow public read, authenticated write)
CREATE POLICY "Public can view service images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated can upload service images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view course materials"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-materials');

CREATE POLICY "Authenticated can upload course materials"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'course-materials' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view gallery"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated can upload to gallery"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
