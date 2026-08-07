"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/cards/event-card";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/data/api/events";
import { toCollegeEvent } from "@/data/format-data/event-api-content";
import type { EventApiItem } from "@/data/types/events";
import { CardSkeletonGrid } from "../shared/card-skeleton";
import { Container } from "../shared/container";
import { EmptyOutline } from "../shared/empty";
import { PagePagination } from "../shared/Pagination";
import PageHero from "../shared/page-hero";
import { SearchFilterBar } from "../shared/searchfilterbar";

const PER_PAGE = 15;
const SEARCH_DEBOUNCE_MS = 400;

export function EventsIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(search);
  const [events, setEvents] = useState<EventApiItem[]>([]);
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

    getEvents({ page, perPage: PER_PAGE, search: search || undefined })
      .then((response) => {
        if (cancelled) return;
        setEvents(response.data ?? []);
        setTotal(response.meta?.total ?? 0);
      })
      .catch(() => {
        if (cancelled) return;
        setEvents([]);
        setTotal(0);
        setError(
          "We couldn't load events right now. Please try again shortly.",
        );
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
        title={"Events at The Woolwich Institute"}
        body={
          "Upcoming open days, workshops, programme briefings, and student events at The Woolwich Institute Dubai."
        }
        imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt={
          "Students attending an event at The Woolwich Institute Dubai."
        }
      />

      <section className="pt-8">
        <SearchFilterBar
          searchLabel="Search events"
          searchPlaceholder="Search events by title or topic..."
          searchQuery={searchInput}
          resultCount={events.length}
          totalCount={total}
          resultLabel="events"
          onSearchChange={setSearchInput}
        />
      </section>

      <section className="pb-20">
        <Container>
          <div className="pt-8">
            {error ? (
              <EmptyOutline
                title="Events are unavailable"
                description={error}
              />
            ) : isLoading ? (
              <CardSkeletonGrid count={PER_PAGE} />
            ) : events.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event.slug} event={toCollegeEvent(event)} />
                ))}
              </div>
            ) : (
              <EmptyOutline
                title="No events match those filters"
                description="Try a broader search term, or clear your search to see every event."
                action={
                  search ? (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setSearchInput("")}
                    >
                      Clear search
                    </Button>
                  ) : null
                }
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
