import DOMPurify from "isomorphic-dompurify";

export function clean(value: string | number | boolean | null | undefined) {
  const trimmed = String(value ?? "")
    .replace(/\u00a0/g, " ")
    .trim();
  return trimmed ? trimmed : null;
}

export function normalizeBoolean(
  value: boolean | number | string | null | undefined,
) {
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
      "h5",
      "h6",
      "hr",
      "i",
      // normalizeCmsHtml drops every iframe that is not a YouTube embed before
      // this runs, so nothing else can reach the page through this tag.
      "iframe",
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
      "allow",
      "allowfullscreen",
      "alt",
      "aria-label",
      "caption",
      // normalizeCmsHtml strips every authored class before adding its own
      // wrappers, so the only classes that survive are ours.
      "class",
      "colspan",
      // normalizeCmsHtml writes these onto every CMS image and embed; without
      // them on the allowlist DOMPurify strips the hints straight back off.
      "decoding",
      "href",
      "loading",
      "rel",
      "rowspan",
      "scope",
      "src",
      "target",
      "title",
    ],
  });
}

/** Cuts on a word boundary so a summary never ends mid-word. */
export function truncate(text: string, maxLength = 140): string {
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  const body =
    lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped;

  return `${body.replace(/[,;:.\s]+$/, "")}…`;
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
