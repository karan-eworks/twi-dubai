/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: CMS content is sanitized in normalizeCmsHtml */

import Image from "next/image";
import { SectionShell } from "./section-cell";
import PageHero from "./page-hero";
import type { CmsPageDisplayData } from "@/data/types/pages";
import { NeedHelpCard } from "../cards/need-help-card";
import { extractAmenities } from "@/lib/extractAmenities";
import { normalizeCmsHtml } from "@/lib/normalizeCmsHtml";
import { CmsAmenities } from "../cms-pages/cms-aminities";


const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=2000&h=1200&fit=crop&q=80&auto=format";

const HELP_CTAS = [
  { label: "Apply now", href: "/apply", ariaLabel: "Apply for admissions" },
  {
    label: "WhatsApp admissions",
    href: "https://wa.me/971528983382?text=Hello%20Admissions",
    ariaLabel: "Contact admissions on WhatsApp",
  },
];

interface CmsPageProps {
  page: CmsPageDisplayData;
}

export function CmsPage({ page }: CmsPageProps) {
  // Icon cells are lifted out of the blob and rendered as a component; the
  // returned html has them removed so nothing appears twice.
  const { items: amenities, html: bodyWithoutAmenities } = extractAmenities(
    page.bodyHtml,
  );

  const bodyHtml = normalizeCmsHtml(bodyWithoutAmenities);
  const additionalHtml = normalizeCmsHtml(page.additionalHtml);

  return (
    <main>
       <PageHero
              title={page.title}
              body={page.intro}
              imageSrc={page.media.src || "https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              imageAlt={page.media.alt}
            />
      <SectionShell id="page-content" intro={{ heading: page.title }} tone="white">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            {/* .prose-cms owns size, leading, and colour — don't set them twice */}
            <div className="prose-cms" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            <CmsAmenities items={amenities} />

            {additionalHtml ? (
              <div
                className="prose-cms mt-10 border-t border-border pt-8"
                dangerouslySetInnerHTML={{ __html: additionalHtml }}
              />
            ) : null}
          </article>

          {/* Not hidden on mobile — this is the only contact route on the page */}
          <aside className="min-w-0">
            <NeedHelpCard ctas={HELP_CTAS} />
          </aside>
        </div>
      </SectionShell>

      {page.gallery.length ? (
        <SectionShell
          id="page-media"
          intro={{
            heading: "Related media",
            deck: "Additional images connected to this guidance.",
          }}
          tone="soft"
        >
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.gallery.map((media) => (
              <li key={media.src}>
                <figure className="group relative aspect-[4/3] transform-gpu overflow-hidden rounded-md bg-navy-900 [contain:paint]">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="transform-gpu object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.05]"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </SectionShell>
      ) : null}
    </main>
  );
}