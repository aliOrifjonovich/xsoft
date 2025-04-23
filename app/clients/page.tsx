import { AppSidebar } from "@/components/app-sidebar";
import Client from "@/components/Client/Client";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ClientType } from "./columns";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getData(): Promise<ClientType[]> {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CLIENT);
  
  // Return empty array if fetching fails
  if (!data) {
    return [];
  }
  
  return data;
}

export default async function Clients() {
  const data = await getData();

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
