import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import CreateStaff from "@/components/Staffs/CreateStaffs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
<<<<<<< HEAD
import { API_CONFIG, fetchServerData } from "@/lib/api-server";

async function getBranchs() {
  // Using our centralized API service for server components
  const data = await fetchServerData(API_CONFIG.ENDPOINTS.BRANCHES, {
    page: 1,
    limit: 100
  });
  
  return data?.results || [];
}

async function getById(id: number) {
  // Using our centralized API service for server components
  const data = await fetchServerData(`${API_CONFIG.ENDPOINTS.EMPLOYEE}/${id}/`);
  
  return data || null;
=======
import { cookies } from "next/headers";

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
async function getById(id: number) {
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    `https://carmanagement-1-rmyc.onrender.com/api/v1/employee/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Network response was not ok for create branch");
  }
  const data = await response.json();
  return data;
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
}

export default async function CreateStaffs({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;

  const data = id ? await getById(id) : null;
  const branchs = await getBranchs();

<<<<<<< HEAD
=======
  console.log("data for staffs", data);
  console.log("id", id);

>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateStaff
          branchs={branchs}
          updatedValues={data}
<<<<<<< HEAD
          isUpdated={!!id}
=======
          isUpdated={id ? true : false}
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
          id={id}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
