import { apiFetch } from "@/lib/api";
import type {
  FormApiItem,
  FormDetailApiResponse,
  FormListApiResponse,
} from "../types/forms";

function isFormApiItem(value: unknown): value is FormApiItem {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<FormApiItem>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.slug === "string" &&
    Array.isArray(candidate.fields)
  );
}

export async function getForms() {
  return apiFetch<FormListApiResponse>("/forms");
}

export async function getFormBySlug(slug: string): Promise<FormApiItem | null> {
  const response = await apiFetch<FormDetailApiResponse>(
    `/forms/${encodeURIComponent(slug)}`,
  );
  const candidate =
    response && typeof response === "object" && "data" in response
      ? response.data
      : response;

  return isFormApiItem(candidate) ? candidate : null;
}
