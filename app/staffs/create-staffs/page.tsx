import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import CreateStaff from "@/components/Staffs/CreateStaffs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
}

export default async function CreateStaffs({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;
  const data = id ? await getById(Number(id)) : null;
  const branchs = await getBranchs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateStaff branchs={branchs} />
      </SidebarInset>
    </SidebarProvider>
  );
}
