"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseCard from "@/components/cards/course-card";
import { Button } from "@/components/ui/button";
import { getVisibleCourseCategories } from "@/data/api/course-departments";
import { getCourses } from "@/data/api/courses";
import type { CourseApiItem } from "@/data/types/courses";
import { CardSkeletonGrid } from "../shared/card-skeleton";
import { Container } from "../shared/container";
import { EmptyOutline } from "../shared/empty";
import { PagePagination } from "../shared/Pagination";
import PageHero from "../shared/page-hero";
import type { SearchFilterOption } from "../shared/searchfilterbar";
import { SearchFilterBar } from "../shared/searchfilterbar";

const PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 400;
/** Matches the course card's media ratio. */
const SKELETON_MEDIA = "aspect-16/10";

const DEFAULT_HERO = {
  title: "Programmes at The Woolwich Institute",
  body: "KHDA-licensed BTEC diplomas, higher national diplomas, and professional certifications, taught in Dubai and built around UK progression routes.",
  imageSrc:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "Students studying at The Woolwich Institute Dubai.",
};

interface CoursesIndexProps {
  /** Locks the list to one department and hides the department filter. */
  departmentId?: number | string | null;
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function CoursesIndex({
  departmentId = null,
  title = DEFAULT_HERO.title,
  body = DEFAULT_HERO.body,
  imageSrc = DEFAULT_HERO.imageSrc,
  imageAlt = DEFAULT_HERO.imageAlt,
}: CoursesIndexProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isScoped = departmentId !== null && departmentId !== undefined;

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  // A scoped list ignores the URL: its department comes from the route itself.
  const department = isScoped
    ? String(departmentId)
    : searchParams.get("department");

  const [searchInput, setSearchInput] = useState(search);
  const [departments, setDepartments] = useState<SearchFilterOption[]>([]);
  const [courses, setCourses] = useState<CourseApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Only departments that are active and unhidden may be offered as filters.
  useEffect(() => {
    if (isScoped) return;

    let cancelled = false;

    getVisibleCourseCategories()
      .then((visibleDepartments) => {
        if (cancelled) return;
        setDepartments(
          visibleDepartments
            .map((item) => ({ label: item.name, value: String(item.id) }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        );
      })
      .catch(() => {
        if (!cancelled) setDepartments([]);
      });

    return () => {
      cancelled = true;
    };
  }, [isScoped]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getCourses({
      page,
      perPage: PER_PAGE,
      search: search || undefined,
      departmentId: department,
    })
      .then((response) => {
        if (cancelled) return;
        setCourses(response.data ?? []);
        setTotal(response.meta?.total ?? 0);
      })
      .catch(() => {
        if (cancelled) return;
        setCourses([]);
        setTotal(0);
        setError(
          "We couldn't load programmes right now. Please try again shortly.",
        );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, search, department]);

  // Debounce typed search input into the `search` URL param, resetting to page 1.
  useEffect(() => {
    if (searchInput === search) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [searchInput, search, pathname, router, searchParams]);

  const handleDepartmentChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("department", value);
    } else {
      params.delete("department");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push(pathname, { scroll: false });
  };

  const hasFilters = Boolean(search) || (!isScoped && Boolean(department));

  return (
    <main>
      <PageHero
        title={title}
        body={body}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />

      <section className="pt-8">
        <SearchFilterBar
          searchLabel="Search programmes"
          searchPlaceholder="Search programmes by name or subject..."
          searchQuery={searchInput}
          resultCount={courses.length}
          totalCount={total}
          resultLabel="programmes"
          onSearchChange={setSearchInput}
          filterLabel="Filter by department"
          filterOptions={isScoped ? [] : departments}
          activeFilter={isScoped ? null : department}
          onFilterChange={isScoped ? undefined : handleDepartmentChange}
          allFilterLabel="All departments"
        />
      </section>

      <section className="pb-20">
        <Container>
          <div className="pt-8">
            {error ? (
              <EmptyOutline
                title="Programmes are unavailable"
                description={error}
              />
            ) : isLoading ? (
              <CardSkeletonGrid
                count={PER_PAGE}
                mediaClassName={SKELETON_MEDIA}
              />
            ) : courses.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : hasFilters ? (
              <EmptyOutline
                title="No programmes match those filters"
                description="Try a broader search term, or clear the filters to see more programmes."
                action={
                  <Button variant="outline" size="lg" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <EmptyOutline
                title="No programmes listed yet"
                description="Programmes appear here as soon as they are published. Please check back shortly."
              />
            )}

            {!isLoading && !error && total > 0 ? (
              <div className="mt-10">
                <PagePagination
                  totalItems={total}
                  currentPage={page}
                  itemsPerPage={PER_PAGE}
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
