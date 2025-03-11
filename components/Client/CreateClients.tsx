"use client";
import { FormInput } from "@/interfaces";
import React from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";

const formSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().optional(),
  phonenumber: z.string().min(1),
  address: z.string().min(1),
  passportid: z.string().min(1),
  driverLicense: z.string().min(1),
  licenseExpiry: z.string().min(1),
  age: z.preprocess((val) => Number(val), z.number().min(1)),
  status: z.enum(["active", "inactive", "blacklisted"]),
});

const inputs: FormInput<typeof formSchema>[] = [
  {
    title: "Avtomobil ma'lumotlari",
    fields: [
      {
        type: "single_line",
        inputType: "text",
        label: "Full name",
        placeholder: "Ismoil Karimov",
        name: "fullname",
      },
      {
        type: "single_line",
        inputType: "email",
        label: "Email",
        placeholder: "javlon@gmail.com",
        name: "email",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Phone number",
        placeholder: "+998930678542",
        name: "phonenumber",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Yashash manzili",
        placeholder: " 39-uy, Yunusobod, Toshkent",
        name: "address",
      },

      {
        type: "single_line",
        inputType: "text",
        label: "Passport ID",
        placeholder: "AC4560223",
        name: "passportid",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Driver license",
        placeholder: "313132156as",
        name: "driverLicense",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "License expiry",
        placeholder: "20/12/2030",
        name: "licenseExpiry",
      },
      {
        type: "single_line",
        inputType: "number",
        label: "Age",
        placeholder: "20",
        name: "age",
      },

      {
        type: "select",
        label: "Mijozning holati",
        placeholder: "Active",
        name: "status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Blacklisted", value: "blacklisted" },
        ],
      },
    ],
  },
];

const CreateClient = () => {
  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi mijozlarni qo'shish"
    />
  );
};

export default CreateClient;
