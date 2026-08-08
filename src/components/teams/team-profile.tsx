import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TeamMemberCard } from "@/components/cards/team-member-card";
import { TeamPortraitCard } from "@/components/cards/team-portrait-card";
import { ArticleBody } from "@/components/detail/article-body";
import { type Fact, FactStrip } from "@/components/detail/fact-strip";
import { RelatedSection } from "@/components/detail/related-section";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";
import {
  type TeamProfile as Profile,
  usesPortraitCard,
} from "@/data/format-data/teams-api-content";

interface TeamProfileProps {
  profile: Profile;
}

export function TeamProfile({ profile }: TeamProfileProps) {
  const { member, department, colleagues } = profile;
  // Colleagues appear on the same card their department uses on the listing.
  const isBoard = usesPortraitCard(department.slug);

  const facts: Fact[] = [];
  if (member.role) facts.push({ label: "Role", value: member.role });
  facts.push({ label: "Department", value: department.name });

  return (
    <main>
      <PageHero
        eyebrow={department.name}
        title={member.name}
        body={member.role}
        imageSrc={member.image}
        imageAlt={member.imageAlt}
        titleSize="headline"
      />

      <FactStrip facts={facts} label="Profile details" id="profile-facts" />

      {/* The CMS holds a biography for the board and nothing for anyone else,
          so this section simply does not render for most of the roster rather
          than standing in as an empty heading. */}
      {member.biographyHtml ? (
        <section aria-labelledby="biography-heading" className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-[72rem]">
              <h2
                id="biography-heading"
                className="font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Biography
              </h2>
              <ArticleBody
                html={member.biographyHtml}
                className="mt-6 max-w-[46rem]"
              />
            </div>
          </Container>
        </section>
      ) : null}

      {/* Without a biography this band holds only the back link, so it closes
          up rather than leaving a hollow stretch under the fact strip. */}
      <section
        className={member.biographyHtml ? "pb-16 sm:pb-20" : "py-10 sm:py-12"}
      >
        <Container>
          <div className="mx-auto max-w-[72rem]">
            <Link
              href="/teams"
              className="datum inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 rtl:-scale-x-100"
              />
              Back to the team
            </Link>
          </div>
        </Container>
      </section>

      {colleagues.length > 0 ? (
        <RelatedSection
          id="colleagues"
          title={`Others in ${department.name}`}
          deck="The rest of the team working alongside them at TWI Dubai."
          viewAllHref="/teams"
          viewAllLabel="The full team"
        >
          {colleagues.map((colleague) =>
            isBoard ? (
              <TeamPortraitCard key={colleague.id} member={colleague} />
            ) : (
              <TeamMemberCard key={colleague.id} member={colleague} />
            ),
          )}
        </RelatedSection>
      ) : null}
    </main>
  );
}
