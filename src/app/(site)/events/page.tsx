import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsIndex } from "@/components/events/events-index";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton";

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

export default function EventsPage() {
  return (
    <Suspense fallback={<CardSkeletonGrid count={15} />}>
      <EventsIndex />
    </Suspense>
  );
}
