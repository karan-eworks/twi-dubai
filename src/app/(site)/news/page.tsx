import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogCardSkeletonGrid } from "@/components/blogs/blog-card-skeleton";
import { NewsIndex } from "@/components/news/news-index";

const fallbackOpenGraphImage = "/images/twi-classroom-study.jpg";

export const metadata: Metadata = {
  title: "News & Announcements | The Woolwich Institute Dubai",
  description:
    "Official updates, campus notices, programme announcements, events, and admissions news from The Woolwich Institute Dubai.",
  alternates: {
    canonical: "https://www.woolwich.ac.ae/news",
  },
  openGraph: {
    title: "News & Announcements",
    description:
      "Official updates, campus notices, programme announcements, events, and admissions news from TWI Dubai.",
    url: "https://www.woolwich.ac.ae/news",
    siteName: "The Woolwich Institute Dubai",
    images: [fallbackOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Announcements",
    description:
      "Official updates, campus notices, programme announcements, events, and admissions news from TWI Dubai.",
    images: [fallbackOpenGraphImage],
  },
};

export default function NewsPage() {
  return (
    <Suspense fallback={<BlogCardSkeletonGrid />}>
      <NewsIndex />
    </Suspense>
  );
}
