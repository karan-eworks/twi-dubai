import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/data/format-data/teams-api-content";

interface TeamPortraitCardProps {
  member: TeamMember;
  /** Feeds next/image — match the grid the card sits in. */
  sizes?: string;
}

/**
 * The statement portrait, for the board.
 *
 * The biography used to open here in a dialog; it now lives on the profile
 * page, so the card is a plain link and the prose has one home. The teaser
 * line only appears for the members who have one to show.
 */
export function TeamPortraitCard({
  member,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: TeamPortraitCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/teams/${member.slug}`}
        className="group relative isolate flex aspect-3/4 w-full transform-gpu items-end overflow-hidden rounded-md bg-navy-900 no-underline transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <Image
          src={member.image}
          alt=""
          fill
          sizes={sizes}
          className="-z-20 transform-gpu object-cover backface-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.04]"
        />

        {/* Resting scrim keeps the name legible on any portrait */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent"
        />

        {/* Navy rises from the bottom on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy-500/90 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-y-100"
        />

        <div className="relative w-full p-5 text-white">
          <span className="datum block text-[11px] uppercase tracking-[0.14em] text-white/65">
            {member.role}
          </span>

          <h3 className="mt-1.5 font-heading text-2xl font-normal leading-tight tracking-tight">
            {member.name}
          </h3>

          {/* Revealed with the fill. grid-rows 0fr → 1fr animates an unknown
              height without measuring it. */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              {member.focus ? (
                <p className="pt-2.5 text-sm leading-6 text-white/80">
                  {member.focus}
                </p>
              ) : null}

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                View profile
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-cannon-300 rtl:-scale-x-100"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
