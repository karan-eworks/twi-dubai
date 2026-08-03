import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type CourseListApiResponse = ApiListResponse<CourseApiItem>;

export interface CourseApiItem {
  id: number;
  title: string;
  slug: string;
  course_id?: string | null;
  description: string | null;
  excerpt: string | null;
  duration: string | null;
  fee: string | null;
  intake: string | null;
  dynamic_tags: string | null;
  crm_course_id: string | null;
  crm_course_all_info?: Record<string, unknown> | null;
  crm_fields?: Record<string, unknown> | null;
  delivery: string | null;
  scholarship: string | null;
  language: string | null;
  credits: string | null;
  extra?: Record<string, unknown> | null;
  key_facts?: string | null;
  assessment?: string | null;
  entry_requirement?: string | null;
  why_this_course?: string | null;
  why_course?: string | null;
  course_structure?: string | null;
  additional_info?: string | null;
  future?: string | null;
  new_course?: string | null;
  color?: string | null;
  form_link?: string | null;
  programme_leader_id?: number | null;
  programme_leader_message?: string | null;
  accredited_by?: string | ApiMedia | null;
  ranking?: string | null;
  pdf?: string | ApiMedia | null;
  affiliation?: string | ApiMedia | null;
  active: boolean;
  status: boolean;
  show_in_select_dropdown?: boolean;
  hide_cta_buttons?: boolean;
  show_in_list_when_disabled?: boolean;
  hide_in_course_list?: boolean;
  level_id?: number | null;
  form_id?: number | null;
  awarded_by?: string | null;
  cover_image_id?: number | null;
  featured_image_id?: number | null;
  department: CourseDepartmentSummary | null;
  level: Record<string, unknown> | null;
  form: Record<string, unknown> | null;
  university: Record<string, unknown> | null;
  programme_leader: Record<string, unknown> | null;
  contents: CourseContentApiItem[];
  structures: CourseStructureApiItem[];
  items: Record<string, unknown>[];
  videos: Record<string, unknown>[];
  strip_tags: Record<string, unknown>[];
  featured_image: string | ApiMedia | null;
  cover_image: string | ApiMedia | null;
  meta_tag: ApiMetaTag | null;
  created_at: string;
  updated_at: string;
}

export interface CourseDepartmentSummary {
  id: number;
  name: string;
  slug: string;
}

export interface CourseContentApiItem {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  order: number;
}

export interface CourseStructureApiItem {
  id: number;
  title: string;
  description: string | null;
  order: number;
}
