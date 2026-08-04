// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import {
//   getBlogDisplayData,
//   getRelatedBlogArticles,
//   normalizeBlogArticle,
// } from "@/src/components/sections/blog/blog-api-content";
// import { getBlogBySlug, getBlogs } from "@/src/data/fetch/blogs";
// import { BlogDetailPage } from "@/src/components/sections/blog/blog-detail-page";

// type BlogDetailRouteProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export async function generateStaticParams() {
//   try {
//     const blogData = await getBlogs();
//     return blogData.data.map((article) => ({
//       slug: article.slug,
//     }));
//   } catch {
//     return [];
//   }
// }

// export async function generateMetadata({ params }: BlogDetailRouteProps): Promise<Metadata> {
//   const { slug } = await params;

//   let apiArticle;
//   try {
//     apiArticle = await getBlogBySlug(slug);
//   } catch {
//     return { title: "Blog Article" };
//   }

//   if (!apiArticle) {
//     return {
//       title: "Article not found | The Woolwich Institute Dubai",
//     };
//   }

//   const article = normalizeBlogArticle(apiArticle);

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

// export default async function BlogArticlePage({ params }: BlogDetailRouteProps) {
//   const { slug } = await params;

//   let apiArticle;
//   let blogData;
//   try {
//     [apiArticle, blogData] = await Promise.all([
//       getBlogBySlug(slug),
//       getBlogs(),
//     ]);
//   } catch {
//     notFound();
//   }

//   if (!apiArticle) {
//     notFound();
//   }

//   const article = normalizeBlogArticle(apiArticle);
//   const { articles } = getBlogDisplayData(blogData.data ?? []);
//   const relatedArticles = getRelatedBlogArticles(article, articles);
//   const faqBlock = article.content.find((block) => block.type === "faq");

//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@type": "Article",
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

//   const authorSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: article.author.name,
//     description: article.author.biography,
//     url: "https://www.woolwich.ac.ae",
//   };

//   const faqSchema =
//     faqBlock?.type === "faq"
//       ? {
//         "@context": "https://schema.org",
//         "@type": "FAQPage",
//         mainEntity: faqBlock.items.map((item) => ({
//           "@type": "Question",
//           name: item.question,
//           acceptedAnswer: {
//             "@type": "Answer",
//             text: item.answer,
//           },
//         })),
//       }
//       : null;

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
//         name: "Blog",
//         item: "https://www.woolwich.ac.ae/blogs",
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
//       <BlogDetailPage article={article} relatedArticles={relatedArticles} />
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
//       />
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
//       />
//       {faqSchema ? (
//         <script
//           type="application/ld+json"
//           suppressHydrationWarning
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//         />
//       ) : null}
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//       />
//     </>
//   );
// }


export default function Page() {
  return (
    <div>Page</div>
  )
}
