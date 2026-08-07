"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchFilterOption {
  label: string;
  value: string;
}

interface SearchFilterBarProps {
  searchLabel: string;
  searchPlaceholder: string;
  searchQuery: string;
  resultCount: number;
  totalCount: number;
  resultLabel: string;
  onSearchChange: (query: string) => void;
  /** Chip row. Rendered only when both options and a handler are supplied. */
  filterLabel?: string;
  filterOptions?: SearchFilterOption[];
  activeFilter?: string | null;
  onFilterChange?: (value: string | null) => void;
  /** Label for the chip that clears the filter. */
  allFilterLabel?: string;
  className?: string;
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "datum shrink-0 cursor-pointer rounded-sm border px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isActive
          ? "border-navy-500 bg-navy-500 text-white"
          : "border-border bg-card text-muted-foreground hover:border-navy-300 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function SearchFilterBar({
  searchLabel,
  searchPlaceholder,
  searchQuery,
  resultCount,
  totalCount,
  resultLabel,
  onSearchChange,
  filterLabel,
  filterOptions = [],
  activeFilter = null,
  onFilterChange,
  allFilterLabel = "All",
  className,
}: SearchFilterBarProps) {
  const showFilters = filterOptions.length > 0 && Boolean(onFilterChange);

  return (
    <div
      className={cn(
        "relative z-20 border-b border-border bg-background/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto w-full min-w-0 max-w-[118rem] px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
              className="w-full rounded-sm border border-border bg-card py-2.5 ps-10 pe-9 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-border-strong focus:border-navy-500 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-search-cancel-button]:hidden"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-cannon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          {/* aria-live so the count is announced when filtering changes it */}
          <p
            aria-live="polite"
            className="datum shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            Showing{" "}
            <span className="font-medium text-foreground">{resultCount}</span>{" "}
            of {totalCount} {resultLabel}
          </p>
        </div>

        {showFilters ? (
          <fieldset
            className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-1"
            aria-label={filterLabel}
          >
            <FilterChip
              label={allFilterLabel}
              isActive={activeFilter === null}
              onClick={() => onFilterChange?.(null)}
            />

            {filterOptions.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                isActive={option.value === activeFilter}
                onClick={() =>
                  onFilterChange?.(
                    option.value === activeFilter ? null : option.value,
                  )
                }
              />
            ))}
          </fieldset>
        ) : null}
      </div>
    </div>
  );
}
