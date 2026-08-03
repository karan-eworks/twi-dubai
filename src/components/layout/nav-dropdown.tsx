/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
"use client";

import { useId } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/data/types/menus";
import { ButtonLink } from "../shared/ButtonLink";
import { cn } from "@/lib/utils";
import { navItemClasses, useNavMenu } from "../navbar-context";


interface NavDropdownProps {
  item: NavigationItem;
  align?: "start" | "center" | "end";
}

interface PanelContent {
  title: string;
  summary: string;
  // facts: string[];
  featureTitle: string;
  featureText: string;
  ctaLabel: string;
}

const PANEL_CONTENT: Record<string, PanelContent> = {
  courses: {
    title: "Choose a practical study route",
    summary:
      "Compare TWI Dubai programs by subject area, career direction, and progression pathway.",
    // facts: ["Pearson approved", "UK progression routes", "Career-focused learning"],
    featureTitle: "Programs with a next step",
    featureText:
      "Courses are organized around practical outcomes, so students and parents can quickly understand fit, cost, and progression.",
    ctaLabel: "View all courses",
  },
  admissions: {
    title: "Move from enquiry to application",
    summary:
      "Find the fastest route to admissions support, fee guidance, scholarships, and application next steps.",
    // facts: ["Scholarships up to 50%", "Advisor support", "Clear fee guidance"],
    featureTitle: "Admissions made readable",
    featureText:
      "Start with the application path, then confirm scholarships, payment options, and the right person to speak with.",
    ctaLabel: "Start application",
  },
  "student-services": {
    title: "Plan student support in Dubai",
    summary:
      "Get practical information for accommodation, payments, and student life before arrival.",
    // facts: ["Accommodation guidance", "Payment support", "Student services"],
    featureTitle: "Support beyond the classroom",
    featureText:
      "Helpful for international students and parents checking living arrangements, payments, and campus support.",
    ctaLabel: "View services",
  },
  activities: {
    title: "See learning beyond classes",
    summary:
      "Explore workshops, seminars, and international programs that support employability and student confidence.",
    // facts: ["Workshops", "Seminars", "International programs"],
    featureTitle: "A more active campus rhythm",
    featureText:
      "Activities show how students build practical experience, meet peers, and connect study with future work.",
    ctaLabel: "Explore activities",
  },
  updates: {
    title: "Follow the institute",
    summary:
      "Read updates, meet the team, and find events or partnership information without searching through a catch-all menu.",
    // facts: ["Institute updates", "Events", "Partnerships"],
    featureTitle: "Clearer than an 'Others' menu",
    featureText:
      "News, events, teams, and partnerships now sit together as public institute information.",
    ctaLabel: "Read updates",
  },
};

/** Preferred match: the section's own href. */
const CONTENT_KEY_BY_HREF: Record<string, keyof typeof PANEL_CONTENT> = {
  "/courses": "courses",
  "/apply": "admissions",
  "/admissions": "admissions",
  "/student-services": "student-services",
  "/student-services/accommodation": "student-services",
  "/activities": "activities",
  "/blogs": "updates",
  "/news": "updates",
};

/** Fallback for sections whose trigger has no real href of its own —
 *  several of them currently share a placeholder. */
const CONTENT_KEY_BY_LABEL: Record<string, keyof typeof PANEL_CONTENT> = {
  courses: "courses",
  programs: "courses",
  programmes: "courses",
  admissions: "admissions",
  apply: "admissions",
  activities: "activities",
  "student services": "student-services",
  others: "updates",
  "news & events": "updates",
  news: "updates",
};

function resolvePanelContent(item: NavigationItem): PanelContent {
  const byHref = CONTENT_KEY_BY_HREF[item.href];
  const byLabel = CONTENT_KEY_BY_LABEL[item.label.trim().toLowerCase()];
  const key = byHref ?? byLabel;

  if (key) return PANEL_CONTENT[key];

  return {
    title: item.label,
    summary: item.description ?? "Find the most relevant pages in this section.",
    // facts: ["TWI Dubai", "Student support", "Admissions guidance"],
    featureTitle: "Helpful links",
    featureText:
      "This section groups related pages so students, parents, and agents can move faster.",
    ctaLabel: `View ${item.label}`,
  };
}

const panelPositionClass: Record<NonNullable<NavDropdownProps["align"]>, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export function NavDropdown({ item, align = "center" }: NavDropdownProps) {
  const instanceId = useId();
  const panelId = `${instanceId}-panel`;
  const buttonId = `${instanceId}-button`;
  const reduceMotion = useReducedMotion();
  const { activeKey, surface, switching, openMenu, closeMenu, toggleMenu, keepOpen } =
    useNavMenu();

  // Identity comes from the component instance, not the href. Several nav
  // sections share a placeholder href, and keying on it opened every matching
  // panel at once.
  const menuKey = instanceId;
  const isOpen = activeKey === menuKey;

  const panelContent = resolvePanelContent(item);
  const hasOwnPage = Boolean(item.href) && item.href !== "#";

  // Crossfade when swapping panels, full entrance when opening from closed.
  const duration = reduceMotion ? 0 : switching ? 0.16 : 0.26;
  const offset = reduceMotion || switching ? 0 : 8;

  if (!item.children?.length) return null;

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => openMenu(menuKey)}
      onMouseLeave={() => closeMenu(menuKey)}
      onFocus={() => openMenu(menuKey)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeMenu(menuKey);
        }
      }}
    >
      <button
        type="button"
        id={buttonId}
        onClick={() => toggleMenu(menuKey)}
        className={navItemClasses(surface, isOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
      >
        <span className="text-nowrap">{item.label}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={cn(
            "opacity-60 transition-transform duration-200 ease-out",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            aria-labelledby={buttonId}
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0, transition: { duration: reduceMotion ? 0 : 0.12 } }}
            transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
            className={cn(
              "absolute top-[calc(100%+14px)] z-50 w-[min(42rem,calc(100vw-3rem))] origin-top rounded-lg border border-border bg-popover text-popover-foreground shadow-xl",
              // Invisible bridge across the 14px gap, so a diagonal pointer move
              // from trigger to panel never drops the hover.
              "before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['']",
              panelPositionClass[align],
            )}
            onMouseEnter={keepOpen}
            onMouseLeave={() => closeMenu(menuKey)}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_17rem] overflow-hidden rounded-lg">
              <div className="min-w-0 p-5">
                <div className="flex items-start justify-between gap-5 border-b border-border pb-4">
                  <div className="min-w-0">
                    <span className="eyebrow">{item.label}</span>
                    <p className="mt-2 max-w-136 text-lg font-semibold leading-6 tracking-tight text-foreground">
                      {panelContent.title}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      {panelContent.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group flex items-start justify-between gap-4 rounded-sm px-3 py-3 text-left no-underline transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-5 text-foreground">
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="mt-1 block max-w-136 text-sm leading-5 text-muted-foreground">
                            {child.description}
                          </span>
                        ) : null}
                      </span>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 rtl:-scale-x-100"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="bg-muted p-5">
                <div className="mt-5">
                  <p className="text-base font-semibold leading-6 tracking-tight text-foreground">
                    {panelContent.featureTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {panelContent.featureText}
                  </p>
                </div>

                {hasOwnPage ? (
                  <ButtonLink href={item.href} intent="tertiary" size="sm" className="mt-5">
                    {panelContent.ctaLabel}
                    <ArrowRight aria-hidden="true" />
                  </ButtonLink>
                ) : null}
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}