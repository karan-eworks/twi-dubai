/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: markup is sanitized by prepareArticleHtml */

import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  /** Output of `prepareArticleHtml` — never a raw CMS string. */
  html: string;
  className?: string;
}

/**
 * The reading column for every detail page. `.prose-cms` owns size, leading,
 * and colour; the scroll margin keeps anchored headings clear of the header.
 */
export function ArticleBody({ html, className }: ArticleBodyProps) {
  if (!html) return null;

  return (
    <div
      className={cn(
        "prose-cms [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
