/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import Image from "next/image";
import { SectionShell } from "./section-cell";
import PageHero from "./page-hero";
import type { CmsPageDisplayData } from "@/data/types/pages";
import { NeedHelpCard } from "../cards/need-help-card";


interface CmsPageProps {
  page: CmsPageDisplayData;
}

export function CmsPage({ page }: CmsPageProps) {
  return (
    <main>
        <PageHero 
              title={page.title}              
              body={page.bodyHtml}
              // imageSrc="https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              imageSrc={page.media.src}
              imageAlt={page.media.alt}
            />

      <SectionShell
        id="page-content"
        intro={{
          heading: page.title,          
        }}
        tone="white"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <div
              className="prose-cms max-w-none text-[1.0625rem] leading-8 text-[var(--foreground)]"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
            {page.additionalHtml ? (
              <div
                className="prose-cms mt-10 border-t border-[var(--border)] pt-8 text-[1.0625rem] leading-8 text-[var(--foreground)]"
                dangerouslySetInnerHTML={{ __html: page.additionalHtml }}
              />
            ) : null}
          </article>

          <aside className="hidden min-w-0 lg:block">
            <NeedHelpCard
                ctas={[
                    {   
                        label: "Apply now",
                        href: "/apply",
                        ariaLabel: "Apply for admissions",
                    },
                    {
                        label: "WhatsApp admissions",
                        href: "https://wa.me/?text=Hello%20Admissions",
                        ariaLabel: "Contact admissions on WhatsApp",
                    },
                ]}
            />
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.gallery.map((media) => (
              <figure
                key={media.src}
                className="relative min-h-[18rem] overflow-hidden rounded-[12px] bg-white"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </SectionShell>
      ) : null}
    </main>
  );
}
