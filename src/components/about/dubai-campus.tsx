import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";

export interface CampusView {
  id: string;
  label: string;
  /** One line, revealed with the fill on hover. */
  caption?: string;
  image: string;
  href?: string;
}

const unsplash = (id: string, w = 1400, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

const defaultViews: CampusView[] = [
  {
    id: "classes",
    label: "Applied classes",
    caption: "Small cohorts in Block 2A, taught around practical briefs.",
    image: unsplash("1524178232363-1fb2b075b655", 1400, 1600),
  },
  {
    id: "study",
    label: "Collaborative study",
    caption: "Open study floors and bookable group rooms.",
    image: unsplash("1454165804606-c3d57bc86b40"),
  },
  {
    id: "student-life",
    label: "Student life",
    caption: "Societies, workshops, and the careers programme.",
    image: unsplash("1541339907198-e08756dedf3f"),
  },
];

export function CampusGallery({
  views = defaultViews,
}: {
  views?: CampusView[];
}) {
  if (!views.length) return null;

  const [lead, ...rest] = views;

  return (
    <section
      aria-labelledby="campus-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Campus</span>
            <h2
              id="campus-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Inside the Dubai campus
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Dubai Knowledge Park, Block 2A — teaching floors, study space, and
              the places students actually spend their time.
            </p>
          </div>

          <ButtonLink href="/events/open-day-september" intent="secondary">
            Book a campus visit
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        {/* Mosaic: one tall tile, two stacked beside it */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
          <Tile view={lead} className="lg:row-span-2 lg:h-full" tall />
          {rest.map((view) => (
            <Tile key={view.id} view={view} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Tile({
  view,
  className = "",
  tall = false,
}: {
  view: CampusView;
  className?: string;
  tall?: boolean;
}) {
  const shared = `group relative isolate flex transform-gpu items-end overflow-hidden rounded-md bg-navy-900 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] ${
    tall ? "aspect-[4/5] lg:aspect-auto lg:min-h-[34rem]" : "aspect-[16/10]"
  } ${className}`;

  const inner = (
    <>
      <Image
        src={view.image}
        alt=""
        fill
        sizes={
          tall
            ? "(min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1024px) 50vw, 100vw"
        }
        className="-z-20 transform-gpu object-cover [backface-visibility:hidden] transition-[scale] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
      />

      {/* Resting scrim so the label reads on any photo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"
      />

      {/* Navy rises from the bottom on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy-500/90 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-y-100"
      />

      <div className="relative w-full p-5 text-white sm:p-6">
        <span className="datum block text-[11px] uppercase tracking-[0.14em] text-white/65">
          Campus
        </span>

        <p className="mt-1.5 font-heading text-2xl leading-tight tracking-tight sm:text-3xl">
          {view.label}
        </p>

        {/* 0fr → 1fr animates an unknown height with no measuring */}
        {view.caption ? (
          <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="pt-2.5 text-sm leading-6 text-white/80">
                {view.caption}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );

  if (view.href) {
    return (
      <Link
        href={view.href}
        className={`${shared} no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={shared}>{inner}</div>;
}
