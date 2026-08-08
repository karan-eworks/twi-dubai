import type { GalleryImage } from "@/components/detail/media-gallery";
import type { CollegeEvent } from "@/components/home/event-section";
import { prepareArticleHtml } from "@/lib/article-html";
import { clean, getPlainText, truncate } from "@/lib/clean";
import { toIsoDate } from "@/lib/dates";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { EventApiItem } from "../types/events";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const FALLBACK_LOCATION = "The Woolwich Institute Dubai";
const SITE_URL = "https://www.woolwich.ac.ae";
const SITE_NAME = "The Woolwich Institute Dubai";
const RELATED_COUNT = 3;

function eventImage(item: EventApiItem) {
  return (
    mediaUrl(item.featured_image) ??
    clean(item.image) ??
    clean(item.thumbnail) ??
    FALLBACK_IMAGE
  );
}

/**
 * `event_date` is unreliable — the API hands back the current timestamp for
 * every event, so the whole listing would read as happening today. The publish
 * date is the one date the CMS keeps honestly, and it is what the cards and the
 * detail page both show until the source data is corrected.
 */
function eventDate(item: EventApiItem) {
  return toIsoDate(item.publish_date, item.created_at, item.event_date);
}

export function toCollegeEvent(item: EventApiItem): CollegeEvent {
  const summary = getPlainText(item.description);

  return {
    id: item.slug,
    title: item.title,
    excerpt: summary ? truncate(summary) : "",
    date: eventDate(item),
    time: item.event_time ?? undefined,
    location: clean(item.venue) ?? FALLBACK_LOCATION,
    category: item.categories?.[0]?.name || "Events",
    href: `/events/${item.slug}`,
    image: eventImage(item),
    status: item.is_upcoming ? "upcoming" : "past",
  };
}

export interface EventOccasion {
  slug: string;
  title: string;
  category: string | null;
  /** Standfirst for the hero — plain text, trimmed to two lines' worth. */
  standfirst: string;
  publishedOn: string;
  venue: string | null;
  /** Sanitized body; YouTube embeds survive, every other iframe does not. */
  html: string;
  gallery: GalleryImage[];
  image: string;
  imageAlt: string;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
  openGraphImage: string;
}

function toGallery(item: EventApiItem): GalleryImage[] {
  return (item.medias ?? []).flatMap((media) => {
    const src = mediaUrl(media);
    if (!src) return [];

    return [
      {
        src,
        alt: mediaAlt(media) ?? `Photograph from ${item.title}`,
        caption: clean(media.caption),
      },
    ];
  });
}

export function normalizeEvent(item: EventApiItem): EventOccasion {
  const { html } = prepareArticleHtml(item.description);
  const summary = getPlainText(item.description);
  const image = eventImage(item);

  return {
    slug: item.slug,
    title: item.title,
    category: item.categories?.[0]?.name ?? null,
    standfirst: summary ? truncate(summary, 190) : "",
    publishedOn: eventDate(item),
    venue: clean(item.venue),
    html,
    gallery: toGallery(item),
    image,
    imageAlt: mediaAlt(item.featured_image) ?? `${item.title} at ${SITE_NAME}`,
    canonicalUrl: `${SITE_URL}/events/${item.slug}`,
    seoTitle:
      clean(item.meta_tag?.meta_title) ??
      clean(item.meta_tag?.og_title) ??
      `${item.title} | ${SITE_NAME}`,
    seoDescription:
      clean(item.meta_tag?.meta_description) ??
      clean(item.meta_tag?.og_description) ??
      (summary ? truncate(summary, 160) : ""),
    openGraphImage: mediaUrl(item.meta_tag?.og_image) ?? image,
  };
}

/**
 * Same category first, then the most recent. Five of six events share one
 * category, so a strictly same-category list would still need topping up.
 */
export function getRelatedEvents(
  event: EventOccasion,
  items: EventApiItem[],
): CollegeEvent[] {
  const candidates = items.filter((item) => item.slug !== event.slug);

  const sameCategory = candidates.filter(
    (item) => (item.categories?.[0]?.name ?? null) === event.category,
  );
  const rest = candidates.filter(
    (item) => (item.categories?.[0]?.name ?? null) !== event.category,
  );

  return [...sameCategory, ...rest].slice(0, RELATED_COUNT).map(toCollegeEvent);
}
