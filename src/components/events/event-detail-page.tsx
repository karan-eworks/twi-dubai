import EventCard from "@/components/cards/event-card";
import { NeedHelpCard } from "@/components/cards/need-help-card";
import { ArticleBody } from "@/components/detail/article-body";
import { type Fact, FactStrip } from "@/components/detail/fact-strip";
import { MediaGallery } from "@/components/detail/media-gallery";
import { RelatedSection } from "@/components/detail/related-section";
import { ShareActions } from "@/components/detail/share-actions";
import type { CollegeEvent } from "@/components/home/event-section";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";
import type { EventOccasion } from "@/data/format-data/event-api-content";

interface EventDetailPageProps {
  event: EventOccasion;
  relatedEvents: CollegeEvent[];
}

const WHATSAPP_BASE = "https://wa.me/971528983382";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : dateFormatter.format(parsed);
}

export function EventDetailPage({
  event,
  relatedEvents,
}: EventDetailPageProps) {
  const publishedOn = formatDate(event.publishedOn);

  // No event date, time, or upcoming/past status: the API returns the current
  // timestamp in `event_date` for every event, and everything else about the
  // schedule derives from it. The publish date is the one honest date, and it
  // is labelled as such.
  const facts: Fact[] = [];
  if (publishedOn) facts.push({ label: "Published", value: publishedOn });
  if (event.category) facts.push({ label: "Category", value: event.category });
  if (event.venue) facts.push({ label: "Venue", value: event.venue });
  if (event.gallery.length > 0) {
    facts.push({
      label: "Photographs",
      value: String(event.gallery.length),
    });
  }

  const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `Hello, I saw ${event.title} on the TWI Dubai site and would like to know more.`,
  )}`;

  return (
    <main>
      <PageHero
        eyebrow={event.category ?? "Events"}
        title={event.title}
        body={event.standfirst}
        imageSrc={event.image}
        imageAlt={event.imageAlt}
        titleSize="headline"
      />

      <FactStrip facts={facts} label="Event details" id="event-facts" />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-[82rem] gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="min-w-0">
              <ArticleBody html={event.html} className="max-w-[46rem]" />

              <div className="mt-12 border-t border-border pt-8">
                <ShareActions
                  title={event.title}
                  url={event.canonicalUrl}
                  label="Share this event"
                  surface="light"
                />
              </div>
            </div>

            <aside className="min-w-0">
              <NeedHelpCard
                eyebrow="Campus"
                title="Come and see it for yourself"
                body="Admissions can arrange a campus visit, or answer questions about studying at TWI Dubai."
                ctas={[
                  { href: "/apply", label: "Start your application" },
                  {
                    href: whatsappHref,
                    label: "WhatsApp admissions",
                    ariaLabel: `WhatsApp admissions about ${event.title}`,
                  },
                ]}
              />
            </aside>
          </div>
        </Container>
      </section>

      <MediaGallery
        title={event.title}
        images={event.gallery}
        heading="From the day"
      />

      {relatedEvents.length > 0 ? (
        <RelatedSection
          id="more-events"
          title="More from campus"
          deck="Open days, workshops, and ceremonies at The Woolwich Institute Dubai."
          viewAllHref="/events"
          viewAllLabel="All events"
        >
          {relatedEvents.map((related) => (
            <EventCard key={related.id} event={related} />
          ))}
        </RelatedSection>
      ) : null}
    </main>
  );
}
