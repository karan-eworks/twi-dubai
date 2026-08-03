import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type BlogListApiResponse = ApiListResponse<BlogApiItem>;

export type BlogDetailApiResponse = BlogApiItem | { data: BlogApiItem | null };

export interface BlogTaxonomyApiItem {
  id?: number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
}

export interface BlogAuthorApiItem {
  id?: number;
  name?: string | null;
  title?: string | null;
  designation?: string | null;
  position?: string | null;
  biography?: string | null;
  bio?: string | null;
  image?: string | ApiMedia | null;
  photo?: string | ApiMedia | null;
  avatar?: string | ApiMedia | null;
  socials?: BlogAuthorSocialApiItem[] | Record<string, string> | null;
}

export interface BlogAuthorSocialApiItem {
  label?: string | null;
  name?: string | null;
  href?: string | null;
  url?: string | null;
}

export interface BlogApiItem {
  id: number;
  title: string;
  slug: string;
  subtitle?: string | null;
  excerpt?: string | null;
  description?: string | null;
  content?: string | null;
  body?: string | null;
  html?: string | null;
  featured_image?: string | ApiMedia | null;
  cover_image?: string | ApiMedia | null;
  image?: string | ApiMedia | null;
  og_image?: string | ApiMedia | null;
  author?: string | BlogAuthorApiItem | null;
  category?: string | BlogTaxonomyApiItem | null;
  categories?: Array<string | BlogTaxonomyApiItem> | null;
  tags?: Array<string | BlogTaxonomyApiItem> | null;
  meta_tag?: ApiMetaTag | null;
  published_at?: string | null;
  publish_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  read_time?: string | null;
  reading_time?: string | number | null;
  featured?: boolean | number | string | null;
  is_featured?: boolean | number | string | null;
  status?: string | boolean | null;
}
