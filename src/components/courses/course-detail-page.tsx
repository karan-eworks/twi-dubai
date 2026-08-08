import Image from "next/image";
import CourseCard from "@/components/cards/course-card";
import { NeedHelpCard } from "@/components/cards/need-help-card";
import { ArticleBody } from "@/components/detail/article-body";
import { FactStrip } from "@/components/detail/fact-strip";
import { RelatedSection } from "@/components/detail/related-section";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type {
  ApplyFieldOption,
  ApplyFormConfig,
} from "@/data/format-data/apply-form";
import type {
  CourseModuleGroup,
  CourseProgramme,
  CourseSection,
} from "@/data/format-data/course-api-content";
import type { CourseApiItem } from "@/data/types/courses";
import { cn } from "@/lib/utils";
import CTASection from "../shared/cta-section";

interface CourseDetailPageProps {
  course: CourseProgramme;
  similarCourses: CourseApiItem[];
  /** Null when the CMS form is unreachable — the page then falls back to /apply. */
  applyForm: {
    config: ApplyFormConfig;
    courseOptions: ApplyFieldOption[];
  } | null;
}

const WHATSAPP_BASE = "https://wa.me/971528983382";

/**
 * The awarding-body mark, hung on the end of the specification strip.
 * Duration, tuition, and intake are the first things an applicant checks, so
 * they sit above the prose rather than inside a sidebar to be hunted for.
 */
function AwardingMark({ src }: { src: string }) {
  return (
    <div className="flex items-center gap-4 border-s border-border ps-4 xl:shrink-0">
      <span className="datum text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Awarded by
      </span>
      {/* Decorative: the awarding body is already named in the h1, and the CMS
          gives us no text for the mark itself. */}
      <Image
        src={src}
        alt=""
        width={180}
        height={56}
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}

/**
 * Emphasised sections sit on a cannon tint. Entry requirements are the one
 * gate between a reader and an application, so they get lifted off the page
 * rather than reading as another block of prose.
 */
function ProseSection({
  section,
  className,
}: {
  section: CourseSection;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className={cn(
        className,
        section.emphasis &&
          "max-w-[52rem] rounded-md border border-cannon-200 bg-cannon-50 p-6 sm:p-8",
      )}
    >
      <h2
        id={`${section.id}-heading`}
        className="scroll-mt-28 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
      >
        {section.title}
      </h2>
      <ArticleBody html={section.html} className="mt-6 max-w-[46rem]" />
    </section>
  );
}

/**
 * Module tables, one panel per level. The first level opens by default so the
 * section never reads as an empty stack of bars.
 */
function ModuleSections({
  modules,
  className,
}: {
  modules: CourseModuleGroup[];
  className?: string;
}) {
  return (
    <section
      id="course-structure"
      aria-labelledby="course-structure-heading"
      className={className}
    >
      <h2
        id="course-structure-heading"
        className="scroll-mt-28 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
      >
        What you will study
      </h2>

      {/* Opening rule only: the next section's own top rule closes the stack,
          so the last panel is not boxed in by two hairlines a gap apart. */}
      <Accordion
        defaultValue={[modules[0].id]}
        className="mt-6 border-t border-border"
      >
        {modules.map((group) => (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="not-last:border-b not-last:border-border"
          >
            <AccordionTrigger className="rounded-none py-5 text-lg font-semibold text-foreground transition-colors hover:text-cannon-600 hover:no-underline focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring **:data-[slot=accordion-trigger-icon]:size-5">
              {group.title}
            </AccordionTrigger>
            <AccordionContent className="pb-8">
              <ArticleBody html={group.html} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function CourseDetailPage({
  course,
  similarCourses,
}: CourseDetailPageProps) {
  const [overview, ...remainingSections] = course.sections;
  const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `Hello Admissions, I would like to know more about ${course.title}.`,
  )}`;

  return (
    <main>
      <PageHero
        eyebrow={course.department?.name}
        title={course.title}
        body={course.standfirst}
        imageSrc={course.image}
        imageAlt={course.imageAlt}
        titleSize="headline"
      />

      <FactStrip
        facts={course.facts}
        label="Programme at a glance"
        id="spec"
        trailing={
          course.awardingMarkSrc ? (
            <AwardingMark src={course.awardingMarkSrc} />
          ) : null
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-[82rem] gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="min-w-0">
              {overview ? <ProseSection section={overview} /> : null}

              {course.modules.length > 0 ? (
                <ModuleSections
                  modules={course.modules}
                  className={
                    overview ? "mt-14 border-t border-border pt-14" : undefined
                  }
                />
              ) : null}

              {remainingSections.map((section) => (
                <ProseSection
                  key={section.id}
                  section={section}
                  // A tinted panel draws its own edge; a divider above it too
                  // would be two rules doing one job.
                  className={
                    section.emphasis
                      ? "mt-14"
                      : "mt-14 border-t border-border pt-14"
                  }
                />
              ))}
            </div>

            <aside className="min-w-0">
              <NeedHelpCard
                eyebrow="Admissions"
                title={
                  course.showApply
                    ? "Apply for this programme"
                    : "Ask about this programme"
                }
                body={
                  course.showApply
                    ? "Send your details and an advisor will confirm eligibility, fees, and the next intake."
                    : "This programme is not open for application online. Admissions can tell you when it reopens."
                }
                ctas={
                  course.showApply
                    ? [
                        {
                          // The in-page form was replaced by the closing CTA
                          // band, so there is no longer an "#apply" anchor
                          // on this page to point at.
                          href: "/apply",
                          label: "Start your application",
                        },
                        {
                          href: whatsappHref,
                          label: "WhatsApp admissions",
                          ariaLabel: `WhatsApp admissions about ${course.title}`,
                        },
                      ]
                    : [
                        {
                          href: whatsappHref,
                          label: "WhatsApp admissions",
                          ariaLabel: `WhatsApp admissions about ${course.title}`,
                        },
                      ]
                }
              />
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />

      {similarCourses.length > 0 ? (
        <RelatedSection
          id="similar"
          title="More programmes"
          deck="Other qualifications running at TWI Dubai, closest subjects first."
          viewAllHref="/courses"
          viewAllLabel="All programmes"
        >
          {similarCourses.map((similar) => (
            <CourseCard key={similar.id} course={similar} />
          ))}
        </RelatedSection>
      ) : null}
    </main>
  );
}
