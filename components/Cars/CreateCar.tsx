"use client";
import { FormInput } from "@/interfaces";
import React from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import {
  AndroidAuto,
  AppleCarPlay,
  AUXInput,
  BackupCamera,
  Bluetooth,
  GPS,
  HeatedSeats,
  Panorama,
  Sensors,
  USB,
  USBCharger,
} from "@/Icons";

const formSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  licensePlate: z.string().min(1),
  seatingCapacity: z.preprocess((val) => Number(val), z.number().min(1)),
  transmission: z.string().min(1),
  mileage: z.preprocess((val) => Number(val), z.number().min(1)),
  rentalPricePerDay: z.preprocess((val) => Number(val), z.number().min(1)),
  ownername: z.string().min(1),
  ownerphone: z.string().min(1),
  color: z.enum(["red", "blue", "black", "white", "silver", "gray"]),
  fuelType: z.enum(["diesel", "petrol", "electric", "hybrid"]),
  year: z.preprocess((val) => Number(val), z.number().min(1)),
  depozite: z.preprocess((val) => Number(val), z.number().min(1)),
  minimumAge: z.preprocess((val) => Number(val), z.number().min(1)),
  features: z.array(z.string()),

  engineSize: z.enum([
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
  rentalStatus: z.enum(["bo'sh", "ijarada", "reserv qilingan"]),
  description: z.string().min(10),
  images: z
    .any()
    .refine((files) => files.length > 0, "Please upload at least one image"),
});

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
        name: "licensePlate",
      },
      {
        type: "single_line",
        inputType: "number",
        label: "Seating capacity",
        placeholder: "5",
        name: "seatingCapacity",
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
        name: "fuelType",
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
        name: "engineSize",
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
        name: "minimumAge",
      },
    ],
  },
  {
    type: "multi_select",
    label: "Features",
    placeholder: "features",
    name: "features",
    options: [
      {
        label: "Heat Seats",
        value: "Heated Seats",
        icon: <HeatedSeats />,
      },
      { label: "Bluetooth", value: "Bluetooth", icon: <Bluetooth /> },
      { label: "Panarama Tom", value: "Panarama Tom", icon: <Panorama /> },
      { label: "USB Charger", value: "USB Charger", icon: <USBCharger /> },
      { label: "USB", value: "USB", icon: <USB /> },
      { label: "Android Auto", value: "Android Auto", icon: <AndroidAuto /> },
      {
        label: "Apple Carplay",
        value: "Apple Carplay",
        icon: <AppleCarPlay />,
      },
      { label: "Aux input", value: "Aux input", icon: <AUXInput /> },
      {
        label: "Backup Camera",
        value: "Backup Camera",
        icon: <BackupCamera />,
      },
      {
        label: "Avtomobil Sensorlar",
        value: "Avtomobil Sensorlar",
        icon: <Sensors />,
      },
      { label: "GPS", value: "GPS", icon: <GPS /> },
    ],
  },
  {
    type: "select",
    label: "Ijaraviy holati",
    name: "rentalStatus",
    placeholder: "Bo'sh",
    options: [
      { label: "✅ Bo'sh", value: "bo'sh" },
      { label: "🚗 Ijarada", value: "ijarada" },
      { label: "📅 Reserv qilingan", value: "reserv qilingan" },
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
        name: "rentalPricePerDay",
      },
      {
        type: "single_line",
        inputType: "number",
        label: "Depozite",
        placeholder: "10000",
        name: "depozite",
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
        name: "ownername",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Owner phone",
        placeholder: "+998901234567",
        name: "ownerphone",
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

const CreateCar = () => {
  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi avtomobil qo'shish"
    />
  );
};

export default CreateCar;
