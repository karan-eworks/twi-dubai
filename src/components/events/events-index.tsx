"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/cards/event-card";
import { getEvents } from "@/data/api/events";
import { toCollegeEvent } from "@/data/format-data/event-api-content";
import type { EventApiItem } from "@/data/types/events";
import { Container } from "../shared/container";
import { PagePagination } from "../shared/Pagination";
import PageHero from "../shared/page-hero";
import { SearchFilterBar } from "../shared/searchfilterbar";
import { EventCardSkeletonGrid } from "./event-card-skeleton";

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

      <section className="bg-[var(--surface)]">
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
              <EventCardSkeletonGrid count={PER_PAGE} />
            ) : events.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event.slug} event={toCollegeEvent(event)} />
                ))}
              </div>
            ) : (
              <div className="rounded-[12px] border border-[var(--border)] bg-white p-8 text-center sm:p-12">
                <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[var(--brand-navy)]">
                  No events match those filters
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
                  Try a broader search term or clear your search.
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
