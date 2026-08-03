import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type NewsListApiResponse = ApiListResponse<NewsApiItem>;

export type NewsDetailApiResponse = NewsApiItem | { data: NewsApiItem | null };

export interface NewsTaxonomyApiItem {
  id?: number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
}

export interface NewsAuthorApiItem {
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
  socials?: NewsAuthorSocialApiItem[] | Record<string, string> | null;
}

export interface NewsAuthorSocialApiItem {
  label?: string | null;
  name?: string | null;
  href?: string | null;
  url?: string | null;
}

export interface NewsGalleryApiItem extends ApiMedia {
  image?: string | ApiMedia | null;
  media?: string | ApiMedia | null;
  file?: string | ApiMedia | null;
  photo?: string | ApiMedia | null;
  description?: string | null;
}

export interface NewsApiItem {
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
  gallery?: Array<string | ApiMedia | NewsGalleryApiItem> | null;
  galleries?: Array<string | ApiMedia | NewsGalleryApiItem> | null;
  gallery_images?: Array<string | ApiMedia | NewsGalleryApiItem> | null;
  images?: Array<string | ApiMedia | NewsGalleryApiItem> | null;
  media_gallery?: Array<string | ApiMedia | NewsGalleryApiItem> | null;
  author?: string | NewsAuthorApiItem | null;
  category?: string | NewsTaxonomyApiItem | null;
  categories?: Array<string | NewsTaxonomyApiItem> | null;
  tags?: Array<string | NewsTaxonomyApiItem> | null;
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
