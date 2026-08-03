/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { AmenityItem } from "@/lib/extractAmenities";
import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Car,
  Cctv,
  Check,
  ChefHat,
  Coffee,
  Dumbbell,
  Laptop,
  Refrigerator,
  Ruler,
  Shirt,
  ShowerHead,
  Sofa,
  Sparkles,
  Tv,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";


/** First match wins, so put the more specific keywords first. */
const ICON_RULES: Array<[RegExp, LucideIcon]> = [
  [/bed|sleep|twin|single/i, BedDouble],
  [/sqft|square|dimension|size|room size/i, Ruler],
  [/work ?station|desk|study table/i, Laptop],
  [/wardrobe|closet/i, Shirt],
  [/bath|shower|en-?suite|toilet/i, ShowerHead],
  [/fridge|refrigerat/i, Refrigerator],
  [/laundry|washing/i, WashingMachine],
  [/lounge|sofa|common area/i, Sofa],
  [/tv|television/i, Tv],
  [/cctv|security|surveillance/i, Cctv],
  [/wifi|wi-fi|internet/i, Wifi],
  [/kitchen|cooking/i, ChefHat],
  [/restaurant|dining/i, Utensils],
  [/caf|coffee/i, Coffee],
  [/gym|fitness/i, Dumbbell],
  [/pool|swim/i, Waves],
  [/parking|car/i, Car],
  [/housekeep|cleaning/i, Sparkles],
];

function iconFor(item: AmenityItem): LucideIcon {
  const haystack = `${item.title} ${item.alt ?? ""}`;
  return ICON_RULES.find(([pattern]) => pattern.test(haystack))?.[1] ?? Check;
}

export function CmsAmenities({
  items,
  heading = "Amenities and facilities",
}: {
  items: AmenityItem[];
  heading?: string;
}) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="amenities-heading" className="mt-12">
      <h2
        id="amenities-heading"
        className="font-heading text-2xl font-normal leading-tight tracking-tight text-foreground"
      >
        {heading}
      </h2>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = iconFor(item);

          return (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-md border border-border bg-card p-4 transition-colors duration-300 hover:border-border-strong"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="mt-0.5 size-5 shrink-0 text-navy-400"
              />
              <span className="text-sm font-medium leading-5 text-foreground">
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}