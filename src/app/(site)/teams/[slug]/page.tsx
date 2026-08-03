import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRelatedTeamMembers,
  getTeamDisplayData,
  getTeamMeta,
  normalizeTeamMember,
} from "@/src/components/sections/teams/team-api-content";
import { getTeam, getTeamMemberBySlug } from "@/src/data/fetch/team";
import { siteIdentity } from "@/src/data/mock-data/site";
import { TeamDetailHero } from "@/src/components/sections/teams/team-detail-hero";
import { TeamDetailBio } from "@/src/components/sections/teams/team-detail-bio";
import { TeamRelated } from "@/src/components/sections/teams/team-related";
import { TeamsCta } from "@/src/components/sections/teams/teams-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const teamData = await getTeam();
    const { members } = getTeamDisplayData(teamData.data ?? []);
    return members.map((member) => ({ slug: member.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  let apiMember;
  try {
    apiMember = await getTeamMemberBySlug(slug);
  } catch {
    return { title: "Team Member" };
  }

  if (!apiMember) {
    return { title: "Team Member Not Found" };
  }

  const member = normalizeTeamMember(apiMember);
  const meta = getTeamMeta(member);

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

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;

  let apiMember;
  let teamData;
  try {
    [apiMember, teamData] = await Promise.all([
      getTeamMemberBySlug(slug),
      getTeam(),
    ]);
  } catch {
    notFound();
  }

  if (!apiMember) {
    notFound();
  }

  const member = normalizeTeamMember(apiMember);
  const { members } = getTeamDisplayData(teamData.data ?? []);
  const relatedMembers = getRelatedTeamMembers(member, members);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    description: member.biography.slice(0, 200),
    image: member.image,
    jobTitle: member.role,
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: `${siteIdentity.name} Dubai`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.woolwich.ac.ae",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Team",
        item: "https://www.woolwich.ac.ae/teams",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: member.name,
      },
    ],
  };

  return (
    <>
      <main>
        <TeamDetailHero member={member} />
        <TeamDetailBio member={member} />
        {relatedMembers.length > 0 ? (
          <TeamRelated members={relatedMembers} category={member.category} />
        ) : null}
        <TeamsCta />
      </main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
