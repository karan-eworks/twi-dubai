import type { Metadata } from "next";
import { TeamsDirectory } from "@/components/teams/teams-directory";
import { getTeam } from "@/data/api/team";
import { groupTeamByDepartment } from "@/data/format-data/teams-api-content";

const SITE_NAME = "The Woolwich Institute Dubai";
const description =
  "Meet the advisory board, senior management team, and department heads at The Woolwich Institute Dubai — KHDA-licensed, Pearson-approved vocational education.";

export const metadata: Metadata = {
  title: `Our team | ${SITE_NAME}`,
  description,
  alternates: { canonical: "https://www.woolwich.ac.ae/teams" },
  openGraph: {
    title: `Our team | ${SITE_NAME}`,
    description,
    url: "https://www.woolwich.ac.ae/teams",
    siteName: SITE_NAME,
    images: ["/images/twi-classroom-study.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our team | ${SITE_NAME}`,
    description,
    images: ["/images/twi-classroom-study.jpg"],
  },
};

export default async function TeamsPage() {
  // An unreachable CMS degrades to the empty state rather than a 500.
  const team = await getTeam().catch(() => null);
  const departments = groupTeamByDepartment(team?.data ?? []);

  return <TeamsDirectory departments={departments} />;
}
