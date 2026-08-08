import type { ReactNode } from "react";
import { Container } from "@/components/shared/container";

export interface Fact {
  label: string;
  value: ReactNode;
}

interface FactStripProps {
  facts: Fact[];
  /** Names the strip for screen readers — "Programme at a glance", "Event details". */
  label: string;
  id?: string;
  /** Sits beside the facts on wide screens. The programme pages hang the awarding-body mark here. */
  trailing?: ReactNode;
}

/**
 * The specification strip every detail page carries under its hero.
 *
 * Hairlines rather than cards: the count varies from two facts to seven
 * depending on what the CMS filled in, and a rule per item degrades where a
 * grid of boxes would leave holes.
 */
export function FactStrip({
  facts,
  label,
  id = "fact-strip",
  trailing,
}: FactStripProps) {
  if (facts.length === 0 && !trailing) return null;

  const list = (
    <dl className="grid flex-1 grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="border-s border-border ps-4">
          <dt className="datum text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {fact.label}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold leading-6 text-foreground">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="border-b border-border bg-stone-50"
    >
      <Container>
        <h2 id={`${id}-heading`} className="sr-only">
          {label}
        </h2>

        {trailing ? (
          <div className="flex flex-col gap-8 py-10 xl:flex-row xl:items-center xl:justify-between xl:gap-14">
            {list}
            {trailing}
          </div>
        ) : (
          <div className="py-10">{list}</div>
        )}
      </Container>
    </section>
  );
}
