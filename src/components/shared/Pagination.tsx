/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PagePaginationProps {
  totalItems: number;
  currentPage: number;
  /** Items the caller fetches per page — must match the API's `per_page`. */
  itemsPerPage?: number;
  /** Search param key to read/write the page number under. */
  pageParam?: string;
}

export function PagePagination({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  pageParam = "page",
}: PagePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAdjacentPages = 2;

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const startRange = Math.max(2, currentPage - showAdjacentPages);
    const endRange = Math.min(totalPages - 1, currentPage + showAdjacentPages);

    // Add ellipsis if needed before range
    if (startRange > 2) {
      pages.push("...");
    }

    // Add page numbers in range
    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed after range
    if (endRange < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if more than 1 page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParam, String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!canGoPrevious}
        className="h-10 w-10 rounded-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => (
          <div key={`${page}-${index}`}>
            {page === "..." ? (
              <span className="px-2 text-muted-foreground">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(page as number)}
                className={`h-10 w-10 rounded-lg ${
                  currentPage === page
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : ""
                }`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!canGoNext}
        className="h-10 w-10 rounded-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
