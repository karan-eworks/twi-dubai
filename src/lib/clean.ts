import DOMPurify from "isomorphic-dompurify";

export function clean(value: string | number | boolean | null | undefined) {
  const trimmed = String(value ?? "").replace(/\u00a0/g, " ").trim();
  return trimmed ? trimmed : null;
}

export function normalizeBoolean(value: boolean | number | string | null | undefined) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;

  const normalized = clean(value)?.toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

export function sanitizeHtml(html: string | null | undefined): string {
  const cleaned = clean(html);
  if (!cleaned) return "";

  return DOMPurify.sanitize(cleaned, {
    ALLOWED_TAGS: [
      "a",
      "b",
      "blockquote",
      "br",
      "caption",
      "code",
      "div",
      "em",
      "figcaption",
      "figure",
      "h2",
      "h3",
      "h4",
      "img",
      "li",
      "ol",
      "p",
      "span",
      "strong",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
      "ul",
    ],
    ALLOWED_ATTR: [
      "alt",
      "aria-label",
      "caption",
      "colspan",
      "href",
      "rel",
      "rowspan",
      "scope",
      "src",
      "target",
      "title",
    ],
  });
}

export function getPlainText(value: string | null | undefined): string {
  return sanitizeHtml(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
