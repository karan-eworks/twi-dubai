"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavigationItem } from "@/data/types/menus";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  NavMenuProvider,
  type NavSurface,
  navItemClasses,
} from "../navbar-context";
import { ButtonLink } from "../shared/ButtonLink";
import { NavDropdown } from "./nav-dropdown";

interface NavbarProps {
  primaryNavigation?: NavigationItem[];
  /** Pass "dark" on pages whose hero is navy, so the bar inverts. */
  surface?: NavSurface;
}

export function Navbar({ primaryNavigation, surface = "light" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Once the bar has a solid background, it is always a light surface.
  const barSurface: NavSurface = scrolled ? "light" : surface;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isHome = pathname === "/" || pathname.startsWith("/blogs/");

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: ease.expo, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            // Same gutters as <Container>, so the logo lines up with the
            // content edge of every section below it.
            "mx-auto flex w-full items-center justify-between px-5 py-5 transition-all duration-500 sm:px-8 lg:px-12",
            scrolled &&
              "border-b border-border/70 bg-background/80 px-6 py-3.5 shadow-[0_8px_30px_-16px_oklch(0.227_0.047_260.4/0.35)] backdrop-blur-xl sm:px-8 lg:px-12",
          )}
        >
          <div className="mx-auto flex w-full max-w-[105rem] items-center justify-between gap-6">
            <Link
              href="/"
              className="motion-link group flex min-w-0 items-center self-stretch no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              aria-label="The Woolwich Institute Dubai — homepage"
            >
              {scrolled ? (
                <Image
                  src="/twi.png"
                  alt="The Woolwich Institute Dubai"
                  width={210}
                  height={70}
                  priority
                  unoptimized
                  className="h-14 w-auto"
                />
              ) : (
                <Image
                  src={isHome ? "/twi-white.svg" : "/twi.png"}
                  alt="The Woolwich Institute Dubai"
                  width={210}
                  height={70}
                  priority
                  unoptimized
                  className="h-14 w-auto"
                />
              )}
            </Link>

            <NavMenuProvider surface={barSurface}>
              {/* The full nav plus the Apply button does not fit at md — it
                  pushed the button past the viewport. Desktop bar starts at lg. */}
              <nav className="hidden items-center gap-7 lg:flex lg:gap-9">
                {primaryNavigation?.map((item, index: number) =>
                  item.children ? (
                    <NavDropdown
                      // biome-ignore lint/suspicious/noArrayIndexKey: hrefs can repeat across sections
                      key={item.href + index}
                      item={item}
                      align={
                        item.label === "News & Events"
                          ? "end"
                          : item.label === "Courses"
                            ? "start"
                            : "center"
                      }
                      scrolled={scrolled}
                      isHome={isHome}
                    />
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        navItemClasses(barSurface, pathname === item.href),
                        isHome && !scrolled && "text-white/90",
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </NavMenuProvider>

            <div className="hidden lg:block">
              <ButtonLink
                href="/apply"
                size="md"
                surface={barSurface === "dark" ? "dark" : "light"}
              >
                Apply now
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-sm border transition-colors lg:hidden",
                barSurface === "dark"
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:bg-muted",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 6%)" }}
            animate={{ clipPath: "circle(150% at 90% 6%)" }}
            exit={{ clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: ease.inOut }}
            className="fixed inset-0 z-60 flex flex-col bg-navy-500 text-white lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              {/* The logo artwork is navy on white, so it needs a plate here.
                  Swap in a reversed export when you have one. */}
              <span className="inline-flex rounded-sm bg-white px-2.5 py-1.5">
                <Image
                  src="/twi.png"
                  alt="The Woolwich Institute Dubai"
                  width={180}
                  height={60}
                  unoptimized
                  className="h-8 w-auto"
                />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                },
              }}
              className="flex-1 overflow-y-auto px-5 pb-10 pt-6"
            >
              {primaryNavigation?.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ))}

              <motion.div variants={mobileItemVariants} className="pt-8">
                <ButtonLink
                  href="/apply"
                  size="lg"
                  surface="dark"
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  Apply now
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const mobileItemVariants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: ease.expo } },
};

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavigationItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionId = `mobile-${item.href.replace(/\W+/g, "-")}`;

  if (!item.children?.length) {
    return (
      <motion.div variants={mobileItemVariants}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="block border-b border-white/15 py-4 font-heading text-3xl tracking-tight no-underline"
        >
          {item.label}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={mobileItemVariants}
      className="border-b border-white/15"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={sectionId}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-heading text-3xl tracking-tight"
      >
        {item.label}
        <ChevronDown
          size={22}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-white/60 transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={sectionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.34,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="overflow-hidden"
          >
            <ul className="grid gap-1 pb-4 ps-4">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className="block border-s-2 border-cannon-500/60 ps-4 text-base leading-6 text-white/80 no-underline transition-colors hover:text-white"
                  >
                    <span className="block py-2.5 font-semibold">
                      {child.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
