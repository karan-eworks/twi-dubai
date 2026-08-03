import type { Metadata } from "next";
import { NewsIndex } from "@/src/components/sections/news/news-index";
import { getNewsDisplayData } from "@/src/components/sections/news/news-api-content";
import { getNews } from "@/src/data/fetch/news";

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
      name: "News",
      item: "https://www.woolwich.ac.ae/news",
    },
  ],
};

export default async function NewsPage() {
  let newsData;
  try {
    newsData = await getNews();
  } catch {
    newsData = { data: [] };
  }
  const { articles, featuredArticle, categories, tags } = getNewsDisplayData(
    newsData.data ?? [],
  );
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Announcements",
    description:
      "Official updates, campus notices, programme announcements, events, and admissions news from The Woolwich Institute Dubai.",
    url: "https://www.woolwich.ac.ae/news",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: article.canonicalUrl,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <NewsIndex
        articles={articles}
        featuredArticle={featuredArticle}
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
