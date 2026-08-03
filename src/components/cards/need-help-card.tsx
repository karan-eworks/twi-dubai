import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "../shared/ButtonLink";


export interface HelpCta {
  href: string;
  label: string;
  ariaLabel?: string;
}

export function NeedHelpCard({
  ctas,
  phone = "+971 52 898 3382",
  email = "info@woolwich.ac.ae",
}: {
  ctas: HelpCta[];
  phone?: string;
  email?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-stone-50 lg:sticky lg:top-28">
      {/* Same top keyline as the accreditation cards */}
      <div className="relative h-0.5 bg-border">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 start-0 w-10 bg-cannon-500"
        />
      </div>

      <div className="p-5">
        <p className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Admissions
        </p>

        <p className="mt-2 text-lg font-semibold leading-6 text-foreground">
          Need help with this page?
        </p>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Admissions can talk it through and help you pick the right next step.
        </p>

        <div className="mt-5 grid gap-2">
          {ctas.map((cta, index) => (
            <ButtonLink
              key={cta.href}
              href={cta.href}
              intent={index === 0 ? "primary" : "secondary"}
              size="md"
              fullWidth
              aria-label={cta.ariaLabel}
            >
              {cta.label}
            </ButtonLink>
          ))}
        </div>

        <dl className="mt-5 space-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2.5">
            <dt className="sr-only">Phone</dt>
            <Phone className="size-3.5 shrink-0 text-navy-400" aria-hidden="true" />
            <dd>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="datum text-xs text-foreground no-underline transition-colors hover:text-cannon-600"
              >
                {phone}
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <dt className="sr-only">Email</dt>
            <Mail className="size-3.5 shrink-0 text-navy-400" aria-hidden="true" />
            <dd className="min-w-0">
              <a
                href={`mailto:${email}`}
                className="datum block truncate text-xs text-foreground no-underline transition-colors hover:text-cannon-600"
              >
                {email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}