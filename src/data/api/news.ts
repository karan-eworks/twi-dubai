import { apiFetch } from "@/lib/api";
import type { NewsApiItem, NewsListApiResponse, NewsDetailApiResponse } from "../types/news";

function isNewsApiItem(value: unknown): value is NewsApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<NewsApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export async function getNews() {
  return apiFetch<NewsListApiResponse>("/news");
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
