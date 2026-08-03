"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Container } from "../shared/container";
import { ButtonLink } from "../shared/ButtonLink";

export interface Testimonial {
  id: string;
  name: string;
  programme: string;
  quote: string;
  poster: string;
  /** Self-hosted file. Falls back to the Instagram permalink when absent. */
  videoSrc?: string;
  instagramUrl: string;
}

export function VideoTestimonials({
  testimonials,
  instagramHandle = "woolwichinstitutedubai",
}: {
  testimonials: Testimonial[];
  instagramHandle?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const scrollRail = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.clientWidth + 20 : rail.clientWidth * 0.8;
    // Respects RTL: scrollBy is direction-aware in modern engines.
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">In their words</span>
            <h2
              id="testimonials-heading"
              className="mt-4 font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Students on what changed
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <RailButton label="Previous testimonials" onClick={() => scrollRail(-1)}>
              <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </RailButton>
            <RailButton label="Next testimonials" onClick={() => scrollRail(1)}>
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </RailButton>
          </div>
        </div>

        {/* Rail stays inside the container and scrolls within its own width.
            No vw math: 100vw includes the scrollbar, which is what pushes the
            whole document sideways. min-w-0 lets it be narrower than its
            contents instead of forcing the page wider.

            relative is load-bearing: .sr-only is position:absolute, so without
            a positioned ancestor inside the rail it resolves against the page
            wrapper, escapes this scroller entirely, and parks itself at the
            off-screen x of the last card — which scrolls the whole document
            sideways. No overflow rule on any ancestor can clip it, because its
            containing block sits above them. */}
        <ul
          ref={railRef}
          className="relative mt-10 flex w-full min-w-0 max-w-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => {
            const isPlaying = playingId === item.id;

            return (
              <li
                key={item.id}
                className="w-[15rem] shrink-0 snap-start sm:w-[18rem] lg:w-[21rem]"
              >
                {/* group lives on the card, so the poster actually reacts to hover */}
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-navy-900">
                    {isPlaying && item.videoSrc ? (
                      // biome-ignore lint/a11y/useMediaCaption: captions are burned into the source files
                      <video
                        src={item.videoSrc}
                        poster={item.poster}
                        controls
                        autoPlay
                        playsInline
                        className="size-full object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src={item.poster}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 21rem, (min-width: 640px) 18rem, 15rem"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/85 to-transparent"
                        />

                        {item.videoSrc ? (
                          <button
                            type="button"
                            onClick={() => setPlayingId(item.id)}
                            className="absolute inset-0 grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                          >
                            <span className="sr-only">
                              Play {item.name}&apos;s testimonial
                            </span>
                            <span className="grid size-14 place-items-center rounded-full bg-cannon-500 text-white transition-transform duration-300 group-hover:scale-110">
                              <Play
                                className="size-5 translate-x-0.5 fill-current"
                                aria-hidden="true"
                              />
                            </span>
                          </button>
                        ) : null}

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-white">
                          <p className="font-heading text-xl leading-tight">{item.name}</p>
                          <p className="datum mt-1 text-[11px] uppercase tracking-[0.14em] text-white/70">
                            {item.programme}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <blockquote className="mt-4 flex-1 border-s-2 border-cannon-500 ps-4 text-sm leading-6 text-muted-foreground">
                    {item.quote}
                  </blockquote>

                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-foreground no-underline transition-colors hover:text-cannon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    Watch on Instagram
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8">
          <ButtonLink
            href={`https://instagram.com/${instagramHandle}`}
            intent="secondary"
          >
            More on Instagram
            <ArrowUpRight aria-hidden="true" />
          </ButtonLink>
          <p className="datum text-xs text-muted-foreground">@{instagramHandle}</p>
        </div>
      </Container>
    </section>
  );
}

function RailButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-navy-500 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </button>
  );
}
