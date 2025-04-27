import { AppSidebar } from "@/components/app-sidebar";
import Client from "@/components/Client/Client";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ClientType } from "./columns";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getData(): Promise<ClientType[]> {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CLIENT);

  // Return empty array if fetching fails
  if (!data) {
    return [];
  }

  return data;
=======
import { cookies } from "next/headers";

async function getData(): Promise<ClientType[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/client/",
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

export default async function Clients() {
  const data = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
<<<<<<< HEAD
        <Client
          data={data}
          url={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENT_STATISTICS}`}
        />
=======
        <Client data={data} />
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
      </SidebarInset>
    </SidebarProvider>
  );
}
