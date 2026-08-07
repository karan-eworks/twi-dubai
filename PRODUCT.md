# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective students deciding where to study in Dubai. Three overlapping audiences, all using the site to shortlist and apply:

- School leavers and career changers in the UAE/GCC weighing a vocational qualification;
- International students relocating to Dubai (visa, accommodation, and document support matters);
- Working professionals studying part-time/evenings while employed.

Admissions staff are the operators behind the enquiry/application forms.

## Product Purpose

The Woolwich Institute Dubai is a KHDA-licensed, Pearson-approved vocational college in Dubai. The site's job is to convert an enquiry into an application: visitors check programme fit, verify accreditation and progression, then contact or apply. Success is a qualified application or admission enquiry, not a page view.

## Positioning

British-quality vocational education taught in Dubai that ladders into UK bachelor's top-up routes. The claim that a neighbouring provider could not truthfully copy: Pearson BTEC programmes delivered from a Dubai Knowledge Park campus with mapped UK progression (e.g. a UK top-up in year three) — plus evening sessions and instalment plans that make study viable alongside work.

## Operating Context

- Primary admissions channel is web enquiry plus WhatsApp/phone: +971 52 898 3382, WhatsApp wa.me/971528983382, info@woolwich.ac.ae.
- Campus at G-35, Block 2A, Dubai Knowledge Park; "study hubs / partner presence" also claimed in Canada, London, and Kathmandu.
- Intake cycle is term-based; current marketing frames a September intake ("September 2026 intake" appears in live hero copy).
- Content and media come from a headless REST CMS (public endpoints on woolwich.ac.ae), so editorial copy, programmes, events, news, and blogs can change without a code deploy.

## Capabilities and Constraints

- Programmes: ACCA (36 months, evening sessions); Pearson BTEC Business Management, Computing, Hospitality Management (24 months, with placements and a UK top-up year).
- Accreditation and proof claims: KHDA-licensed, Pearson-approved, scholarships to 50% (merit), 42 nationalities on campus.
- Static pages (about, teams, course detail, news, events, blogs, CMS catch-all) render CMS content; the apply page is currently a stub rendering a bare placeholder.
- Contact/enquiry forms integrate a CMS form engine and reCAPTCHA.
- Site is English-only today; an Arabic font stack is defined in the theme but no Arabic content is rendered.
- Headless CMS endpoints used: pages, courses, course-departments, news, events, blogs, teams, menus, forms. Rendering is ISR with tag-based revalidation.
- Deliberately undecided: exact fee schedule, application form availability, and marketing dates beyond the current intake frame.

## Brand Commitments

- Official name (confirmed by user): **The Woolwich Institute Dubai** (abbreviated TWI).
- Existing logo assets: `/twi.png` (navy-on-white) and `/twi-white.svg` (reverse).
- Colors derive from the logo: navy `#1F3860` and cannon red `#C91F2F`; brass is reserved for seals/accreditation marks.
- Known inconsistency to reconcile: footer and some meta titles use the variant spelling "The WoolWich College Dubai"; copyright reads "© 2026 The WoolWich College Dubai".
- Contact details and social profiles (Instagram, Facebook, LinkedIn) are published on the site and are binding.

## Evidence on Hand

- Real: programme list, contact details, campus address, social links, KHDA/Pearson/scholarship/nationality claims, and CMS content from the live woolwich.ac.ae API.
- Not real, must not be presented as authentic: homepage hero image is a generic Unsplash stock photo; video testimonials are placeholders (Unsplash portraits + generic sample clips, with invented quotes and names); no real student outcomes, videos, or case-study assets exist yet.

## Product Principles

1. Trust is the conversion lever — lead with KHDA licensing, Pearson approval, and accredited UK progression at every decision point.
2. Serve all three audiences at once: shortlisters, relocators, and working adults — keep the enrolment path obvious for each.
3. Make the route from Dubai study to a UK qualification legible and explicit, never buried.
4. Every claim on the page must be backed by real evidence; never dress placeholders (testimonials, imagery, numbers) as authentic.

## Accessibility & Inclusion

Motion is already handled with reduced-motion support and visible focus states across the interface. No product-specific accessibility standard was established; preserve existing motion-safe behaviour.
