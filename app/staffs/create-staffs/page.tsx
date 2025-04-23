import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import CreateStaff from "@/components/Staffs/CreateStaffs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getBranchs() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.BRANCHES, {
    page: 1,
    limit: 100
  });
  
  return data?.results || [];
}

async function getById(id: number) {
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.EMPLOYEE}/${id}/`);
  
  return data || null;
}

export default async function CreateStaffs({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;

  const data = id ? await getById(id) : null;
  const branchs = await getBranchs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateStaff
          branchs={branchs}
          updatedValues={data}
          isUpdated={!!id}
          id={id}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
