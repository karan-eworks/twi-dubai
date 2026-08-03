import { apiFetch } from "@/lib/api";
import type {
  EventApiItem,
  EventDetailApiResponse,
  EventListApiResponse,
} from "../types/events";

function isEventApiItem(value: unknown): value is EventApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<EventApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export interface GetEventsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?:
    | "event_date"
    | "publish_date"
    | "created_at"
    | "updated_at"
    | "view_count";
  sortOrder?: "asc" | "desc";
  includeInactive?: boolean;
  includeUnpublished?: boolean;
}

export async function getEvents(params: GetEventsParams = {}) {
  const {
    page,
    perPage,
    search,
    sortBy = "event_date",
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

  return apiFetch<EventListApiResponse>(`/events?${query.toString()}`);
}

export async function getEventBySlug(
  slug: string,
): Promise<EventApiItem | null> {
  const response = await apiFetch<EventDetailApiResponse>(
    `/events/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isEventApiItem(candidate) ? candidate : null;
}
