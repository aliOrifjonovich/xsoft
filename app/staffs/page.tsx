import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Staffs from "@/components/Staffs/User";
import { cookies } from "next/headers";

// : Promise<Staff[]>
async function getData() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    `https://carmanagement-1-rmyc.onrender.com/api/v1/employee?page=1&limit=100`,
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

export default async function Page() {
  const staffdata = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Staffs data={staffdata?.results} />
      </SidebarInset>
    </SidebarProvider>
  );
}
