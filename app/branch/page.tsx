import { AppSidebar } from "@/components/app-sidebar";
import Branches from "@/components/Branches/Branches";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getData() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.BRANCHES, {
    page: 1,
    limit: 50
  });
  
  // Return empty array if fetching fails
  if (!data) {
    return { results: [] };
  }
  
  return data;
=======
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/branchs?page=1&limit=50",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch user data:",
      response.status,
      response.statusText
    );
    return [];
  }

  return response.json();
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
}

export default async function Branch() {
  const branchsData = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Branches data={branchsData?.results} />
      </SidebarInset>
    </SidebarProvider>
  );
}
