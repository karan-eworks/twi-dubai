import { apiFetch } from "@/lib/api";
import type { EventApiItem, EventListApiResponse, EventDetailApiResponse } from "../types/events";

function isEventApiItem(value: unknown): value is EventApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<EventApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export async function getEvents() {
  return apiFetch<EventListApiResponse>("/events");
}

export async function getEventBySlug(slug: string): Promise<EventApiItem | null> {
  const response = await apiFetch<EventDetailApiResponse>(
    `/events/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isEventApiItem(candidate) ? candidate : null;
}
