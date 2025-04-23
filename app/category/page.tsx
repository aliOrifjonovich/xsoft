import { AppSidebar } from "@/components/app-sidebar";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getCategories() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CAR_CATEGORIES);
  
  // Return empty array if fetching fails
  if (!data) {
    return [];
  }
  
  return data;
}

export default async function Category() {
  const categoriesdata = await getCategories();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Categories
          initialData={categoriesdata}
          url={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAR_CATEGORIES}`}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
