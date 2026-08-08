import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailPage } from "@/components/news/news-detail-page";
import { getNews, getNewsArticleBySlug } from "@/data/api/news";
import {
  getRelatedNewsArticles,
  normalizeNewsArticle,
} from "@/data/format-data/news-api-content";
import type { NewsApiItem } from "@/data/types/news";

interface NewsRouteProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://www.woolwich.ac.ae";
const SITE_NAME = "The Woolwich Institute Dubai";
const CATALOGUE_SIZE = 100;

async function getCatalogue(): Promise<NewsApiItem[]> {
  try {
    const response = await getNews({ perPage: CATALOGUE_SIZE });
    return response.data ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const catalogue = await getCatalogue();
  return catalogue.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getNewsArticleBySlug(slug).catch(() => null);

  if (!match) return { title: `News article not found | ${SITE_NAME}` };

  const article = normalizeNewsArticle(match);

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: article.canonicalUrl },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.seoDescription,
      url: article.canonicalUrl,
      siteName: SITE_NAME,
      publishedTime: article.publishDate,
      tags: article.tags,
      images: [article.openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.openGraphImage],
    },
  };
}

export default async function NewsRoute({ params }: NewsRouteProps) {
  const { slug } = await params;

  const [match, catalogue] = await Promise.all([
    getNewsArticleBySlug(slug).catch(() => null),
    getCatalogue(),
  ]);

  // Outside any try/catch — notFound() signals by throwing.
  if (!match) notFound();

  const article = normalizeNewsArticle(match);

  // Unlike events, `publish_date` here is a real editorial date, so the
  // article schema can state one honestly.
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.seoDescription,
      image: article.openGraphImage,
      datePublished: article.publishDate,
      dateModified: article.publishDate,
      ...(article.author
        ? { author: { "@type": "Person", name: article.author } }
        : {}),
      publisher: {
        "@type": "CollegeOrUniversity",
        name: SITE_NAME,
        url: SITE_URL,
      },
      mainEntityOfPage: article.canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "News",
          item: `${SITE_URL}/news`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: article.canonicalUrl,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD, not markup
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NewsDetailPage
        article={article}
        relatedArticles={getRelatedNewsArticles(article, catalogue)}
      />
    </>
  );
}
