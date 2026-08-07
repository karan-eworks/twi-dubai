import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "../shared/container";

interface RelatedSectionProps {
  id?: string;
  title: string;
  deck?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Cards. Rendered into the grid — one child per item. */
  children: ReactNode;
}

/**
 * Closing band shared by every detail page: what to read, attend, or study
 * next. Renders nothing when the caller has no items to show.
 */
export function RelatedSection({
  id = "related",
  title,
  deck,
  viewAllHref,
  viewAllLabel = "View all",
  children,
}: RelatedSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t border-border bg-stone-50 py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              id={`${id}-heading`}
              className="font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              {title}
            </h2>
            {deck ? (
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {deck}
              </p>
            ) : null}
          </div>

          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground no-underline transition-colors hover:text-cannon-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {viewAllLabel}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </Container>
    </section>
  );
}
