import { AppSidebar } from "@/components/app-sidebar";
import CreateClient from "@/components/Client/CreateClients";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getDataById(id: number) {
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.CLIENT}${id}/`);
  
  return data || null;
}

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;
  const data = id ? await getDataById(id) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateClient
          updatedValues={data}
          isUpdated={!!id}
          id={id}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
