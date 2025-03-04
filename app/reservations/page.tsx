import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Reservation from "@/components/Reservation/Reservation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Rental } from "./columns";

async function getData(): Promise<Rental[]> {
  return [
    {
      id: "rental-001",
      pickup: {
        date: "2025-06-12",
        time: "08:00 AM",
        branch: "Yunusobod branch",
      },
      return: {
        date: "2025-06-15",
        time: "05:00 PM",
        branch: "Chilonzor branch",
      },
      carNumber: "01A123BC",
      carType: {
        type: "Premium",
        carname: "Mercedes Benz S-Class",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
      totalPrice: 250,
      status: "Confirmed",
    },
    {
      id: "rental-002",
      pickup: {
        date: "2025-06-14",
        time: "09:00 AM",
        branch: "Chilonzor branch",
      },
      return: {
        date: "2025-06-18",
        time: "03:00 PM",
        branch: "Sergeli branch",
      },
      carNumber: "10B456XY",
      carType: {
        type: "Standard",
        carname: "Nexia 3",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
      totalPrice: 500,
      status: "Pending",
    },
    {
      id: "rental-003",
      pickup: {
        date: "2025-06-16",
        time: "07:00 AM",
        branch: "Yunusobod branch",
      },
      return: {
        date: "2025-06-20",
        time: "06:00 PM",
        branch: "Olmazor branch",
      },
      carNumber: "20C789ZA",
      carType: {
        type: "CrossOver",
        carname: "BWM X5",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
      totalPrice: 320,
      status: "Collected",
    },
    {
      id: "rental-004",
      pickup: {
        date: "2025-06-18",
        time: "10:00 AM",
        branch: "Chilonzor branch",
      },
      return: {
        date: "2025-06-22",
        time: "04:00 PM",
        branch: "Yunusobod branch",
      },
      carNumber: "50D654RT",
      carType: {
        type: "Sport Car",
        carname: "Camaro SS",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
      totalPrice: 700,
      status: "Completed",
    },
    {
      id: "rental-005",
      pickup: {
        date: "2025-06-20",
        time: "11:00 AM",
        branch: "Sergeli branch",
      },
      return: {
        date: "2025-06-24",
        time: "02:00 PM",
        branch: "Olmazor branch",
      },
      carNumber: "90E321MN",
      carType: {
        type: "Pickup",
        carname: "Toyota Camry",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
      totalPrice: 450,
      status: "No Show",
    },
    {
      id: "rental-006",
      pickup: {
        date: "2025-06-20",
        time: "11:00 AM",
        branch: "Sergeli branch",
      },
      return: {
        date: "2025-06-24",
        time: "02:00 PM",
        branch: "Olmazor branch",
      },
      carNumber: "90E321MN",
      carType: {
        type: "Minivan",
        carname: "Kia Carnival",
      },
      client: {
        name: "Alice Smith",
        email: "alice@gmail.com",
        phone: "+998 90 123 45 67",
      },
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
