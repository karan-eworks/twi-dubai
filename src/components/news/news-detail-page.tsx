import type { Article } from "@/components/blogs/blog-card";
import { BlogCard } from "@/components/blogs/blog-card";
import { ArticleBody } from "@/components/detail/article-body";
import { DetailToc } from "@/components/detail/detail-toc";
import { type Fact, FactStrip } from "@/components/detail/fact-strip";
import { MediaGallery } from "@/components/detail/media-gallery";
import { ReadingProgress } from "@/components/detail/reading-progress";
import { RelatedSection } from "@/components/detail/related-section";
import { ShareActions } from "@/components/detail/share-actions";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";
import type { NewsStory } from "@/data/format-data/news-api-content";

interface NewsDetailPageProps {
  article: NewsStory;
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

export function NewsDetailPage({
  article,
  relatedArticles,
}: NewsDetailPageProps) {
  const publishedOn = formatDate(article.publishDate);

  const facts: Fact[] = [];
  if (publishedOn) {
    facts.push({
      label: "Published",
      value: <time dateTime={article.publishDate}>{publishedOn}</time>,
    });
  }
  if (article.author) {
    facts.push({ label: "Written by", value: article.author });
  }
  facts.push({
    label: "Reading time",
    value: `${article.readingMinutes} min`,
  });
  if (article.gallery.length > 0) {
    facts.push({
      label: "Photographs",
      value: String(article.gallery.length),
    });
  }

  return (
    <main>
      <ReadingProgress />

      <PageHero
        eyebrow={article.category ?? "News"}
        title={article.title}
        body={article.standfirst}
        imageSrc={article.image}
        imageAlt={article.imageAlt}
        titleSize="headline"
      />

      <FactStrip facts={facts} label="Article details" id="article-facts" />

      <section className="py-16 sm:py-20">
        <Container>
          {/* Read surface: the rail carries the contents, not an admissions
              pitch. The footer already closes every page with that. */}
          <div className="mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
            <DetailToc headings={article.headings} label="In this article" />

            <article className="min-w-0">
              <ArticleBody html={article.html} className="max-w-[46rem]" />

              {article.tags.length > 0 ? (
                <ul className="mt-12 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="datum rounded-sm border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div
                className={`border-t border-border pt-8 ${
                  article.tags.length > 0 ? "mt-8" : "mt-12"
                }`}
              >
                <ShareActions
                  title={article.title}
                  url={article.canonicalUrl}
                  label="Share this article"
                  surface="light"
                />
              </div>
            </article>
          </div>
        </Container>
      </section>

      <MediaGallery
        title={article.title}
        images={article.gallery}
        heading="In pictures"
      />

      {relatedArticles.length > 0 ? (
        <RelatedSection
          id="more-news"
          title="More from the institute"
          deck="Announcements, campus notices, and admissions updates from TWI Dubai."
          viewAllHref="/news"
          viewAllLabel="All news"
        >
          {relatedArticles.map((related) => (
            <BlogCard key={related.id} article={related} />
          ))}
        </RelatedSection>
      ) : null}
    </main>
  );
}
