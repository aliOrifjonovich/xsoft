import { AppSidebar } from "@/components/app-sidebar";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Category() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Categories />
      </SidebarInset>
    </SidebarProvider>
  );
}
