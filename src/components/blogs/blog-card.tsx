import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Whole minutes. Rendered as "8 min read". */
  readingMinutes: number;
  /** ISO publish date. */
  date: string;
  href: string;
  image: string;
}

interface BlogCardProps {
  article: Article;
}

const fmtDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="h-full">
      <Link
        href={article.href}
        className="group flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card no-underline transition-[translate,scale,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-[16/10] transform-gpu overflow-hidden bg-navy-900 [contain:paint]">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transform-gpu object-cover [backface-visibility:hidden] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
          />

          <span className="datum absolute start-3 top-3 rounded-sm bg-navy-900/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-navy-900 backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <time dateTime={article.date}>{fmtDate(article.date)}</time> ·{" "}
            {article.readingMinutes} min read
          </span>

          <h3 className="mt-3 font-heading text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            {article.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {article.excerpt}
          </p>

          <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            Read the guide
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
