"use client";

/**
 * DetailHero — the opening device for every detail page (blog, news, event,
 * programme).
 *
 * The artefact's own cover image carries the field, held down by a navy scrim
 * so white type keeps its contrast over any photograph the CMS supplies.
 *
 * Everything type-specific arrives through `meta` — Published/Author/Reading
 * time for an article, Date/Venue for an event, Award/Duration/Intake for a
 * programme — so the four page types open the same way.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "../shared/container";

export interface DetailHeroMeta {
  label: string;
  value: ReactNode;
}

interface DetailHeroProps {
  backHref: string;
  backLabel: string;
  title: string;
  meta?: DetailHeroMeta[];
  tags?: string[];
  imageSrc: string;
  imageAlt?: string;
  /** Share row, apply button — anything the page owns. */
  actions?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

const rise: Variants = {
  hidden: { y: 22, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const field: Variants = {
  hidden: { scale: 1.06, opacity: 0 },
  shown: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

export function DetailHero({
  backHref,
  backLabel,
  title,
  meta = [],
  tags = [],
  imageSrc,
  imageAlt = "",
  actions,
}: DetailHeroProps) {
  const reduced = useReducedMotion();
  const words = title.trim().split(/\s+/);

  return (
    <motion.section
      variants={stage}
      initial={reduced ? false : "hidden"}
      animate="shown"
      aria-labelledby="detail-hero-title"
      className="relative isolate flex min-h-[30rem] w-screen max-w-[100vw] items-end overflow-hidden bg-navy-950 text-white mx-[calc(50%-50vw)] lg:min-h-[34rem]"
    >
      {/* Held well back: CMS covers are usually share cards with their own
          headline set into them, and at full strength that type competes with
          the h1. At this weight any cover — card or photograph — reads as
          texture on the navy field. */}
      <motion.div variants={field} className="absolute inset-0 -z-20">
        {/* The weight lives on the image, not the wrapper: the wrapper's
            opacity is animated and would overwrite it. Small screens hold the
            cover back further — there is no room for the horizontal scrim, so
            it sits directly under the headline. */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20 sm:opacity-35"
        />
      </motion.div>

      {/* Two scrims: the horizontal one keeps the type column at full contrast,
          the vertical one clears the header and closes the field at the foot. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.201_0.042_260.7/0.72)_0%,oklch(0.201_0.042_260.7/0.48)_45%,oklch(0.201_0.042_260.7/0.08)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.201_0.042_260.7/0.38)_0%,oklch(0.201_0.042_260.7/0.04)_45%,oklch(0.201_0.042_260.7/0.22)_100%)]"
      />

      <Container>
        {/* Top padding clears the fixed site header, which sits over the field */}
        <div className="max-w-3xl pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
          <motion.div variants={rise}>
            <Link
              href={backHref}
              className="datum inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/80 no-underline transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 rtl:-scale-x-100"
              />
              {backLabel}
            </Link>
          </motion.div>

          <h1
            id="detail-hero-title"
            className="mt-7 max-w-[17ch] font-heading text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.06] tracking-tight text-balance"
          >
            {words.map((word, index) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: word order is fixed for a given title
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.06em]"
              >
                <motion.span variants={rise} className="inline-block">
                  {/* Non-breaking: a plain space collapses at an inline-block edge */}
                  {word}
                  {index < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          {meta.length > 0 ? (
            <motion.dl
              variants={rise}
              className="mt-9 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/25 pt-6"
            >
              {meta.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="datum text-[10px] uppercase tracking-[0.16em] text-white/75">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-6 text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          ) : null}

          {tags.length > 0 ? (
            <motion.ul variants={rise} className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="datum rounded-sm border border-white/30 bg-navy-950/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/85"
                >
                  {tag}
                </li>
              ))}
            </motion.ul>
          ) : null}

          {actions ? (
            <motion.div variants={rise} className="mt-9">
              {actions}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </motion.section>
  );
}
