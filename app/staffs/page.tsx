import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import User from "@/components/Staffs/User";
import { Staff } from "./columns";
import Staffs from "@/components/Staffs/User";

async function getData(): Promise<Staff[]> {
  return [
    {
      id: "1a2b3c4d",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      fullname: "John Doe",
      dob: "1985-06-15",
      gender: "Male",
      phone: "+998 90 123 45 67",
      position: "Software Engineer",
      employmentType: "Full-time",
      hireDate: "2019-08-10",
      workLocation: "Tashkent",
      salary: 3500000,
      workStatus: "Active",
    },
    {
      id: "2b3c4d5e",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      fullname: "Jane Smith",
      dob: "1990-04-22",
      gender: "Female",
      phone: "+998 91 456 78 90",
      position: "HR Manager",
      employmentType: "Part-time",
      hireDate: "2021-02-15",
      workLocation: "Samarkand",
      salary: 2800000,
      workStatus: "Ta'tilda",
    },
    {
      id: "3c4d5e6f",
      photo: "https://randomuser.me/api/portraits/men/50.jpg",
      fullname: "Ali Valiyev",
      dob: "1982-12-05",
      gender: "Male",
      phone: "+998 99 321 65 43",
      position: "Sales Executive",
      employmentType: "Contract",
      hireDate: "2018-07-01",
      workLocation: "Bukhara",
      salary: 4200000,
      workStatus: "Active",
    },
    {
      id: "4d5e6f7g",
      photo: "https://randomuser.me/api/portraits/women/30.jpg",
      fullname: "Madina Karimova",
      dob: "1995-09-18",
      gender: "Female",
      phone: "+998 97 654 32 10",
      position: "Marketing Specialist",
      employmentType: "Full-time",
      hireDate: "2020-06-25",
      workLocation: "Tashkent",
      salary: 3000000,
      workStatus: "Bo'shagan",
    },
    {
      id: "5e6f7g8h",
      photo: "https://randomuser.me/api/portraits/men/28.jpg",
      fullname: "Rustam Qodirov",
      dob: "1988-11-30",
      gender: "Male",
      phone: "+998 93 789 12 34",
      position: "IT Support",
      employmentType: "Part-time",
      hireDate: "2022-01-10",
      workLocation: "Fergana",
      salary: 2500000,
      workStatus: "Active",
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
        <Staffs data={data} />
      </SidebarInset>
    </SidebarProvider>
  );
}
