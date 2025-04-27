import { AppSidebar } from "@/components/app-sidebar";
import CreateCar from "@/components/Cars/CreateCar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ICategory } from "@/interfaces/Categories";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

=======
import { cookies } from "next/headers";
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
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
<<<<<<< HEAD

=======
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
export interface IFeatures {
  id: number;
  name: string;
  icon: string;
}

async function getBranchs() {
<<<<<<< HEAD
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
  
=======
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/branchs?page=1&limit=100",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Network response was not ok for branchs in create branch");
  }

  const { results: data } = await response.json();
  return data;
}
async function getFeatures() {
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/car-features?page=1&limit=100",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Network response was not ok for features in create branch");
  }

  const { results: data } = await response.json();
  return data;
}
async function getCategories() {
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Network response was not ok for categories in create category"
    );
  }

  const data = await response.json();
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
  const categoryData = data.map((item: ICategory) => item.category);
  return categoryData;
}

async function getById(id: number) {
<<<<<<< HEAD
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.CARS}/${id}/`);
  
  return data || null;
=======
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    `https://carmanagement-1-rmyc.onrender.com/api/v1/cars/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Network response was not ok for create car");
  }
  const data = await response.json();
  return data;
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
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

<<<<<<< HEAD
=======
  console.log("branchData", categories);

>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
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
