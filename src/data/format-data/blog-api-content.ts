import type { Article } from "@/components/blogs/blog-card";
import { type ArticleHeading, prepareArticleHtml } from "@/lib/article-html";
import { getPlainText, truncate } from "@/lib/clean";
import { toIsoDate } from "@/lib/dates";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { BlogApiItem } from "../types/blogs";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const SITE_URL = "https://www.woolwich.ac.ae";
const RELATED_COUNT = 3;

function articleImage(item: BlogApiItem) {
  return mediaUrl(item.featured_image) ?? item.image ?? FALLBACK_IMAGE;
}

export function toArticleCard(item: BlogApiItem): Article {
  const summary = getPlainText(item.description);

  return {
    id: item.slug,
    title: item.title,
    excerpt: item.excerpt?.trim() || (summary ? truncate(summary) : ""),
    category: item.categories?.[0]?.name || "Guides",
    readingMinutes: prepareArticleHtml(item.description).readingMinutes,
    date: toIsoDate(item.publish_date, item.created_at),
    href: `/blogs/${item.slug}`,
    image: articleImage(item),
  };
}

export interface BlogArticle {
  slug: string;
  title: string;
  summary: string;
  category: string | null;
  categorySlug: string | null;
  tags: string[];
  author: string | null;
  publishDate: string;
  readingMinutes: number;
  /** Sanitized body with anchored headings. */
  html: string;
  headings: ArticleHeading[];
  image: string;
  imageAlt: string;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
  openGraphImage: string;
}

export function normalizeBlogArticle(item: BlogApiItem): BlogArticle {
  const { html, headings, readingMinutes } = prepareArticleHtml(
    item.description,
  );
  const plainText = getPlainText(item.description);
  const summary =
    item.excerpt?.trim() || (plainText ? truncate(plainText, 220) : "");
  const category = item.categories?.[0] ?? null;
  const image = articleImage(item);

  return {
    slug: item.slug,
    title: item.title,
    summary,
    category: category?.name ?? null,
    categorySlug: category?.slug ?? null,
    tags: (item.tags ?? []).map((tag) => tag.name).filter(Boolean),
    author: item.authors?.[0]?.name ?? null,
    publishDate: toIsoDate(item.publish_date, item.created_at),
    readingMinutes,
    html,
    headings,
    image,
    imageAlt: mediaAlt(item.featured_image) ?? "",
    canonicalUrl: `${SITE_URL}/blogs/${item.slug}`,
    seoTitle:
      item.meta_tag?.meta_title ||
      item.meta_tag?.og_title ||
      `${item.title} | The Woolwich Institute Dubai`,
    seoDescription:
      item.meta_tag?.meta_description ||
      item.meta_tag?.og_description ||
      summary,
    openGraphImage: mediaUrl(item.meta_tag?.og_image) ?? image,
  };
}

/** Same category first, then the most recent — never the article itself. */
export function getRelatedBlogArticles(
  article: BlogArticle,
  items: BlogApiItem[],
): Article[] {
  const candidates = items.filter((item) => item.slug !== article.slug);

  const sameCategory = candidates.filter(
    (item) => item.categories?.[0]?.slug === article.categorySlug,
  );
  const rest = candidates.filter(
    (item) => item.categories?.[0]?.slug !== article.categorySlug,
  );

  return [...sameCategory, ...rest].slice(0, RELATED_COUNT).map(toArticleCard);
}
