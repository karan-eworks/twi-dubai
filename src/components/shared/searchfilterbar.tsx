"use client";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

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
  className?: string;
}

export function SearchFilterBar({
  searchLabel,
  searchPlaceholder,
  searchQuery,
  resultCount,
  totalCount,
  resultLabel,
  onSearchChange,
  className,
}: SearchFilterBarProps) {
  return (
    <div
      className={cn(
        "relative z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto w-full min-w-0 max-w-[118rem] px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
              className="w-full rounded-[8px] border border-[var(--border)] bg-white py-2.5 pl-10 pr-9 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--brand-teal-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal-soft)]"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className="shrink-0 text-sm text-[var(--muted)]">
            {`Showing ${resultCount} of ${totalCount} ${resultLabel}`}
          </p>
        </div>
      </div>
    </div>
  );
}
