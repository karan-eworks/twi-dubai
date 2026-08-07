import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../shared/container";

export interface Pathway {
  label: string;
  title: string;
  body: string;
  href: string;
  image: string;
  /** Alt text for the tile image. Empty string when it is purely decorative. */
  imageAlt?: string;
  ctaLabel?: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=1400&fit=crop&q=80&auto=format`;

const defaultPathways: Pathway[] = [
  {
    label: "Admissions",
    title: "How to apply",
    body: "Entry requirements, documents, and intake dates — the whole route from first enquiry to a confirmed place.",
    href: "/apply",
    image: unsplash("1454165804606-c3d57bc86b40"),
    imageAlt: "",
    ctaLabel: "Start an application",
  },
  {
    label: "Funding",
    title: "Scholarships",
    body: "Merit and need-based awards of up to 50%, plus instalment plans for every programme we run.",
    href: "/scholarships",
    image: unsplash("1541339907198-e08756dedf3f"),
    imageAlt: "",
    ctaLabel: "See what you qualify for",
  },
];

export function JourneyPathways({
  pathways = defaultPathways,
}: {
  pathways?: Pathway[];
}) {
  return (
    <section
      aria-labelledby="journey-heading"
      className="pb-20 sm:pb-24 lg:pb-28"
    >
      {/* Full-bleed band, inner content on the same container grid as every
          other section. Extra bottom padding leaves room for the tiles to
          overlap into it. */}
      <div className="bg-navy-500 pb-32 pt-16 text-white sm:pb-36 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-invert">
              September 2026 intake
            </span>
            <h2
              id="journey-heading"
              className="mt-4 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl"
            >
              Your journey starts here
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-navy-200">
              Two routes into the institute: how the application works, and how
              to pay for it.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <ul className="relative z-10 -mt-20 grid gap-6 md:grid-cols-2 sm:-mt-24">
          {pathways.map((pathway) => (
            <li key={pathway.href}>
              <Link
                href={pathway.href}
                className="group relative isolate flex min-h-[24rem] items-end overflow-hidden rounded-md no-underline transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:min-h-[28rem] lg:min-h-[32rem]"
              >
                <Image
                  src={pathway.image}
                  alt={pathway.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                />

                {/* Resting scrim, so the panel never sits on bare photo */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/5"
                />

                <div className="relative w-full p-6 sm:p-8">
                  {/* The panel's own background is the fill. It starts at the
                      panel's exact box and expands past every edge of the tile,
                      which clips it. No measuring needed. */}
                  <div className="relative max-w-md p-6 before:absolute before:inset-0 before:-z-10 before:bg-navy-500/95 before:transition-[inset] before:duration-700 before:ease-[cubic-bezier(0.32,0.72,0,1)] before:content-[''] group-hover:before:-inset-[200%] sm:p-8">
                    <span className="eyebrow eyebrow-invert">
                      {pathway.label}
                    </span>

                    <h3 className="mt-3 font-heading text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl">
                      {pathway.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                      {pathway.body}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white">
                      {pathway.ctaLabel ?? "Learn more"}
                      <span className="grid size-8 place-items-center rounded-sm border border-white/40 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-cannon-500 group-hover:bg-cannon-500">
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
