"use client";
import { FormInput } from "@/interfaces";
import React, { FC } from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import { IBranches, IFeatures } from "@/app/cars/create-car/page";
import { ICategoryItem } from "@/interfaces/Categories";

const formSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  license_plate: z.string().min(1),
  seating_capacity: z.preprocess((val) => Number(val), z.number().min(1)),
  transmission: z.string().min(1),
  mileage: z.preprocess((val) => Number(val), z.number().min(1)),
  rental_price_per_day: z.preprocess((val) => Number(val), z.number().min(1)),
  owner_name: z.string().min(1),
  owner_phone: z.string().min(1),
  color: z.string().min(1),
  fuel_type: z.string().min(1),
  year: z.preprocess((val) => Number(val), z.number().min(1)),
  deposit: z.preprocess((val) => Number(val), z.number().min(1)),
  minimum_age: z.preprocess((val) => Number(val), z.number().min(1)),
  branch: z.preprocess((val) => Number(val), z.number().min(1)),
  category: z.preprocess((val) => Number(val), z.number().min(1)),
  features: z.array(z.number().min(1)),
  engine_size: z.enum([
    "0.6L",
    "1.0L",
    "1.5L",
    "2.0L",
    "2.5L",
    "3.0L",
    "3.5L",
    "4.0L",
    "5.0L",
    "6.0L",
    "7.0L+",
  ]),
  rental_status: z.enum(["bosh", "ijarada", "reserved"]),
  description: z.string().min(10),
  images: z
    .any()
    .refine((files) => files.length > 0, "Please upload at least one image"),
});

interface IcreateCar {
  features: IFeatures[];
  branchs: IBranches[];
  updatedValues: z.infer<typeof formSchema>;
  categories: ICategoryItem[];
  isUpdated: boolean;
  id: number;
}

const CreateCar: FC<IcreateCar> = ({
  features,
  branchs,
  categories,
  updatedValues,
  isUpdated,
  id,
}) => {
  console.log(
    "branchS",
    categories
    // categories.map((item: ICategory) => item)
  );

  const inputs: FormInput<typeof formSchema>[] = [
    {
      title: "Avtomobil ma'lumotlari",
      fields: [
        {
          type: "single_line",
          inputType: "text",
          label: "Brand name",
          placeholder: "Toyota",
          name: "brand",
        },
        {
          type: "single_line",
          inputType: "text",
          label: "Model name",
          placeholder: "Gentra",
          name: "model",
        },
        {
          type: "single_line",
          inputType: "text",
          label: "License plate",
          placeholder: "01A123BB",
          name: "license_plate",
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Seating capacity",
          placeholder: "5",
          name: "seating_capacity",
        },

        {
          type: "single_line",
          inputType: "number",
          label: "Mileage",
          placeholder: "15000",
          name: "mileage",
        },

        {
          type: "select",
          inputType: "text",
          label: "Transmission Type",
          name: "transmission",
          placeholder: "Automatic",
          options: [
            { label: "Automatic", value: "automatic" },
            { label: "Manual", value: "manual" },
          ],
        },
        {
          type: "select",
          label: "Car Color",
          name: "color",
          placeholder: "Red",
          options: [
            { label: "Red", value: "red", color: "#FF0000" },
            { label: "Blue", value: "blue", color: "#0000FF" },
            { label: "Black", value: "black", color: "#000000" },
            { label: "White", value: "white", color: "#FFFFFF" },
            { label: "Silver", value: "silver", color: "#C0C0C0" },
            { label: "Gray", value: "gray", color: "#808080" },
          ],
        },

        {
          type: "select",
          label: "Fuel type",
          placeholder: "Diesel",
          name: "fuel_type",
          options: [
            { label: "Diesel", value: "diesel" },
            { label: "Petrol", value: "petrol" },
            { label: "Electric", value: "electric" },
            { label: "Hybrid", value: "hybrid" },
          ],
        },

        {
          type: "select",
          label: "Engine Size",
          name: "engine_size",
          placeholder: "2.0L",
          options: [
            { label: "0.6L - Small City Car", value: "0.6L" },
            { label: "1.0L - Compact Car", value: "1.0L" },
            { label: "1.5L - Economy Car", value: "1.5L" },
            { label: "2.0L - Midsize Car", value: "2.0L" },
            { label: "2.5L - Large Sedan/SUV", value: "2.5L" },
            { label: "3.0L - Performance SUV", value: "3.0L" },
            { label: "3.5L - Sporty Crossover", value: "3.5L" },
            { label: "4.0L - Performance Car", value: "4.0L" },
            { label: "5.0L - Muscle Car", value: "5.0L" },
            { label: "6.0L - Supercar", value: "6.0L" },
            { label: "7.0L+ - Hypercar", value: "7.0L+" },
          ],
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Car year",
          placeholder: "2022",
          name: "year",
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Minimum age",
          placeholder: "20",
          name: "minimum_age",
        },
        {
          type: "select",
          label: "Filialni tanlang",
          name: "branch",
          placeholder: "Yunusobod",
          options:
            branchs?.map((item: IBranches) => ({
              label: item?.name,
              value: item?.id?.toString(),
            })) || [],
        },
        {
          type: "select",
          label: "Avtomobil Kategoriyasi",
          name: "category",
          placeholder: "Sedan",
          options:
            categories?.map((item: ICategoryItem) => ({
              label: item?.name,
              value: item?.id?.toString(),
            })) || [],
        },
      ],
    },
    {
      type: "multi_select",
      label: "Features",
      placeholder: "features",
      name: "features",
      options:
        features?.map((feature: IFeatures) => ({
          label: feature.name,
          value: feature.id.toString(),
        })) || [],
    },
    {
      type: "select",
      label: "Ijaraviy holati",
      name: "rental_status",
      placeholder: "Bo'sh",
      options: [
        { label: "✅ Bo'sh", value: "bosh" },
        { label: "🚗 Ijarada", value: "ijarada" },
        { label: "📅 Reserv qilingan", value: "reserved" },
      ],
    },
    {
      title: "Ijaraviy narxlari",
      fields: [
        {
          type: "single_line",
          inputType: "number",
          label: "Rental price per day",
          placeholder: "50",
          name: "rental_price_per_day",
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Depozite",
          placeholder: "10000",
          name: "deposit",
        },
      ],
    },

    {
      title: "Avtomobil Egasining ma'lumotlari",
      fields: [
        {
          type: "single_line",
          inputType: "text",
          label: "Owner name",
          placeholder: "Alisher Karimov",
          name: "owner_name",
        },
        {
          type: "single_line",
          inputType: "text",
          label: "Owner phone",
          placeholder: "+998901234567",
          name: "owner_phone",
        },
      ],
    },

    {
      type: "multi_line",
      label: "Description",
      placeholder: "desc",
      name: "description",
    },

    {
      type: "multi_image",
      label: "Car Images",
      name: "images",
    },
  ];

  const formattedUpdatedValues = updatedValues
    ? {
        ...updatedValues,
        branch: updatedValues?.branch || 0,
        category: updatedValues?.category || 0,
        images: updatedValues?.images ?? [],
      }
    : ({} as z.infer<typeof formSchema>);

  console.log("formattedUpdatedValues", formattedUpdatedValues);

  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi avtomobil qo'shish"
      url="cars/"
      pageUrl="/cars"
      toastMessage="Avtomobil"
      updatedValues={formattedUpdatedValues}
      isUpdated={isUpdated}
      id={id}
    />
  );
};

export default CreateCar;
