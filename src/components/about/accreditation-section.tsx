import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";

export interface Credential {
  /** Short mono label — what kind of credential this is. */
  label: string;
  title: string;
  body: string;
  href?: string;
}

export interface Partner {
  name: string;
  /** Optional mark. Falls back to the name set in mono. */
  logo?: string;
}

const defaultCredentials: Credential[] = [
  {
    label: "Regulator",
    title: "KHDA approved",
    body: "Licensed by Dubai's education regulator, with delivery audited against local quality standards.",
  },
  {
    label: "Awarding body",
    title: "Pearson BTEC centre",
    body: "Approved to deliver BTEC qualifications that carry into higher study and employment.",
  },
  {
    label: "Network",
    title: "Global pathways",
    body: "Credit-transfer routes through British Education Group into the UK, Nepal, and beyond.",
  },
  {
    label: "Curriculum",
    title: "Career-focused learning",
    body: "Built around practical briefs, internship access, and placement guidance in Dubai.",
  },
];

const defaultPartners: Partner[] = [
  { name: "KHDA" },
  { name: "Pearson BTEC" },
  { name: "ACCA" },
  { name: "British Education Group" },
];

export function Accreditation({
  credentials = defaultCredentials,
  partners = defaultPartners,
}: {
  credentials?: Credential[];
  partners?: Partner[];
}) {
  return (
    <section
      aria-labelledby="accreditation-heading"
      className="bg-stone-50 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Accreditation</span>
            <h2
              id="accreditation-heading"
              className="mt-4 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Accredited excellence, made practical
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Every programme is regulated in Dubai, awarded in the UK, and
              built to carry into work or further study.
            </p>
          </div>

          <ButtonLink href="/about/accreditation" intent="secondary">
            How we are accredited
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item) => {
            const inner = (
              <>
                {/* Short keyline that runs the full card width on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-8 origin-left bg-cannon-500 transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full rtl:origin-right"
                />

                <span className="datum block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </span>

                <span className="mt-3 block text-xl font-semibold leading-6 tracking-tight text-foreground">
                  {item.title}
                </span>

                <span className="mt-3 block text-sm leading-6 text-muted-foreground">
                  {item.body}
                </span>
              </>
            );

            const shared =
              "group relative flex h-full transform-gpu flex-col overflow-hidden rounded-md border border-border bg-card p-6 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_16px_36px_-24px_oklch(0.227_0.047_260.4/0.4)]";

            return (
              <li key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${shared} no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={shared}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
