export interface AmenityItem {
  title: string;
  /** Original icon file, when the CMS actually serves one. */
  src?: string;
  /** The editor's alt text — useful for picking a fallback icon. */
  alt?: string;
}

const CELL =
  /<div[^>]*>\s*<img([^>]*?)>\s*<h4[^>]*>([\s\S]*?)<\/h4>\s*<\/div>/gi;

const attr = (tag: string, name: string) =>
  new RegExp(`${name}="([^"]*)"`, "i").exec(tag)?.[1];

const stripTags = (value: string) =>
  value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

/**
 * Lifts the "icon + heading" cells out of a rich-text blob so they can be
 * rendered by a real component, and returns the HTML with those cells
 * removed so nothing renders twice.
 */
export function extractAmenities(html?: string | null): {
  items: AmenityItem[];
  html: string;
} {
  if (!html) return { items: [], html: "" };

  const items: AmenityItem[] = [];
  let rest = html.replace(CELL, (_match, imgAttrs: string, heading: string) => {
    const title = stripTags(heading);
    if (title) {
      items.push({
        title,
        src: attr(imgAttrs, "src"),
        alt: attr(imgAttrs, "alt"),
      });
    }
    return "";
  });

  if (items.length) {
    // Collapse the wrappers the cells lived in, innermost first.
    for (let i = 0; i < 4; i += 1) {
      rest = rest.replace(/<div[^>]*>\s*<\/div>/gi, "");
    }
    // The heading is rendered by the component now.
    rest = rest.replace(
      /<h4[^>]*>\s*Amenities\s*&(?:amp;)?\s*Facilities\s*<\/h4>/gi,
      "",
    );
  }

  return { items, html: rest };
}