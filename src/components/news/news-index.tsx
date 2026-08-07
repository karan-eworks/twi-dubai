"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blogs/blog-card";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton";
import { getNews } from "@/data/api/news";
import { toArticleCard } from "@/data/format-data/news-api-content";
import type { NewsApiItem } from "@/data/types/news";
import { Container } from "../shared/container";
import { PagePagination } from "../shared/Pagination";
import PageHero from "../shared/page-hero";
import { SearchFilterBar } from "../shared/searchfilterbar";

const PER_PAGE = 15;
const SEARCH_DEBOUNCE_MS = 400;

export function NewsIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(search);
  const [articles, setArticles] = useState<NewsApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getNews({ page, perPage: PER_PAGE, search: search || undefined })
      .then((response) => {
        if (cancelled) return;
        setArticles(response.data ?? []);
        setTotal(response.meta?.total ?? 0);
      })
      .catch(() => {
        if (cancelled) return;
        setArticles([]);
        setTotal(0);
        setError("We couldn't load news right now. Please try again shortly.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, search]);

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

  return (
    <main>
      <PageHero
        title={"News & Announcements"}
        body={
          "Official updates, campus notices, programme announcements, events, and admissions news from The Woolwich Institute Dubai."
        }
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt={
          "Students reading news updates at The Woolwich Institute Dubai."
        }
      />

      <section className="bg-[var(--surface)]">
        <SearchFilterBar
          searchLabel="Search news"
          searchPlaceholder="Search news by title or topic..."
          searchQuery={searchInput}
          resultCount={articles.length}
          totalCount={total}
          resultLabel="articles"
          onSearchChange={setSearchInput}
        />
      </section>

      <section className="bg-[var(--surface)] pb-20">
        <Container>
          <div className="pt-8">
            {error ? (
              <div className="rounded-[12px] border border-[var(--border)] bg-white p-8 text-center sm:p-12">
                <p className="text-base leading-7 text-[var(--muted)]">
                  {error}
                </p>
              </div>
            ) : isLoading ? (
              <CardSkeletonGrid
                count={PER_PAGE}
                mediaClassName="aspect-16/10"
              />
            ) : articles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <BlogCard
                    key={article.slug}
                    article={toArticleCard(article)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[12px] border border-[var(--border)] bg-white p-8 text-center sm:p-12">
                <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[var(--brand-navy)]">
                  {search ? "No news match those filters" : "No news yet"}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
                  {search
                    ? "Try a broader search term or clear your search."
                    : "Check back soon for updates from The Woolwich Institute Dubai."}
                </p>
                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="twi-button twi-button-primary relative mt-7 inline-flex min-h-12 items-center justify-center overflow-hidden rounded-[8px] border px-5 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <span className="twi-button-content">Clear search</span>
                  </button>
                ) : null}
              </div>
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
