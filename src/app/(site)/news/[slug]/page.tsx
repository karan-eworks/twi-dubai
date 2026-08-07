// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import {
//   getNewsDisplayData,
//   getRelatedNewsArticles,
//   normalizeNewsArticle,
// } from "@/src/components/sections/news/news-api-content";
// import { NewsDetailPage } from "@/src/components/sections/news/news-detail-page";
// import { getNews, getNewsArticleBySlug } from "@/src/data/fetch/news";

// type NewsDetailRouteProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export async function generateStaticParams() {
//   try {
//     const newsData = await getNews();
//     return newsData.data.map((article) => ({
//       slug: article.slug,
//     }));
//   } catch {
//     return [];
//   }
// }

// export async function generateMetadata({ params }: NewsDetailRouteProps): Promise<Metadata> {
//   const { slug } = await params;

//   let apiArticle;
//   try {
//     apiArticle = await getNewsArticleBySlug(slug);
//   } catch {
//     return { title: "News Article" };
//   }

//   if (!apiArticle) {
//     return {
//       title: "News article not found | The Woolwich Institute Dubai",
//     };
//   }

//   const article = normalizeNewsArticle(apiArticle);

//   return {
//     title: article.seoTitle,
//     description: article.seoDescription,
//     alternates: {
//       canonical: article.canonicalUrl,
//     },
//     openGraph: {
//       type: "article",
//       title: article.seoTitle,
//       description: article.seoDescription,
//       url: article.canonicalUrl,
//       siteName: "The Woolwich Institute Dubai",
//       publishedTime: article.publishDate,
//       authors: [article.author.name],
//       tags: article.tags,
//       images: [article.openGraphImage],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: article.seoTitle,
//       description: article.seoDescription,
//       images: [article.openGraphImage],
//     },
//   };
// }

// export default async function NewsArticlePage({ params }: NewsDetailRouteProps) {
//   const { slug } = await params;

//   let apiArticle;
//   let newsData;
//   try {
//     [apiArticle, newsData] = await Promise.all([
//       getNewsArticleBySlug(slug),
//       getNews(),
//     ]);
//   } catch {
//     notFound();
//   }

//   if (!apiArticle) {
//     notFound();
//   }

//   const article = normalizeNewsArticle(apiArticle);
//   const { articles } = getNewsDisplayData(newsData.data ?? []);
//   const relatedArticles = getRelatedNewsArticles(article, articles);

//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: article.title,
//     description: article.seoDescription,
//     image: article.openGraphImage,
//     datePublished: article.publishDate,
//     dateModified: article.publishDate,
//     author: {
//       "@type": "Organization",
//       name: article.author.name,
//       description: article.author.biography,
//     },
//     publisher: {
//       "@type": "CollegeOrUniversity",
//       name: "The Woolwich Institute Dubai",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://www.woolwich.ac.ae/logo.svg",
//       },
//     },
//     mainEntityOfPage: article.canonicalUrl,
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
//         name: "News",
//         item: "https://www.woolwich.ac.ae/news",
//       },
//       {
//         "@type": "ListItem",
//         position: 3,
//         name: article.title,
//         item: article.canonicalUrl,
//       },
//     ],
//   };

//   return (
//     <>
//       <NewsDetailPage article={article} relatedArticles={relatedArticles} />
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
