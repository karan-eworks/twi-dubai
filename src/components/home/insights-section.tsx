import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";

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

const unsplash = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

const defaultArticles: Article[] = [
  {
    id: "btec-level-3",
    title: "BTEC Level 3 in Dubai: entry requirements and where it leads",
    excerpt:
      "What the qualification actually is, how it is assessed without final exams, and which university routes accept it.",
    category: "Qualifications",
    readingMinutes: 8,
    date: "2026-07-01",
    href: "/blog/btec-level-3-dubai",
    image: unsplash("1454165804606-c3d57bc86b40", 1400, 900),
  },
  {
    id: "vocational-examples",
    title: "BTEC, HND, or diploma — which one fits you?",
    excerpt:
      "The three routes side by side, with the entry points and exit points for each.",
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
  {
    id: "student-visa",
    title: "Student visas in the UAE: documents, timelines, and costs",
    excerpt:
      "The paperwork sequence for international students, and how long each stage takes.",
    category: "Admissions",
    readingMinutes: 6,
    date: "2026-06-04",
    href: "/blog/uae-student-visa",
    image: unsplash("1517245386807-bb43f82c33c4"),
  },
];

/** Fixed time zone keeps server and client output identical. */
const fmtDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function Insights({
  articles = defaultArticles,
}: {
  articles?: Article[];
}) {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <section
      aria-labelledby="insights-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
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

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_minmax(0,1fr)] lg:gap-16">
          {/* Lead article */}
          <article>
            <Link
              href={lead.href}
              className="group block no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-navy-900 [contain:paint]">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="transform-gpu object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
                />
              </div>

              <p className="datum mt-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {lead.category} · {lead.readingMinutes} min read
              </p>

              <h3 className="mt-3 max-w-2xl font-heading text-3xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-cannon-600 sm:text-4xl">
                {lead.title}
              </h3>

              <p className="mt-4 max-w-prose text-base leading-7 text-muted-foreground">
                {lead.excerpt}
              </p>

              <p className="datum mt-5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <time dateTime={lead.date}>{fmtDate(lead.date)}</time>
              </p>
            </Link>
          </article>

          {/* Recent list */}
          <div>
            <h3 className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              More guides
            </h3>

            <ul className="mt-4 border-t border-border">
              {rest.map((article) => (
                <li key={article.id} className="border-b border-border">
                  <Link
                    href={article.href}
                    className="group relative flex items-start gap-5 py-5 no-underline transition-colors duration-300 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 start-0 w-0.5 origin-center scale-y-0 bg-cannon-500 transition-transform duration-300 ease-out group-hover:scale-y-100"
                    />

                    <span className="relative ms-3 hidden aspect-square w-20 shrink-0 overflow-hidden rounded-sm bg-navy-900 [contain:paint] sm:block">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="transform-gpu object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.08]"
                      />
                    </span>

                    <span className="min-w-0 ps-3 sm:ps-0">
                      <span className="datum block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {article.category} · {article.readingMinutes} min read
                      </span>

                      <span className="mt-1.5 block text-base font-semibold leading-6 text-foreground transition-colors duration-300 group-hover:text-cannon-600">
                        {article.title}
                      </span>

                      <span className="mt-1.5 block text-sm leading-6 text-muted-foreground">
                        {article.excerpt}
                      </span>
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
