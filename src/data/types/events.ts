import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type EventListApiResponse = ApiListResponse<EventApiItem>;

export type EventDetailApiResponse =
  | EventApiItem
  | { data: EventApiItem | null };

export interface EventCategoryApiItem {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export interface EventApiItem {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  venue?: string | null;
  event_date?: string | null;
  event_time?: string | null;
  multi_day?: boolean | null;
  end_date?: string | null;
  view_count?: number | null;
  active?: boolean | null;
  publish?: boolean | null;
  publish_date?: string | null;
  featured_image?: ApiMedia | null;
  image?: string | null;
  thumbnail?: string | null;
  medias?: ApiMedia[] | null;
  categories?: EventCategoryApiItem[] | null;
  meta_tag?: ApiMetaTag | null;
  is_ongoing?: boolean | null;
  is_upcoming?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}
