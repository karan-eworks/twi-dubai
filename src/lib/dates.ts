/** API dates come as "YYYY-MM-DD HH:mm:ss" (no "T") or full ISO. Falls back to epoch if unparseable. */
export function toIsoDate(
  ...candidates: Array<string | null | undefined>
): string {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const iso = candidate.replace(" ", "T");
    if (!Number.isNaN(new Date(iso).getTime())) return iso;
  }
  return new Date(0).toISOString();
}
