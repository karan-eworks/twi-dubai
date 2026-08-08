import { TeamMemberCard } from "@/components/cards/team-member-card";
import { TeamPortraitCard } from "@/components/cards/team-portrait-card";
import { Container } from "@/components/shared/container";
import { EmptyOutline } from "@/components/shared/empty";
import PageHero from "@/components/shared/page-hero";
import {
  type TeamDepartment,
  usesPortraitCard,
} from "@/data/format-data/teams-api-content";

interface TeamsDirectoryProps {
  departments: TeamDepartment[];
}

const HERO = {
  eyebrow: "Our people",
  title: "The people behind the institute",
  body: "The advisory board that governs The Woolwich Institute Dubai, the team that runs the campus, and the specialists who lead each department.",
  imageSrc:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "Colleagues at work at The Woolwich Institute Dubai.",
};

function DepartmentSection({
  department,
  className,
}: {
  department: TeamDepartment;
  className?: string;
}) {
  const isBoard = usesPortraitCard(department.slug);

  return (
    <section
      id={department.slug}
      aria-labelledby={`${department.slug}-heading`}
      className={className}
    >
      <h2
        id={`${department.slug}-heading`}
        className="scroll-mt-28 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
      >
        {department.name}
      </h2>

      <ul
        className={
          isBoard
            ? "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {department.members.map((member) => (
          <li key={member.id}>
            {isBoard ? (
              <TeamPortraitCard member={member} />
            ) : (
              <TeamMemberCard member={member} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TeamsDirectory({ departments }: TeamsDirectoryProps) {
  return (
    <main>
      <PageHero
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        body={HERO.body}
        imageSrc={HERO.imageSrc}
        imageAlt={HERO.imageAlt}
        titleSize="headline"
      />

      <section className="py-16 sm:py-20">
        <Container>
          {departments.length > 0 ? (
            departments.map((department, index) => (
              <DepartmentSection
                key={department.slug}
                department={department}
                className={
                  index === 0 ? undefined : "mt-16 border-t border-border pt-16"
                }
              />
            ))
          ) : (
            <EmptyOutline
              title="The team directory is unavailable"
              description="We couldn't load the team right now. Please try again shortly, or contact the campus directly."
            />
          )}
        </Container>
      </section>
    </main>
  );
}
