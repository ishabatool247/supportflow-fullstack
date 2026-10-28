const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("supportflow_access") || "";
}
export function setTokens(access: string, refresh?: string) {
  localStorage.setItem("supportflow_access", access);
  if (refresh) localStorage.setItem("supportflow_refresh", refresh);
}
export function clearTokens() {
  localStorage.removeItem("supportflow_access");
  localStorage.removeItem("supportflow_refresh");
}
export async function api<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API}${path}`, { ...options, headers, cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.detail || data.non_field_errors?.[0] || Object.values(data).flat().join(" ") || "Request failed";
    throw new Error(String(detail));
  }
  return data as T;
}
