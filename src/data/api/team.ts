import { apiFetch } from "@/lib/api";
import type { TeamApiItem, TeamListApiResponse, TeamDetailApiResponse } from "../types/team";
import { slugify } from "@/lib/slugfy";

function itemSlug(item: TeamApiItem) {
  return item.slug?.trim() || slugify(item.name ?? item.title ?? String(item.id));
}

function isTeamApiItem(value: unknown): value is TeamApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<TeamApiItem>;
  const hasId =
    typeof candidate.id === "number" || typeof candidate.id === "string";
  const hasName =
    typeof candidate.name === "string" || typeof candidate.title === "string";

  return hasId && hasName;
}

export async function getTeam() {
  return apiFetch<TeamListApiResponse>("/team");
}

export async function getTeamMemberById(
  id: string | number,
): Promise<TeamApiItem | null> {
  const response = await apiFetch<TeamDetailApiResponse>(
    `/team/${encodeURIComponent(String(id))}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isTeamApiItem(candidate) ? candidate : null;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamApiItem | null> {
  const team = await getTeam();
  const match = team.data.find((item: TeamApiItem) => itemSlug(item) === slug) ?? null;

  if (match) {
    return getTeamMemberById(match.id);
  }

  return null;
}
