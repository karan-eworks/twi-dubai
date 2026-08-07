/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

/**
 * PageHero — The Woolwich Institute, Dubai
 *
 * The repeatable page-opening device for every route (/about, /courses, /admissions…).
 * Its signature is heraldic, taken straight from the crest rather than from generic geometry:
 *
 *   CHIEF     the red bar across the top of the left column carries the page name
 *   FIELD     the navy band that bleeds off the left edge and holds the body copy
 *   ESCUTCHEON the photograph, cut into the shield silhouette, with a brass echo behind it
 *   BEND      one thin red diagonal, the only decorative stroke on the page
 *
 * Swap the four props per page and the identity holds.
 */

import { useId, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import TypeSetComponent from "./typeset-component";

/* ── Brand tokens ───────────────────────────────────────────── */
const NAVY = "#1F3860";
const NAVY_DEEP = "#14243D";
const RED = "#C91F2F";
const STONE = "#EDEAE3";
const BRASS = "#B99653";

/* Shield silhouette, normalised (0–1) for objectBoundingBox clipping */
const SHIELD_UNIT = "M0,0 H1 V0.52 C1,0.78 0.82,0.93 0.5,1 C0.18,0.93 0,0.78 0,0.52 Z";
/* Same silhouette in a 100×125 viewBox, for the drawn outline */
const SHIELD_PATH = "M0,0 H100 V65 C100,97.5 82,116 50,125 C18,116 0,97.5 0,65 Z";

export type PageHeroProps = {
  /** Page name shown in the red chief, e.g. "About the Institute" */
  eyebrow?: string;
  /** Display headline, e.g. "About" */
  title: string;
  /** Standfirst held inside the navy field */
  body?: string;
  imageSrc: string;
  imageAlt?: string;
  /** Flip the shield to the left on alternating pages */
  reverse?: boolean;
  /**
   * Break out of a constrained parent so the field and shield reach the viewport edges.
   * Set false only when the hero is already rendered outside your page container.
   */
  fullBleed?: boolean;
};

/* ── Motion ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const wipeX: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const rise: Variants = {
  hidden: { y: 26, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: "easeInOut", delay: 0.25 },
  },
};

export default function PageHero({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt = "",
  reverse = false,
  fullBleed = true,
}: PageHeroProps) {
  const uid = useId().replace(/[:]/g, "");
  const clipId = `twi-shield-${uid}`;
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const shieldY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -48]);

  const words = title.trim().split(/\s+/);

  return (
    <motion.section
      ref={sectionRef}
      variants={stage}
      initial={reduced ? false : "hidden"}
      animate="shown"
      aria-labelledby={`hero-title-${uid}`}
      className="relative isolate overflow-hidden font-['Archivo',ui-sans-serif,system-ui]"
      style={{
        backgroundColor: STONE,
        ...(fullBleed
          ? {
              width: "100vw",
              maxWidth: "100vw",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
            }
          : null),
      }}
    >
      {/* Shared clip path for the escutcheon */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={SHIELD_UNIT} />
          </clipPath>
        </defs>
      </svg>

      <div
        className={[
          "mx-auto grid max-w-[1400px] mt-12 grid-cols-1 items-center gap-y-12 px-6 pt-16 pb-16 sm:px-10 lg:grid-cols-12 lg:gap-x-14 lg:pt-24 lg:pb-24",
          reverse ? "lg:[direction:rtl]" : "",
        ].join(" ")}
      >
        {/* ── Text column ─────────────────────────────────── */}
        <div className="lg:col-span-7 lg:[direction:ltr]">
          {/* Chief */}
            {eyebrow && (
                    <motion.div variants={rise} className="mb-8 inline-flex">
                        <div
                        className="relative flex items-center gap-3 px-5 py-2.5"
                        style={{ backgroundColor: RED }}
                        >
                        <span
                            aria-hidden
                            className="block h-[9px] w-[9px] rotate-45"
                            style={{ backgroundColor: BRASS }}
                        />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white sm:text-xs">
                            {eyebrow}
                        </span>
                        </div>
                    </motion.div>
            )}

          {/* Headline */}
          <h1
            id={`hero-title-${uid}`}
            className="font-heading text-[clamp(3rem,9vw,7.5rem)] leading-[1.1] tracking-[-0.02em] "
            style={{ color: NAVY_DEEP }}
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em] -mb-4 ">
                <motion.span variants={rise} className="inline-block">
                  {word}
                  {i < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Field — bleeds off the left edge of the viewport */}
          {body && (
              <div className="relative mt-10 lg:mt-14">
                <motion.div
                  aria-hidden
                  variants={wipeX}
                  className="absolute inset-y-0 right-0 left-[-100vw] origin-left"
                  style={{
                    backgroundColor: NAVY,
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 72px) 100%, 0 100%)",
                  }}
                />
                <div className="relative py-10 pr-24 sm:py-12">
                  <motion.div
                    variants={fade}
                    className="line-clamp-2 max-w-[65ch] text-[clamp(1rem,1.15vw,1.175rem)] leading-[1.85] text-white/90! text-opacity-90"
                  >
                    {body ? (
                      
                    <TypeSetComponent content={<div className="text-white/90!"  dangerouslySetInnerHTML={{ __html: body }} />} />
                    ) : null}
                  </motion.div>
                </div>
              </div>
            )}
          
      </div>

        {/* ── Escutcheon ──────────────────────────────────── */}
        <div className="lg:col-span-5 lg:[direction:ltr]">
          <motion.div
            variants={rise}
            style={{ y: shieldY }}
            className="relative mx-auto w-[min(100%,24rem)] lg:mr-0 lg:ml-auto lg:w-full lg:max-w-[28rem]"
          >
            {/* Brass echo, offset behind */}
            <svg
              aria-hidden
              viewBox="0 0 100 125"
              preserveAspectRatio="none"
              className="absolute -right-4 -bottom-5 h-full w-full"
            >
              <motion.path
                variants={draw}
                d={SHIELD_PATH}
                fill="none"
                stroke={BRASS}
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* The photograph, cut to the shield */}
            <div
              className="relative aspect-[4/5] w-full"
              style={{ clipPath: `url(#${clipId})`, backgroundColor: NAVY_DEEP }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 28rem"
                fill
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(31,56,96,0) 45%, rgba(20,36,61,0.55) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bend — the single diagonal stroke */}
      <svg
        aria-hidden
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full"
      >
        <motion.line
          variants={draw}
          x1={reverse ? 0 : 100}
          y1={0}
          x2={reverse ? 62 : 38}
          y2={40}
          stroke={RED}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Base rule closes the hero on every page */}
      <motion.div
        variants={wipeX}
        className="h-[3px] w-full origin-left"
        style={{ backgroundColor: NAVY_DEEP }}
      />
    </motion.section>
  );
}