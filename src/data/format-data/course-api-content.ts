import { prepareArticleHtml } from "@/lib/article-html";
import { clean, getPlainText, truncate } from "@/lib/clean";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { CourseApiItem } from "../types/courses";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";
const SITE_URL = "https://www.woolwich.ac.ae";
const SITE_NAME = "The Woolwich Institute Dubai";
const SIMILAR_COUNT = 3;

/** A prose block the CMS fills in per programme. Empty fields never render. */
export interface CourseSection {
  id: string;
  title: string;
  html: string;
  /** Renders on a tinted panel — the gating conditions an applicant must meet. */
  emphasis?: boolean;
}

/** One line of the specification strip under the hero. */
export interface CourseFact {
  label: string;
  value: string;
}

/** A level's module table, rendered as one accordion panel. */
export interface CourseModuleGroup {
  id: string;
  title: string;
  html: string;
}

export interface CourseProgramme {
  slug: string;
  title: string;
  department: { id: number; name: string; slug: string } | null;
  /** Standfirst for the hero — plain text, trimmed to two lines' worth. */
  standfirst: string;
  facts: CourseFact[];
  /** Pearson / ACCA mark supplied per programme by the CMS. */
  awardingMarkSrc: string | null;
  modules: CourseModuleGroup[];
  sections: CourseSection[];
  image: string;
  imageAlt: string;
  /** The CMS hides application buttons on programmes not open for intake. */
  showApply: boolean;
  canonicalUrl: string;
  seoTitle: string;
  seoDescription: string;
  openGraphImage: string;
}

function courseImage(course: CourseApiItem) {
  return (
    mediaUrl(course.cover_image) ??
    mediaUrl(course.featured_image) ??
    FALLBACK_IMAGE
  );
}

/**
 * The CMS names these fields after the database, not after what editors put in
 * them: `key_facts` holds careers copy and `future` holds progression routes.
 * Titles here describe the content as it actually reads.
 */
type CourseTextField = (course: CourseApiItem) => string | null | undefined;

const SECTION_FIELDS: {
  id: string;
  title: string;
  read: CourseTextField;
  emphasis?: boolean;
}[] = [
  { id: "overview", title: "Overview", read: (c) => c.description },
  {
    id: "entry-requirements",
    title: "Entry requirements",
    read: (c) => c.entry_requirement,
    emphasis: true,
  },
  { id: "progression", title: "Where this leads", read: (c) => c.future },
  {
    id: "careers-support",
    title: "Careers and placement support",
    read: (c) => c.key_facts,
  },
];

const FACT_FIELDS: { label: string; read: CourseTextField }[] = [
  { label: "Duration", read: (c) => c.duration },
  { label: "Intake", read: (c) => c.intake },
  { label: "Tuition", read: (c) => c.fee },
  { label: "Credits", read: (c) => c.credits },
  { label: "Study mode", read: (c) => c.delivery },
  { label: "Taught in", read: (c) => c.language },
  { label: "Scholarship", read: (c) => c.scholarship },
];

function toSections(course: CourseApiItem): CourseSection[] {
  return SECTION_FIELDS.flatMap(({ id, title, read, emphasis }) => {
    const { html } = prepareArticleHtml(read(course));
    return html ? [{ id, title, html, emphasis }] : [];
  });
}

function toFacts(course: CourseApiItem): CourseFact[] {
  return FACT_FIELDS.flatMap(({ label, read }) => {
    const value = clean(read(course));
    return value ? [{ label, value }] : [];
  });
}

/**
 * `contents` and `structures` carry the same module tables — `contents` is the
 * one with stable slugs, so the accordion panels keep their ids between builds.
 *
 * Module tables have no header row: row one is a module like "Programming", so
 * the usual first-row promotion would bury it in the navy header band.
 */
function toModules(course: CourseApiItem): CourseModuleGroup[] {
  return [...(course.contents ?? [])]
    .sort((a, b) => a.order - b.order)
    .flatMap((item) => {
      const { html } = prepareArticleHtml(item.content, {
        promoteTableHeader: false,
      });
      const title = clean(item.title);
      return html && title
        ? [{ id: item.slug || `module-${item.id}`, title, html }]
        : [];
    });
}

export function normalizeCourse(course: CourseApiItem): CourseProgramme {
  const image = courseImage(course);
  const overview = getPlainText(course.description);
  const standfirst =
    clean(course.excerpt) ??
    (overview ? truncate(overview, 190) : null) ??
    clean(course.dynamic_tags) ??
    "";

  return {
    slug: course.slug,
    title: course.title,
    department: course.department,
    standfirst,
    facts: toFacts(course),
    awardingMarkSrc: mediaUrl(course.affiliation),
    modules: toModules(course),
    sections: toSections(course),
    image,
    imageAlt:
      mediaAlt(course.cover_image) ??
      mediaAlt(course.featured_image) ??
      `${course.title} at ${SITE_NAME}`,
    showApply: !course.hide_cta_buttons,
    canonicalUrl: `${SITE_URL}/courses/${course.slug}`,
    seoTitle:
      clean(course.meta_tag?.meta_title) ??
      clean(course.meta_tag?.og_title) ??
      `${course.title} | ${SITE_NAME}`,
    seoDescription:
      clean(course.meta_tag?.meta_description) ??
      clean(course.meta_tag?.og_description) ??
      (overview ? truncate(overview, 160) : ""),
    openGraphImage: mediaUrl(course.meta_tag?.og_image) ?? image,
  };
}

/**
 * Same department first, then the rest of the catalogue. Departments here hold
 * as few as two programmes, so a strictly same-department list would leave a
 * three-column row two-thirds empty.
 */
export function getSimilarCourses(
  course: CourseApiItem,
  items: CourseApiItem[],
): CourseApiItem[] {
  const candidates = items.filter(
    (item) => item.slug !== course.slug && !item.hide_in_course_list,
  );

  const sameDepartment = candidates.filter(
    (item) => item.department?.id === course.department?.id,
  );
  const rest = candidates.filter(
    (item) => item.department?.id !== course.department?.id,
  );

  return [...sameDepartment, ...rest].slice(0, SIMILAR_COUNT);
}
