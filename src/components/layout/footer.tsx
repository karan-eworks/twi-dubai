import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLayoutMenus } from "@/data/api/menus";
import { ButtonLink } from "../shared/ButtonLink";
import { Container } from "../shared/container";
import { NewsletterForm } from "./news-letter-form";

const contactLinks = [
  { label: "+971 52 898 3382", href: "tel:+971528983382", icon: Phone },
  {
    label: "info@woolwich.ac.ae",
    href: "mailto:info@woolwich.ac.ae",
    icon: Mail,
  },
  {
    label: "G-35, Block 2A, Dubai Knowledge Park",
    href: "/contact",
    icon: MapPin,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/TheWoolwichInstitute/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-woolwich-institute/",
  },
];

const locations = [
  { city: "Canada", image: "https://flagcdn.com/w80/ca.png" },
  { city: "London", image: "https://flagcdn.com/w80/gb.png" },
  { city: "Dubai", image: "https://flagcdn.com/w80/ae.png" },
  { city: "Kathmandu", image: "https://flagcdn.com/w80/np.png" },
];

/* One opacity scale for the whole footer instead of a dozen one-offs. */
const bodyText = "text-white/70";
const quietText = "text-white/55";
const hairline = "border-white/15";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export async function Footer() {
  const { footerGroups, bottomNavigation } = await getLayoutMenus();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
      <Container className="py-12 sm:py-14 lg:py-16">
        <section
          aria-labelledby="footer-admissions-heading"
          className={`grid gap-7 border-b ${hairline} pb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10`}
        >
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-invert">Admissions desk</span>
            <h2
              id="footer-admissions-heading"
              className="mt-4 max-w-2xl text-balance font-heading text-3xl font-normal leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Study British-quality vocational programs from Dubai.
            </h2>
            <p
              className={`mt-5 max-w-2xl text-base leading-8 ${bodyText} sm:text-lg`}
            >
              Get guidance on courses, scholarships, documents, and progression
              routes before you apply.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink
              href="/apply"
              aria-label="Apply now"
              intent="primary"
              surface="dark"
            >
              Apply now
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/971528983382"
              aria-label="WhatsApp admissions"
              intent="secondary"
              surface="dark"
            >
              <MessageCircle aria-hidden="true" />
              WhatsApp admissions
            </ButtonLink>
          </div>
        </section>

        <div className="grid gap-10 py-10 lg:grid-cols-[1.08fr_1.35fr_0.92fr] lg:gap-12 xl:gap-16">
          <section aria-labelledby="footer-brand-heading" className="min-w-0">
            <h2 id="footer-brand-heading" className="sr-only">
              The WoolWich College Dubai
            </h2>
            <Link
              href="/"
              aria-label={`The WoolWich College Dubai homepage`}
              className={`motion-link inline-flex no-underline ${focusRing}`}
            >
              <Image
                src="/twi-white.svg"
                alt=""
                width={260}
                height={87}
                unoptimized
                className="h-12 w-auto"
              />
            </Link>

            <p className={`mt-7 max-w-sm text-base leading-8 ${bodyText}`}>
              The WoolWich College Dubai is a leading provider of
              British-quality vocational education in the UAE.
            </p>

            <ul className="mt-7 space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`motion-link inline-flex items-start gap-3 text-sm font-medium leading-6 ${bodyText} no-underline transition-colors hover:text-white ${focusRing}`}
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-white/45"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <nav
            aria-label="Footer navigation"
            className="grid gap-8 sm:grid-cols-3"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-white/50 font-mono">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`motion-link inline-flex text-sm leading-6 ${bodyText} no-underline transition-colors hover:text-white ${focusRing}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <aside
            aria-labelledby="footer-newsletter-heading"
            className="min-w-0"
          >
            <h2
              id="footer-newsletter-heading"
              className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-white/50"
            >
              Subscribe newsletter
            </h2>
            <p className={`mt-5 text-sm leading-7 ${bodyText}`}>
              Get updates on courses, upcoming events, campus activities, and
              important announcements directly in your inbox.
            </p>
            <NewsletterForm />
          </aside>
        </div>

        <section
          aria-labelledby="footer-locations-heading"
          className={`border-y ${hairline} py-10`}
        >
          <div className="grid gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <div>
              <span className="eyebrow eyebrow-invert">Worldwide</span>
              <h2
                id="footer-locations-heading"
                className="mt-4 font-heading text-2xl font-normal tracking-tight text-white"
              >
                Our locations
              </h2>
              <p className={`mt-3 max-w-sm text-sm leading-7 ${bodyText}`}>
                Study hubs and partner presence across four regions.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {locations.map((location) => (
                <li
                  key={location.city}
                  className={`min-w-0 rounded-md border ${hairline} bg-white/[0.06] p-4 text-center`}
                >
                  <span className="relative mx-auto block h-9 w-14 overflow-hidden rounded-sm">
                    <Image
                      src={location.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-white">
                    {location.city}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div
          className={`flex flex-col gap-5 pt-8 text-sm ${quietText} md:flex-row md:items-center md:justify-between`}
        >
          <p>© 2026 The WoolWich College Dubai. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {bottomNavigation.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                className={`motion-link inline-flex font-medium ${bodyText} no-underline transition-colors hover:text-white ${focusRing}`}
              >
                {link.label}
              </Link>
            ))}

            <span
              className={`hidden h-4 w-px bg-white/20 md:block`}
              aria-hidden="true"
            />

            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`motion-link group inline-flex items-center gap-1.5 font-medium ${bodyText} no-underline transition-colors hover:text-white ${focusRing}`}
                aria-label={`${link.label} for The WoolWich College Dubai (opens in a new tab)`}
              >
                {link.label}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
