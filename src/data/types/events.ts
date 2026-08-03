import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type EventListApiResponse = ApiListResponse<EventApiItem>;

export type EventDetailApiResponse = EventApiItem | { data: EventApiItem | null };

export interface EventTaxonomyApiItem {
  id?: number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
}

export interface EventVenueApiItem {
  id?: number;
  name?: string | null;
  title?: string | null;
  address?: string | null;
  location?: string | null;
  city?: string | null;
  room?: string | null;
  map_url?: string | null;
  url?: string | null;
}

export interface EventFormApiItem {
  id?: number | string;
  title?: string | null;
  label?: string | null;
  name?: string | null;
  url?: string | null;
  href?: string | null;
  action?: string | null;
  slug?: string | null;
}

export interface EventMediaApiItem extends ApiMedia {
  image?: string | ApiMedia | null;
  media?: string | ApiMedia | null;
  file?: string | ApiMedia | null;
  photo?: string | ApiMedia | null;
  description?: string | null;
}

export interface EventApiItem {
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
  thumbnail?: string | ApiMedia | null;
  media?: string | ApiMedia | null;
  og_image?: string | ApiMedia | null;
  medias?: Array<string | ApiMedia | EventMediaApiItem> | null;
  gallery?: Array<string | ApiMedia | EventMediaApiItem> | null;
  gallery_images?: Array<string | ApiMedia | EventMediaApiItem> | null;
  media_gallery?: Array<string | ApiMedia | EventMediaApiItem> | null;
  category?: string | EventTaxonomyApiItem | null;
  categories?: Array<string | EventTaxonomyApiItem> | null;
  tags?: Array<string | EventTaxonomyApiItem> | null;
  starts_at?: string | null;
  start_at?: string | null;
  start_date?: string | null;
  date?: string | null;
  event_date?: string | null;
  event_time?: string | null;
  ends_at?: string | null;
  end_at?: string | null;
  end_date?: string | null;
  time?: string | null;
  schedule?: string | null;
  venue?: string | EventVenueApiItem | null;
  location?: string | EventVenueApiItem | null;
  address?: string | null;
  venue_name?: string | null;
  venue_address?: string | null;
  form?: string | EventFormApiItem | null;
  attached_form?: string | EventFormApiItem | null;
  registration_form?: string | EventFormApiItem | null;
  forms?: Array<string | EventFormApiItem> | null;
  form_url?: string | null;
  registration_url?: string | null;
  meta_tag?: ApiMetaTag | null;
  featured?: boolean | number | string | null;
  is_featured?: boolean | number | string | null;
  active?: boolean | number | string | null;
  publish?: boolean | number | string | null;
  status?: string | boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}
