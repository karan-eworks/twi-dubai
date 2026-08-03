import { apiFetch } from "@/lib/api";
import type {
  NewsApiItem,
  NewsDetailApiResponse,
  NewsListApiResponse,
} from "../types/news";

function isNewsApiItem(value: unknown): value is NewsApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<NewsApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export interface GetNewsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?:
    | "created_at"
    | "publish_date"
    | "updated_at"
    | "title"
    | "view_count";
  sortOrder?: "asc" | "desc";
  includeInactive?: boolean;
  includeUnpublished?: boolean;
}

export async function getNews(params: GetNewsParams = {}) {
  const {
    page,
    perPage,
    search,
    sortBy = "created_at",
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

  return apiFetch<NewsListApiResponse>(`/news?${query.toString()}`);
}

export async function getNewsArticleBySlug(
  slug: string,
): Promise<NewsApiItem | null> {
  const response = await apiFetch<NewsDetailApiResponse>(
    `/news/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isNewsApiItem(candidate) ? candidate : null;
}
