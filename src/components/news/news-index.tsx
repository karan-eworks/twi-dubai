"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blogs/blog-card";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton";
import { Button } from "@/components/ui/button";
import { getNews } from "@/data/api/news";
import { toArticleCard } from "@/data/format-data/news-api-content";
import type { NewsApiItem } from "@/data/types/news";
import { Container } from "../shared/container";
import { EmptyOutline } from "../shared/empty";
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

      <section className="pt-8">
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

      <section className="pb-20">
        <Container>
          <div className="pt-8">
            {error ? (
              <EmptyOutline title="News is unavailable" description={error} />
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
            ) : search ? (
              <EmptyOutline
                title="No news matches that search"
                description="Try a broader term, or clear the search to see every update."
                action={
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setSearchInput("")}
                  >
                    Clear search
                  </Button>
                }
              />
            ) : (
              <EmptyOutline
                title="No news published yet"
                description="Announcements and campus updates appear here as soon as they are published. Please check back shortly."
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
