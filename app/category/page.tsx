import { AppSidebar } from "@/components/app-sidebar";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function getCategories() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const response = await fetch(
    "https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/",
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
// async function getCategoryById(id: number) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   const response = await fetch(
//     `https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/${id}/`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     console.error(
//       "Failed to fetch user data:",
//       response.status,
//       response.statusText
//     );
//     return [];
//   }

//   return response.json();
// }

export default async function Category({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = Number(await searchParams.then((params) => params.id)) || 0;
  const categoriesdata = await getCategories();
  // const categorybyId = await getCategoryById(id);

  // console.log("hello", categorybyId);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Categories
          initialData={categoriesdata}
          url="https://carmanagement-1-rmyc.onrender.com/api/v1/car-catergories/"
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
