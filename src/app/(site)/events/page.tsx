import type { Metadata } from "next";
import {
  getEventDisplayData,
} from "@/src/components/sections/events/event-api-content";
import { EventsIndex } from "@/src/components/sections/events/events-index";
import { getEvents } from "@/src/data/fetch/events";

const fallbackOpenGraphImage = "/images/twi-classroom-study.jpg";

export const metadata: Metadata = {
  title: "Events | The Woolwich Institute Dubai",
  description:
    "Upcoming open days, workshops, programme briefings, and student events at The Woolwich Institute Dubai.",
  alternates: {
    canonical: "https://www.woolwich.ac.ae/events",
  },
  openGraph: {
    title: "Events at TWI Dubai",
    description:
      "Upcoming open days, workshops, programme briefings, and student events at The Woolwich Institute Dubai.",
    url: "https://www.woolwich.ac.ae/events",
    siteName: "The Woolwich Institute Dubai",
    images: [fallbackOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events at TWI Dubai",
    description:
      "Upcoming open days, workshops, programme briefings, and student events at The Woolwich Institute Dubai.",
    images: [fallbackOpenGraphImage],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.woolwich.ac.ae",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Events",
      item: "https://www.woolwich.ac.ae/events",
    },
  ],
};

export default async function EventsPage() {
  let eventsData;
  try {
    eventsData = await getEvents();
  } catch {
    eventsData = { data: [] };
  }
  const { events, featuredEvent, categories, tags } = getEventDisplayData(
    eventsData.data ?? [],
  );
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Events at TWI Dubai",
    description:
      "Upcoming open days, workshops, programme briefings, and student events at The Woolwich Institute Dubai.",
    url: "https://www.woolwich.ac.ae/events",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: events.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: event.canonicalUrl,
        name: event.title,
      })),
    },
  };

  return (
    <>
      <EventsIndex
        events={events}
        featuredEvent={featuredEvent}
        categories={categories}
        tags={tags}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
