import { cookies } from "next/headers";

export async function fetchData(endpoint: string, params = {}) {
  const baseUrl = `https://carmanagement-1-rmyc.onrender.com/api/v1/${endpoint}/`;

  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  const cookie = await cookies();
  const token = cookie.get("token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}

// Example usage:
// const branches = await fetchData("branchs", { search: "New York", page: 1, limit: 10 });
