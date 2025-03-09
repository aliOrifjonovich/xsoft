import { AppSidebar } from "@/components/app-sidebar";
import CreateClient from "@/components/Client/CreateClients";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Clients() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CreateClient />
      </SidebarInset>
    </SidebarProvider>
  );
}
