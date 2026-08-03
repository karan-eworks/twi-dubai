import type { ApiListResponse } from "./common";


export type MenuListApiResponse = ApiListResponse<MenuApiSummary>;

export type MenuDetailApiResponse =
  | MenuApiDetail
  | { data: MenuApiDetail | null };

export interface MenuApiSummary {
  id: number;
  title: string;
  label?: string | null;
  slug: string;
  status?: number | boolean | null;
  position?: string | null;
  active?: boolean | number | string | null;
  items_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MenuApiDetail extends MenuApiSummary {
  items?: MenuApiItem[] | null;
}

export interface MenuApiItem {
  id: number;
  menu_id?: number | null;
  title: string;
  label?: string | null;
  custom_url?: boolean | null;
  url?: string | null;
  href?: string | null;
  content_type?: string | null;
  target?: string | null;
  parent_id?: number | null;
  order?: number | null;
  status?: boolean | number | string | null;
  mega_menu?: boolean | null;
  child_class?: string | null;
  children?: MenuApiItem[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export interface FooterGroup {
  title: string;
  links: NavigationItem[];
}
