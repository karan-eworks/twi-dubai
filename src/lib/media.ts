import type { ApiMedia } from "@/data/types/common";
import { clean } from "./clean";

export function mediaUrl(
  media: string | ApiMedia | null | undefined,
): string | null {
  if (!media) return null;
  if (typeof media === "string") return clean(media);

  return (
    clean(media.location) ??
    clean(media.url) ??
    clean(media.src) ??
    clean(media.original_url) ??
    clean(media.full_url) ??
    clean(media.path) ??
    clean(media.formats?.large?.url) ??
    clean(media.formats?.medium?.url) ??
    clean(media.formats?.small?.url) ??
    clean(media.data?.location) ??
    clean(media.data?.url)
  );
}

export function mediaAlt(
  media: string | ApiMedia | null | undefined,
): string | null {
  if (!media || typeof media === "string") return null;

  return (
    clean(media.alt_text) ??
    clean(media.alt) ??
    clean(media.alternativeText) ??
    clean(media.caption) ??
    clean(media.title) ??
    clean(media.name)
  );
}
