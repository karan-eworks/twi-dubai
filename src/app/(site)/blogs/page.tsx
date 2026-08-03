import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogCardSkeletonGrid } from "@/components/blogs/blog-card-skeleton";
import { BlogIndex } from "@/components/blogs/blog-index";

const fallbackOpenGraphImage = "/images/twi-classroom-study.jpg";

export const metadata: Metadata = {
  title: "The Woolwich Blog | The Woolwich Institute Dubai",
  description:
    "Insights, student stories, career guidance, academic resources, and industry perspectives from The Woolwich Institute Dubai.",
  alternates: {
    canonical: "https://www.woolwich.ac.ae/blogs",
  },
  openGraph: {
    title: "The Woolwich Blog",
    description:
      "Education insights, student stories, career guidance, and academic resources from TWI Dubai.",
    url: "https://www.woolwich.ac.ae/blogs",
    siteName: "The Woolwich Institute Dubai",
    images: [fallbackOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Woolwich Blog",
    description:
      "Education insights, student stories, career guidance, and academic resources from TWI Dubai.",
    images: [fallbackOpenGraphImage],
  },
};

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogCardSkeletonGrid />}>
      <BlogIndex />
    </Suspense>
  );
}
