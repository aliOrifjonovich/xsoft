"use client";
import { FormInput } from "@/interfaces";
import React, { FC } from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import { ClientType } from "@/app/clients/columns";

interface CreateClientProps {
  updatedValues: ClientType;
  isUpdated: boolean;
  id: number;
}

const formSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().optional(),
  phonenumber: z.string().min(1),
  address: z.string().min(1),
  passportid: z.string().min(1),
  driverLicense: z.string().min(1),
  licenseExpiry: z.date().min(new Date("1900-01-01"), "Yilni kiriting"),
  age: z.preprocess((val) => Number(val), z.number().min(1)),
  status: z.enum(["Active", "InActive", "Blacklisted"]),
});

const inputs: FormInput<typeof formSchema>[] = [
  {
    title: "Mijoz Ma'lumotlari",
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
        type: "datePicker",
        inputType: "date",
        label: "License expiry",
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
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "InActive" },
          { label: "Blacklisted", value: "Blacklisted" },
        ],
      },
    ],
  },
];

const CreateClient: FC<CreateClientProps> = ({
  updatedValues,
  isUpdated,
  id,
}) => {
  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi mijozlarni qo'shish"
      url="client/"
      pageUrl="/clients"
      toastMessage="Mijoz"
      updatedValues={updatedValues}
      isUpdated={isUpdated}
      id={id}
    />
  );
};

export default CreateClient;
