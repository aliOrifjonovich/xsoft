import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Staffs from "@/components/Staffs/User";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getData() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.EMPLOYEE, {
    page: 1,
    limit: 100,
  });

  // Return empty array if fetching fails
  if (!data) {
    return [];
  }

  return data;
=======
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
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
}

export default async function Page() {
  const staffdata = await getData();

<<<<<<< HEAD
=======
  console.log("staffdata", staffdata);

>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
<<<<<<< HEAD
        <Staffs
          data={staffdata}
          url={`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STAFFS_STATISTICS}`}
        />
=======
        <Staffs data={staffdata} />
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
      </SidebarInset>
    </SidebarProvider>
  );
}
