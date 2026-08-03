export type ApiNullable<T> = T | null;

export interface ApiListResponse<T> {
  data: T[];
  links: ApiPaginationLinks;
  meta: ApiPaginationMeta;
}

export interface ApiPaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface ApiPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ApiMediaFormat {
  url?: string | null;
}

export interface ApiMedia {
  id?: number;
  url?: string | null;
  src?: string | null;
  path?: string | null;
  original_url?: string | null;
  full_url?: string | null;
  location?: string | null;
  alt?: string | null;
  alt_text?: string | null;
  alternativeText?: string | null;
  title?: string | null;
  name?: string | null;
  caption?: string | null;
  formats?: Record<string, ApiMediaFormat> | null;
  data?: ApiMedia | null;
}

export interface ApiMetaTag {
  id: number;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  og_title: string;
  og_description: string;
  og_image: string | ApiMedia | null;
  no_index: boolean;
  no_follow: boolean;
  created_at: string;
  updated_at: string;
}


export interface SectionIntro {
  label?: string;
  heading?: string;
  deck?: string;
}