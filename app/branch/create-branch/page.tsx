import { AppSidebar } from "@/components/app-sidebar";
import CreateBranch from "@/components/Branches/CreateBranch";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function getById(id: number) {
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    `https://carmanagement-1-rmyc.onrender.com/api/v1/branchs/${id}/`,
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

export default async function Branches({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;

  const data = id ? await getById(id) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateBranch updatedValues={data} isUpdated={!!id} id={id} />
      </SidebarInset>
    </SidebarProvider>
  );
}
