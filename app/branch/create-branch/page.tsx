import { AppSidebar } from "@/components/app-sidebar";
import CreateBranch from "@/components/Branches/CreateBranch";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getById(id: number) {
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.BRANCHES}/${id}/`);
  
  return data || null;
}

export default async function Branches({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;

  const data = id ? await getById(id) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateBranch updatedValues={data} isUpdated={!!id} id={id} />
      </SidebarInset>
    </SidebarProvider>
  );
}
