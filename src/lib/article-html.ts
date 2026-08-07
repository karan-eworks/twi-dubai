import { getPlainText, sanitizeHtml } from "./clean";
import { type NormalizeOptions, normalizeCmsHtml } from "./normalizeCmsHtml";
import { slugify } from "./slugfy";

export interface ArticleHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface PreparedArticle {
  /** Sanitized markup, with a stable id on every h2 and h3. */
  html: string;
  /** Drives the table of contents; empty when the body has no headings. */
  headings: ArticleHeading[];
  readingMinutes: number;
}

const WORDS_PER_MINUTE = 200;
const HEADING_PATTERN = /<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi;

function headingText(inner: string) {
  return inner
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Turns a CMS rich-text blob into what a detail page needs: safe markup,
 * anchorable headings, and an honest reading estimate. The CMS strips ids,
 * so they are added after sanitizing rather than trusted from the content.
 */
export function prepareArticleHtml(
  raw: string | null | undefined,
  options?: NormalizeOptions,
): PreparedArticle {
  const sanitized = sanitizeHtml(normalizeCmsHtml(raw, options));

  if (!sanitized) return { html: "", headings: [], readingMinutes: 0 };

  const headings: ArticleHeading[] = [];
  const usedIds = new Map<string, number>();

  const html = sanitized.replace(
    HEADING_PATTERN,
    (match, tag: string, attributes: string, inner: string) => {
      const title = headingText(inner);
      if (!title) return match;

      const base = slugify(title) || "section";
      const seen = usedIds.get(base) ?? 0;
      usedIds.set(base, seen + 1);
      const id = seen === 0 ? base : `${base}-${seen + 1}`;

      headings.push({
        id,
        title,
        level: tag.toLowerCase() === "h3" ? 3 : 2,
      });

      return `<${tag} id="${id}"${attributes}>${inner}</${tag}>`;
    },
  );

  const words = getPlainText(sanitized).split(/\s+/).filter(Boolean).length;

  return {
    html,
    headings,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}
