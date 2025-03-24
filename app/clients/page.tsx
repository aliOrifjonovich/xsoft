import { AppSidebar } from "@/components/app-sidebar";
import Client from "@/components/Client/Client";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ClientType } from "./columns";
import { cookies } from "next/headers";

async function getData(): Promise<ClientType[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/client?page=1&limit=100",
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
}

export default async function Clients() {
  const data = await getData();

  console.log("data", data);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Client data={data} />
      </SidebarInset>
    </SidebarProvider>
  );
}
