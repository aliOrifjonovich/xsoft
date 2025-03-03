import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Reservation from "@/components/Reservation/Reservation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Rental } from "./columns";

async function getData(): Promise<Rental[]> {
  return [
    {
      id: "rental-001",
      pickup: "2025-03-01 10:00 AM",
      return: "2025-03-05 02:00 PM",
      carType: "Sedan",
      client: "John Doe",
      totalPrice: 250,
      status: "Confirmed",
    },
    {
      id: "rental-002",
      pickup: "2025-03-02 09:30 AM",
      return: "2025-03-06 12:00 PM",
      carType: "SUV",
      client: "Jane Smith",
      totalPrice: 500,
      status: "Pending",
    },
    {
      id: "rental-003",
      pickup: "2025-03-03 08:00 AM",
      return: "2025-03-07 04:00 PM",
      carType: "Hatchback",
      client: "Michael Johnson",
      totalPrice: 320,
      status: "Collected",
    },
    {
      id: "rental-004",
      pickup: "2025-03-04 07:45 AM",
      return: "2025-03-08 05:30 PM",
      carType: "Convertible",
      client: "Emily Davis",
      totalPrice: 700,
      status: "Completed",
    },
    {
      id: "rental-005",
      pickup: "2025-03-05 11:15 AM",
      return: "2025-03-09 06:45 PM",
      carType: "Minivan",
      client: "Robert Brown",
      totalPrice: 450,
      status: "No Show",
    },
  ];
}

export default async function Reservations() {
  const data = await getData();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Reservation data={data} />
      </SidebarInset>
    </SidebarProvider>
  );
}
