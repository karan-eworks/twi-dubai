import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CoursesIndex } from "@/components/courses/courses-index";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton";
import {
  getCourseCategoryBySlug,
  getVisibleCourseCategories,
} from "@/data/api/course-departments";
import type { CourseDepartmentApiItem } from "@/data/types/course-departments";
import { mediaUrl } from "@/lib/media";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/** Only active, unhidden departments get a page — hidden ones 404. */
async function findCategory(
  slug: string,
): Promise<CourseDepartmentApiItem | null> {
  try {
    return await getCourseCategoryBySlug(slug);
  } catch {
    return null;
  }
}

function categoryDescription(category: CourseDepartmentApiItem) {
  return (
    category.meta_tag?.meta_description ||
    category.meta_tag?.og_description ||
    `Explore the ${category.name} programmes at The Woolwich Institute Dubai — qualifications, duration, and intakes for every course in the department.`
  );
}

export async function generateStaticParams() {
  try {
    const categories = await getVisibleCourseCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(slug);

  if (!category) {
    return { title: "Programmes | The Woolwich Institute Dubai" };
  }

  const title =
    category.meta_tag?.meta_title ||
    category.meta_tag?.og_title ||
    `${category.name} Programmes | The Woolwich Institute Dubai`;
  const description = categoryDescription(category);
  const url = `https://www.woolwich.ac.ae/courses/category/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "The Woolwich Institute Dubai",
      images: [mediaUrl(category.meta_tag?.og_image) ?? FALLBACK_HERO_IMAGE],
    },
  };
}

export default async function CourseCategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = await findCategory(slug);

  if (!category) notFound();

  return (
    <Suspense
      fallback={<CardSkeletonGrid count={9} mediaClassName="aspect-16/10" />}
    >
      <CoursesIndex
        departmentId={category.id}
        title={`${category.name} Programmes`}
        body={categoryDescription(category)}
        imageSrc={mediaUrl(category.meta_tag?.og_image) ?? FALLBACK_HERO_IMAGE}
        imageAlt={`Students on a ${category.name} programme at The Woolwich Institute Dubai.`}
      />
    </Suspense>
  );
}
