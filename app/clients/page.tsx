import { AppSidebar } from "@/components/app-sidebar";
import Client from "@/components/Client/Client";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ClientType } from "./columns";

async function getData(): Promise<ClientType[]> {
  return [
    {
      id: "client-001",
      name: "Alice Smith",
      email: "alice@gmail.com",
      phone: "+998 90 123 45 67",
      address: "Tashkent, Uzbekistan",
      nationalId: "UZ1234567",
      driverLicense: "DL-12345",
      licenseExpiry: "2028-06-12",
      status: "Active",
    },
    {
      id: "client-002",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+998 91 987 65 43",
      address: "Samarkand, Uzbekistan",
      nationalId: "UZ7654321",
      driverLicense: "DL-67890",
      licenseExpiry: "2026-11-20",
      status: "Inactive",
    },
    {
      id: "client-003",
      name: "Maria Ivanova",
      email: "maria.ivanova@example.com",
      phone: "+998 93 111 22 33",
      address: "Bukhara, Uzbekistan",
      nationalId: "UZ3456789",
      driverLicense: "DL-54321",
      licenseExpiry: "2027-09-15",
      status: "Active",
    },
    {
      id: "client-004",
      name: "Omar Karimov",
      email: "omar.karimov@example.com",
      phone: "+998 95 555 44 33",
      address: "Nukus, Uzbekistan",
      nationalId: "UZ9876543",
      driverLicense: "DL-99999",
      licenseExpiry: "2025-03-10",
      status: "Blacklisted",
    },
    {
      id: "client-005",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+998 97 777 66 55",
      address: "Andijan, Uzbekistan",
      nationalId: "UZ1112233",
      driverLicense: "DL-88888",
      licenseExpiry: "2029-07-25",
      status: "Active",
    },
  ];
}

export default async function Clients() {
  const data = await getData();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Client data={data} />
      </SidebarInset>
    </SidebarProvider>
  );
}
