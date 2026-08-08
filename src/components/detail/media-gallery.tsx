"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

/** One entry from a CMS `medias` array, already resolved to a usable URL. */
export interface GalleryImage {
  src: string;
  alt: string;
  caption: string | null;
}

interface MediaGalleryProps {
  /** The article or event the set belongs to — used for the dialog's accessible name. */
  title: string;
  images: GalleryImage[];
  /** Section heading, e.g. "From the day" or "In pictures". */
  heading: string;
  id?: string;
}

const CONTROL_CLASS =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-navy-500 hover:bg-navy-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * The photographs a story leaves behind. Base UI's Dialog owns the focus trap,
 * the Escape key, and the scroll lock; this file only decides what the open
 * frame shows.
 */
export function MediaGallery({
  title,
  images,
  heading,
  id = "gallery",
}: MediaGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const active = openIndex === null ? null : images[openIndex];

  const step = (delta: number) =>
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + delta + images.length) % images.length,
    );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-border bg-stone-50 py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id={`${id}-heading`}
            className="font-heading text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="datum text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {images.length} {images.length === 1 ? "photograph" : "photographs"}
          </p>
        </div>

        {/* The first frame runs wide: these sets open on the establishing shot. */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <li
              key={image.src}
              className={index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-navy-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span
                  className={`block ${index === 0 ? "aspect-4/3 sm:aspect-16/10" : "aspect-4/3"}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                </span>
                {image.caption ? (
                  <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,oklch(0.201_0.042_260.7/0.85))] p-4 text-start text-sm font-medium leading-5 text-white">
                    {image.caption}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {/* showCloseButton is off because the registry's control is a ghost
          button pinned over the frame, which disappears against a dark
          photograph. It is reissued below on the card surface with the
          other two. */}
      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        {active && openIndex !== null ? (
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(72rem,calc(100vw-2rem))] gap-4 rounded-md border border-border bg-card p-4 ring-0 sm:max-w-[min(72rem,calc(100vw-4rem))]"
          >
            <DialogTitle className="sr-only">
              {`${title} — photograph ${openIndex + 1} of ${images.length}`}
            </DialogTitle>

            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-navy-950 sm:aspect-16/9">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Only a real caption earns a line. Most of this CMS's images
                  carry none, and echoing the alt text says nothing. */}
              {active.caption ? (
                <DialogDescription className="min-w-0 text-sm leading-6">
                  {active.caption}
                </DialogDescription>
              ) : (
                <span />
              )}

              <div className="flex shrink-0 items-center gap-2">
                {images.length > 1 ? (
                  <>
                    <span className="datum me-1 text-[11px] tabular-nums text-muted-foreground">
                      {openIndex + 1} / {images.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className={CONTROL_CLASS}
                    >
                      <ChevronLeft
                        aria-hidden="true"
                        className="size-4 rtl:-scale-x-100"
                      />
                      <span className="sr-only">Previous photograph</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className={CONTROL_CLASS}
                    >
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 rtl:-scale-x-100"
                      />
                      <span className="sr-only">Next photograph</span>
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className={CONTROL_CLASS}
                >
                  <X aria-hidden="true" className="size-4" />
                  <span className="sr-only">Close gallery</span>
                </button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
