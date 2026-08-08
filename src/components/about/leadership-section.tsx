import { ArrowRight } from "lucide-react";
import { TeamPortraitCard } from "@/components/cards/team-portrait-card";
import type { TeamMember } from "@/data/format-data/teams-api-content";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";

interface LeadershipTeamProps {
  /** Real members from the CMS. Renders nothing when the fetch came back empty. */
  team: TeamMember[];
  /** How many to show before sending the reader to the full directory. */
  limit?: number;
}

/**
 * The board, on the about page.
 *
 * This section used to fall back to four invented names paired with stock
 * portraits. It now renders only people the CMS actually holds, and disappears
 * when it holds none — a page about the institute should not introduce someone
 * who does not work there.
 */
export function LeadershipTeam({ team, limit = 3 }: LeadershipTeamProps) {
  const members = team.slice(0, limit);

  if (members.length === 0) return null;

  return (
    <section aria-labelledby="team-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              id="team-heading"
              className="font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              The people behind the institute
            </h2>
          </div>

          <ButtonLink href="/teams" intent="secondary">
            Meet the full team
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.id}>
              <TeamPortraitCard member={member} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
