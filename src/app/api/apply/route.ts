import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const FORM_SLUG = "enrol";

/**
 * Proxy for the enrolment form submission.
 *
 * The headless CMS accepts JSON POSTs to `/api/forms/enrol/submit`. Field
 * names on the live site follow the `attribute-<slug>` convention and the
 * CAPTCHA is sent as `g-recaptcha-response`. We accept a payload keyed by
 * plain field slug plus a reCAPTCHA token, then forward it in the CMS's shape
 * so the UI never depends on the upstream naming.
 */
export async function POST(request: Request) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { error: "The application API is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "The request body was not valid JSON." },
      { status: 400 },
    );
  }

  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);
  const fields = isObject(body) && isObject(body.fields) ? body.fields : {};

  const payload: Record<string, string> = {};

  const recaptchaToken =
    typeof body.gRecaptchaToken === "string" ? body.gRecaptchaToken.trim() : "";
  if (recaptchaToken) {
    payload["g-recaptcha-response"] = recaptchaToken;
  }

  for (const [slug, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    payload[`attribute-${slug}`] = String(value);
  }

  const upstream = await fetch(`${API_BASE_URL}/forms/${FORM_SLUG}/submit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const responseBody = await upstream.json().catch(() => null);

  return NextResponse.json(responseBody ?? { status: "error" }, {
    status: upstream.status,
  });
}