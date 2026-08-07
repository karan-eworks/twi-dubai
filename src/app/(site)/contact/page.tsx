import {
  ArrowUpRight,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";

const CAMPUS = {
  name: "The Woolwich Institute Dubai",
  address: "G-35, Block 2A, Dubai Knowledge Park, Dubai, UAE",
  // No API key needed for the q= embed form
  mapEmbed:
    "https://www.google.com/maps?q=Block%202A%20Dubai%20Knowledge%20Park%20Dubai&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Block+2A+Dubai+Knowledge+Park+Dubai",
};

const CHANNELS = [
  {
    icon: GraduationCap,
    label: "Admissions",
    lines: ["admissions@woolwich.ac.ae"],
    href: "mailto:admissions@woolwich.ac.ae",
    note: "Entry requirements, offers, and documents",
  },
  {
    icon: Mail,
    label: "General enquiries",
    lines: ["info@woolwich.ac.ae"],
    href: "mailto:info@woolwich.ac.ae",
    note: "Anything else about the institute",
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    lines: ["+971 52 898 3382"],
    href: "tel:+971528983382",
    note: "Fastest route during office hours",
  },
  {
    icon: Clock,
    label: "Office hours",
    lines: ["Monday to Friday", "9:00 – 17:00 GST"],
    note: "Closed on public holidays",
  },
];

const CONTACT_HERO = {
  eyebrow: "Contact",
  title: "Start your journey with us",
  description:
    "Reach out to admissions for questions about entry requirements, fees, or campus visits in Dubai Knowledge Park.",
  media: {
    src: "https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students walking on campus",
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title={CONTACT_HERO.title}
        eyebrow={CONTACT_HERO.eyebrow}
        body={CONTACT_HERO.description}
        imageSrc={CONTACT_HERO.media.src}
        imageAlt={CONTACT_HERO.media.alt}
      />
      {/* ---- Header ---- */}
      <section
        aria-labelledby="contact-heading"
        className="pb-4 pt-32 sm:pt-36"
      >
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow">Contact</span>
            <h1
              id="contact-heading"
              className="mt-4 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Start your journey with us
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Admissions can talk through entry requirements, fees, and
              progression routes — or book you a campus visit in Dubai Knowledge
              Park.
            </p>
          </div>
        </Container>
      </section>

      {/* ---- Channels ---- */}
      <section aria-label="Ways to reach us" className="py-10 sm:py-12">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;

              const inner = (
                <>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="size-5 text-navy-400"
                  />
                  <span className="datum mt-4 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {channel.label}
                  </span>
                  {channel.lines.map((line) => (
                    <span
                      key={line}
                      className="mt-1 block text-[15px] font-medium leading-6 text-foreground"
                    >
                      {line}
                    </span>
                  ))}
                  <span className="mt-3 block text-sm leading-5 text-muted-foreground">
                    {channel.note}
                  </span>
                </>
              );

              const shared =
                "block h-full rounded-md border border-border bg-card p-5 transition-colors duration-300";

              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={`${shared} group no-underline hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={shared}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---- Form ---- */}
      <section aria-labelledby="form-heading" className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            <div className="min-w-0">
              <span className="eyebrow">Send a message</span>
              <h2
                id="form-heading"
                className="mt-4 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Questions? Ask admissions
              </h2>
              <p className="mt-4 max-w-prose text-base leading-7 text-muted-foreground">
                The more you tell us about where you are applying from and what
                you want to study, the more useful the reply.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="min-w-0">
              <div className="overflow-hidden rounded-md border border-border bg-stone-50 lg:sticky lg:top-28">
                <div className="relative h-0.5 bg-border">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-10 bg-cannon-500"
                  />
                </div>

                <div className="p-5">
                  <p className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Prefer to talk?
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-6 text-foreground">
                    WhatsApp admissions
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Quickest for quick questions — fees, intakes, or whether
                    your qualifications meet entry.
                  </p>

                  <div className="mt-5 grid gap-2">
                    <ButtonLink
                      href="https://wa.me/971528983382?text=Hello%20Admissions"
                      intent="secondary"
                      fullWidth
                    >
                      <MessageCircle aria-hidden="true" />
                      Open WhatsApp
                    </ButtonLink>
                    <ButtonLink
                      href="/events/open-day-september"
                      intent="tertiary"
                      fullWidth
                    >
                      Book a campus visit
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ---- Map ---- */}
      <section
        aria-labelledby="map-heading"
        className="pb-20 sm:pb-24 lg:pb-28"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">Find us</span>
              <h2
                id="map-heading"
                className="mt-4 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Dubai Knowledge Park
              </h2>
            </div>

            <ButtonLink href={CAMPUS.mapLink} intent="secondary">
              Get directions
              <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="overflow-hidden rounded-md border border-border bg-stone-100">
              <iframe
                src={CAMPUS.mapEmbed}
                title={`Map showing ${CAMPUS.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[22rem] w-full border-0 sm:h-[28rem]"
              />
            </div>

            <div className="rounded-md border border-border bg-card p-5">
              <MapPin
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-5 text-navy-400"
              />
              <p className="datum mt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Campus
              </p>
              <p className="mt-1 text-[15px] font-medium leading-6 text-foreground">
                {CAMPUS.name}
              </p>
              <address className="mt-2 text-sm not-italic leading-6 text-muted-foreground">
                {CAMPUS.address}
              </address>

              <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Nearest metro
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    Dubai Internet City (Red Line)
                  </dd>
                </div>
                <div>
                  <dt className="datum text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Parking
                  </dt>
                  <dd className="mt-0.5 text-foreground">
                    Visitor parking in Block 2A
                  </dd>
                </div>
              </dl>

              <Link
                href="/events/open-day-september"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground no-underline transition-colors hover:text-cannon-600"
              >
                Book a campus visit
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
