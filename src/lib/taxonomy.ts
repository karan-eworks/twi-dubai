import { clean } from "./clean";

interface TaxonomyLike {
  name?: string | null;
  slug?: string | null;
}

export function taxonomyName(value: string | TaxonomyLike | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return clean(value);

  return clean(value.name) ?? clean(value.slug);
}
