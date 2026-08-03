import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type BlogListApiResponse = ApiListResponse<BlogApiItem>;

export type BlogDetailApiResponse = BlogApiItem | { data: BlogApiItem | null };

export interface BlogCategoryApiItem {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export interface BlogAuthorApiItem {
  id: number;
  name: string;
}

export interface BlogTagApiItem {
  id: number;
  name: string;
  slug: string;
}

export interface BlogApiItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: string | null;
  video_url?: string | null;
  pdf?: string | null;
  image?: string | null;
  view_count?: number | null;
  status?: boolean | null;
  active?: boolean | null;
  publish?: boolean | null;
  publish_date?: string | null;
  featured_image?: ApiMedia | null;
  medias?: ApiMedia[] | null;
  categories?: BlogCategoryApiItem[] | null;
  authors?: BlogAuthorApiItem[] | null;
  tags?: BlogTagApiItem[] | null;
  meta_tag?: ApiMetaTag | null;
  created_at?: string | null;
  updated_at?: string | null;
}
