import type { BlogTaxonomyApiItem } from "@/data/types/blogs";
import { clean } from "./clean";

export function taxonomyName(value: string | BlogTaxonomyApiItem | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return clean(value);

  return clean(value.name) ?? clean(value.title) ?? clean(value.slug);
}