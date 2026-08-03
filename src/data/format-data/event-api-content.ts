import type { CollegeEvent } from "@/components/home/event-section";
import { toIsoDate } from "@/lib/dates";
import type { EventApiItem } from "../types/events";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const FALLBACK_LOCATION = "The Woolwich Institute Dubai";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, maxLength = 140): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function toCollegeEvent(item: EventApiItem): CollegeEvent {
  const description = item.description ?? "";

  return {
    id: item.slug,
    title: item.title,
    excerpt: description ? truncate(stripHtml(description)) : "",
    date: toIsoDate(item.event_date, item.publish_date, item.created_at),
    time: item.event_time ?? undefined,
    location: item.venue?.trim() || FALLBACK_LOCATION,
    category: item.categories?.[0]?.name || "Events",
    href: `/events/${item.slug}`,
    image:
      item.featured_image?.location ||
      item.image ||
      item.thumbnail ||
      FALLBACK_IMAGE,
    status: item.is_upcoming || item.is_ongoing ? "upcoming" : "past",
  };
}
