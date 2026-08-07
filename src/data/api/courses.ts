import { apiFetch } from "@/lib/api";
import type { CourseApiItem, CourseListApiResponse } from "../types/courses";

export interface GetCoursesParams {
  page?: number;
  perPage?: number;
  search?: string;
  /** Department id — the API filters on `department_id`, not on slug or name. */
  departmentId?: string | number | null;
  /** Only programmes the institute currently runs. */
  active?: boolean;
}

export async function getCourses(params: GetCoursesParams = {}) {
  const { page, perPage, search, departmentId, active = true } = params;

  const query = new URLSearchParams();
  if (page) query.set("page", String(page));
  if (perPage) query.set("per_page", String(perPage));
  if (search) query.set("search", search);
  if (departmentId) query.set("department_id", String(departmentId));
  if (active) query.set("active", "true");

  const queryString = query.toString();

  return apiFetch<CourseListApiResponse>(
    queryString ? `/courses?${queryString}` : "/courses",
  );
}

/** The API has no per-slug course endpoint, so the list is matched instead. */
export async function getCourseBySlug(
  slug: string,
): Promise<CourseApiItem | null> {
  const courses = await getCourses({ perPage: 100 });

  return courses.data.find((course) => course.slug === slug) ?? null;
}
