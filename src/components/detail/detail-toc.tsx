"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from "@/lib/article-html";
import { cn } from "@/lib/utils";

interface DetailTocProps {
  headings: ArticleHeading[];
  /** Heading of the panel — "In this article", "On this page". */
  label?: string;
}

function TocList({
  headings,
  activeId,
}: {
  headings: ArticleHeading[];
  activeId: string;
}) {
  return (
    <ol className="space-y-0.5">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "location" : undefined}
            className={cn(
              "block border-s-2 py-1.5 pe-2 text-sm leading-6 no-underline transition-colors",
              heading.level === 3 ? "ps-6" : "ps-3",
              activeId === heading.id
                ? "border-cannon-500 text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Tracks which section the reader is in. Headings come from
 * `prepareArticleHtml`, so the ids always exist in the rendered body.
 */
export function DetailToc({
  headings,
  label = "In this article",
}: DetailTocProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={label} className="min-w-0">
      <div className="hidden lg:sticky lg:top-28 lg:block">
        <p className="datum mb-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <TocList headings={headings} activeId={activeId} />
      </div>

      <details className="rounded-md border border-border bg-card p-4 lg:hidden">
        <summary className="datum cursor-pointer text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </summary>
        <div className="mt-3">
          <TocList headings={headings} activeId={activeId} />
        </div>
      </details>
    </nav>
  );
}
