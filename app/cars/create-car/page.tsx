import { AppSidebar } from "@/components/app-sidebar";
import CreateCar from "@/components/Cars/CreateCar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { FC } from "react";
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

async function getById(id: number) {
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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateCar features={featureData} branchs={branchData} />
      </SidebarInset>
    </SidebarProvider>
  );
}
