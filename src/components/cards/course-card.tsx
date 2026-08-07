import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CourseApiItem } from "@/data/types/courses";
import { getPlainText } from "@/lib/clean";
import { mediaUrl } from "@/lib/media";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";

interface CourseCardProps {
  course: CourseApiItem;
}

function CourseCard({ course }: CourseCardProps) {
  const image =
    mediaUrl(course.cover_image) ??
    mediaUrl(course.featured_image) ??
    FALLBACK_IMAGE;

  // The API returns rich text for both fields, so neither can be rendered raw.
  const summary = getPlainText(course.excerpt ?? course.description);
  const facts = [course.duration, course.intake].filter(Boolean).join(" · ");

  return (
    <article className="h-full">
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card no-underline transition-[translate,scale,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-16/10 transform-gpu overflow-hidden bg-navy-900 contain-paint">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transform-gpu object-cover backface-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
          />

          {course.department ? (
            <span className="datum absolute inset-s-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-navy-900 backdrop-blur-sm">
              {course.department.name}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            {course.title}
          </h3>

          {facts ? (
            <span className="datum mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {facts}
            </span>
          ) : null}

          {summary ? (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {summary}
            </p>
          ) : null}

          <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            View programme
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default CourseCard;
