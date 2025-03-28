import { AppSidebar } from "@/components/app-sidebar";
import CreateClient from "@/components/Client/CreateClients";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function getDataById(id: number) {
  const cookie = await cookies();
  const token = cookie.get("token");
  const response = await fetch(
    `https://carmanagement-1-rmyc.onrender.com/api/v1/client/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Network response was not ok for create clients");
  }
  const data = await response.json();
  return data;
}

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;
  const data = id ? await getDataById(id) : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateClient
          updatedValues={data}
          isUpdated={id ? true : false}
          id={id}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
