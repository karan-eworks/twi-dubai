import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type NewsListApiResponse = ApiListResponse<NewsApiItem>;

export type NewsDetailApiResponse = NewsApiItem | { data: NewsApiItem | null };

export interface NewsCategoryApiItem {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export interface NewsAuthorApiItem {
  id: number;
  name: string;
}

export interface NewsTagApiItem {
  id: number;
  name: string;
  slug: string;
}

export interface NewsApiItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: string | null;
  view_count?: number | null;
  status?: boolean | null;
  active?: boolean | null;
  publish?: boolean | null;
  publish_date?: string | null;
  featured_image?: ApiMedia | null;
  image?: string | null;
  medias?: ApiMedia[] | null;
  categories?: NewsCategoryApiItem[] | null;
  authors?: NewsAuthorApiItem[] | null;
  tags?: NewsTagApiItem[] | null;
  meta_tag?: ApiMetaTag | null;
  created_at?: string | null;
  updated_at?: string | null;
}
