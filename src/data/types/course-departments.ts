import type { ApiListResponse, ApiMedia, ApiMetaTag } from "./common";

export type CourseDepartmentListApiResponse =
  ApiListResponse<CourseDepartmentApiItem>;

export interface CourseDepartmentApiItem {
  id: number;
  name: string;
  slug: string;
  status: boolean;
  hidden: boolean;
  extra: Record<string, unknown> | null;
  meta_tag:
    | (Omit<ApiMetaTag, "og_image"> & { og_image: string | ApiMedia | null })
    | null;
  created_at: string;
  updated_at: string;
}
