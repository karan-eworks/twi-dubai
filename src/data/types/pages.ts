import type { Metadata } from "next";
import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type PageListApiResponse = ApiListResponse<PageApiItem>;

export type PageDetailApiResponse = PageApiItem | { data: PageApiItem | null };

export interface PageApiItem {
  id: number;
  name: string;
  slug: string;
  url?: string | null;
  excerpt?: string | null;
  description?: string | null;
  additional_info?: string | null;
  display_order?: number | null;
  show_on_homepage?: boolean | number | string | null;
  publish?: boolean | number | string | null;
  publish_date?: string | null;
  form_id?: number | null;
  parent_id?: number | null;
  featured_image_id?: number | null;
  featured_image?: string | ApiMedia | null;
  medias?: Array<string | ApiMedia> | null;
  form?: Record<string, unknown> | null;
  parent_page?: Record<string, unknown> | null;
  meta_tag?:
    | (Omit<ApiMetaTag, "meta_keyword"> & {
        meta_keyword?: string | null;
      })
    | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MediaAsset {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

export interface CmsPageDisplayData {
  id: number;
  title: string;
  slug: string;
  intro: string;
  bodyHtml: string;
  additionalHtml: string;
  media: MediaAsset;
  gallery: MediaAsset[];
}

export interface CmsPageMeta {
  title: string;
  description: string;
  image: string;
  robots: NonNullable<Metadata["robots"]>;
}
