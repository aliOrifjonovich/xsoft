import { AppSidebar } from "@/components/app-sidebar";
import CreateCar from "@/components/Cars/CreateCar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function CreateCars() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateCar />
      </SidebarInset>
    </SidebarProvider>
  );
}
