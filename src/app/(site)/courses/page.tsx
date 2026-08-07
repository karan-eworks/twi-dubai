import type { Metadata } from "next";
import { Suspense } from "react";
import { CoursesIndex } from "@/components/courses/courses-index";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton";

const fallbackOpenGraphImage = "/images/twi-classroom-study.jpg";

const description =
  "Browse TWI Dubai's KHDA-licensed qualifications, from BTEC diplomas to HNDs and professional certifications, filtered by department.";

export const metadata: Metadata = {
  title: "Programmes | The Woolwich Institute Dubai",
  description,
  alternates: {
    canonical: "https://www.woolwich.ac.ae/courses",
  },
  openGraph: {
    title: "Programmes at TWI Dubai",
    description,
    url: "https://www.woolwich.ac.ae/courses",
    siteName: "The Woolwich Institute Dubai",
    images: [fallbackOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programmes at TWI Dubai",
    description,
    images: [fallbackOpenGraphImage],
  },
};

export default function CoursesPage() {
  return (
    <Suspense
      fallback={<CardSkeletonGrid count={9} mediaClassName="aspect-16/10" />}
    >
      <CoursesIndex />
    </Suspense>
  );
}
