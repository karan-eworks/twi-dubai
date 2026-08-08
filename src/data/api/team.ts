import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/slugfy";
import type { TeamApiItem, TeamListApiResponse } from "../types/team";

/** The API sends no slug, so one is derived from the name. */
function itemSlug(item: TeamApiItem) {
  return (
    item.slug?.trim() || slugify(item.name ?? item.title ?? String(item.id))
  );
}

export async function getTeam() {
  return apiFetch<TeamListApiResponse>("/team");
}

/**
 * `/team/{id}` returns exactly the fields the list already carries, so there is
 * no richer per-member endpoint to call — the list record is the whole record,
 * and a profile page costs one request.
 */
export async function getTeamMemberBySlug(
  slug: string,
): Promise<TeamApiItem | null> {
  const team = await getTeam();

  return team.data.find((item: TeamApiItem) => itemSlug(item) === slug) ?? null;
}
