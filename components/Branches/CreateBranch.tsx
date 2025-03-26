"use client";
import { FormInput } from "@/interfaces";
import React, { FC, useState } from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import { BranchesType } from "@/app/branch/columns";
import { Card, CardContent } from "../ui/card";
import YandexMap from "../YandexMap";

interface CreateBranchProps {
  updatedValues: BranchesType;
  isUpdated: boolean;
  id: number;
}



const formSchema = z.object({
  name: z.string().min(1, "Filial nomini kiriting"),
  address: z.string().min(1, "Filial manzilini kiriting"),
  year_of_construction: z.date().min(new Date("1900-01-01"), "Yilni kiriting"),
  total_area: z.number().min(0, "Necha metr kvadratligini kiriting"),
  google_map_link: z.string().url("Invalid Google Maps URL"),
  yandex_map_link: z.string().url("Invalid Yandex Maps URL"),
  latitude: z.string(),
  longitude: z.string(),
});

// const inputs: FormInput<typeof formSchema>[] = [
//   {
//     title: "Avtomobil ma'lumotlari",
//     fields: [
//       {
//         type: "single_line",
//         inputType: "text",
//         label: "Branch Name",
//         placeholder: "Oybek filiali",
//         name: "name",
//       },
//       {
//         type: "single_line",
//         inputType: "text",
//         label: "Address",
//         placeholder: "Yunusobod, Toshkent",
//         name: "address",
//       },
//       {
//         type: "datePicker",
//         inputType: "date",
//         label: "Year of Construction",
//         name: "year_of_construction",
//       },
//       {
//         type: "single_line",
//         inputType: "number",
//         label: "Total area",
//         placeholder: "100",
//         name: "total_area",
//       },
//       {
//         type: "single_line",
//         inputType: "text",
//         label: "Googel map link",
//         placeholder: "https://www.google.com/maps",
//         name: "google_map_link",
//       },
//       {
//         type: "single_line",
//         inputType: "text",
//         label: "Yandex map link",
//         placeholder: "https://www.yandex.com/maps",
//         name: "yandex_map_link",
//       },
//     ],
//   },
// ];

const CreateBranch: FC<CreateBranchProps> = ({
  updatedValues,
  isUpdated,
  id,
}) => {
  const [mapData, setMapData] = useState({
    latitude: updatedValues?.latitude || "",
    longitude: updatedValues?.longitude || "",
    yandex_map_link: updatedValues?.yandex_map_link || "",
  });

  // Handling location selection from the map
  const handleLocationSelect = (latitude: string, longitude: string, mapLink: string) => {
    setMapData({
      latitude,
      longitude,
      yandex_map_link: mapLink,
    });
  };

  const inputs: FormInput<typeof formSchema>[] = [
    {
      title: "Filial ma'lumotlari",
      fields: [
        {
          type: "single_line",
          inputType: "text",
          label: "Branch Name",
          placeholder: "Oybek filiali",
          name: "name",
        },
        {
          type: "single_line",
          inputType: "text",
          label: "Address",
          placeholder: "Yunusobod, Toshkent",
          name: "address",
        },
        {
          type: "datePicker",
          inputType: "date",
          label: "Year of Construction",
          name: "year_of_construction",
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Total area",
          placeholder: "100",
          name: "total_area",
        },
        // The Google map link can still be manually entered if needed
        {
          type: "single_line",
          inputType: "text",
          label: "Google map link",
          placeholder: "https://www.google.com/maps",
          name: "google_map_link",
        },
        // Yandex map link will be automatically populated but can be manually edited
        {
          type: "single_line",
          inputType: "text",
          label: "Yandex map link",
          placeholder: "https://www.yandex.com/maps",
          name: "yandex_map_link",
        },
        // Hidden fields for coordinates
        {
          type: "single_line",
          inputType: "hidden",
          label: "Latitude",
          name: "latitude",
        },
        {
          type: "single_line",
          inputType: "hidden",
          label: "Longitude",
          name: "longitude",
        },
      ],
    },
  ];

  // Merge form values with map data before submission
  const handleSubmitWithMap = (values: z.infer<typeof formSchema>, form: any) => {
    // Combine form values with map data
    const combinedValues = {
      ...values,
      latitude: mapData.latitude,
      longitude: mapData.longitude,
      yandex_map_link: mapData.yandex_map_link,
    };
    
    // Call your existing submit function with the combined values
    return form.onSubmit(combinedValues);
  };
  return (
    <>
      <CreateForm<typeof formSchema>
        inputs={inputs}
        formSchema={formSchema}
        pageTitle={"Yangi Filial qo'shish"}
        url="branchs/"
        pageUrl="/branch"
        toastMessage={"Filial"}
        updatedValues={{
          ...updatedValues,
          ...mapData, // Include map data in initial values
        }}
        isUpdated={isUpdated}
        id={id}
        onCustomSubmit={handleSubmitWithMap}
      />
      
      {/* Yandex Map component */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Branch Location on Map</h2>
          <YandexMap 
            onLocationSelect={handleLocationSelect}
            initialLatitude={updatedValues?.latitude}
            initialLongitude={updatedValues?.longitude}
          />
          
          {mapData.latitude && mapData.longitude && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Selected Coordinates:</p>
              <p className="text-sm">Latitude: {mapData.latitude}</p>
              <p className="text-sm">Longitude: {mapData.longitude}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>

  );
};

export default CreateBranch;
