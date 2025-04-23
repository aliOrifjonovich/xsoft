import { AppSidebar } from "@/components/app-sidebar";
import CreateCar from "@/components/Cars/CreateCar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ICategory } from "@/interfaces/Categories";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

export interface IBranches {
  id: number;
  name: string;
  address: string;
  year_of_construction: string;
  total_area: number;
  google_map_link: string;
  yandex_map_link: string;
  latitude: string;
  longitude: string;
}

export interface IFeatures {
  id: number;
  name: string;
  icon: string;
}

async function getBranchs() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.BRANCHES, {
    page: 1,
    limit: 100
  });
  
  return data?.results || [];
}

async function getFeatures() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CAR_FEATURES, {
    page: 1,
    limit: 100
  });
  
  return data?.results || [];
}

async function getCategories() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CAR_CATEGORIES);
  
  if (!data) return [];
  
  const categoryData = data.map((item: ICategory) => item.category);
  return categoryData;
}

async function getById(id: number) {
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.CARS}/${id}/`);
  
  return data || null;
}

export default async function CreateCars({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;
  const getIdData = id ? await getById(id) : null;
  const branchData = await getBranchs();
  const featureData = await getFeatures();
  const categories = await getCategories();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateCar
          features={featureData}
          branchs={branchData}
          categories={categories}
          updatedValues={getIdData}
          isUpdated={!!id}
          id={id}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
