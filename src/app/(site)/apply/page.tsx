// import type { Metadata } from "next";
// import Image from "next/image";
// import { ArrowRight, BadgeCheck, ClipboardCheck, GraduationCap, MessageCircle } from "lucide-react";
// import { Container } from "@/src/components/shared/container";
// import { ButtonLink } from "@/src/components/ui/button";
// import { ApplyForm } from "@/src/components/sections/apply/apply-form";
// import { getFormBySlug } from "@/src/data/fetch/forms";
// import { fallbackEnrolForm } from "@/src/data/fallback/forms";

// export const metadata: Metadata = {
//   title: "Apply Now | The Woolwich Institute Dubai",
//   description:
//     "Start your application to The Woolwich Institute Dubai. KHDA-licensed, Pearson-approved BTEC programmes with scholarship and UK progression options.",
// };

// const trustSignals = [
//   {
//     title: "KHDA Licensed",
//     description: "Recognised by Dubai's education regulator",
//   },
//   {
//     title: "Pearson Approved",
//     description: "BTEC programmes through approved centre route",
//   },
//   {
//     title: "Scholarships up to 50%",
//     description: "Merit and international student support",
//   },
//   {
//     title: "UK Progression",
//     description: "Bachelor's top-up pathways from Dubai",
//   },
// ];

// const heroProof = [
//   {
//     label: "Application review",
//     description: "Admissions checks eligibility, documents, and programme fit.",
//     icon: <ClipboardCheck className="size-4 text-[var(--brand-teal-strong)]" aria-hidden="true" />,
//   },
//   {
//     label: "Scholarship guidance",
//     description: "Ask about merit and international student support.",
//     icon: <BadgeCheck className="size-4 text-[var(--brand-teal-strong)]" aria-hidden="true" />,
//   },
//   {
//     label: "Pearson pathways",
//     description: "BTEC and HND routes with progression planning.",
//     icon: <GraduationCap className="size-4 text-[var(--brand-teal-strong)]" aria-hidden="true" />,
//   },
// ];

// export default async function ApplyPage() {
//   const enrolForm =
//     (await getFormBySlug("enrol").catch(() => fallbackEnrolForm)) ??
//     fallbackEnrolForm;

//   return (
//     <main>
//       <section
//         aria-labelledby="apply-heading"
//         className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--surface)_0%,white_80%)] pt-10"
//       >
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-0 -z-10  bg-[var(--brand-navy)]"
//         />
//         <Container className="py-[clamp(3.5rem,8vw,7rem)]">
//           <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
//             <div className="motion-hero-copy min-w-0 lg:col-span-7">
//               <p className="mb-7 max-w-max border-b border-[var(--brand-teal-strong)] pb-3 text-sm font-semibold leading-none text-[var(--brand-navy)]">
//                 Admissions 2026
//               </p>
//               <h1
//                 id="apply-heading"
//                 className="max-w-[11ch] text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-[var(--brand-navy)] text-balance"
//               >
//                 Start your application with a clear next step.
//               </h1>
//               <p className="mt-6 max-w-[43rem] text-lg leading-8 text-[var(--muted)] text-pretty">
//                 Share your details, choose a programme and intake, then our
//                 admissions team will contact you about eligibility,
//                 scholarships, fees, and enrolment.
//               </p>
//               <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//                 <ButtonLink href="#application-form" intent="primary" size="lg" className="w-full sm:w-auto">
//                   <ArrowRight className="mr-2 size-4" aria-hidden="true" />
//                   Complete Application
//                 </ButtonLink>
//                 <ButtonLink
//                   href="https://wa.me/971528983382"
//                   intent="secondary"
//                   size="lg"
//                   className="w-full sm:w-auto"
//                   aria-label="Contact TWI Dubai admissions on WhatsApp"
//                 >
//                   <MessageCircle className="mr-2 size-4" aria-hidden="true" />
//                   WhatsApp Admissions
//                 </ButtonLink>
//               </div>
//             </div>

//             <div className="motion-hero-media min-w-0 lg:col-span-5">
//               <figure className="relative h-[clamp(22rem,44vw,36rem)] overflow-hidden rounded-[12px] border border-white/70 bg-white">
//                 <Image
//                   src="/images/twi-lecture-hall.jpg"
//                   alt="TWI Dubai lecture hall prepared for students."
//                   fill
//                   sizes="(min-width: 1024px) 38vw, 100vw"
//                   className="object-cover"
//                   preload
//                 />
//               </figure>
//               <div className="mt-3 grid overflow-hidden rounded-[8px] border border-[var(--border)] bg-white sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
//                 {heroProof.map((item) => (
//                   <div
//                     key={item.label}
//                     className="border-b border-[var(--border)] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0"
//                   >
//                     <p className="flex items-center gap-2 text-sm font-bold text-[var(--brand-navy)]">
//                       {item.icon}
//                       {item.label}
//                     </p>
//                     <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </section>

//       <section
//         id="application-form"
//         aria-label="Application form"
//         className="scroll-mt-24 py-[clamp(3rem,6vw,6rem)]"
//       >
//         <Container>
//           <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,44rem)] lg:gap-16">
//             <div className="min-w-0">
//               <p className="text-sm font-semibold text-[var(--brand-teal-strong)]">
//                 WHAT HAPPENS NEXT
//               </p>
//               <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] text-pretty">
//                 After you submit your application
//               </h2>
//               <ol className="mt-8 space-y-6">
//                 <li className="flex gap-4">
//                   <span
//                     aria-hidden="true"
//                     className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal-soft)] text-sm font-bold text-[var(--brand-navy)]"
//                   >
//                     1
//                   </span>
//                   <div>
//                     <h3 className="font-semibold text-[var(--foreground)]">
//                       Application review
//                     </h3>
//                     <p className="mt-1 text-sm leading-6 text-[var(--muted)] text-pretty">
//                       Admissions checks your eligibility, document readiness, and
//                       scholarship potential.
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex gap-4">
//                   <span
//                     aria-hidden="true"
//                     className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal-soft)] text-sm font-bold text-[var(--brand-navy)]"
//                   >
//                     2
//                   </span>
//                   <div>
//                     <h3 className="font-semibold text-[var(--foreground)]">
//                       Counselling call
//                     </h3>
//                     <p className="mt-1 text-sm leading-6 text-[var(--muted)] text-pretty">
//                       An advisor calls you within 48 hours to discuss programme fit,
//                       fees, scholarships, and next steps.
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex gap-4">
//                   <span
//                     aria-hidden="true"
//                     className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal-soft)] text-sm font-bold text-[var(--brand-navy)]"
//                   >
//                     3
//                   </span>
//                   <div>
//                     <h3 className="font-semibold text-[var(--foreground)]">
//                       Offer & enrolment
//                     </h3>
//                     <p className="mt-1 text-sm leading-6 text-[var(--muted)] text-pretty">
//                       Receive your offer letter, complete enrolment, and begin your TWI
//                       Dubai journey.
//                     </p>
//                   </div>
//                 </li>
//               </ol>
//             </div>

//             <div className="min-w-0">
//               <div className="rounded-[8px] border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
//                 <ApplyForm form={enrolForm} />
//               </div>
//             </div>
//           </div>
//         </Container>
//       </section>

//       <section
//         aria-label="Accreditation and trust"
//         className="scroll-mt-24 bg-[var(--surface)] py-[clamp(3rem,6vw,6rem)]"
//       >
//         <Container>
//           <div className="mx-auto max-w-[48rem] text-center">
//             <p className="text-sm font-semibold text-[var(--brand-teal-strong)]">
//               VERIFIED & LICENSED
//             </p>
//             <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] text-pretty">
//               A qualification you can trust
//             </h2>
//             <p className="mx-auto mt-4 max-w-[36rem] leading-7 text-[var(--muted)] text-pretty">
//               The Woolwich Institute Dubai is licensed by the Knowledge and Human
//               Development Authority (KHDA) and approved by Pearson to deliver BTEC
//               qualifications.
//             </p>
//           </div>

//           <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] border border-[var(--border)] sm:grid-cols-4">
//             {trustSignals.map((signal) => (
//               <div
//                 key={signal.title}
//                 className="motion-card flex flex-col items-center gap-2 bg-[var(--background)] p-6 text-center"
//               >
//                 <p className="text-base font-bold text-[var(--foreground)]">
//                   {signal.title}
//                 </p>
//                 <p className="text-sm leading-5 text-[var(--muted)]">
//                   {signal.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-10 text-center">
//             <a
//               href="https://wa.me/971528983382"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="twi-button twi-button-secondary inline-flex min-h-12 items-center justify-center rounded-[2px] px-5 py-3 text-base font-bold no-underline"
//             >
//               Speak to admissions on WhatsApp
//             </a>
//           </div>
//         </Container>
//       </section>
//     </main>
//   );
// }


export default function Page() {
  return (
    <div>Page</div>
  )
}
