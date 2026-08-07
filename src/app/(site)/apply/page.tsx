import type { Metadata } from "next";
import {
  ClipboardCheck,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  SlidersHorizontal,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import PageHero from "@/components/shared/page-hero";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ApplyForm } from "@/components/apply/apply-form";
import { getFormBySlug } from "@/data/api/forms";
import { getCourses } from "@/data/api/courses";
import {
  courseOptions,
  normalizeEnrolForm,
} from "@/data/format-data/apply-form";
import type { CourseApiItem } from "@/data/types/courses";

const APPLY_HERO = {
  eyebrow: "Admissions 2026",
  title: "Apply to study with us",
  description:
    "Share your details, choose a programme and intake, and the admissions team will guide you through eligibility, scholarships, and enrolment.",
   src: "https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};



const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Application review",
    body: "Admissions checks your eligibility, document readiness, and scholarship potential.",
  },
  {
    icon: SlidersHorizontal,
    title: "Counselling call",
    body: "An advisor calls within one working day to talk programme fit, fees, and next steps.",
  },
  {
    icon: GraduationCap,
    title: "Offer and enrolment",
    body: "Receive your offer letter, complete enrolment, and begin your journey at TWI Dubai.",
  },
];

const TRUST = [
  { label: "KHDA Licensed", detail: "Dubai's education regulator" },
  { label: "Pearson Approved", detail: "BTEC programme routes" },
  { label: "Scholarships to 50%", detail: "Merit and need support" },
  { label: "UK Progression", detail: "Bachelor's top-up pathways" },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Apply | The Woolwich Institute Dubai",
    description:
      "Apply to study at The Woolwich Institute Dubai. KHDA-licensed, Pearson-approved BTEC and ACCA programmes with scholarships and UK progression routes.",
    alternates: { canonical: "https://www.woolwich.ac.ae/apply" },
    openGraph: {
      title: "Apply | The Woolwich Institute Dubai",
      description:
        "Start your application to The Woolwich Institute Dubai — KHDA-licensed, Pearson-approved study with UK progression.",
      url: "https://www.woolwich.ac.ae/apply",
      siteName: "The Woolwich Institute Dubai",
      images: ["/images/twi-classroom-study.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Apply | The Woolwich Institute Dubai",
      description:
        "Start your application to The Woolwich Institute Dubai.",
      images: ["/images/twi-classroom-study.jpg"],
    },
  };
}

export default async function ApplyPage() {
  const [form, courses] = await Promise.all([
    getFormBySlug("enrol").catch(() => null),
    getCourses().catch(() => null),
  ]);

  const availableCourses: CourseApiItem[] = courses?.data ?? [];
  const config = form ? normalizeEnrolForm(form) : null;

  return (
    <main>
      <PageHero
        eyebrow={APPLY_HERO.eyebrow}
        title={APPLY_HERO.title}
        body={APPLY_HERO.description}
        imageSrc={APPLY_HERO.src}
        imageAlt="Students on the TWI Dubai campus"
      />

      {/* ── Application ─────────────────────────────────────── */}
      <section aria-labelledby="apply-heading" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            <div className="min-w-0">
              <span className="eyebrow">Your application</span>
              <h1
                id="apply-heading"
                className="mt-4 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
              >
                Start your application
              </h1>
              <p className="mt-5 max-w-prose text-base leading-7 text-muted-foreground sm:text-lg">
                Share a few details and the admissions team will take it from
                there — no payment now, no obligation.
              </p>

              <ol className="mt-10 grid gap-4 sm:grid-cols-3">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.title}
                      className="rounded-md border border-border bg-card p-5"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className="size-5 text-navy-400"
                        />
                        <span className="datum text-xs uppercase tracking-[0.12em] text-muted-foreground">
                          Step {index + 1}
                        </span>
                      </div>
                      <h2 className="mt-3 font-semibold leading-6 text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.body}
                      </p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 border-t border-border pt-10">
                {config ? (
                  <ApplyForm config={config} courseOptions={courseOptions(availableCourses)} />
                ) : (
                  <div className="rounded-md border border-border bg-stone-50 p-8">
                    <h2 className="font-heading text-2xl leading-tight text-foreground">
                      Application form unavailable
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      The enrolment form is temporarily offline. Email
                      admissions or WhatsApp the team and they will take your
                      details directly.
                    </p>
                  </div>
                )}
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
                    Questions before you apply?
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-6 text-foreground">
                    Admissions desk
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Talk through eligibility, documents, fees, and intakes with a
                    real advisor.
                  </p>

                  <div className="mt-5 grid gap-2">
                    <ButtonLink
                      href="https://wa.me/971528983382?text=Hello%20Admissions%2C%20I%20have%20a%20question%20about%20applying"
                      intent="secondary"
                      fullWidth
                    >
                      <MessageCircle aria-hidden="true" />
                      WhatsApp admissions
                    </ButtonLink>
                    <ButtonLink
                      href="tel:+971528983382"
                      intent="tertiary"
                      fullWidth
                    >
                      <Phone aria-hidden="true" />
                      Call +971 52 898 3382
                    </ButtonLink>
                    <ButtonLink
                      href="mailto:admissions@woolwich.ac.ae"
                      intent="tertiary"
                      fullWidth
                    >
                      <Mail aria-hidden="true" />
                      Email admissions
                    </ButtonLink>
                  </div>

                  <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="datum text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        Response time
                      </dt>
                      <dd className="text-foreground">Within one working day</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="datum text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        No obligation
                      </dt>
                      <dd className="text-foreground">First call is free</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Trust ──────────────────────────────────────────── */}
      <section aria-labelledby="trust-heading" className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="border-t border-border pt-10">
            <span className="eyebrow">Verified</span>
            <h2
              id="trust-heading"
              className="mt-4 font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              A British-quality qualification you can trust
            </h2>

            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
              {TRUST.map((item) => (
                <li key={item.label} className="bg-card p-6">
                  <p className="font-semibold leading-6 text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}