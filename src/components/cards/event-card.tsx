import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    time?: string;
    location: string;
    category: string;
    href: string;
    image: string;
    status?: "upcoming" | "past";
  };
}

/** Fixed time zone keeps server and client output identical. */
const fmt = (date: string, opts: Intl.DateTimeFormatOptions) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    ...opts,
  }).format(parsed);
};

function EventCard({ event }: EventCardProps) {
  return (
    <article className="h-full">
      <Link
        href={event.href}
        className="group flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card no-underline transition-[translate,scale,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-[4/3] transform-gpu overflow-hidden bg-navy-900 [contain:paint]">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transform-gpu object-cover [backface-visibility:hidden] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.06]"
          />

          {/* The date block is what makes this an event card */}
          <span className="absolute start-0 top-0 bg-navy-500 px-4 py-3 text-center text-white transition-colors duration-500 group-hover:bg-cannon-500">
            <span className="datum block text-2xl leading-none">
              {fmt(event.date, { day: "2-digit" })}
            </span>
            <span className="datum mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/75">
              {fmt(event.date, { month: "short" })}
            </span>
          </span>

          {event.status === "upcoming" ? (
            <span className="datum absolute end-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-navy-900 backdrop-blur-sm">
              Upcoming
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {event.category} · {fmt(event.date, { year: "numeric" })}
          </span>

          <h3 className="mt-2 font-heading text-2xl font-normal leading-tight tracking-tight text-foreground">
            {event.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {event.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            Event details
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

export default EventCard;
