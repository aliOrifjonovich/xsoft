import { AppSidebar } from "@/components/app-sidebar";
import Branches from "@/components/Branches/Branches";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
