import Cookies from "js-cookie";

const BASE_URL = "http://192.168.50.20:8000/api/v1";

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
}

interface RequestResponse<T> {
  result: T;
  ok: boolean;
}

export const request = async <T>(
  url: string,
  { method = "GET", body, headers = {} }: RequestConfig = {}
): Promise<RequestResponse<T>> => {
  const token = Cookies.get("token");

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    const result = await response.json();
    return { result, ok: response.ok };
  } catch (error) {
    console.error("Request error:", error);
    return { result: { message: "An error occurred." } as T, ok: false };
  }
};

export const getAll = <T>(url: string, headers: HeadersInit = {}) =>
  request<T>(url, { method: "GET", headers });

export const getById = <T>(
  url: string,
  id: number | string,
  headers: HeadersInit = {}
) => request<T>(`${url}/${id}`, { method: "GET", headers });

export const post = <T>(
  url: string,
  body: unknown,
  headers: HeadersInit = {}
) => request<T>(url, { method: "POST", body, headers });

export const put = <T>(
  url: string,
  id: number | string,
  body: unknown,
  headers: HeadersInit = {}
) => request<T>(`${url}/${id}`, { method: "PUT", body, headers });

export const remove = <T>(
  url: string,
  id: number | string,
  headers: HeadersInit = {}
) => request<T>(`${url}/${id}`, { method: "DELETE", headers });
