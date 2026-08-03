import { MenuApiItem, NavigationItem, MenuApiDetail, FooterGroup } from "../types/menus";

const SITE_ORIGINS = new Set([
  "https://www.woolwich.ac.ae",
  "https://woolwich.ac.ae",
]);

const EXACT_PATH_REWRITES: Record<string, string> = {
  "/about-us": "/about",
  "/team": "/teams",
  "/business/courses": "/courses/category/business",
  "/computing/courses": "/courses/category/computing",
  "/hospitality/courses": "/courses/category/hospitality",
  "/acca/courses": "/courses/category/acca",
};

function isActiveStatus(status: MenuApiItem["status"]) {
  return status !== false && status !== 0 && status !== "0";
}

function getItemLabel(item: MenuApiItem) {
  return item.label?.trim() || item.title.trim();
}

function stripSiteOrigin(href: string) {
  try {
    const parsed = new URL(href);
    if (!SITE_ORIGINS.has(parsed.origin)) return href;

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return href;
  }
}

export function normalizeMenuHref(item: Pick<MenuApiItem, "href" | "url">) {
  const rawHref = (item.href || item.url || "/").trim();
  const withoutOrigin = stripSiteOrigin(rawHref);
  const path = withoutOrigin.startsWith("/") ? withoutOrigin : `/${withoutOrigin}`;
  const rewrittenPath = EXACT_PATH_REWRITES[path] ?? path;
  const courseMatch = rewrittenPath.match(/^\/course\/([^/?#]+)(.*)$/);

  if (courseMatch) {
    return `/courses/${courseMatch[1]}${courseMatch[2] ?? ""}`;
  }

  return rewrittenPath;
}

function flattenReference(items: NavigationItem[] = []) {
  const references = new Map<string, NavigationItem>();

  for (const item of items) {
    references.set(item.href, item);
    references.set(item.label, item);

    for (const child of item.children ?? []) {
      references.set(child.href, child);
      references.set(child.label, child);
    }
  }

  return references;
}

function normalizeItems(
  items: MenuApiItem[] = [],
  referenceItems: NavigationItem[] = [],
): NavigationItem[] {
  const references = flattenReference(referenceItems);

  return items
    .filter((item) => isActiveStatus(item.status))
    .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => {
      const label = getItemLabel(item);
      const href = normalizeMenuHref(item);
      const reference = references.get(href) ?? references.get(label);
      const children = normalizeItems(item.children ?? [], reference?.children ?? []);

      return {
        label,
        href,
        ...(reference?.description ? { description: reference.description } : {}),
        ...(children.length ? { children } : {}),
      };
    });
}

export function menuToNavigationItems(
  menu: MenuApiDetail | null
) {
  const items = menu?.items ? normalizeItems(menu.items) : [];

  return items.length ? items : [];
}

export function menusToFooterGroups(
  menus: Array<MenuApiDetail | null>,
) {
  const groups = menus
    .filter((menu): menu is MenuApiDetail => !!menu)
    .map((menu) => {
      const seen = new Set<string>();
      const links = normalizeItems(menu.items ?? [])
        .filter((link) => {
          if (seen.has(link.href)) return false;
          seen.add(link.href);
          return true;
        });

      return {
        title: menu.title,
        links,
      };
    })
    .filter((group) => group.links.length);

  return groups.length ? groups : [];
}
