import { apiFetch } from "@/lib/api";
import type { BlogApiItem, BlogListApiResponse, BlogDetailApiResponse } from "../types/blogs";


function isBlogApiItem(value: unknown): value is BlogApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<BlogApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export async function getBlogs() {
  return apiFetch<BlogListApiResponse>("/blogs");
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
