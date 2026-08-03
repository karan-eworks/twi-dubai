// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { Container } from "../shared/container";
// import { ButtonLink } from "../shared/ButtonLink";

// export interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   /** One short line — what they lead or bring. Optional. */
//   focus?: string;
//   href: string;
//   image: string;
// }

// const unsplash = (id: string) =>
//   `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&crop=faces&q=80&auto=format`;

// /**
//  * PLACEHOLDER DATA — names and portraits are both stock.
//  * Replace with real headshots before shipping: pairing a stock face with a
//  * real person's name misrepresents them.
//  */
// const defaultTeam: TeamMember[] = [
//   {
//     id: "chief-executive",
//     name: "Amira Haddad",
//     role: "Chief executive",
//     focus: "Twenty years in transnational education across the Gulf.",
//     href: "/team/chief-executive",
//     image: unsplash("1573497019940-1c28c88b4f3e"),
//   },
//   {
//     id: "academic-director",
//     name: "Thomas Whitfield",
//     role: "Academic director",
//     focus: "Leads curriculum design and Pearson centre compliance.",
//     href: "/team/academic-director",
//     image: unsplash("1506794778202-cad84cf45f1d"),
//   },
//   {
//     id: "admissions-head",
//     name: "Priya Menon",
//     role: "Head of admissions",
//     focus: "Oversees entry routes, scholarships, and student visas.",
//     href: "/team/head-of-admissions",
//     image: unsplash("1494790108377-be9c29b29330"),
//   },
//   {
//     id: "careers-lead",
//     name: "Daniel Okafor",
//     role: "Careers and placements",
//     focus: "Builds employer partnerships across Dubai.",
//     href: "/team/careers",
//     image: unsplash("1507003211169-0a1dd7228f2d"),
//   },
// ];

// export function LeadershipTeam({
//   team = defaultTeam,
// }: {
//   team?: TeamMember[];
// }) {
//   if (!team.length) return null;

//   return (
//     <section aria-labelledby="team-heading" className="py-20 sm:py-24 lg:py-28">
//       <Container>
//         <div className="flex flex-wrap items-end justify-between gap-6">
//           <div className="max-w-xl">
//             <span className="eyebrow">Leadership</span>
//             <h2
//               id="team-heading"
//               className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
//             >
//               The people behind the institute
//             </h2>
//           </div>

//           <ButtonLink href="/team" intent="secondary">
//             All leadership
//             <ArrowRight aria-hidden="true" />
//           </ButtonLink>
//         </div>

//         <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {team.map((member) => (
//             <li key={member.id}>
//               <article className="h-full">
//                 <Link
//                   href={member.href}
//                   className="group flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card no-underline transition-[translate,scale,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
//                 >
//                   <div className="relative aspect-[3/4] transform-gpu overflow-hidden bg-navy-900 [contain:paint]">
//                     <Image
//                       src={member.image}
//                       alt=""
//                       fill
//                       sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
//                       className="transform-gpu object-cover grayscale [backface-visibility:hidden] transition-[scale,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.04] group-hover:grayscale-0"
//                     />
//                   </div>

//                   {/* Subtle plate at rest; navy rises from the bottom on hover.
//                       The ::before is the fill, so nothing needs measuring. */}
//                   <div className="relative isolate flex flex-1 flex-col overflow-hidden bg-stone-50 p-5 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-navy-500 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.32,0.72,0,1)] before:content-[''] group-hover:before:scale-y-100">
//                     <span className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-500 group-hover:text-white/65">
//                       {member.role}
//                     </span>

//                     <h3 className="mt-2 font-heading text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-500 group-hover:text-white">
//                       {member.name}
//                     </h3>

//                     {member.focus ? (
//                       <p className="mt-2 text-sm leading-6 text-muted-foreground transition-colors duration-500 group-hover:text-white/75">
//                         {member.focus}
//                       </p>
//                     ) : null}

//                     <ArrowRight
//                       aria-hidden="true"
//                       className="mt-auto size-5 shrink-0 pt-6 box-content text-muted-foreground transition-[translate,color] duration-500 group-hover:translate-x-1 group-hover:text-cannon-300 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
//                     />
//                   </div>
//                 </Link>
//               </article>
//             </li>
//           ))}
//         </ul>
//       </Container>
//     </section>
//   );
// }



import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** One short line — what they lead or bring. Optional. */
  focus?: string;
  href: string;
  image: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&crop=faces&q=80&auto=format`;

/**
 * PLACEHOLDER DATA — names and portraits are both stock.
 * Replace with real headshots before shipping: pairing a stock face with a
 * real person's name misrepresents them.
 */
const defaultTeam: TeamMember[] = [
  {
    id: "chief-executive",
    name: "Amira Haddad",
    role: "Chief executive",
    focus: "Twenty years in transnational education across the Gulf.",
    href: "/team/chief-executive",
    image: unsplash("1573497019940-1c28c88b4f3e"),
  },
  {
    id: "academic-director",
    name: "Thomas Whitfield",
    role: "Academic director",
    focus: "Leads curriculum design and Pearson centre compliance.",
    href: "/team/academic-director",
    image: unsplash("1506794778202-cad84cf45f1d"),
  },
  {
    id: "admissions-head",
    name: "Priya Menon",
    role: "Head of admissions",
    focus: "Oversees entry routes, scholarships, and student visas.",
    href: "/team/head-of-admissions",
    image: unsplash("1494790108377-be9c29b29330"),
  },
  {
    id: "careers-lead",
    name: "Daniel Okafor",
    role: "Careers and placements",
    focus: "Builds employer partnerships across Dubai.",
    href: "/team/careers",
    image: unsplash("1507003211169-0a1dd7228f2d"),
  },
];

export function LeadershipTeam({
  team = defaultTeam,
}: {
  team?: TeamMember[];
}) {
  if (!team.length) return null;

  return (
    <section aria-labelledby="team-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Leadership</span>
            <h2
              id="team-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              The people behind the institute
            </h2>
          </div>

          <ButtonLink href="/team" intent="secondary">
            All leadership
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.id}>
              <article>
                <Link
                  href={member.href}
                  className="group relative isolate flex aspect-[3/4] transform-gpu items-end overflow-hidden rounded-md bg-navy-900 no-underline transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-24px_oklch(0.227_0.047_260.4/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-20 transform-gpu object-cover [backface-visibility:hidden] transition-[scale,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:scale-[1.04]"
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

                    {/* Revealed with the fill. grid-rows 0fr → 1fr animates an
                        unknown height without measuring it. */}
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}