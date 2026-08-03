import AboutPurposeSection from "@/components/about/about-purpose";
import { Accreditation } from "@/components/about/accreditation-section";
import { CampusGallery } from "@/components/about/dubai-campus";
import { LeadershipTeam } from "@/components/about/leadership-section";
import CTASection from "@/components/shared/cta-section";
import PageHero from "@/components/shared/page-hero";
import { getBlogs } from "@/data/api/blogs";
import { getPageBySlug } from "@/data/api/pages";
import { getTeam } from "@/data/api/team";
import { getAboutData, getAboutMeta } from "@/data/format-data/about-content";
import type { BlogListApiResponse } from "@/data/types/blogs";
import type { PageApiItem } from "@/data/types/pages";
import type { TeamListApiResponse } from "@/data/types/team";
import type { Metadata } from "next";

async function getAboutPageData() {
  const [page, teamData, blogData] = await Promise.all([
    getPageBySlug("about-us").catch(() => null),
    getTeam().catch(
      () =>
        ({
          data: [],
        }) as Pick<TeamListApiResponse, "data">,
    ),
    getBlogs().catch(
      () =>
        ({
          data: [],
        }) as Pick<BlogListApiResponse, "data">,
    ),
  ]);

  return {
    page: page as PageApiItem | null,
    teamData,
    blogData,
  };
}

// Extracts meta information from the about page data, falling back to defaults if not available.
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about-us").catch(() => null);
  const meta = getAboutMeta(page);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export default async function AboutUs() {
   const { page, teamData, blogData } = await getAboutPageData();

  const about = getAboutData(page);

  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <PageHero 
        title={about.hero.title}
        eyebrow={about.hero.eyebrow}
        body={about.hero.description}
        // imageSrc="https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageSrc={about.hero.media.src}
        imageAlt={about.hero.media.alt}
      />
      <Accreditation />
      <AboutPurposeSection
        heading={about?.purpose.heading}
        html={about?.purpose?.html}
      />
      <LeadershipTeam />
      <CTASection />
      <CampusGallery />      
    </div>
   
  );
}
