import { cookies } from "next/headers";
import { API_CONFIG, getEndpointUrl } from "./api-config";

// Server-side token retrieval
export const getServerAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

// Server-side headers
export const getServerHeaders = async () => {
  const token = await getServerAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Server-side data fetching (for use in Server Components)
export async function fetchServerData(endpoint: string, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString
    ? `${getEndpointUrl(endpoint)}?${queryString}`
    : getEndpointUrl(endpoint);

  const headers = await getServerHeaders();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store", // Disable caching by default for server components
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}, URL: ${url}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}

// Export API_CONFIG for convenience
export { API_CONFIG };
