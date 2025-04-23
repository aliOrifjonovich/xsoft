import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Staffs from "@/components/Staffs/User";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getData() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.EMPLOYEE, {
    page: 1,
    limit: 100
  });
  
  // Return empty array if fetching fails
  if (!data) {
    return [];
  }
  
  return data;
}

export default async function Page() {
  const staffdata = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Staffs data={staffdata} />
      </SidebarInset>
    </SidebarProvider>
  );
}
