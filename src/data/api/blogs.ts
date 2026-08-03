import { apiFetch } from "@/lib/api";
import type {
  BlogApiItem,
  BlogDetailApiResponse,
  BlogListApiResponse,
} from "../types/blogs";

function isBlogApiItem(value: unknown): value is BlogApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<BlogApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export interface GetBlogsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?:
    | "publish_date"
    | "created_at"
    | "updated_at"
    | "title"
    | "view_count";
  sortOrder?: "asc" | "desc";
  includeInactive?: boolean;
  includeUnpublished?: boolean;
}

export async function getBlogs(params: GetBlogsParams = {}) {
  const {
    page,
    perPage,
    search,
    sortBy = "publish_date",
    sortOrder = "desc",
    includeInactive = false,
    includeUnpublished = false,
  } = params;

  const query = new URLSearchParams({
    sort_by: sortBy,
    sort_order: sortOrder,
    include_inactive: String(includeInactive),
    include_unpublished: String(includeUnpublished),
  });
  if (page) query.set("page", String(page));
  if (perPage) query.set("per_page", String(perPage));
  if (search) query.set("search", search);

  return apiFetch<BlogListApiResponse>(`/blogs?${query.toString()}`);
}

export async function getBlogBySlug(slug: string): Promise<BlogApiItem | null> {
  const response = await apiFetch<BlogDetailApiResponse>(
    `/blogs/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isBlogApiItem(candidate) ? candidate : null;
}
