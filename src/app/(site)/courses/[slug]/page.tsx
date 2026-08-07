import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/courses/course-detail-page";
import { getCourses } from "@/data/api/courses";
import { getFormBySlug } from "@/data/api/forms";
import {
  courseOptions,
  normalizeEnrolForm,
} from "@/data/format-data/apply-form";
import {
  getSimilarCourses,
  normalizeCourse,
} from "@/data/format-data/course-api-content";
import type { CourseApiItem } from "@/data/types/courses";

interface CourseRouteProps {
  params: Promise<{ slug: string }>;
}

const SITE_NAME = "The Woolwich Institute Dubai";
/** The API exposes no per-slug endpoint, so the whole catalogue is fetched once. */
const CATALOGUE_SIZE = 100;

async function getCatalogue(): Promise<CourseApiItem[]> {
  try {
    const response = await getCourses({ perPage: CATALOGUE_SIZE });
    return response.data ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const catalogue = await getCatalogue();
  return catalogue.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: CourseRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const catalogue = await getCatalogue();
  const match = catalogue.find((course) => course.slug === slug);

  if (!match) return { title: `Programme not found | ${SITE_NAME}` };

  const course = normalizeCourse(match);

  return {
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: { canonical: course.canonicalUrl },
    openGraph: {
      title: course.seoTitle,
      description: course.seoDescription,
      url: course.canonicalUrl,
      siteName: SITE_NAME,
      images: [course.openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: course.seoTitle,
      description: course.seoDescription,
      images: [course.openGraphImage],
    },
  };
}

export default async function CourseRoute({ params }: CourseRouteProps) {
  const { slug } = await params;

  const [catalogue, form] = await Promise.all([
    getCatalogue(),
    getFormBySlug("enrol").catch(() => null),
  ]);

  const match = catalogue.find((course) => course.slug === slug);
  // Outside any try/catch — notFound() signals by throwing.
  if (!match) notFound();

  const course = normalizeCourse(match);
  const applyForm = form
    ? {
        config: normalizeEnrolForm(form),
        courseOptions: courseOptions(catalogue),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD, not markup
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.seoDescription,
            url: course.canonicalUrl,
            image: course.openGraphImage,
            provider: {
              "@type": "CollegeOrUniversity",
              name: SITE_NAME,
              url: "https://www.woolwich.ac.ae",
            },
          }),
        }}
      />
      <CourseDetailPage
        course={course}
        similarCourses={getSimilarCourses(match, catalogue)}
        applyForm={applyForm}
      />
    </>
  );
}
