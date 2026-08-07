// import type { Metadata } from "next";
// import { TeamsHero } from "@/src/components/sections/teams/teams-hero";
// import { LeadershipGrid } from "@/src/components/sections/teams/leadership-grid";
// import { ManagementGrid } from "@/src/components/sections/teams/management-grid";
// import { DepartmentHeadsGrid } from "@/src/components/sections/teams/department-heads-grid";
// import { TeamsCta } from "@/src/components/sections/teams/teams-cta";
// import { getTeamDisplayData } from "@/src/components/sections/teams/team-api-content";
// import { getTeam } from "@/src/data/fetch/team";

// export const metadata: Metadata = {
//   title: "Our Team — The Woolwich Institute Dubai",
//   description:
//     "Meet the leadership, management team, and department heads at The Woolwich Institute Dubai. KHDA-licensed and Pearson-approved vocational education in Dubai.",
// };

// export default async function TeamsPage() {
//   let teamData;
//   try {
//     teamData = await getTeam();
//   } catch {
//     teamData = { data: [] };
//   }
//   const { leadership, faculty, support } = getTeamDisplayData(teamData.data ?? []);

//   return (
//     <main>
//       <TeamsHero />
//       <LeadershipGrid members={leadership} />
//       <ManagementGrid members={faculty} />
//       <DepartmentHeadsGrid members={support} />
//       <TeamsCta />
//     </main>
//   );
// }

export default function Page() {
  return <div>Page</div>;
}
