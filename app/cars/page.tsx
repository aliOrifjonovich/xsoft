import { AppSidebar } from "@/components/app-sidebar";
import CarsGroup from "@/components/Cars/CarsGroup";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  seatingCapacity: number;
  transmission: string;
  branch: string;
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
    features: {
      name: string;
      icon: string;
    }[];
  };
};
async function getData(): Promise<Vehicle[]> {
  return [
    {
      id: "1",
      brand: "Toyota",
      model: "Camry",
      licensePlate: "01A123BB",
      seatingCapacity: 5,
      transmission: "Automatic",
      branch: "Yunusobod",
      rentalStatus: "Bo'sh",
      category: "standard",
      details: {
        photos: [
          "https://orientrentcar.uz/wp-content/uploads/2024/10/1-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/2-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/3-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/4-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/2-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/3-2-2.jpg",
          "https://orientrentcar.uz/wp-content/uploads/2024/10/4-2-2.jpg",
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
          {
            name: "Heated Seats",
            icon: `<svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M4.757 21.614h12.162a.624.624 0 0 0 .604-.466l4.42-16.782a1.89 1.89 0 0 0-1.34-2.304 1.88 1.88 0 0 0-1.43.194c-.435.253-.745.66-.874 1.146l-3.081 11.621H14.11a.625.625 0 0 0-.001 1.25l1.586.001h.002c.284 0 .532-.19.604-.465l3.206-12.088a.63.63 0 0 1 .294-.385.636.636 0 0 1 .932.712l-4.298 16.316H5.181L3.547 16.26l1.587.001a.625.625 0 1 0 .001-1.25l-2.51-.002a.626.626 0 0 0-.58.856l2.132 5.356a.625.625 0 0 0 .58.394"
      ></path>
      <path
        fill="#121214"
        d="M5.95 18.204a.623.623 0 0 0 .882.071c1.2-1.021 1.678-3.176.204-5.159-1.092-1.468-.759-2.934-.173-3.505a.625.625 0 0 0-.873-.895c-1.063 1.037-1.409 3.193.043 5.146 1.02 1.373.756 2.808-.012 3.461a.626.626 0 0 0-.07.881"
      ></path>
      <path
        fill="#121214"
        d="M8.7 18.424a.626.626 0 0 1-.406-1.101c.769-.653 1.033-2.088.013-3.461-1.452-1.953-1.106-4.109-.043-5.146a.625.625 0 0 1 .873.895c-.586.571-.92 2.037.173 3.505 1.474 1.983.995 4.138-.204 5.159a.63.63 0 0 1-.405.149"
      ></path>
      <path
        fill="#121214"
        d="M10.497 18.204a.623.623 0 0 0 .882.071c1.2-1.021 1.678-3.176.203-5.159-1.09-1.468-.758-2.934-.172-3.505a.625.625 0 0 0-.873-.895c-1.063 1.037-1.409 3.193.042 5.146 1.021 1.373.757 2.808-.01 3.461a.626.626 0 0 0-.072.881"
      ></path>
            </svg>`,
          },
          {
            name: "USB Charger",
            icon: `<svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M10.4 6.3c-.3 0-.6-.3-.6-.6V4c0-.3.3-.6.6-.6s.6.3.6.6v1.7c0 .3-.3.6-.6.6M13.1 5.7c0 .3.3.6.6.6.4 0 .7-.3.6-.6V4c0-.3-.3-.6-.6-.6s-.6.3-.6.6z"
      ></path>
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M6.7 8.9h10.7v7.9c0 1.6-1.3 2.8-2.8 2.8h-2.5c-.3 0-.6.3-.6.6v2.4c0 .3.3.6.6.6s.6-.3.6-.6v-1.8h1.9c2.2 0 4-1.8 4-4V8.3c0-.3-.3-.6-.6-.6h-.9V1.4c0-.3-.3-.6-.6-.6H7.6c-.4 0-.6.3-.6.6v6.3h-.9c-.3 0-.6.3-.6.6v8.5c0 1.5.9 2.9 2.3 3.6.056.056.144.08.245.11.08.021.167.046.255.09.3.1.7-.1.8-.4s-.1-.7-.4-.8c-.2 0-.3 0-.4-.1-1-.5-1.6-1.4-1.6-2.5zm1.5-1.3h7.7V2H8.2z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#121214"
        d="M12.8 13.7h1.6l-3.1 4.5v-3.4H9.7l3.1-4.6z"
      ></path>
           </svg>`,
          },
          {
            name: "USB",
            icon: `<svg xmlns="https://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M9.868 5.767a.625.625 0 0 0 1.25 0V4.046a.626.626 0 0 0-1.25 0zM13.493 6.392a.625.625 0 0 1-.625-.625V4.046a.626.626 0 0 1 1.25 0v1.72c0 .346-.28.626-.625.626"
      ></path>
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M7.358 7.563V1.625c0-.344.28-.625.625-.625h8.02c.345 0 .625.281.625.625v5.938h.683c.346 0 .625.28.625.625v7.198a3.66 3.66 0 0 1-3.658 3.658h-1.66v3.302a.625.625 0 0 1-1.25 0v-3.927c0-.344.28-.625.625-.625h2.285a2.41 2.41 0 0 0 2.408-2.408V8.813H7.3v6.573a2.42 2.42 0 0 0 1.699 2.302.625.625 0 0 1-.369 1.195 3.676 3.676 0 0 1-2.58-3.497V8.188c0-.345.28-.625.625-.625zm8.02-5.312v5.312h-6.77V2.251z"
        clipRule="evenodd"
      ></path>
            </svg>`,
          },
          {
            name: "Bluetooth",
            icon: `<svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M6.25 17.869a.626.626 0 0 0 .882.002l4.992-4.963 4.545 4.522-3.905 3.894v-5.94a.625.625 0 0 0-1.25 0v6.439c0 .422.253.8.644.962q.197.082.4.081c.27 0 .536-.105.736-.305l4.258-4.246c.238-.237.369-.552.369-.887s-.131-.65-.37-.888l-4.54-4.514 4.568-4.542c.237-.236.37-.551.37-.886s-.13-.65-.368-.888l-4.288-4.275a1.04 1.04 0 0 0-1.136-.223c-.39.162-.643.54-.643.962V8.65a.626.626 0 0 0 1.25 0V2.674l3.934 3.923-4.573 4.548-5.02-4.991a.625.625 0 1 0-.881.886l5.014 4.987-4.986 4.958a.623.623 0 0 0-.003.884"
      ></path>
            </svg>`,
          },
          {
            name: "Android Auto",
            icon: `<svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M8.05 16.88c0 .34.28.62.62.62s.62-.28.64-.62V7.76l7.28 4.2-5.57 3.22a.621.621 0 1 0 .62 1.08l5.71-3.3c.36-.21.58-.58.58-1s-.22-.79-.58-1L9.79 6.59c-.36-.21-.8-.21-1.16 0s-.58.58-.58 1z"
      ></path>
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M1 11.97c0 6.04 4.92 10.96 10.97 10.96 6.04 0 10.97-4.91 10.97-10.96S18.02 1 11.97 1 1 5.93 1 11.97m1.25 0c0-5.36 4.36-9.72 9.72-9.72 5.35 0 9.72 4.36 9.72 9.72s-4.36 9.72-9.72 9.72-9.72-4.36-9.72-9.72"
        clipRule="evenodd"
      ></path>
            </svg>`,
          },
          {
            name: "Apple CarPlay",
            icon: `<svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        d="M8.05 16.88c0 .34.28.62.62.62s.62-.28.64-.62V7.76l7.28 4.2-5.57 3.22a.621.621 0 1 0 .62 1.08l5.71-3.3c.36-.21.58-.58.58-1s-.22-.79-.58-1L9.79 6.59c-.36-.21-.8-.21-1.16 0s-.58.58-.58 1z"
      ></path>
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M1 11.97c0 6.04 4.92 10.96 10.97 10.96 6.04 0 10.97-4.91 10.97-10.96S18.02 1 11.97 1 1 5.93 1 11.97m1.25 0c0-5.36 4.36-9.72 9.72-9.72 5.35 0 9.72 4.36 9.72 9.72s-4.36 9.72-9.72 9.72-9.72-4.36-9.72-9.72"
        clipRule="evenodd"
      ></path>
            </svg>`,
          },
          {
            name: "AUX input",
            icon: `<svg xmlns="https://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" class="seo-pages-12fc1ls-MediaObjectItem" role="img" version="1.1"><path fill="#121214" fill-rule="evenodd" d="M5.65 13.125v-10.1c0-.2.1-.3.2-.4l1.1-1.1c.5-.5 1.2-.5 1.7 0l1.1 1.1c.1.1.2.3.2.4v10.1h.5c.3 0 .6.3.6.6v1.6c0 1.04-.507 1.91-1.3 2.393v1.307c0 .7-.6 1.4-1.4 1.4v1.7c0 .4-.2.7-.6.7-.3 0-.6-.3-.6-.6v-1.8c-.8 0-1.4-.6-1.4-1.4V17.75a2.78 2.78 0 0 1-1.4-2.425v-1.6c0-.3.3-.6.6-.6zm2.9 0v-3.2h-1.7v3.2zm0-6.6v2.2h-1.7v-2.2zm0-1.2v-2.1l-.9-.9-.8.9v2.1zm-.3 12.8h-1.1q-.1 0-.2-.007v.907c0 .1.1.2.2.2h1.2c.1 0 .2-.1.2-.2v-.914q-.147.014-.3.014m-2.7-3.7v.9c0 .9.7 1.6 1.6 1.6h1.1c.9 0 1.6-.7 1.6-1.6v-.9z" clip-rule="evenodd"></path><path fill="#121214" d="M17.75 8.418v.007a1.8 1.8 0 1 1-1.3-1.73v-2.97c0-.4.2-.7.5-.9s.7-.2 1 0l1.4.9c.3.2.4.6.2.9s-.6.4-.9.2l-.9-.6z"></path></svg>`,
          },
          {
            name: "Panorama",
            icon: `<svg xmlns="https://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" class="seo-pages-12fc1ls-MediaObjectItem" role="img" version="1.1"><path fill="#121214" d="M11.941 5.65a.625.625 0 0 1-.625-.625v-2.5a.625.625 0 0 1 1.25 0v2.5c0 .345-.28.625-.625.625"></path><path fill="#121214" fill-rule="evenodd" d="M11.965 16.59a4.63 4.63 0 0 1-4.626-4.626 4.63 4.63 0 0 1 4.625-4.625 4.63 4.63 0 0 1 4.626 4.625 4.63 4.63 0 0 1-4.626 4.625m0-8a3.38 3.38 0 0 0-3.376 3.374 3.38 3.38 0 0 0 3.375 3.375 3.38 3.38 0 0 0 3.375-3.375 3.38 3.38 0 0 0-3.375-3.375" clip-rule="evenodd"></path><path fill="#121214" d="M6.6 7.516a.623.623 0 0 0 .884 0 .625.625 0 0 0 0-.884L5.717 4.864a.626.626 0 0 0-.885.885zM5.025 12.613h-2.5a.625.625 0 0 1 0-1.25h2.5a.625.625 0 0 1 0 1.25M4.864 19.097a.623.623 0 0 0 .884 0l1.768-1.767a.626.626 0 0 0-.885-.885l-1.767 1.768a.625.625 0 0 0 0 .884M11.988 22.029a.625.625 0 0 1-.625-.625v-2.5a.625.625 0 0 1 1.25 0v2.5c0 .345-.28.625-.625.625M18.213 19.065a.623.623 0 0 0 .884 0 .625.625 0 0 0 0-.884l-1.767-1.768a.626.626 0 0 0-.885.885zM21.404 12.566h-2.5a.625.625 0 0 1 0-1.25h2.5a.625.625 0 0 1 0 1.25M16.413 7.484a.623.623 0 0 0 .884 0l1.768-1.767a.626.626 0 0 0-.885-.885L16.413 6.6a.625.625 0 0 0 0 .884"></path></svg>`,
          },
          {
            name: "Backup Camera",
            icon: ` <svg
      xmlns="https://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
    >
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M14.45 7.5h-4.8c-.4 0-.6-.3-.6-.7V4.5c0-.3.3-.6.6-.6h4.8c.3 0 .6.3.6.6v2.3c0 .4-.3.7-.6.7m-4.2-1.3h3.5v-1h-3.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#121214"
        d="M9.65 13h4.8c.3 0 .6-.3.6-.6s-.3-.6-.6-.6h-4.8c-.3 0-.6.3-.6.6s.3.6.6.6"
      ></path>
      <path
        fill="#121214"
        fillRule="evenodd"
        d="M9.35 15.1h5.3c1.3 0 2.3-1 2.3-2.3V6.9h.7c.4 0 .6-.3.6-.6s-.3-.6-.6-.6h-.7V3.8c0-1.3-1-2.3-2.3-2.3h-5.3c-1.3 0-2.3 1-2.3 2.3v1.8h-.7c-.3 0-.6.2-.6.6s.3.7.6.7h.7v5.9c0 1.3 1 2.3 2.3 2.3m-1-11.3c0-.6.4-1.1 1-1.1h5.4c.6 0 1.1.5 1.1 1.1v9c0 .6-.5 1.1-1.1 1.1h-5.3c-.6 0-1.1-.5-1.1-1.1z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#121214"
        d="M11.85 19.1c-1 0-2-.4-2.8-1.1-.2-.2-.2-.6 0-.9.2-.2.6-.2.9 0 1.1 1.1 2.8 1 3.8 0 .2-.2.6-.2.9 0 .2.2.2.6 0 .9-.7.7-1.8 1.1-2.8 1.1M11.95 22.4c-1.8 0-3.6-.7-5-2.1-.2-.2-.2-.6 0-.9.2-.2.6-.2.9 0 2.3 2.3 6.1 2.3 8.4-.1.2-.2.6-.2.9 0 .2.2.2.6 0 .9-1.5 1.5-3.3 2.2-5.2 2.2"
      ></path>
            </svg>`,
          },
          {
            name: "Avtomobil Sensorlar",
            icon: `<svg xmlns="https://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" class="seo-pages-12fc1ls-MediaObjectItem" role="img" version="1.1"><path fill="#121214" fill-rule="evenodd" d="M6.3 5.025c0-.345.28-.625.625-.625h4.8c.345 0 .625.28.625.625v2.3c0 .345-.28.625-.625.625h-4.8a.625.625 0 0 1-.625-.625zm1.25.625V6.7h3.55V5.65z" clip-rule="evenodd"></path><path fill="#121214" d="M6.925 12.3a.625.625 0 1 0 0 1.25h4.8a.625.625 0 1 0 0-1.25z"></path><path fill="#121214" fill-rule="evenodd" d="M6.625 2C5.38 2 4.3 3.08 4.3 4.325V6.1h-.675a.625.625 0 1 0 0 1.25H4.3v5.975c0 1.245 1.08 2.325 2.325 2.325h5.3c1.369 0 2.325-1.104 2.325-2.325V7.35h.675a.625.625 0 1 0 0-1.25h-.675V4.325C14.25 3.08 13.17 2 11.925 2zM5.55 4.325c0-.555.52-1.075 1.075-1.075h5.3c.555 0 1.075.52 1.075 1.075v9a1.06 1.06 0 0 1-1.075 1.075h-5.3c-.555 0-1.075-.52-1.075-1.075z" clip-rule="evenodd"></path><path fill="#121214" d="M16.725 14.1c.345 0 .625.28.625.625 0 2.152-1.78 3.907-3.89 4.024a.625.625 0 1 1-.07-1.248c1.49-.083 2.71-1.328 2.71-2.776 0-.345.28-.625.625-.625"></path><path fill="#121214" d="M20.025 14.1c.345 0 .625.28.625.625 0 3.948-3.18 7.116-7.108 7.225a.625.625 0 0 1-.034-1.25c3.271-.09 5.892-2.723 5.892-5.975 0-.345.28-.625.625-.625"></path></svg>`,
          },
          {
            name: "GPS",
            icon: `<svg xmlns="https://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" class="seo-pages-12fc1ls-MediaObjectItem" role="img" version="1.1"><path fill="#121214" d="M15.662 11.39a.623.623 0 0 0 .884-.002l4.521-4.52c.29-.288.448-.673.448-1.08s-.159-.792-.447-1.08l-3.299-3.3c-.545-.544-1.496-.543-2.04 0l-4.564 4.564a.626.626 0 0 0 .884.884l4.565-4.564c.093-.092.177-.093.271 0l3.3 3.3a.275.275 0 0 1 0 .391l-4.523 4.524a.624.624 0 0 0 0 .883"></path><path fill="#121214" d="M4.739 21.104a1.483 1.483 0 0 0 2.092 0l4.63-4.63a.624.624 0 1 0-.884-.884l-4.63 4.63a.23.23 0 0 1-.325 0l-3.305-3.306a.23.23 0 0 1 0-.325l4.198-4.199a.78.78 0 0 1 .558-.23c.21 0 .41.081.559.23l1.22 1.223c1.367 1.372 3.556 1.432 4.88.133a3.4 3.4 0 0 0 1.009-2.664 3.41 3.41 0 0 0-1.39-2.502 3.41 3.41 0 0 0-3.916-.05c-.45.315-.808.714-1.063 1.187a.624.624 0 1 0 1.1.593q.245-.45.678-.754c.718-.5 1.754-.488 2.46.032.525.385.838.947.883 1.584a2.14 2.14 0 0 1-.636 1.681c-.822.808-2.25.751-3.12-.123l-1.22-1.222a2.02 2.02 0 0 0-1.442-.599h-.002c-.545 0-1.057.212-1.442.597l-4.2 4.2a1.484 1.484 0 0 0 .002 2.093zM12.179 19.134a.625.625 0 0 1 0-1.25 5.71 5.71 0 0 0 5.703-5.702.625.625 0 1 1 1.25 0c0 3.833-3.12 6.952-6.953 6.952"></path><path fill="#121214" d="M11.554 21.61c0 .346.28.626.625.626 5.543 0 10.054-4.51 10.054-10.054a.626.626 0 0 0-1.25 0c0 4.855-3.95 8.804-8.804 8.804a.625.625 0 0 0-.625.625"></path></svg>`,
          },
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
