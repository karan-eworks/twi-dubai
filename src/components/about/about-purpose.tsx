/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import { Check } from "lucide-react";
import { SectionShell } from "../shared/section-cell";
import TypeSetComponent from "../shared/typeset-component";

interface AboutPurposeSectionProps {
  heading?: string;
  html?: string | null;
}

export const purposePoints = [
    "International academic institution in Dubai",
    "Vocational and career-focused education",
    "Business, Computing, Hospitality, Teacher Training, and ACCA programmes",
    "Internship and career support",
    "Part of The British Education Group",
    "KHDA licensed and Pearson approved",
];


function AboutPurposeSection({
  heading ,
  html,
}: AboutPurposeSectionProps) {
  return (
    <SectionShell id="purpose" intro={{ heading }}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <TypeSetComponent
            content={
              html ? (
                // Typeset styles cascade into the injected markup, so CMS
                // content picks up the same rhythm as authored copy.
                <div dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <>
                  <p>
                    The Woolwich Institute is an international academic institution in
                    Dubai offering accredited vocational qualifications in a
                    student-friendly environment. Programmes span Business, Computing,
                    Hospitality, Teacher Training, and ACCA, with learning built around
                    practical scenarios and career preparation.
                  </p>
                  <p>
                    As part of The British Education Group, TWI benefits from an
                    international education network and progression experience. The
                    institute is KHDA licensed and Pearson approved, giving students and
                    families clear proof points before they apply.
                  </p>
                </>
              )
            }
          />
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-md border border-border bg-card lg:sticky lg:top-28">
            {/* One red mark for the whole card, not one per row */}
            <div className="relative h-0.5 bg-border">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 w-10 bg-cannon-500"
              />
            </div>

            <p className="datum px-5 pt-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              At a glance
            </p>

            <ul className="mt-3 divide-y divide-border">
              {purposePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 px-5 py-4">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-navy-400"
                    strokeWidth={2.5}
                  />
                  <span className="text-[15px] font-medium leading-6 text-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default AboutPurposeSection;