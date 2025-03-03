import { AppSidebar } from "@/components/app-sidebar";
import Client from "@/components/Client/Client";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Clients() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Client/>
      </SidebarInset>
    </SidebarProvider>
  );
}
