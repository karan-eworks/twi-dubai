/** biome-ignore-all lint/a11y/noAriaHiddenOnFocusable: <explanation> */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Container } from "../shared/container";

export interface HeroProgramme {
  id: string;
  label: string;
  award: string;
  duration: string;
  summary: string;
  href: string;
}

export interface HeroProof {
  label: string;
  detail: string;
}

export interface HeroMedia {
  /** Poster frame, and the fallback whenever the video can't or shouldn't play. */
  image: string;
  /** Optional. When present it autoplays muted on loop behind the content. */
  video?: string;
}

const defaultProgrammes: HeroProgramme[] = [
  {
    id: "acca",
    label: "ACCA Programme",
    award: "ACCA",
    duration: "36 months",
    summary:
      "Applied Knowledge through to Strategic Professional, taught on campus with evening sessions for students already working.",
    href: "/courses/acca",
  },
  {
    id: "business",
    label: "Business Management",
    award: "Pearson BTEC",
    duration: "24 months",
    summary:
      "Management, marketing, and finance foundations with a placement year across Dubai's commercial sector, and a UK top-up in year three.",
    href: "/courses/business",
  },
  {
    id: "computing",
    label: "Computing",
    award: "Pearson BTEC",
    duration: "24 months",
    summary:
      "Software development, networks, and data, taught against the tooling teams actually use, with a live client brief in the final term.",
    href: "/courses/computing",
  },
  {
    id: "hospitality",
    label: "Hospitality Management",
    award: "Pearson BTEC",
    duration: "24 months",
    summary:
      "Operations and service management, with placements across Dubai hotels, venues, and restaurant groups from the second term.",
    href: "/courses/hospitality",
  },
];

const defaultProof: HeroProof[] = [
  { label: "KHDA licensed", detail: "Dubai regulated" },
  { label: "Pearson approved", detail: "BTEC routes" },
  { label: "Scholarships to 50%", detail: "Merit support" },
  { label: "42 nationalities", detail: "On campus" },
];

const defaultMedia: HeroMedia = {
  image:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=2400&h=1400&fit=crop&q=80&auto=format",
};

export function Hero({
  programmes = defaultProgrammes,
  proof = defaultProof,
  media = defaultMedia,
}: {
  programmes?: HeroProgramme[];
  proof?: HeroProof[];
  media?: HeroMedia;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    programmes[0]?.id ?? null,
  );
  const reduceMotion = useReducedMotion();
  const selected = programmes.find((p) => p.id === selectedId) ?? programmes[0];

  // Motion-sensitive visitors get the poster frame, never a looping video.
  const showVideo = Boolean(media.video) && !reduceMotion;

  const rise = {
    hidden: { y: reduceMotion ? 0 : 22, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-navy-950 pt-32 sm:pt-36"
    >
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.image}
          aria-hidden="true"
          className="absolute inset-0 -z-20 size-full object-cover"
        >
          <source src={media.video} type="video/mp4" />
        </video>
      ) : (
        <motion.div
          initial={{ scale: reduceMotion ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.6, ease: "easeOut" }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src={media.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Legibility: dark at the bottom-left where the type sits, open at the top */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/15"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent"
      />

      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="grid items-end gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-14 lg:pb-16"
        >
          <div className="min-w-0 text-white">
            <motion.h1
              id="hero-heading"
              variants={rise}
              className="mt-5 text-balance font-heading text-6xl font-normal leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Discover your path
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-10 max-w-2xl border-s-2 border-cannon-500 ps-5 text-base leading-7 text-white/80 sm:text-lg sm:leading-8"
            >
              KHDA-licensed, Pearson-approved study in Dubai, with scholarships
              and UK progression routes.
            </motion.p>
          </div>

          {/* Instant Check out Form */}

          {/* <motion.aside
            variants={rise}
            aria-labelledby="enrolment-check-heading"
            className="w-full rounded-md border border-white/15 border-t-2 border-t-cannon-500 bg-navy-950/75 p-7 text-white backdrop-blur-xl sm:p-9"
          >
            <h2
              id="enrolment-check-heading"
              className="font-heading text-3xl leading-tight"
            >
              Instant enrolment check
            </h2>
            <p className="mt-2 text-base leading-7 text-white/60">
              Pick your programme and speak with admissions now.
            </p>

            <label
              htmlFor="hero-course-interest"
              className="datum mt-8 block text-[11px] uppercase tracking-[0.14em] text-white/55"
            >
              Course interest
            </label>

            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger
                id="hero-course-interest"
                className="mt-3 h-14 w-full rounded-sm border-white/20 bg-white/10 text-base text-white focus-visible:ring-cannon-500/60"
              >
             
                <SelectValue placeholder="Select a programme">
                  {selected?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-sm border-white/15 bg-navy-900 text-white">
                {programmes.map((programme) => (
                  <SelectItem
                    key={programme.id}
                    value={programme.id}
                    className="focus:bg-white/10 focus:text-white"
                  >
                    {programme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: "easeOut",
                }}
                className="mt-5 border-s-2 border-white/20 ps-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-base font-semibold">{selected?.label}</p>
                  <p className="datum text-[11px] uppercase tracking-[0.12em] text-cannon-300">
                    {selected?.award} · {selected?.duration}
                  </p>
                </div>
                <p className="mt-2 line-clamp-4 text-base leading-7 text-white/60">
                  {selected?.summary}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={selected?.href ?? "/apply"}
                intent="primary"
                surface="dark"
                size="lg"
                fullWidth
              >
                Enrol now
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                intent="secondary"
                surface="dark"
                size="lg"
                fullWidth
              >
                Contact admissions
              </ButtonLink>
            </div>
          </motion.aside> */}
        </motion.div>
      </Container>

      {/* Proof runs the full width of the hero as a base rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          delay: reduceMotion ? 0 : 0.7,
        }}
        className="border-t border-white/15 bg-navy-950/50 backdrop-blur-md"
      >
        <Container>
          <ul className="grid grid-cols-2 divide-white/15 sm:grid-cols-4 sm:divide-x">
            {proof.map((item) => (
              <li
                key={item.label}
                className="px-1 py-5 first:ps-0 sm:px-5 sm:first:ps-0"
              >
                <span className="block text-sm font-semibold text-white">
                  {item.label}
                </span>
                <span className="datum mt-1 block text-[11px] uppercase tracking-[0.12em] text-white/55">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </motion.div>
    </section>
  );
}
