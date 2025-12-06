import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Service {
  id: string;
  slug: string;
  title?: string;
  name?: string; // Add name support as DB uses name
  description: string | null;
  content: string | null;
  price: number | null;
  duration: number | null;
  image_url: string | null;
  category: "nails" | "body" | "facial" | "other" | string | null;
  is_featured: boolean; // Changed from prevents is_active
  created_at: string;
  updated_at?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  price: number | null;
  duration_hours?: number | null;
  duration?: string | null; // DB uses duration string
  pdf_url: string | null;
  flyer_url: string | null;
  level: "beginner" | "intermediate" | "advanced" | string | null;
  is_featured: boolean; // Changed from is_active
  created_at: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: any;
  image_url?: string | null; // Support image_url
  cover_image_url: string | null;
  author_id: string | null;
  published?: boolean;
  is_featured?: boolean; // Add is_featured support
  published_at: string | null;
  created_at: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: "nails" | "body" | "before_after" | "other" | string | null;
  order_index?: number;
  is_featured?: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  name: string;
  email: string | null;
  content?: string;
  comment?: string; // DB uses comment
  rating: number | null;
  is_approved: boolean; // DB uses is_approved
  approved?: boolean;
  created_at: string;
}

// Helper functions
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    //.eq('is_featured', true) // Optional: filter by featured or get all
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    //.eq('is_active', true)
    .single();

  if (error) return null;
  return data;
}

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    //.eq('is_featured', true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    //.eq('is_featured', true)
    .single();

  if (error) return null;
  return data;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    // .eq('published', true) // Schema in seed doesn't specify published col, maybe just created_at
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: true }); // Removed order_index if not in seed (seed implies auto order or date)

  if (error) throw error;
  return data || [];
}

export async function getApprovedComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("is_approved", true) // Changed from approved
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
