import { apiFetch } from "@/lib/api";
import type { CourseDepartmentListApiResponse, CourseDepartmentApiItem } from "../types/course-departments";


interface GetCourseDepartmentsOptions {
  search?: string | null;
}

export async function getCoursesCategories(options: GetCourseDepartmentsOptions = {}) {
  const query = new URLSearchParams();

  if (options.search) {
    query.set("search", options.search);
  }

  const endpoint =
    query.size > 0
      ? `/course-departments?${query.toString()}`
      : "/course-departments";

  return apiFetch<CourseDepartmentListApiResponse>(endpoint);
}


export function isVisibleCourseCategory(category: CourseDepartmentApiItem) {
  return category.status !== false && category.hidden !== true;
}

export async function getVisibleCourseCategories() {
  const categories = await getCoursesCategories();

  return (categories.data ?? []).filter(isVisibleCourseCategory);
}

export async function getCourseCategoryBySlug(
  slug: string,
): Promise<CourseDepartmentApiItem | null> {
  const canonicalSlug = slug;
  const categories = await getVisibleCourseCategories();

  return (
    categories.find((category: CourseDepartmentApiItem) => category.slug === canonicalSlug) ?? null
  );
}
