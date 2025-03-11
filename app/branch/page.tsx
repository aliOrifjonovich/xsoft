import { AppSidebar } from "@/components/app-sidebar";
import Branches from "@/components/Branches/Branches";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Branch() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Branches />
      </SidebarInset>
    </SidebarProvider>
  );
}
