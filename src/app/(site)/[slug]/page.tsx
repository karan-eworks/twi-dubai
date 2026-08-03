import { CmsPage } from "@/components/shared/CmsPage";
import { getCmsPageDisplayData, getCmsPageMeta, getPageBySlug, getPages, getPublishedCmsPageStaticParams, isPublishedCmsPage } from "@/data/api/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

async function getDynamicCmsPage(slug: string) {
  if (slug === "about-us") return null;

  const page = await getPageBySlug(slug).catch(() => null);
  return isPublishedCmsPage(page) ? page : null;
}

export async function generateStaticParams() {
  const pages = await getPages().catch(() => ({ data: [] }));
  return getPublishedCmsPageStaticParams(pages.data ?? []);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDynamicCmsPage(slug);

  if (!page) {
    return {
      title: `Page Not Found | The Woolwich College Dubai`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const meta = getCmsPageMeta(page);

  return {
    title: meta.title,
    description: meta.description,
    robots: meta.robots,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export default async function DynamicCmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getDynamicCmsPage(slug);

  if (!page) {
    notFound();
  }

  return <CmsPage page={getCmsPageDisplayData(page)} />;
}
