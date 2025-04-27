import { AppSidebar } from "@/components/app-sidebar";
import CarsGroup from "@/components/Cars/CarsGroup";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";
=======
import { cookies } from "next/headers";
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802

export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
  seating_capacity: number;
  transmission: string;
  branch: {
    id: number;
    name: string;
  };
  rental_status: string;
  category: {
    id: number;
    name: string;
  };
  minimum_age: number;
  images: {
    car_id: number;
    id: number;
    photo: string;
  }[];
  year: number;
  color: string;
  fuel_type: string;
  engine_size: string;
  mileage: number;
  deposit: number;
  rental_price_per_day: number;
  owner_name: string;
  owner_phone: string;
  description: string;
  features: {
    name: string;
    icon: string;
    id: number;
  }[];
};

async function getData(): Promise<{ results: Vehicle[] }> {
<<<<<<< HEAD
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CARS, {
    page: 1,
    limit: 50,
  });

  // Return empty results if fetching fails
  if (!data) {
    return { results: [] };
  }

  return data;
=======
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/cars?page=1&limit=50",
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
    return { results: [] };
  }

  return response.json();
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
}

export default async function Page() {
  const { results: cars } = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
<<<<<<< HEAD
        <CarsGroup
          data={cars as Vehicle[]}
          url={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAR_STATISTICS}`}
        />
=======
        <CarsGroup data={cars as Vehicle[]} />
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
      </SidebarInset>
    </SidebarProvider>
  );
}
