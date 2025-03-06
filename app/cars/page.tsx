import { AppSidebar } from "@/components/app-sidebar";
import CarsGroup from "@/components/Cars/CarsGroup";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export type Vehicle = {
  id: string;
  photo: string;
  brand: string;
  model: string;
  licensePlate: string;
  seatingCapacity: number;
  transmission: string;
  rentalStatus: string;
  category: string;
  details: {
    photos: string[];
    madeYear: number;
    color: string;
    fuelType: string;
    engineSize: string;
    mileage: number;
    rentalPricePerDay: number;
    owner: {
      name: string;
      phone: string;
    };
    description: string;
    features: string[];
  };
};
async function getData(): Promise<Vehicle[]> {
  return [
    {
      id: "1",
      photo: "https://orientrentcar.uz/wp-content/uploads/2024/10/1-2-2.jpg",
      brand: "Toyota",
      model: "Camry",
      licensePlate: "01A123BB",
      seatingCapacity: 5,
      transmission: "Automatic",
      rentalStatus: "Bo'sh",
      category: "standard",
      details: {
        photos: [
          "https://orientrentcar.uz/wp-content/uploads/2024/10/2-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/3-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/4-2-2.jpg",
        ],
        madeYear: 2022,
        color: "White",
        fuelType: "Gasoline",
        engineSize: "2.5L",
        mileage: 15000,
        rentalPricePerDay: 50,
        owner: {
          name: "Alisher Karimov",
          phone: "+998 90 123 4567",
        },
        description:
          "Comfortable sedan with excellent fuel economy and modern features. Perfect for business trips and family outings.",
        features: [
          "4 doors",
          "5 seats",
          "Gasoline",
          "Minimum age: 25",
          "Automatic",
          "Deposit: 5000$",
          "Android Auto",
          "Apple CarPlay",
          "Backup camera",
          "Bluetooth",
          "Heated seats",
          "USB charger",
        ],
      },
    },
    {
      id: "2",
      photo: "/placeholder.svg?height=80&width=120",
      brand: "Chevrolet",
      model: "Malibu",
      licensePlate: "01A456CC",
      seatingCapacity: 5,
      transmission: "Automatic",
      rentalStatus: "Ijarada",
      category: "Premium",
      details: {
        photos: [
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
        ],
        madeYear: 2021,
        color: "Black",
        fuelType: "Gasoline",
        engineSize: "2.0L",
        mileage: 25000,
        rentalPricePerDay: 45,
        owner: {
          name: "Dilshod Rakhimov",
          phone: "+998 90 765 4321",
        },
        description:
          "Stylish and modern sedan with premium features. Excellent handling and comfort for long drives.",
        features: [
          "4 doors",
          "5 seats",
          "Gasoline",
          "Minimum age: 25",
          "Automatic",
          "Deposit: 4500$",
          "Android Auto",
          "Apple CarPlay",
          "Backup camera",
          "Bluetooth",
          "USB charger",
        ],
      },
    },
    {
      id: "3",
      photo: "/placeholder.svg?height=80&width=120",
      brand: "Hyundai",
      model: "Sonata",
      licensePlate: "01A789DD",
      seatingCapacity: 5,
      transmission: "Automatic",
      rentalStatus: "Rezerv qilingan",
      category: "Premium",
      details: {
        photos: [
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
        ],
        madeYear: 2023,
        color: "Silver",
        fuelType: "Hybrid",
        engineSize: "2.0L",
        mileage: 5000,
        rentalPricePerDay: 55,
        owner: {
          name: "Nodira Azimova",
          phone: "+998 90 555 7890",
        },
        description:
          "Fuel-efficient hybrid sedan with the latest technology features. Smooth ride with excellent safety ratings.",
        features: [
          "4 doors",
          "5 seats",
          "Hybrid",
          "Minimum age: 25",
          "Automatic",
          "Deposit: 5500$",
          "Android Auto",
          "Apple CarPlay",
          "Backup camera",
          "Bluetooth",
          "Heated seats",
          "USB charger",
          "Wireless charging",
        ],
      },
    },
    {
      id: "4",
      photo: "/placeholder.svg?height=80&width=120",
      brand: "Kia",
      model: "K5",
      licensePlate: "01A012EE",
      seatingCapacity: 5,
      transmission: "Automatic",
      rentalStatus: "Bo'sh",
      category: "CrossOver",
      details: {
        photos: [
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
          "/placeholder.svg?height=300&width=500",
        ],
        madeYear: 2022,
        color: "Red",
        fuelType: "Gasoline",
        engineSize: "1.6L Turbo",
        mileage: 18000,
        rentalPricePerDay: 48,
        owner: {
          name: "Jasur Toshmatov",
          phone: "+998 90 333 2211",
        },
        description:
          "Sporty sedan with turbocharged engine. Combines performance with comfort and modern styling.",
        features: [
          "4 doors",
          "5 seats",
          "Gasoline",
          "Minimum age: 25",
          "Automatic",
          "Deposit: 4800$",
          "Android Auto",
          "Apple CarPlay",
          "Backup camera",
          "Bluetooth",
          "Heated seats",
          "USB charger",
        ],
      },
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
        <CarsGroup data={data} />
      </SidebarInset>
    </SidebarProvider>
  );
}
