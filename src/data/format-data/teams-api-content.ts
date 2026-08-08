import { prepareArticleHtml } from "@/lib/article-html";
import { clean, getPlainText, truncate } from "@/lib/clean";
import { mediaUrl } from "@/lib/media";
import { slugify } from "@/lib/slugfy";
import type { TeamApiItem } from "../types/team";

const FALLBACK_IMAGE = "/images/twi-classroom-study.jpg";

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  /** Sanitized CMS prose. Empty for everyone outside the advisory board. */
  biographyHtml: string;
  /** One line lifted from the biography, for the card's hover reveal. */
  focus: string;
  image: string;
  imageAlt: string;
}

export interface TeamDepartment {
  slug: string;
  name: string;
  members: TeamMember[];
}

/**
 * The CMS holds names under `name` and job titles under `position`; the ported
 * types guessed at `designation`/`role`/`title`, none of which the API sends.
 * Those are still read as fallbacks in case a later record uses them.
 */
export function normalizeTeamMember(item: TeamApiItem): TeamMember {
  const name = clean(item.name) ?? clean(item.title) ?? "";
  const { html } = prepareArticleHtml(item.description ?? item.biography);
  const summary = getPlainText(item.description ?? item.biography);

  return {
    id: String(item.id),
    slug: clean(item.slug) ?? slugify(name || String(item.id)),
    name,
    role:
      clean(item.position) ?? clean(item.designation) ?? clean(item.role) ?? "",
    biographyHtml: html,
    focus: summary ? truncate(summary, 120) : "",
    image:
      mediaUrl(item.photo ?? item.image ?? item.featured_image) ??
      FALLBACK_IMAGE,
    imageAlt: name ? `Portrait of ${name}` : "",
  };
}

/** Everyone the institute currently lists — published, active, still here. */
function isListable(item: TeamApiItem): boolean {
  return (
    item.active !== false && item.publish !== false && item.resigned !== true
  );
}

function departmentOf(item: TeamApiItem) {
  const department = item.department;
  if (!department || typeof department === "string") {
    return { name: clean(department) ?? "Team", slug: "team" };
  }

  const name = clean(department.name) ?? clean(department.title) ?? "Team";
  return { name, slug: clean(department.slug) ?? slugify(name) };
}

/**
 * The institute's own order: the board that governs, then the team that runs
 * the campus, then the people who run each department. Any department the CMS
 * adds later falls in behind these, alphabetically.
 */
const DEPARTMENT_ORDER = [
  "advisory-board",
  "senior-management-team",
  "department-heads",
];

export function groupTeamByDepartment(items: TeamApiItem[]): TeamDepartment[] {
  const groups = new Map<string, TeamDepartment>();

  for (const item of items) {
    if (!isListable(item)) continue;

    const member = normalizeTeamMember(item);
    if (!member.name) continue;

    const { name, slug } = departmentOf(item);
    const group = groups.get(slug) ?? { slug, name, members: [] };
    group.members.push(member);
    groups.set(slug, group);
  }

  // `order` is 0 on most records, so the name is what actually sorts them.
  const rank = new Map(items.map((item) => [String(item.id), item.order ?? 0]));
  for (const group of groups.values()) {
    group.members.sort(
      (a, b) =>
        (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0) ||
        a.name.localeCompare(b.name),
    );
  }

  return [...groups.values()].sort((a, b) => {
    const aRank = DEPARTMENT_ORDER.indexOf(a.slug);
    const bRank = DEPARTMENT_ORDER.indexOf(b.slug);
    if (aRank !== -1 && bRank !== -1) return aRank - bRank;
    if (aRank !== -1) return -1;
    if (bRank !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * The board is written about at length and gets the statement portrait;
 * everyone else is a name and a role, and gets the roster card. The listing and
 * the profile pages both ask here so the two cannot drift apart.
 */
const PORTRAIT_DEPARTMENT = "advisory-board";

export function usesPortraitCard(departmentSlug: string): boolean {
  return departmentSlug === PORTRAIT_DEPARTMENT;
}

/** A member with the department they belong to — what a profile page needs. */
export interface TeamProfile {
  member: TeamMember;
  department: TeamDepartment;
  /** The rest of that department, in listing order. Never includes the member. */
  colleagues: TeamMember[];
}

/**
 * Resolves one profile out of the full roster. The API has no richer per-member
 * endpoint — `/team/{id}` returns the same fields as the list — so the whole
 * page is served from a single fetch.
 */
export function findTeamProfile(
  items: TeamApiItem[],
  slug: string,
): TeamProfile | null {
  for (const department of groupTeamByDepartment(items)) {
    const member = department.members.find((entry) => entry.slug === slug);
    if (!member) continue;

    return {
      member,
      department,
      colleagues: department.members.filter((entry) => entry.slug !== slug),
    };
  }

  return null;
}

/** Every listable member, flattened — for `generateStaticParams`. */
export function listTeamMembers(items: TeamApiItem[]): TeamMember[] {
  return groupTeamByDepartment(items).flatMap((group) => group.members);
}
