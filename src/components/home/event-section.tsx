import { ArrowRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventCard from "../cards/event-card";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";

export interface CollegeEvent {
  id: string;
  title: string;
  excerpt: string;
  /** ISO date of the event itself — not the publish timestamp. */
  date: string;
  /** Optional start time, e.g. "18:30". Omit for all-day events. */
  time?: string;
  location: string;
  category: string;
  href: string;
  image: string;
  status?: "upcoming" | "past";
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=900&fit=crop&q=80&auto=format`;

const defaultEvents: CollegeEvent[] = [
  {
    id: "graduation-2026",
    title: "Graduation Day 2026",
    excerpt:
      "The third cohort crosses the stage, with awards for academic excellence and the placement prize.",
    date: "2026-09-18",
    time: "17:00",
    location: "Dubai Knowledge Park",
    category: "Ceremony",
    href: "/events/graduation-2026",
    image: unsplash("1541339907198-e08756dedf3f"),
    status: "upcoming",
  },
  {
    id: "open-day-sep",
    title: "September intake open day",
    excerpt:
      "Tour the campus, sit a sample class, and put your questions to programme leaders and admissions.",
    date: "2026-08-23",
    time: "10:00",
    location: "Campus, Block 2A",
    category: "Open day",
    href: "/events/open-day-september",
    image: unsplash("1454165804606-c3d57bc86b40"),
    status: "upcoming",
  },
  {
    id: "counsellor-meet",
    title: "Counsellor and agent meet",
    excerpt:
      "Progression routes, entry requirements, and an early look at the 2027 scholarship round.",
    date: "2026-08-14",
    time: "14:00",
    location: "Auditorium",
    category: "Partners",
    href: "/events/counsellor-meet",
    image: unsplash("1524178232363-1fb2b075b655"),
    status: "upcoming",
  },
];

export function LatestEvents({
  events = defaultEvents,
}: {
  events?: CollegeEvent[];
}) {
  if (!events.length) return null;

  return (
    <section
      aria-labelledby="events-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">What&apos;s on</span>
            <h2
              id="events-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Events at the institute
            </h2>
          </div>

          <ButtonLink href="/events" intent="secondary">
            All events
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
