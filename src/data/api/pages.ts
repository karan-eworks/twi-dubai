import type {
  CmsPageDisplayData,
  CmsPageMeta,
  MediaAsset,
  PageApiItem,
  PageDetailApiResponse,
  PageListApiResponse,
} from "@/data/types/pages";
import { apiFetch } from "@/lib/api";
import {
  clean,
  getPlainText,
  normalizeBoolean,
  sanitizeHtml,
} from "@/lib/clean";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { ApiMedia } from "../types/common";

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

export function isPublishedCmsPage(page: PageApiItem | null | undefined) {
  if (!page) return false;
  if (page.publish === undefined || page.publish === null) return true;
  return normalizeBoolean(page.publish);
}

export function getPublishedCmsPageStaticParams(items: PageApiItem[]) {
  return items
    .filter((page) => page.slug !== "about-us")
    .filter(isPublishedCmsPage)
    .map((page) => ({ slug: page.slug }));
}

function getMediaAsset(
  media: string | ApiMedia | null | undefined,
): MediaAsset {
  return {
    src: mediaUrl(media) ?? "",
    alt: mediaAlt(media) ?? "",
    priority: true,
  };
}

export function getCmsPageDisplayData(page: PageApiItem): CmsPageDisplayData {
  const intro = getPlainText(page.excerpt) || getPlainText(page.description);

  const gallery = (page.medias ?? [])
    .map((media) => ({
      src: mediaUrl(media),
      alt: mediaAlt(media) ?? clean(page.name),
    }))
    .filter((media): media is MediaAsset => Boolean(media.src));

  return {
    id: page.id,
    title: clean(page.name) ?? "TWI Dubai",
    slug: page.slug,
    intro,
    bodyHtml: page.description || "",
    additionalHtml: page.additional_info || "",
    media: getMediaAsset(page.featured_image),
    gallery,
  };
}

export function getCmsPageMeta(page: PageApiItem): CmsPageMeta {
  const display = getCmsPageDisplayData(page);
  const title =
    clean(page.meta_tag?.meta_title) ??
    clean(page.meta_tag?.og_title) ??
    `${display.title} | The Woolwich College Dubai`;
  const description =
    clean(page.meta_tag?.meta_description) ??
    clean(page.meta_tag?.og_description) ??
    display.intro;
  const image = mediaUrl(page.meta_tag?.og_image) ?? display.media.src;

  return {
    title,
    description,
    image,
    robots: {
      index: page.meta_tag?.no_index ? false : true,
      follow: page.meta_tag?.no_follow ? false : true,
    },
  };
}
