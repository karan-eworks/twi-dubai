import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailPage } from "@/components/events/event-detail-page";
import { getEventBySlug, getEvents } from "@/data/api/events";
import {
  getRelatedEvents,
  normalizeEvent,
} from "@/data/format-data/event-api-content";
import type { EventApiItem } from "@/data/types/events";

interface EventRouteProps {
  params: Promise<{ slug: string }>;
}

const SITE_NAME = "The Woolwich Institute Dubai";
const CATALOGUE_SIZE = 100;

async function getCatalogue(): Promise<EventApiItem[]> {
  try {
    const response = await getEvents({ perPage: CATALOGUE_SIZE });
    return response.data ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const catalogue = await getCatalogue();
  return catalogue.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getEventBySlug(slug).catch(() => null);

  if (!match) return { title: `Event not found | ${SITE_NAME}` };

  const event = normalizeEvent(match);

  return {
    title: event.seoTitle,
    description: event.seoDescription,
    alternates: { canonical: event.canonicalUrl },
    openGraph: {
      type: "article",
      title: event.seoTitle,
      description: event.seoDescription,
      url: event.canonicalUrl,
      siteName: SITE_NAME,
      publishedTime: event.publishedOn,
      images: [event.openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: event.seoTitle,
      description: event.seoDescription,
      images: [event.openGraphImage],
    },
  };
}

export default async function EventRoute({ params }: EventRouteProps) {
  const { slug } = await params;

  const [match, catalogue] = await Promise.all([
    getEventBySlug(slug).catch(() => null),
    getCatalogue(),
  ]);

  // Outside any try/catch — notFound() signals by throwing.
  if (!match) notFound();

  const event = normalizeEvent(match);

  return (
    <EventDetailPage
      event={event}
      relatedEvents={getRelatedEvents(event, catalogue)}
    />
  );
}

/* No Event JSON-LD here: schema.org requires `startDate`, and the API's
   `event_date` is the current timestamp on every record. Publishing a wrong
   start date is worse than publishing none — add the block once the CMS
   dates are trustworthy. */
