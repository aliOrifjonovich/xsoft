import { AppSidebar } from "@/components/app-sidebar";
import CarsGroup from "@/components/Cars/CarsGroup";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "728ed521",
      amount: 20,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "728ed522",
      amount: 200,
      status: "processing",
      email: "b@example.com",
    },
    {
      id: "728ed523",
      amount: 400,
      status: "failed",
      email: "a@example.com",
    },
    {
      id: "728ed524",
      amount: 40,
      status: "pending",
      email: "f@example.com",
    },
  ];
}
export default async function Page() {
  const data = await getData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <CarsGroup  data={data}/>
      </SidebarInset>
    </SidebarProvider>
  );
}
