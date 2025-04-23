import { AppSidebar } from "@/components/app-sidebar";
import CarsGroup from "@/components/Cars/CarsGroup";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

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
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.CARS, {
    page: 1,
    limit: 50
  });
  
  // Return empty results if fetching fails
  if (!data) {
    return { results: [] };
  }
  
  return data;
}

export default async function Page() {
  const { results: cars } = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CarsGroup data={cars as Vehicle[]} />
      </SidebarInset>
    </SidebarProvider>
  );
}
