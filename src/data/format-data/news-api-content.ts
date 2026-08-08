import type { Article } from "@/components/blogs/blog-card";
import type { GalleryImage } from "@/components/detail/media-gallery";
import { type ArticleHeading, prepareArticleHtml } from "@/lib/article-html";
import { clean, getPlainText, truncate } from "@/lib/clean";
import { toIsoDate } from "@/lib/dates";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { NewsApiItem } from "../types/news";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const SITE_URL = "https://www.woolwich.ac.ae";
const SITE_NAME = "The Woolwich Institute Dubai";
const RELATED_COUNT = 3;

function articleImage(item: NewsApiItem) {
  return mediaUrl(item.featured_image) ?? clean(item.image) ?? FALLBACK_IMAGE;
}

export function toArticleCard(item: NewsApiItem): Article {
  const summary = getPlainText(item.description);

  return {
    id: item.slug,
    title: item.title,
    excerpt: clean(item.excerpt) ?? (summary ? truncate(summary) : ""),
    category: item.categories?.[0]?.name || "News",
    readingMinutes: prepareArticleHtml(item.description).readingMinutes,
    date: toIsoDate(item.publish_date, item.created_at),
    href: `/news/${item.slug}`,
    image: articleImage(item),
  };
}

export interface NewsStory {
  slug: string;
  title: string;
  category: string | null;
  /** Standfirst for the hero — plain text, trimmed to two lines' worth. */
  standfirst: string;
  /** The CMS models an author as a name and nothing else. */
  author: string | null;
  publishDate: string;
  readingMinutes: number;
  tags: string[];
  /** Sanitized body with anchored headings. */
  html: string;
  headings: ArticleHeading[];
  gallery: GalleryImage[];
  image: string;
  imageAlt: string;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
  openGraphImage: string;
}

function toGallery(item: NewsApiItem): GalleryImage[] {
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

export function normalizeNewsArticle(item: NewsApiItem): NewsStory {
  const { html, headings, readingMinutes } = prepareArticleHtml(
    item.description,
  );
  const summary = getPlainText(item.description);
  const image = articleImage(item);
  const standfirst =
    clean(item.excerpt) ?? (summary ? truncate(summary, 190) : "");

  return {
    slug: item.slug,
    title: item.title,
    category: item.categories?.[0]?.name ?? null,
    standfirst,
    author: clean(item.authors?.[0]?.name),
    publishDate: toIsoDate(item.publish_date, item.created_at),
    readingMinutes,
    tags: (item.tags ?? []).map((tag) => tag.name).filter(Boolean),
    html,
    headings,
    gallery: toGallery(item),
    image,
    imageAlt: mediaAlt(item.featured_image) ?? `${item.title} — ${SITE_NAME}`,
    canonicalUrl: `${SITE_URL}/news/${item.slug}`,
    seoTitle:
      clean(item.meta_tag?.meta_title) ??
      clean(item.meta_tag?.og_title) ??
      `${item.title} | ${SITE_NAME}`,
    seoDescription:
      clean(item.meta_tag?.meta_description) ??
      clean(item.meta_tag?.og_description) ??
      standfirst,
    openGraphImage: mediaUrl(item.meta_tag?.og_image) ?? image,
  };
}

/** Same category first, then the most recent — never the article itself. */
export function getRelatedNewsArticles(
  article: NewsStory,
  items: NewsApiItem[],
): Article[] {
  const candidates = items.filter((item) => item.slug !== article.slug);

  const sameCategory = candidates.filter(
    (item) => (item.categories?.[0]?.name ?? null) === article.category,
  );
  const rest = candidates.filter(
    (item) => (item.categories?.[0]?.name ?? null) !== article.category,
  );

  return [...sameCategory, ...rest].slice(0, RELATED_COUNT).map(toArticleCard);
}
