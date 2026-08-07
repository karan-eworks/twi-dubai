import type { Article } from "@/components/blogs/blog-card";
import { BlogCard } from "@/components/blogs/blog-card";
import { ArticleBody } from "@/components/detail/article-body";
import {
  DetailHero,
  type DetailHeroMeta,
} from "@/components/detail/detail-hero";
import { DetailToc } from "@/components/detail/detail-toc";
import { ReadingProgress } from "@/components/detail/reading-progress";
import { RelatedSection } from "@/components/detail/related-section";
import { ShareActions } from "@/components/detail/share-actions";
import { Container } from "@/components/shared/container";
import type { BlogArticle } from "@/data/format-data/blog-api-content";

interface BlogDetailPageProps {
  article: BlogArticle;
  relatedArticles: Article[];
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : dateFormatter.format(parsed);
}

export function BlogDetailPage({
  article,
  relatedArticles,
}: BlogDetailPageProps) {
  const publishedOn = formatDate(article.publishDate);

  const meta: DetailHeroMeta[] = [];
  if (article.category) {
    meta.push({ label: "Category", value: article.category });
  }
  if (publishedOn) {
    meta.push({
      label: "Published",
      value: <time dateTime={article.publishDate}>{publishedOn}</time>,
    });
  }
  if (article.author) {
    meta.push({ label: "Written by", value: article.author });
  }
  meta.push({
    label: "Reading time",
    value: `${article.readingMinutes} min`,
  });

  return (
    <main>
      <ReadingProgress />

      <DetailHero
        backHref="/blogs"
        backLabel="All articles"
        title={article.title}
        meta={meta}
        tags={article.tags}
        imageSrc={article.image}
        imageAlt={article.imageAlt}
        actions={
          <ShareActions
            title={article.title}
            url={article.canonicalUrl}
            label="Share this article"
          />
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
            <DetailToc headings={article.headings} />

            <article className="min-w-0">
              <ArticleBody html={article.html} className="max-w-[46rem]" />
            </article>
          </div>
        </Container>
      </section>

      {/* No CTA band here — the admissions aside covers the in-read moment and
          the site layout closes every page with the admissions desk. */}
      {relatedArticles.length > 0 ? (
        <RelatedSection
          title="Keep reading"
          deck="Admissions guidance, student life, and career routes connected to this topic."
          viewAllHref="/blogs"
          viewAllLabel="All articles"
        >
          {relatedArticles.map((relatedArticle) => (
            <BlogCard key={relatedArticle.id} article={relatedArticle} />
          ))}
        </RelatedSection>
      ) : null}
    </main>
  );
}
