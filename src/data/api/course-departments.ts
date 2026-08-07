import { apiFetch } from "@/lib/api";
import type {
  CourseDepartmentApiItem,
  CourseDepartmentListApiResponse,
} from "../types/course-departments";

interface GetCourseDepartmentsOptions {
  search?: string | null;
  perPage?: number;
}

export async function getCoursesCategories(
  options: GetCourseDepartmentsOptions = {},
) {
  const query = new URLSearchParams();

  if (options.search) query.set("search", options.search);
  if (options.perPage) query.set("per_page", String(options.perPage));

  const queryString = query.toString();

  return apiFetch<CourseDepartmentListApiResponse>(
    queryString ? `/course-departments?${queryString}` : "/course-departments",
  );
}

/** A department is offered to visitors only while it is active and unhidden. */
export function isVisibleCourseCategory(category: CourseDepartmentApiItem) {
  return category.status !== false && category.hidden !== true;
}

export async function getVisibleCourseCategories() {
  const categories = await getCoursesCategories({ perPage: 100 });

  return (categories.data ?? []).filter(isVisibleCourseCategory);
}

export async function getCourseCategoryBySlug(
  slug: string,
): Promise<CourseDepartmentApiItem | null> {
  const categories = await getVisibleCourseCategories();

  return categories.find((category) => category.slug === slug) ?? null;
}
