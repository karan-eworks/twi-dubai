import { apiFetch } from "@/lib/api";
import type { CourseDepartmentApiItem } from "../types/course-departments";
import type {
  FooterGroup,
  MenuApiDetail,
  MenuDetailApiResponse,
  MenuListApiResponse,
  NavigationItem,
} from "../types/menus";
import {
  getCoursesCategories,
  isVisibleCourseCategory,
} from "./course-departments";
import {
  menusToFooterGroups,
  menuToNavigationItems,
} from "./menu-normalization";

const MENU_FETCH_OPTIONS = {
  next: {
    revalidate: 3600,
    tags: ["menus"],
  },
};

const FOOTER_MENU_SLUGS = ["study-courses", "others", "quick-links"];

function isMenuApiDetail(value: unknown): value is MenuApiDetail {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<MenuApiDetail>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string"
  );
}

export async function getMenus() {
  return apiFetch<MenuListApiResponse>("/menus", MENU_FETCH_OPTIONS);
}

export async function getMenuBySlug(
  slug: string,
): Promise<MenuApiDetail | null> {
  const response = await apiFetch<MenuDetailApiResponse>(
    `/menus/${encodeURIComponent(slug)}`,
    MENU_FETCH_OPTIONS,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isMenuApiDetail(candidate) ? candidate : null;
}

function courseCategoryToNavigationItem(
  category: CourseDepartmentApiItem,
): NavigationItem {
  return {
    label: category.name,
    href: `/courses/category/${category.slug}`,
  };
}

function replaceStudyCoursesWithCategories(
  groups: FooterGroup[],
  categories: CourseDepartmentApiItem[],
) {
  const categoryLinks = categories
    .filter(isVisibleCourseCategory)
    .map(courseCategoryToNavigationItem);

  if (!categoryLinks.length) return groups;

  return groups.map((group) =>
    group.title === "Study & Courses"
      ? {
          ...group,
          links: categoryLinks,
        }
      : group,
  );
}

export async function getLayoutMenus() {
  try {
    const [mainMenu, belowFooterMenu, courseCategories, ...footerMenus] =
      await Promise.all([
        getMenuBySlug("main-menu"),
        getMenuBySlug("below-footer"),
        getCoursesCategories(),
        ...FOOTER_MENU_SLUGS.map((slug) => getMenuBySlug(slug)),
      ]);
    const resolvedFooterGroups = menusToFooterGroups(footerMenus);

    return {
      primaryNavigation: menuToNavigationItems(mainMenu),
      footerGroups: replaceStudyCoursesWithCategories(
        resolvedFooterGroups,
        courseCategories.data ?? [],
      ),
      bottomNavigation: menuToNavigationItems(belowFooterMenu),
    };
  } catch {
    return {
      primaryNavigation: [],
      footerGroups: [],
      bottomNavigation: [],
    };
  }
}
