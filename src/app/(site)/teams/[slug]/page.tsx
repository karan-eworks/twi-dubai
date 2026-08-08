import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfile } from "@/components/teams/team-profile";
import { getTeam } from "@/data/api/team";
import {
  findTeamProfile,
  listTeamMembers,
} from "@/data/format-data/teams-api-content";
import type { TeamApiItem } from "@/data/types/team";
import { getPlainText, truncate } from "@/lib/clean";

interface TeamRouteProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://www.woolwich.ac.ae";
const SITE_NAME = "The Woolwich Institute Dubai";

async function getRoster(): Promise<TeamApiItem[]> {
  try {
    const response = await getTeam();
    return response.data ?? [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const roster = await getRoster();
  return listTeamMembers(roster).map((member) => ({ slug: member.slug }));
}

/**
 * No record carries a `meta_tag`, so the description is composed from the
 * fields that do exist — the biography where there is one, otherwise a plain
 * statement of the role. Nothing here is invented.
 */
export async function generateMetadata({
  params,
}: TeamRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = findTeamProfile(await getRoster(), slug);

  if (!profile) return { title: `Profile not found | ${SITE_NAME}` };

  const { member, department } = profile;
  const biography = getPlainText(member.biographyHtml);
  const title = member.role
    ? `${member.name} — ${member.role} | ${SITE_NAME}`
    : `${member.name} | ${SITE_NAME}`;
  const description = biography
    ? truncate(biography, 160)
    : `${member.name} is ${member.role || "part of the team"} at ${SITE_NAME}, in ${department.name}.`;
  const url = `${SITE_URL}/teams/${member.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [member.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [member.image],
    },
  };
}

export default async function TeamRoute({ params }: TeamRouteProps) {
  const { slug } = await params;
  const profile = findTeamProfile(await getRoster(), slug);

  // Outside any try/catch — notFound() signals by throwing.
  if (!profile) notFound();

  const { member } = profile;
  const biography = getPlainText(member.biographyHtml);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: member.name,
      image: member.image,
      url: `${SITE_URL}/teams/${member.slug}`,
      ...(member.role ? { jobTitle: member.role } : {}),
      ...(biography ? { description: truncate(biography, 300) } : {}),
      worksFor: {
        "@type": "CollegeOrUniversity",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Our team",
          item: `${SITE_URL}/teams`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: member.name,
          item: `${SITE_URL}/teams/${member.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD, not markup
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TeamProfile profile={profile} />
    </>
  );
}
