import { apiFetch } from "@/lib/api";
import type { CourseListApiResponse, CourseApiItem } from "../types/courses";

interface GetCoursesOptions {
  search?: string | null;
  departmentId?: string | number | null;
}

function withQuery(
  endpoint: string,
  params: Record<string, string | number | null | undefined| boolean>,
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") continue;
    query.set(key, String(value));
  }

  const queryString = query.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

export async function getCourses(options: GetCoursesOptions = {}) {
  return apiFetch<CourseListApiResponse>(
    withQuery("/courses", {
      search: options.search,
      departmentId: options.departmentId,
      active:true,
    }),
  );
}

export async function getCourseBySlug(slug: string): Promise<CourseApiItem | null> {
  const courses = await getCourses();

  return courses.data.find((course: CourseApiItem) => course.slug === slug) ?? null;
}
