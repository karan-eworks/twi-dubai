import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/blogs/blog-detail-page";
import { getBlogBySlug, getBlogs } from "@/data/api/blogs";
import {
  getRelatedBlogArticles,
  normalizeBlogArticle,
} from "@/data/format-data/blog-api-content";
import type { BlogApiItem } from "@/data/types/blogs";

interface BlogDetailRouteProps {
  params: Promise<{ slug: string }>;
}

async function findArticle(slug: string): Promise<BlogApiItem | null> {
  try {
    return await getBlogBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const blogData = await getBlogs({ perPage: 100 });
    return blogData.data.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const apiArticle = await findArticle(slug);

  if (!apiArticle) {
    return { title: "Article not found | The Woolwich Institute Dubai" };
  }

  const article = normalizeBlogArticle(apiArticle);

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: article.canonicalUrl },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.seoDescription,
      url: article.canonicalUrl,
      siteName: "The Woolwich Institute Dubai",
      publishedTime: article.publishDate,
      authors: article.author ? [article.author] : undefined,
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

export default async function BlogArticlePage({
  params,
}: BlogDetailRouteProps) {
  const { slug } = await params;
  const apiArticle = await findArticle(slug);

  if (!apiArticle) notFound();

  const article = normalizeBlogArticle(apiArticle);

  // A failed list only costs the reader the "keep reading" band.
  const blogData = await getBlogs({ perPage: 24 }).catch(() => null);
  const relatedArticles = getRelatedBlogArticles(article, blogData?.data ?? []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    image: article.openGraphImage,
    datePublished: article.publishDate,
    author: {
      "@type": article.author ? "Person" : "CollegeOrUniversity",
      name: article.author ?? "The Woolwich Institute Dubai",
    },
    publisher: {
      "@type": "CollegeOrUniversity",
      name: "The Woolwich Institute Dubai",
      url: "https://www.woolwich.ac.ae",
    },
    mainEntityOfPage: article.canonicalUrl,
  };

  return (
    <>
      <BlogDetailPage article={article} relatedArticles={relatedArticles} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from typed values, not user markup
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
