import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type TeamListApiResponse = ApiListResponse<TeamApiItem>;

export type TeamDetailApiResponse = TeamApiItem | { data: TeamApiItem | null };

export interface TeamDepartmentApiItem {
  id?: string | number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
}

export interface TeamSocialApiItem {
  label?: string | null;
  name?: string | null;
  href?: string | null;
  url?: string | null;
}

export interface TeamApiItem {
  id: string | number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
  role?: string | null;
  designation?: string | null;
  position?: string | null;
  biography?: string | null;
  bio?: string | null;
  description?: string | null;
  content?: string | null;
  subject?: string | null;
  subject_area?: string | null;
  speciality?: string | null;
  specialty?: string | null;
  student_journey?: string | null;
  photo?: string | ApiMedia | null;
  image?: string | ApiMedia | null;
  avatar?: string | ApiMedia | null;
  featured_image?: string | ApiMedia | null;
  cover_image?: string | ApiMedia | null;
  department?: string | TeamDepartmentApiItem | null;
  category?: string | TeamDepartmentApiItem | null;
  departments?: Array<string | TeamDepartmentApiItem> | null;
  socials?: TeamSocialApiItem[] | Record<string, string> | null;
  meta_tag?: ApiMetaTag | null;
  active?: boolean | number | string | null;
  status?: string | boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}
