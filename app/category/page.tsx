import { AppSidebar } from "@/components/app-sidebar";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getCategories() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CAR_CATEGORIES);
  
  // Return empty array if fetching fails
  if (!data) {
    return [];
  }
  
  return data;
=======
import { cookies } from "next/headers";

async function getCategories() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/",
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

  return await response.json();
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
}

export default async function Category() {
  const categoriesdata = await getCategories();

<<<<<<< HEAD
=======
  console.log(categoriesdata, "categoriesdata");

>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Categories
          initialData={categoriesdata}
<<<<<<< HEAD
          url={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAR_CATEGORIES}`}
=======
          url="https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/"
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
