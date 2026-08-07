// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import {
//   getEventDisplayData,
//   getRelatedEvents,
//   normalizeEvent,
// } from "@/src/components/sections/events/event-api-content";
// import { EventDetailPage } from "@/src/components/sections/events/event-detail-page";
// import { getEventBySlug, getEvents } from "@/src/data/fetch/events";

// type EventDetailRouteProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export async function generateStaticParams() {
//   try {
//     const eventsData = await getEvents();
//     return eventsData.data.map((event) => ({
//       slug: event.slug,
//     }));
//   } catch {
//     return [];
//   }
// }

// export async function generateMetadata({ params }: EventDetailRouteProps): Promise<Metadata> {
//   const { slug } = await params;

//   let apiEvent;
//   try {
//     apiEvent = await getEventBySlug(slug);
//   } catch {
//     return { title: "Event" };
//   }

//   if (!apiEvent) {
//     return {
//       title: "Event not found | The Woolwich Institute Dubai",
//     };
//   }

//   const event = normalizeEvent(apiEvent);

//   return {
//     title: event.seoTitle,
//     description: event.seoDescription,
//     alternates: {
//       canonical: event.canonicalUrl,
//     },
//     openGraph: {
//       type: "article",
//       title: event.seoTitle,
//       description: event.seoDescription,
//       url: event.canonicalUrl,
//       siteName: "The Woolwich Institute Dubai",
//       publishedTime: event.startDate,
//       tags: event.tags,
//       images: [event.openGraphImage],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: event.seoTitle,
//       description: event.seoDescription,
//       images: [event.openGraphImage],
//     },
//   };
// }

// export default async function EventDetailRoute({ params }: EventDetailRouteProps) {
//   const { slug } = await params;

//   let apiEvent;
//   let eventsData;
//   try {
//     [apiEvent, eventsData] = await Promise.all([
//       getEventBySlug(slug),
//       getEvents(),
//     ]);
//   } catch {
//     notFound();
//   }

//   if (!apiEvent) {
//     notFound();
//   }

//   const event = normalizeEvent(apiEvent);
//   const { events } = getEventDisplayData(eventsData.data ?? []);
//   const relatedEvents = getRelatedEvents(event, events);
//   const eventSchema = {
//     "@context": "https://schema.org",
//     "@type": "Event",
//     name: event.title,
//     description: event.seoDescription,
//     image: event.openGraphImage,
//     startDate: event.startDate,
//     ...(event.endDate ? { endDate: event.endDate } : {}),
//     eventStatus: "https://schema.org/EventScheduled",
//     eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
//     location: {
//       "@type": "Place",
//       name: event.venueName,
//       address: event.venueAddress ?? event.venueName,
//     },
//     organizer: {
//       "@type": "CollegeOrUniversity",
//       name: "The Woolwich Institute Dubai",
//       url: "https://www.woolwich.ac.ae",
//     },
//     url: event.canonicalUrl,
//     ...(event.formUrl
//       ? {
//           offers: {
//             "@type": "Offer",
//             url: event.formUrl,
//             availability: "https://schema.org/InStock",
//             price: "0",
//             priceCurrency: "AED",
//           },
//         }
//       : {}),
//   };
//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: "https://www.woolwich.ac.ae",
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: "Events",
//         item: "https://www.woolwich.ac.ae/events",
//       },
//       {
//         "@type": "ListItem",
//         position: 3,
//         name: event.title,
//         item: event.canonicalUrl,
//       },
//     ],
//   };

//   return (
//     <>
//       <EventDetailPage event={event} relatedEvents={relatedEvents} />
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
//       />
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//       />
//     </>
//   );
// }

export default function Page() {
  return <div>Page</div>;
}
