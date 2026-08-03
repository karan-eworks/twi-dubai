import type { SectionIntro } from "@/data/types/common";
import { cn } from "@/lib/utils";
import { Container } from "./container";


type SectionTone = "white" | "soft" | "navy" | "burgundy";
type IntroLayout = "stacked" | "split" | "offset";

interface SectionShellProps  {
  id: string;
  intro: SectionIntro;
  tone?: SectionTone;
  introLayout?: IntroLayout;
  className?: string;
  children: React.ReactNode;
}

const toneClass: Record<SectionTone, string> = {
  white: "bg-[var(--background)] text-[var(--foreground)]",
  soft: "bg-[var(--surface)] text-[var(--foreground)]",
  navy: "bg-[var(--brand-navy)] text-white",
  burgundy: "bg-[var(--brand-burgundy)] text-white",
};

export function SectionShell({
  id,
  intro,
  tone = "white",
  introLayout = "split",
  className,
  children,
}: SectionShellProps) {
  const isDark = tone === "navy" || tone === "burgundy";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 py-[clamp(4.5rem,9vw,9rem)]", toneClass[tone], className)}
    >
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-12 lg:gap-8",
            introLayout === "stacked" && "lg:block",
            introLayout === "offset" && "lg:items-end",
          )}
        >
          <div
            className={cn(
              "min-w-0 lg:col-span-7",
              introLayout === "offset" && "lg:col-start-2",
            )}
          >
            {intro.label ? (
              <p
                className={cn(
                  "mb-5 max-w-max rounded-full px-4 py-2 text-sm font-semibold",
                  isDark
                    ? "bg-white/10 text-white"
                    : "bg-[var(--brand-teal-soft)] text-[var(--brand-navy)]",
                )}
              >
                {intro.label}
              </p>
            ) : null}
            <h2
              id={`${id}-heading`}
              className="font-serif text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] tracking-[-0.025em] text-balance"
            >
              {intro.heading}
            </h2>
          </div>
          {intro.deck ? (
            <p
              className={cn(
                "min-w-0 max-w-[44rem] text-lg leading-8 text-pretty lg:col-span-4 lg:col-start-9",
                isDark ? "text-white/78" : "text-[var(--muted)]",
              )}
            >
              {intro.deck}
            </p>
          ) : null}
        </div>

        <div className="mt-[clamp(2rem,5vw,5rem)]">{children}</div>
      </Container>
    </section>
  );
}
