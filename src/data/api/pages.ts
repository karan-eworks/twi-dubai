import { apiFetch } from "@/lib/api";
import type {
  PageApiItem,
  PageDetailApiResponse,
  PageListApiResponse,
} from "@/data/types/pages";

function isPageApiItem(value: unknown): value is PageApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<PageApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.slug === "string"
  );
}

export async function getPages() {
  return apiFetch<PageListApiResponse>("/pages");
}

export async function getPageBySlug(slug: string): Promise<PageApiItem | null> {
  const response = await apiFetch<PageDetailApiResponse>(
    `/pages/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isPageApiItem(candidate) ? candidate : null;
}
