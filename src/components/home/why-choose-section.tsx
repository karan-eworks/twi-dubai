import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";


export interface Advantage {
  label: string;
  title: string;
  body: string;
  href: string;
  image: string;
  /** "overlay" sits the caption inside the image, "bar" drops it underneath. */
  caption?: "overlay" | "bar";
}

const unsplash = (id: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

const defaultAdvantages: Advantage[] = [
  {
    label: "Awarding",
    title: "UK accredited degrees",
    body: "Awarded through UK bodies and recognised by employers and universities internationally.",
    href: "/about/accreditation",
    image: unsplash("1507003211169-0a1dd7228f2d"),
    caption: "overlay",
  },
  {
    label: "Placement",
    title: "Industry integration",
    body: "Placements and live briefs with multinationals operating out of Dubai, built into the timetable.",
    href: "/student-services/careers",
    image: unsplash("1522071820081-009f0129c71c", 1200, 900),
    caption: "bar",
  },
  {
    label: "Teaching",
    title: "Expert faculty",
    body: "Taught by people who have worked in the sector, in classes small enough for them to know your name.",
    href: "/team",
    image: unsplash("1524178232363-1fb2b075b655"),
    caption: "overlay",
  },
];

/** Vertical offsets that stagger the row on large screens. */
const offsetClass = ["lg:mt-0", "lg:mt-16", "lg:mt-8"];

export function WhyChoose({
  advantages = defaultAdvantages,
}: {
  advantages?: Advantage[];
}) {
  return (
    <section aria-labelledby="why-choose-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Woolwich</span>
            <h2
              id="why-choose-heading"
              className="mt-4 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              More than a degree — a route into{" "}
              <em className="font-serif italic">the work itself</em>
            </h2>
          </div>

          <ButtonLink href="/about" intent="secondary">
            About the institute
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {advantages.map((item, index) => {
            const isBar = item.caption === "bar";

            return (
              <li key={item.title} className={offsetClass[index % offsetClass.length]}>
                <Link
                  href={item.href}
                  className="group block no-underline transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <div
                    className={`relative overflow-hidden rounded-md bg-navy-900 ${
                      isBar ? "aspect-[4/3]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />

                    {/* Keeps the photo from washing out behind an overlaid caption */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                    />

                    {!isBar ? (
                      <div className="absolute inset-x-0 bottom-0">
                        <Caption item={item} />
                      </div>
                    ) : null}
                  </div>

                  {isBar ? <Caption item={item} rounded /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function Caption({ item, rounded = false }: { item: Advantage; rounded?: boolean }) {
  return (
    <div
      className={`flex items-end justify-between gap-4 bg-navy-500 p-5 text-white transition-colors duration-500 group-hover:bg-cannon-500 ${
        rounded ? "mt-1 rounded-md" : ""
      }`}
    >
      <div className="min-w-0">
        <span className="datum text-[11px] uppercase tracking-[0.14em] text-white/65 transition-colors duration-500 group-hover:text-white/80">
          {item.label}
        </span>
        <h3 className="mt-1.5 font-heading text-2xl font-normal leading-tight tracking-tight">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75 transition-colors duration-500 group-hover:text-white/85">
          {item.body}
        </p>
      </div>

      <ArrowRight
        aria-hidden="true"
        className="mb-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
      />
    </div>
  );
}