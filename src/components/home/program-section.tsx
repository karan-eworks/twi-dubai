import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";


export interface ProgrammeCard {
  code: string;
  title: string;
  summary: string;
  award: string;
  duration: string;
  href: string;
  image: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=800&fit=crop&q=80&auto=format`;

const defaultProgrammes: ProgrammeCard[] = [
  {
    code: "BUS",
    title: "Business",
    summary:
      "Management, marketing, and finance foundations, with a placement year across Dubai's commercial sector.",
    award: "Pearson BTEC · Level 4–5",
    duration: "2 years",
    href: "/courses/business",
    image: unsplash("1552664730-d307ca884978"),
  },
  {
    code: "CMP",
    title: "Computing",
    summary:
      "Software development, networks, and data, taught against the tooling teams actually use.",
    award: "Pearson BTEC · Level 4–5",
    duration: "2 years",
    href: "/courses/computing",
    image: unsplash("1517180102446-f3ece451e9d8"),
  },
  {
    code: "HOS",
    title: "Hospitality",
    summary:
      "Operations and service management, with placements across Dubai hotels, venues, and restaurant groups.",
    award: "Pearson BTEC · Level 4–5",
    duration: "2 years",
    href: "/courses/hospitality",
    image: unsplash("1566073771259-6a8506099945"),
  },
  {
    code: "ACC",
    title: "ACCA",
    summary:
      "The full professional accountancy route, from Applied Knowledge through to Strategic Professional.",
    award: "ACCA approved centre",
    duration: "Flexible, evenings available",
    href: "/courses/acca",
    image: unsplash("1554224155-6726b3ff858f"),
  },
];

export function ProgrammeGrid({
  programmes = defaultProgrammes,
}: {
  programmes?: ProgrammeCard[];
}) {
  return (
    <section aria-labelledby="programmes-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Programmes</span>
            <h2
              id="programmes-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Study routes that end somewhere
            </h2>
          </div>

          <ButtonLink href="/courses" intent="tertiary">
            All programmes
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {programmes.map((programme) => (
            <li key={programme.code}>
              <Link
                href={programme.href}
                className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-md p-6 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:min-h-[26rem] sm:p-8"
              >
                <Image
                  src={programme.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />

                {/* Resting scrim */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/45 to-navy-950/10 transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Hover state: the photo goes navy so the type carries the card */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-navy-500/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* The rule from the lockup, sitting above the title block */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-6 h-px origin-left bg-white/40 transition-colors duration-500 group-hover:bg-cannon-400 sm:inset-x-8 sm:top-8"
                />

                <div className="flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <span className="datum text-[11px] uppercase tracking-[0.14em] text-white/65">
                      {programme.code} · {programme.duration}
                    </span>

                    <h3 className="mt-2 font-heading text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl">
                      {programme.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                      {programme.summary}
                    </p>

                    <p className="datum mt-3 text-[11px] uppercase tracking-[0.14em] text-white/55">
                      {programme.award}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-navy-900 transition-[background-color,color,transform] duration-300 group-hover:scale-110 group-hover:bg-cannon-500 group-hover:text-white rtl:-scale-x-100"
                  >
                    <ArrowRight className="size-5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}