-- Supabase Storage Setup
-- Run this in your Supabase SQL Editor

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('services', 'services', true),
  ('courses', 'courses', true),
  ('blog', 'blog', true),
  ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public read access
CREATE POLICY "Public Access for Services Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'services');

CREATE POLICY "Public Access for Courses Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'courses');

CREATE POLICY "Public Access for Blog Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

CREATE POLICY "Public Access for Gallery Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Allow authenticated users to upload (for admin panel later)
CREATE POLICY "Authenticated users can upload Services Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'services');

CREATE POLICY "Authenticated users can upload Courses Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'courses');

CREATE POLICY "Authenticated users can upload Blog Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Authenticated users can upload Gallery Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');
