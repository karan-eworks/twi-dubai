import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";

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

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=800&fit=crop&q=80&auto=format`;

const defaultArticles: Article[] = [
  {
    id: "btec-level-3",
    title: "BTEC Level 3 in Dubai: entry requirements and where it leads",
    excerpt:
      "What the qualification is, how it is assessed without final exams, and which university routes accept it.",
    category: "Qualifications",
    readingMinutes: 8,
    date: "2026-07-01",
    href: "/blog/btec-level-3-dubai",
    image: unsplash("1454165804606-c3d57bc86b40"),
  },
  {
    id: "vocational-examples",
    title: "BTEC, HND, or diploma — which one fits you?",
    excerpt:
      "The three routes side by side, with the entry points and exit points for each one.",
    category: "Choosing a course",
    readingMinutes: 8,
    date: "2026-06-26",
    href: "/blog/vocational-qualification-examples",
    image: unsplash("1541339907198-e08756dedf3f"),
  },
  {
    id: "grading-system",
    title: "The BTEC grading system explained: pass, merit, distinction",
    excerpt:
      "How grades are calculated across units, and what they convert to in UCAS points.",
    category: "Assessment",
    readingMinutes: 11,
    date: "2026-06-18",
    href: "/blog/btec-grading-system",
    image: unsplash("1524178232363-1fb2b075b655"),
  },
];

/** Fixed time zone keeps server and client output identical. */
const fmtDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export function InsightsSections({ articles = defaultArticles }: { articles?: Article[] }) {
  if (!articles.length) return null;

  return (
    <section aria-labelledby="insights-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Guides</span>
            <h2
              id="insights-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Admissions, explained
            </h2>
          </div>

          <ButtonLink href="/blog" intent="secondary">
            All articles
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
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

                    <span className="datum absolute start-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-navy-900 backdrop-blur-sm">
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}