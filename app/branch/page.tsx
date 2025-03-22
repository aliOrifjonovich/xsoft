import { AppSidebar } from "@/components/app-sidebar";
import Branches from "@/components/Branches/Branches";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/branchs?page=1&limit=50",
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

  return response.json();
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
