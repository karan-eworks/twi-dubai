import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/data/format-data/teams-api-content";

interface TeamMemberCardProps {
  member: TeamMember;
  /** Feeds next/image — match the grid the card sits in. */
  sizes?: string;
}

/**
 * The roster card, for the people the CMS lists by name and job title alone.
 *
 * Deliberately quieter than the portrait card: no scrim, no rising fill, no
 * reveal. Everything there is to know is already on the face of it, so the only
 * movement is a hairline taking the cannon accent.
 */
export function TeamMemberCard({
  member,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: TeamMemberCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/teams/${member.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-stone-50 no-underline transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-navy-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-navy-900 contain-paint">
          <Image
            src={member.image}
            alt=""
            fill
            sizes={sizes}
            className="transform-gpu object-cover object-top backface-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.03]"
          />
        </div>

        {/* The one moving part: a hairline that fills from the start edge. */}
        <div className="relative h-px w-full bg-border">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-0 bg-cannon-500 transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full"
          />
        </div>

        <div className="p-5">
          <h3 className="font-heading text-xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-cannon-600">
            {member.name}
          </h3>
          {member.role ? (
            <p className="datum mt-2 text-[11px] uppercase leading-5 tracking-[0.14em] text-muted-foreground">
              {member.role}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
