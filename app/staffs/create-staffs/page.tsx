import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import CreateStaff from "@/components/Staffs/CreateStaffs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function CreateStaffs() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateStaff />
      </SidebarInset>
    </SidebarProvider>
  );
}
