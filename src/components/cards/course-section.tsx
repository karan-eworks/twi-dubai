import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";

export interface Course {
  id: string;
  title: string;
  /** Short subject area, shown as the image chip. */
  subject: string;
  summary: string;
  /** Awarding body and level, e.g. "Pearson BTEC · Level 5". */
  award: string;
  duration: string;
  /** Comma-separated intake months, e.g. "September, January". */
  intakes: string;
  /** What it leads to — the question every course card should answer. */
  progression: string;
  href: string;
  image: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=800&fit=crop&q=80&auto=format`;

const defaultCourses: Course[] = [
  {
    id: "hnd-business",
    title: "BTEC HND in Business",
    subject: "Business",
    summary:
      "Management, marketing, and finance at the level of the first two years of a UK degree.",
    award: "Pearson BTEC · Level 5",
    duration: "18–24 months",
    intakes: "September, January",
    progression: "Final-year top-up at a UK university",
    href: "/courses/hnd-business",
    image: unsplash("1454165804606-c3d57bc86b40"),
  },
  {
    id: "level-3-business",
    title: "BTEC Level 3 in Business",
    subject: "Business",
    summary:
      "A foundation route for students entering from a non-UK curriculum, assessed by coursework.",
    award: "Pearson BTEC · Level 3",
    duration: "14–16 months",
    intakes: "September, January, April",
    progression: "Year one of an undergraduate degree",
    href: "/courses/level-3-business",
    image: unsplash("1524178232363-1fb2b075b655"),
  },
  {
    id: "acca",
    title: "ACCA Professional",
    subject: "Accounting",
    summary:
      "Applied Knowledge through to Strategic Professional, with evening sessions for students already working.",
    award: "ACCA approved centre",
    duration: "Up to 36 months",
    intakes: "Rolling",
    progression: "ACCA membership and practising certificate",
    href: "/courses/acca",
    image: unsplash("1541339907198-e08756dedf3f"),
  },
];

export function CourseCards({ courses = defaultCourses }: { courses?: Course[] }) {
  if (!courses.length) return null;

  return (
    <section aria-labelledby="courses-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Programmes</span>
            <h2
              id="courses-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Study routes that end somewhere
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Every programme names the qualification, the intake, and what it
              progresses into.
            </p>
          </div>

          <ButtonLink href="/courses" intent="secondary">
            All programmes
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.id}>
              <article className="h-full">
                <Link
                  href={course.href}
                  className="group flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card no-underline transition-[translate,scale,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <div className="relative aspect-[16/10] transform-gpu overflow-hidden bg-navy-900 [contain:paint]">
                    <Image
                      src={course.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="transform-gpu object-cover [backface-visibility:hidden] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
                    />

                    <span className="datum absolute start-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-navy-900 backdrop-blur-sm">
                      {course.subject}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-cannon-600">
                      {course.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {course.summary}
                    </p>

                    {/* The specs a prospective student is actually scanning for */}
                    {/* <dl className="mt-5 border-t border-border text-sm">
                      <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
                        <dt className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          Award
                        </dt>
                        <dd className="text-end text-[13px] font-medium text-foreground">
                          {course.award}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
                        <dt className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          Duration
                        </dt>
                        <dd className="datum text-end text-[13px] text-foreground">
                          {course.duration}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
                        <dt className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          Intakes
                        </dt>
                        <dd className="datum text-end text-[13px] text-foreground">
                          {course.intakes}
                        </dd>
                      </div>
                    </dl> */}

                    {/* <p className="mt-4 border-s-2 border-cannon-500 ps-3 text-[13px] leading-5 text-muted-foreground">
                      <span className="datum block text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Progresses to
                      </span>
                      <span className="mt-1 block text-foreground">
                        {course.progression}
                      </span>
                    </p> */}

                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-cannon-600">
                      View programme
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