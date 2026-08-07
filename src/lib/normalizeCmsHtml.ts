/**
 * Cleans rich-text coming out of the CMS before it is injected.
 *
 * These are stopgaps for content that is already damaged in the database —
 * fix the import so new content doesn't need them. Nothing here sanitizes
 * for security: run DOMPurify (or equivalent) as well, see below.
 */
export interface NormalizeOptions {
  /**
   * Origin that serves CMS uploads, e.g. "https://cms.woolwich.ac.ae".
   * Relative /uploads paths are rewritten against it — without this they
   * resolve against the Next app and 404.
   */
  mediaBaseUrl?: string;
  /**
   * Whether a table's first row may be promoted into `<thead>`. True for
   * article prose, where editors habitually forget the header. False for
   * content whose tables are plain lists — course module tables open on a
   * real module, and promoting it would hide a row inside the header band.
   */
  promoteTableHeader?: boolean;
}

export function normalizeCmsHtml(
  raw?: string | null,
  {
    mediaBaseUrl = process.env.NEXT_PUBLIC_CMS_MEDIA_URL,
    promoteTableHeader = true,
  }: NormalizeOptions = {},
): string {
  if (!raw) return "";

  let html = raw.trim();

  // Double-escaped entities: a stored "&amp;nbsp;" renders as the literal
  // text "&nbsp;" on the page.
  if (/&amp;(nbsp|amp|lt|gt|quot|apos|#\d+);/i.test(html)) {
    html = html.replace(/&amp;(?=[a-z]+;|#\d+;)/gi, "&");
  }

  // Non-breaking spaces behave badly at the end of a paragraph and stop
  // normal wrapping mid-sentence.
  html = html.replace(/&nbsp;/gi, " ");

  // Paragraph breaks lost during import leave sentences fused:
  // "in the heart of Dubai.Established by a team".
  // Only fires on lowercase-or-digit + period + uppercase, so "e.g." and
  // decimals are untouched. Abbreviations like "U.S.Dept" would be split —
  // check your content if you use them.
  html = html.replace(/([a-z0-9)\]])\.([A-Z])/g, "$1. $2");
  html = html.replace(/([a-z0-9)\]])\?([A-Z])/g, "$1? $2");

  // Editors leave these behind constantly and they show up as blank gaps.
  html = html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");

  // Inline styles and classes from pasted Word/Docs content fight the
  // typeset stylesheet — strip them and let the theme win.
  html = html.replace(/\s(style|class)="[^"]*"/gi, "");

  // Media still points at the old site's paths. Rewrite root-relative
  // uploads onto the CMS origin so the files actually resolve.
  if (mediaBaseUrl) {
    const base = mediaBaseUrl.replace(/\/$/, "");
    html = html.replace(
      /(<(?:img|source|video|a)\b[^>]*?\s(?:src|href)=")(\/(?:uploads|media|files)\/)/gi,
      `$1${base}$2`,
    );
  }

  // CMS tables often ship the header row as plain <td> inside <tbody>,
  // which leaves the styled <thead> band empty. Promote the first row
  // when a table has no thead of its own.
  if (promoteTableHeader) {
    html = html.replace(
      /<table\b([^>]*)>\s*(?:<tbody[^>]*>\s*)?(<tr[\s\S]*?<\/tr>)/gi,
      (match, attrs: string, firstRow: string) => {
        if (/<thead/i.test(match)) return match;
        const headerRow = firstRow
          .replace(/<td\b/gi, "<th")
          .replace(/<\/td>/gi, "</th>");
        return `<table${attrs}><thead>${headerRow}</thead><tbody>`;
      },
    );
  }

  // Wide tables get a scroll container so they can exceed the prose
  // measure without pushing the page sideways.
  html = html
    .replace(/<table\b/gi, '<div class="table-scroll"><table')
    .replace(/<\/table>/gi, "</table></div>");

  // CMS images bypass next/image, so give them the loading hints by hand.
  html = html.replace(
    /<img\b(?![^>]*\bloading=)/gi,
    '<img loading="lazy" decoding="async"',
  );

  return html;
}
