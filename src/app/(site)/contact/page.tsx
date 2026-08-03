import type { Metadata } from "next";
import { Container } from "@/src/components/shared/container";
import { ContactHero } from "@/src/components/sections/contact/contact-hero";
import { ContactForm } from "@/src/components/sections/contact/contact-form";
import { ContactInfo } from "@/src/components/sections/contact/contact-info";
import { ContactCta } from "@/src/components/sections/contact/contact-cta";
import { getFormBySlug } from "@/src/data/fetch/forms";
import { fallbackContactForm } from "@/src/data/fallback/forms";
import { trustSignals } from "@/src/data/mock-data/contact";

export const metadata: Metadata = {
  title: "Contact Us | The Woolwich Institute Dubai",
  description:
    "Get in touch with The Woolwich Institute Dubai admissions. KHDA-licensed, Pearson-approved BTEC programmes with scholarship and UK progression options.",
};

export default async function ContactPage() {
  const contactForm =
    (await getFormBySlug("contact").catch(() => fallbackContactForm)) ??
    fallbackContactForm;

  return (
    <main>
      <ContactHero />

      <section
        id="contact-form"
        aria-label="Contact form and details"
        className="scroll-mt-24 py-[clamp(3rem,6vw,6rem)]"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,44rem)] lg:gap-16">
            <div className="min-w-0 lg:order-last">
              <p className="text-sm font-semibold text-[var(--brand-teal-strong)]">
                OUR LOCATION
              </p>
              <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] text-pretty">
                Visit us or get in touch
              </h2>
              <p className="mt-4 leading-7 text-[var(--muted)] text-pretty">
                Our campus is located in the heart of Dubai. We welcome walk-in enquiries
                during working hours and offer campus tours for prospective students and
                their families.
              </p>
              <div className="mt-8">
                <ContactInfo />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--brand-teal-strong)]">
                SEND US A MESSAGE
              </p>
              <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] text-pretty">
                Enquire online
              </h2>
              <p className="mt-4 leading-7 text-[var(--muted)] text-pretty">
                Fill in the form below and our admissions team will get back to you within
                48 hours.
              </p>
              <div className="mt-6 rounded-[8px] border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
                <ContactForm form={contactForm} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta />

      <section
        aria-label="Accreditation and trust"
        className="scroll-mt-24 bg-[var(--surface)] py-[clamp(3rem,6vw,6rem)]"
      >
        <Container>
          <div className="mx-auto max-w-[48rem] text-center">
            <p className="text-sm font-semibold text-[var(--brand-teal-strong)]">
              VERIFIED & LICENSED
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] text-pretty">
              A qualification you can trust
            </h2>
            <p className="mx-auto mt-4 max-w-[36rem] leading-7 text-[var(--muted)] text-pretty">
              The Woolwich Institute Dubai is licensed by the Knowledge and Human
              Development Authority (KHDA) and approved by Pearson to deliver BTEC
              qualifications.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] border border-[var(--border)] sm:grid-cols-4">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="motion-card flex flex-col items-center gap-2 bg-[var(--background)] p-6 text-center"
              >
                <p className="text-base font-bold text-[var(--foreground)]">
                  {signal.title}
                </p>
                <p className="text-sm leading-5 text-[var(--muted)]">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
