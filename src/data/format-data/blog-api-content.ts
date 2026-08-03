import type { Article } from "@/components/blogs/blog-card";
import { toIsoDate } from "@/lib/dates";
import type { BlogApiItem } from "../types/blogs";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const WORDS_PER_MINUTE = 200;

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

function estimateReadingMinutes(html: string): number {
  const wordCount = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export function toArticleCard(item: BlogApiItem): Article {
  const description = item.description ?? "";

  return {
    id: item.slug,
    title: item.title,
    excerpt:
      item.excerpt?.trim() ||
      (description ? truncate(stripHtml(description)) : ""),
    category: item.categories?.[0]?.name || "Guides",
    readingMinutes: estimateReadingMinutes(description),
    date: toIsoDate(item.publish_date, item.created_at),
    href: `/blogs/${item.slug}`,
    image: item.featured_image?.location || item.image || FALLBACK_IMAGE,
  };
}
