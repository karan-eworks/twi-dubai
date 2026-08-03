const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiFetchInit = RequestInit & {
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
};

export async function apiFetch<T>(endpoint: string, init?: ApiFetchInit) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
